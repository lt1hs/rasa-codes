import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactElement, ReactNode } from 'react';
import { AuthProvider } from '../admin/contexts/AuthContext';

// Mock user for testing
export const mockAdminUser = {
  id: 'admin-1',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin' as const,
};

export const mockEditorUser = {
  id: 'editor-1',
  email: 'editor@example.com',
  name: 'Editor User',
  role: 'editor' as const,
};

// Custom render function that includes common providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialRoute?: string;
  user?: typeof mockAdminUser;
}

export function renderWithProviders(
  ui: ReactElement,
  options: CustomRenderOptions = {}
) {
  const { initialRoute = '/', user = mockAdminUser, ...renderOptions } = options;

  function Wrapper({ children }: { children?: ReactNode }) {
    return (
      <BrowserRouter>
        <AuthProvider initialUser={user}>
          {children}
        </AuthProvider>
      </BrowserRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Mock Ant Design components that cause issues in tests
export const mockAntdComponents = () => {
  return {
    Modal: {
      confirm: vi.fn((config) => {
        // Auto-confirm for testing
        if (config.onOk) config.onOk();
      }),
    },
    message: {
      success: vi.fn(),
      error: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
      loading: vi.fn(),
      destroy: vi.fn(),
    },
    notification: {
      success: vi.fn(),
      error: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
    },
  };
};

// Mock React Router hooks
export const mockRouterHooks = () => {
  return {
    useNavigate: vi.fn(),
    useLocation: vi.fn(() => ({
      pathname: '/admin/dashboard',
      search: '',
      hash: '',
      state: null,
    })),
    useParams: vi.fn(() => ({})),
  };
};

// Mock authentication with different permission levels
export const createMockAuth = (permissions: string[] = []) => {
  return {
    user: mockAdminUser,
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
    loading: false,
    can: vi.fn((permission: string) => permissions.includes(permission)),
    canManageUsers: vi.fn(() => permissions.includes('users.manage')),
    canManageContent: vi.fn(() => permissions.includes('content.manage')),
    canManageMedia: vi.fn(() => permissions.includes('media.manage')),
    canManageSettings: vi.fn(() => permissions.includes('settings.manage')),
  };
};

// Mock form data
export const mockFormData = {
  generalSettings: {
    siteName: 'Test Site',
    siteDescription: 'A test website',
    siteUrl: 'https://test.com',
    adminEmail: 'admin@test.com',
    timezone: 'UTC',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24h',
    language: 'en',
    maintenanceMode: false,
  },
  
  securitySettings: {
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    twoFactorRequired: false,
    ipWhitelist: [],
  },

  userForm: {
    name: 'Test User',
    email: 'test@example.com',
    role: 'editor',
    password: 'password123',
    confirmPassword: 'password123',
  },

  mediaFile: {
    id: '1',
    name: 'test-image.jpg',
    url: 'https://example.com/test-image.jpg',
    thumbnailUrl: 'https://example.com/test-image-thumb.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 1024000,
    alt: 'Test image',
    caption: 'A test image',
    tags: ['test', 'sample'],
    isPublic: true,
    status: 'ready',
    uploadedAt: new Date('2024-01-15T10:30:00'),
    accessCount: 5,
    metadata: { width: 800, height: 600 },
  },
};

// Mock API responses
export const mockApiResponses = {
  success: { success: true, message: 'Operation completed successfully' },
  error: { success: false, message: 'Operation failed', error: 'API Error' },
  
  usersList: {
    users: [
      { ...mockAdminUser, lastLogin: new Date() },
      { ...mockEditorUser, lastLogin: new Date() },
    ],
    total: 2,
    page: 1,
    pageSize: 10,
  },

  mediaList: {
    items: [mockFormData.mediaFile],
    folders: [],
    total: 1,
  },

  analyticsData: {
    visitors: { total: 1250, change: 15.5 },
    pageViews: { total: 3420, change: 8.2 },
    bounceRate: { total: 45.3, change: -2.1 },
    avgSessionDuration: { total: 185, change: 12.4 },
  },
};

// Utility to wait for async operations
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

// Mock file for file upload tests
export const createMockFile = (
  name: string = 'test.jpg',
  size: number = 1024000,
  type: string = 'image/jpeg'
): File => {
  const file = new File(['content'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

// Mock drag and drop events
export const createMockDragEvent = (files: File[]): DragEvent => {
  const event = new Event('drop') as DragEvent;
  
  Object.defineProperty(event, 'dataTransfer', {
    value: {
      files: {
        length: files.length,
        item: (index: number) => files[index],
        [Symbol.iterator]: function* () {
          for (let i = 0; i < files.length; i++) {
            yield files[i];
          }
        },
      },
    },
  });

  return event;
};

// Mock localStorage for testing
export const mockLocalStorage = () => {
  const store: Record<string, string> = {};
  
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    }),
    length: Object.keys(store).length,
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
  };
};

// Mock intersection observer
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  
  window.IntersectionObserver = mockIntersectionObserver;
  return mockIntersectionObserver;
};

// Export re-exports for convenience
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';