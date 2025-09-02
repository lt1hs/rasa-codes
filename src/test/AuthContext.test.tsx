import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../admin/contexts/AuthContext';

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Test component to access auth context
const TestComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      <div data-testid="authenticated">{isAuthenticated ? 'authenticated' : 'not authenticated'}</div>
      <div data-testid="user">{user ? JSON.stringify(user) : 'no user'}</div>
      <button data-testid="login-btn" onClick={() => login('test@example.com', 'password')}>
        Login
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

const renderWithAuth = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide initial state', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    renderWithAuth(<TestComponent />);
    
    expect(screen.getByTestId('authenticated')).toHaveTextContent('not authenticated');
    expect(screen.getByTestId('user')).toHaveTextContent('no user');
  });

  it('should restore user from localStorage', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'admin' as const
    };
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser));
    
    renderWithAuth(<TestComponent />);
    
    expect(screen.getByTestId('authenticated')).toHaveTextContent('authenticated');
    expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
  });

  it('should handle logout', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'admin' as const
    };
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser));
    
    renderWithAuth(<TestComponent />);
    
    // Initially authenticated
    expect(screen.getByTestId('authenticated')).toHaveTextContent('authenticated');
    
    // Click logout button
    fireEvent.click(screen.getByTestId('logout-btn'));
    
    // Should be logged out
    expect(screen.getByTestId('authenticated')).toHaveTextContent('not authenticated');
    expect(screen.getByTestId('user')).toHaveTextContent('no user');
    
    // Should clear localStorage
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user');
  });

  it('should handle corrupted localStorage data', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid-json');
    
    renderWithAuth(<TestComponent />);
    
    // Should handle invalid JSON gracefully
    expect(screen.getByTestId('authenticated')).toHaveTextContent('not authenticated');
    expect(screen.getByTestId('user')).toHaveTextContent('no user');
  });
});