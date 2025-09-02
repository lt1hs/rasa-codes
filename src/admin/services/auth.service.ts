import axios, { AxiosResponse } from 'axios';
import { 
  LoginCredentials, 
  LoginResponse, 
  RefreshTokenResponse, 
  User,
  ROLE_PERMISSIONS,
  Role 
} from '../types/auth.types';
import { supabase } from '../lib/supabase';

// Mock API base URL - replace with actual API endpoint
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Axios instance with interceptors
const authAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
authAPI.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
authAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return authAPI(originalRequest);
      } catch (refreshError) {
        // Redirect to login if refresh fails
        logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Token storage utilities
export const getStoredToken = (): string | null => {
  return localStorage.getItem('admin_access_token');
};

export const getStoredRefreshToken = (): string | null => {
  return localStorage.getItem('admin_refresh_token');
};

export const storeTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem('admin_access_token', accessToken);
  localStorage.setItem('admin_refresh_token', refreshToken);
};

export const clearStoredTokens = (): void => {
  localStorage.removeItem('admin_access_token');
  localStorage.removeItem('admin_refresh_token');
  localStorage.removeItem('admin_user');
};

export const getStoredUser = (): User | null => {
  const userData = localStorage.getItem('admin_user');
  return userData ? JSON.parse(userData) : null;
};

export const storeUser = (user: User): void => {
  localStorage.setItem('admin_user', JSON.stringify(user));
};

// Authentication API methods
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    // If Supabase is not configured, use mock authentication
    if (!supabase) {
      console.log('Supabase not configured, using mock authentication');
      
      // Mock successful login for any credentials
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'Admin User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        role: 'admin' as Role,
        permissions: ROLE_PERMISSIONS.admin,
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date()
      };

      const mockTokens = {
        accessToken: 'mock_access_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        expiresIn: 900 // 15 minutes
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        user: mockUser,
        tokens: mockTokens
      };
    }

    // Try Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });

    if (error) {
      console.error('Supabase auth error:', error);
      throw new Error(error.message || 'Authentication failed');
    }

    if (!data.user || !data.session) {
      throw new Error('No user data returned');
    }

    // Get or create user profile
    let { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      // Create user profile if it doesn't exist
      const { data: newProfile, error: insertError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name || data.user.email!.split('@')[0],
          role: 'admin'
        })
        .select()
        .single();

      if (insertError) {
        console.error('Failed to create user profile:', insertError);
      } else {
        userProfile = newProfile;
      }
    }

    const user: User = {
      id: data.user.id,
      email: data.user.email!,
      name: userProfile?.name || data.user.email!.split('@')[0],
      avatar: userProfile?.avatar_url,
      role: (userProfile?.role as Role) || 'admin',
      permissions: ROLE_PERMISSIONS[(userProfile?.role as Role) || 'admin'],
      isActive: userProfile?.is_active ?? true,
      lastLogin: new Date(),
      createdAt: new Date(data.user.created_at),
      updatedAt: new Date()
    };

    const tokens = {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresIn: data.session.expires_in
    };

    return { user, tokens };
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Login failed');
  }
};

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getStoredRefreshToken();
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  // For development, return mock refresh
  if (import.meta.env.DEV) {
    const newToken = 'mock_refreshed_token_' + Date.now();
    localStorage.setItem('admin_access_token', newToken);
    return newToken;
  }

  try {
    const response: AxiosResponse<RefreshTokenResponse> = await authAPI.post('/auth/refresh', {
      refreshToken
    });
    
    const { accessToken } = response.data;
    localStorage.setItem('admin_access_token', accessToken);
    return accessToken;
  } catch (error) {
    clearStoredTokens();
    throw new Error('Token refresh failed');
  }
};

export const logout = async (): Promise<void> => {
  const refreshToken = getStoredRefreshToken();
  
  try {
    // Call logout endpoint to invalidate tokens on server
    if (refreshToken && !import.meta.env.DEV) {
      await authAPI.post('/auth/logout', { refreshToken });
    }
  } catch (error) {
    console.warn('Logout API call failed:', error);
  } finally {
    // Clear local storage regardless of API call success
    clearStoredTokens();
  }
};

export const getCurrentUser = async (): Promise<User> => {
  // For development, return stored mock user
  if (import.meta.env.DEV) {
    const storedUser = getStoredUser();
    if (storedUser) {
      return storedUser;
    }
    throw new Error('No authenticated user found');
  }

  try {
    const response: AxiosResponse<User> = await authAPI.get('/auth/me');
    return response.data;
  } catch (error) {
    clearStoredTokens();
    throw new Error('Failed to get current user');
  }
};

export const updateProfile = async (updates: Partial<User>): Promise<User> => {
  // For development, return updated mock user
  if (import.meta.env.DEV) {
    const currentUser = getStoredUser();
    if (!currentUser) {
      throw new Error('No authenticated user found');
    }
    
    const updatedUser = { ...currentUser, ...updates, updatedAt: new Date() };
    storeUser(updatedUser);
    return updatedUser;
  }

  try {
    const response: AxiosResponse<User> = await authAPI.patch('/auth/profile', updates);
    storeUser(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update profile');
  }
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  // For development, simulate successful password change
  if (import.meta.env.DEV) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return;
  }

  try {
    await authAPI.patch('/auth/password', {
      currentPassword,
      newPassword
    });
  } catch (error) {
    throw new Error('Failed to change password');
  }
};

// Permission utilities
export const hasPermission = (userPermissions: string[], requiredPermission: string): boolean => {
  return userPermissions.includes(requiredPermission);
};

export const hasAnyPermission = (userPermissions: string[], requiredPermissions: string[]): boolean => {
  return requiredPermissions.some(permission => userPermissions.includes(permission));
};

export const hasAllPermissions = (userPermissions: string[], requiredPermissions: string[]): boolean => {
  return requiredPermissions.every(permission => userPermissions.includes(permission));
};