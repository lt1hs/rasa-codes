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

// Mock API base URL - disable API calls in production if no URL provided
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || null;

// Axios instance with interceptors
const authAPI = API_BASE_URL ? axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}) : axios.create({
  baseURL: 'https://mock.api.com', // Mock base URL to prevent null errors
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

// Token management
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
    // Use Supabase authentication if available
    if (supabase) {
      console.log('Using Supabase authentication');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        console.error('Supabase auth error:', error);
        throw new Error(error.message || 'Authentication failed');
      }

      if (!data.user || !data.session) {
        throw new Error('No user data returned from Supabase');
      }

      // Create user object from Supabase data
      const user: User = {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.name || data.user.email!.split('@')[0],
        avatar: data.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.email}`,
        role: 'admin' as Role, // Default to admin for now
        permissions: ROLE_PERMISSIONS.admin,
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(data.user.created_at),
        updatedAt: new Date()
      };

      const tokens = {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresIn: data.session.expires_in || 3600
      };

      return { user, tokens };
    }
    
    // Fallback to mock authentication if Supabase not configured
    console.log('Supabase not configured, using mock authentication');
    
    // Simple validation for demo purposes
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }
    
    // Mock successful login for any valid-looking credentials
    const mockUser: User = {
      id: '1',
      email: credentials.email,
      name: credentials.email.split('@')[0] || 'Admin User',
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
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      user: mockUser,
      tokens: mockTokens
    };
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Login failed');
  }
};

export const refreshToken = async (refreshToken: string): Promise<string> => {
  // For development, return mock refresh
  if (import.meta.env.DEV || !API_BASE_URL) {
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
  try {
    // Use Supabase logout if available
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.warn('Supabase logout error:', error);
      }
    }
  } catch (error) {
    console.warn('Logout API call failed:', error);
  } finally {
    // Always clear local storage regardless of API call success
    clearStoredTokens();
  }
};

export const getCurrentUser = async (): Promise<User> => {
  // Use Supabase to get current user if available
  if (supabase) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Supabase getUser error:', error);
        throw new Error(error.message);
      }
      
      if (!user) {
        throw new Error('No authenticated user found');
      }

      // Return user object from Supabase data
      return {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.name || user.email!.split('@')[0],
        avatar: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
        role: 'admin' as Role,
        permissions: ROLE_PERMISSIONS.admin,
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(user.created_at),
        updatedAt: new Date()
      };
    } catch (error) {
      console.error('Failed to get current user from Supabase:', error);
      throw error;
    }
  }

  // Fallback to stored user for mock authentication
  const storedUser = getStoredUser();
  if (storedUser) {
    return storedUser;
  }
  
  throw new Error('No authenticated user found');
};

// Export service functions
export const authService = {
  login,
  logout,
  getCurrentUser,
  refreshToken
};

export default authService;
