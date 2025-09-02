import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { message } from 'antd';
import { 
  AuthState, 
  User, 
  LoginCredentials,
  Permission 
} from '../types/auth.types';
import {
  login as loginService,
  logout as logoutService,
  getCurrentUser,
  getStoredToken,
  getStoredUser,
  storeTokens,
  storeUser,
  clearStoredTokens
} from '../services/auth.service';

// Auth Action Types
type AuthAction = 
  | { type: 'AUTH_INIT' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User } }
  | { type: 'AUTH_LOADING'; payload: boolean }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_UPDATE_USER'; payload: User };

// Initial auth state
const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  permissions: []
};

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_INIT':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        permissions: action.payload.user.permissions || []
      };
    
    case 'AUTH_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
        permissions: []
      };
    
    case 'AUTH_LOGOUT':
      return {
        ...initialAuthState,
        isLoading: false
      };
    
    case 'AUTH_UPDATE_USER':
      return {
        ...state,
        user: action.payload,
        permissions: action.payload.permissions
      };
    
    default:
      return state;
  }
};

// Auth Context Interface
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  checkAuth: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check if user is authenticated
  const checkAuth = async (): Promise<void> => {
    dispatch({ type: 'AUTH_INIT' });
    
    try {
      const token = getStoredToken();
      console.log('Checking auth, token exists:', !!token);
      
      if (!token) {
        console.log('No token found, user not authenticated');
        dispatch({ type: 'AUTH_ERROR', payload: 'No access token found' });
        return;
      }

      // Try to get stored user first (faster UX)
      const storedUser = getStoredUser();
      console.log('Stored user found:', !!storedUser);
      
      if (storedUser) {
        console.log('Using stored user:', storedUser.email);
        dispatch({ type: 'AUTH_SUCCESS', payload: { user: storedUser } });
        
        // Validate with server in background (for production)
        if (!import.meta.env.DEV && API_BASE_URL) {
          try {
            const currentUser = await getCurrentUser();
            if (currentUser.id !== storedUser.id) {
              storeUser(currentUser);
              dispatch({ type: 'AUTH_UPDATE_USER', payload: currentUser });
            }
          } catch (error) {
            console.warn('Background auth validation failed:', error);
            // Token might be expired, logout
            await logout();
          }
        }
      } else {
        console.log('No stored user, attempting to fetch from server');
        // No stored user, fetch from server
        const currentUser = await getCurrentUser();
        storeUser(currentUser);
        dispatch({ type: 'AUTH_SUCCESS', payload: { user: currentUser } });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clearStoredTokens();
      dispatch({ type: 'AUTH_ERROR', payload: 'Authentication failed' });
    }
  };

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_LOADING', payload: true });
      
      console.log('Attempting login with:', { email: credentials.email });
      
      const { user, tokens } = await loginService(credentials);
      
      console.log('Login successful, user:', user);
      
      // Store tokens and user data
      storeTokens(tokens.accessToken, tokens.refreshToken);
      storeUser(user);
      
      dispatch({ type: 'AUTH_SUCCESS', payload: { user } });
      
      message.success(`Welcome back, ${user.name}!`);
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      message.error(errorMessage);
      throw error;
    } finally {
      dispatch({ type: 'AUTH_LOADING', payload: false });
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await logoutService();
      dispatch({ type: 'AUTH_LOGOUT' });
      message.info('You have been logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      clearStoredTokens();
      dispatch({ type: 'AUTH_LOGOUT' });
      message.warning('Logged out locally due to session error');
    }
  };

  // Update user function
  const updateUser = (user: User): void => {
    storeUser(user);
    dispatch({ type: 'AUTH_UPDATE_USER', payload: user });
  };

  // Permission check functions
  const hasPermission = (permission: Permission): boolean => {
    return state.permissions?.includes(permission) || false;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => state.permissions?.includes(permission)) || false;
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => state.permissions?.includes(permission)) || false;
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// HOC for protected components
export const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
      return <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>;
    }
    
    if (!isAuthenticated) {
      window.location.href = '/login';
      return null;
    }
    
    return <Component {...props} />;
  };
};