# Admin System API Documentation

## Overview

This document provides comprehensive documentation for the Admin System API. The admin system is built using React 18 with TypeScript, Ant Design UI components, and follows modern React patterns including hooks, context, and component composition.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Authentication API](#authentication-api)
3. [Content Management API](#content-management-api)
4. [User Management API](#user-management-api)
5. [Media Management API](#media-management-api)
6. [Settings Management API](#settings-management-api)
7. [Analytics API](#analytics-api)
8. [Hooks API](#hooks-api)
9. [Component API](#component-api)
10. [Type Definitions](#type-definitions)

## Architecture Overview

### Core Technologies
- **Frontend Framework**: React 18 with TypeScript
- **UI Library**: Ant Design 5.x
- **Routing**: React Router DOM 6.x
- **State Management**: React Context API
- **Form Management**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS + SCSS
- **Animation**: Framer Motion
- **Testing**: Vitest + React Testing Library

### Project Structure
```
src/admin/
├── components/          # Reusable UI components
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── layouts/            # Layout components
├── pages/              # Page components
├── services/           # API service layers
├── types/              # TypeScript type definitions
├── schemas/            # Zod validation schemas
└── constants/          # Constants and configuration
```

## Authentication API

### AuthContext

The authentication system is built around a React Context that provides authentication state and methods throughout the application.

#### Type Definition
```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  can: (permission: string) => boolean;
  canManageUsers: () => boolean;
  canManageContent: () => boolean;
  canManageMedia: () => boolean;
  canManageSettings: () => boolean;
}
```

#### Usage
```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout, can } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }
  
  return (
    <div>
      Welcome, {user?.name}!
      {can('users.manage') && <UserManagement />}
    </div>
  );
}
```

#### Methods

##### `login(email: string, password: string): Promise<void>`
Authenticates a user with email and password.

**Parameters:**
- `email` (string): User's email address
- `password` (string): User's password

**Returns:** Promise that resolves on successful authentication

**Example:**
```typescript
try {
  await login('admin@example.com', 'password123');
  // User is now authenticated
} catch (error) {
  // Handle authentication error
}
```

##### `logout(): void`
Logs out the current user and clears authentication state.

##### `can(permission: string): boolean`
Checks if the current user has a specific permission.

**Parameters:**
- `permission` (string): Permission string to check

**Returns:** Boolean indicating if user has permission

**Available Permissions:**
- `admin.dashboard.view`
- `content.pages.view`, `content.pages.create`, `content.pages.edit`, `content.pages.delete`
- `content.blog.view`, `content.blog.create`, `content.blog.edit`, `content.blog.delete`
- `users.view`, `users.create`, `users.edit`, `users.delete`
- `users.roles.manage`
- `media.view`, `media.upload`, `media.delete`
- `settings.general.edit`, `settings.security.edit`, `settings.integrations.edit`
- `analytics.view`

## Content Management API

### Content Service

Handles all content-related operations including pages, blog posts, and projects.

#### Methods

##### `getPages(query: ContentListQuery): Promise<ContentListResponse>`
Retrieves a paginated list of pages.

**Parameters:**
```typescript
interface ContentListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: 'draft' | 'published' | 'archived';
  sortBy?: 'title' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}
```

**Returns:**
```typescript
interface ContentListResponse {
  pages: Page[];
  total: number;
  page: number;
  pageSize: number;
}
```

##### `createPage(data: CreatePageData): Promise<Page>`
Creates a new page.

**Parameters:**
```typescript
interface CreatePageData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published';
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
}
```

##### `updatePage(id: string, data: UpdatePageData): Promise<Page>`
Updates an existing page.

##### `deletePage(id: string): Promise<void>`
Deletes a page.

### Usage Example
```typescript
import { getPages, createPage } from '../services/content.service';

function ContentManager() {
  const [pages, setPages] = useState<Page[]>([]);
  
  useEffect(() => {
    async function loadPages() {
      const response = await getPages({ 
        page: 1, 
        pageSize: 10,
        status: 'published' 
      });
      setPages(response.pages);
    }
    
    loadPages();
  }, []);
  
  const handleCreatePage = async (data: CreatePageData) => {
    const newPage = await createPage(data);
    setPages(prev => [...prev, newPage]);
  };
  
  return (
    <div>
      {pages.map(page => (
        <PageCard key={page.id} page={page} />
      ))}
      <CreatePageForm onSubmit={handleCreatePage} />
    </div>
  );
}
```

## User Management API

### User Service

Handles user management operations including CRUD operations and role management.

#### Methods

##### `getUsers(query: UserListQuery): Promise<UserListResponse>`
Retrieves a paginated list of users.

**Parameters:**
```typescript
interface UserListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: 'admin' | 'editor' | 'user';
  status?: 'active' | 'inactive' | 'pending';
  sortBy?: 'name' | 'email' | 'createdAt' | 'lastLogin';
  sortOrder?: 'asc' | 'desc';
}
```

##### `createUser(data: CreateUserData): Promise<User>`
Creates a new user.

**Parameters:**
```typescript
interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'user';
  permissions?: string[];
  profile?: {
    avatar?: string;
    bio?: string;
    phone?: string;
  };
}
```

##### `updateUser(id: string, data: UpdateUserData): Promise<User>`
Updates an existing user.

##### `deleteUser(id: string): Promise<void>`
Deletes a user.

##### `updateUserPermissions(id: string, permissions: string[]): Promise<void>`
Updates user permissions.

## Media Management API

### Media Service

Handles media file operations including upload, organization, and metadata management.

#### Methods

##### `getMediaList(query: MediaListQuery): Promise<MediaListResponse>`
Retrieves a paginated list of media files.

**Parameters:**
```typescript
interface MediaListQuery {
  page?: number;
  pageSize?: number;
  filters?: {
    search?: string;
    type?: 'image' | 'video' | 'document' | 'archive';
    isPublic?: boolean;
    tags?: string[];
  };
  sortBy?: 'name' | 'uploadedAt' | 'size';
  sortOrder?: 'asc' | 'desc';
  view?: 'grid' | 'list';
}
```

**Returns:**
```typescript
interface MediaListResponse {
  items: MediaFile[];
  folders: MediaFolder[];
  total: number;
}
```

##### `uploadMedia(files: File[], options?: UploadOptions): Promise<MediaFile[]>`
Uploads one or more media files.

**Parameters:**
```typescript
interface UploadOptions {
  folder?: string;
  isPublic?: boolean;
  tags?: string[];
  generateThumbnails?: boolean;
}
```

##### `updateMedia(id: string, data: UpdateMediaData): Promise<MediaFile>`
Updates media file metadata.

**Parameters:**
```typescript
interface UpdateMediaData {
  name?: string;
  alt?: string;
  caption?: string;
  tags?: string[];
  isPublic?: boolean;
}
```

##### `deleteMedia(id: string): Promise<void>`
Deletes a media file.

##### `bulkOperateMedia(operation: BulkOperation, fileIds: string[]): Promise<void>`
Performs bulk operations on multiple media files.

## Settings Management API

### Settings Service

Handles application settings and configuration.

#### Methods

##### `getGeneralSettings(): Promise<GeneralSettings>`
Retrieves general application settings.

**Returns:**
```typescript
interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  language: string;
  maintenanceMode: boolean;
  maintenanceMessage?: string;
  maintenanceAllowedIPs?: string[];
}
```

##### `updateGeneralSettings(data: Partial<GeneralSettings>): Promise<void>`
Updates general settings.

##### `getSecuritySettings(): Promise<SecuritySettings>`
Retrieves security settings.

**Returns:**
```typescript
interface SecuritySettings {
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireLowercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSymbols: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  twoFactorRequired: boolean;
  ipWhitelist: string[];
}
```

##### `updateSecuritySettings(data: Partial<SecuritySettings>): Promise<void>`
Updates security settings.

## Hooks API

### Custom Hooks

#### `useValidatedForm<T>(schema: ZodSchema<T>, options?: UseFormProps<T>)`
A custom hook that combines React Hook Form with Zod validation.

**Parameters:**
- `schema` (ZodSchema): Zod validation schema
- `options` (UseFormProps): React Hook Form options

**Returns:**
```typescript
{
  ...formMethods, // All React Hook Form methods
  submitWithValidation: (onSubmit: (data: T) => Promise<void>) => (data: T) => Promise<void>;
  isSubmitting: boolean;
}
```

**Example:**
```typescript
const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  role: z.enum(['admin', 'editor', 'user']),
});

function UserForm() {
  const form = useValidatedForm(userSchema, {
    defaultValues: {
      name: '',
      email: '',
      role: 'user',
    },
  });

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    await createUser(data);
  };

  return (
    <form onSubmit={form.handleSubmit(form.submitWithValidation(onSubmit))}>
      <input {...form.register('name')} />
      {form.formState.errors.name && (
        <span>{form.formState.errors.name.message}</span>
      )}
      
      <input {...form.register('email')} />
      {form.formState.errors.email && (
        <span>{form.formState.errors.email.message}</span>
      )}
      
      <select {...form.register('role')}>
        <option value="user">User</option>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>
      
      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

#### `useAuth()`
Provides access to authentication context.

**Returns:** `AuthContextType`

## Component API

### Layout Components

#### `AdminLayout`
Main layout wrapper for admin pages.

**Props:**
```typescript
interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  breadcrumb?: BreadcrumbItem[];
}
```

#### `AdminSidebar`
Navigation sidebar component.

**Props:**
```typescript
interface AdminSidebarProps {
  collapsed: boolean;
  isMobile: boolean;
  onClose?: () => void;
}
```

### Page Components

#### `Dashboard`
Main dashboard page showing analytics and overview.

#### `ContentManager`
Content management interface for pages and blog posts.

**Props:**
```typescript
interface ContentManagerProps {
  contentType: 'pages' | 'blog' | 'projects';
}
```

#### `UserManager`
User management interface.

#### `MediaLibrary`
Media file management interface.

**Props:**
```typescript
interface MediaLibraryProps {
  selectionMode?: boolean;
  onSelect?: (files: MediaFile[]) => void;
  allowMultiple?: boolean;
  typeFilter?: string[];
}
```

## Type Definitions

### Core Types

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'user';
  avatar?: string;
  permissions: string[];
  profile?: UserProfile;
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags: string[];
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

interface MediaFile {
  id: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  type: 'image' | 'video' | 'document' | 'archive';
  mimeType: string;
  size: number;
  alt?: string;
  caption?: string;
  tags: string[];
  isPublic: boolean;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  uploadedAt: Date;
  accessCount: number;
  metadata: Record<string, any>;
}
```

### API Response Types

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string>;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

## Error Handling

All API methods follow a consistent error handling pattern:

```typescript
try {
  const result = await apiMethod();
  // Handle success
} catch (error) {
  if (error instanceof ApiError) {
    // Handle API-specific errors
    console.error('API Error:', error.message);
  } else {
    // Handle generic errors
    console.error('Unexpected error:', error);
  }
}
```

## Testing

The admin system includes comprehensive unit and integration tests. Test files are located in `src/test/` and follow the naming convention `*.test.ts` or `*.test.tsx`.

### Running Tests
```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- Unit tests for individual components and hooks
- Integration tests for complete workflows
- Mock services for API testing
- Test utilities for common testing patterns

## Security Considerations

1. **Authentication**: All admin routes are protected by authentication middleware
2. **Authorization**: Permission-based access control for different features
3. **Input Validation**: All forms use Zod schemas for validation
4. **XSS Prevention**: All user input is sanitized
5. **File Upload Security**: File type and size validation for media uploads

## Performance Optimization

1. **Code Splitting**: Lazy loading for admin routes
2. **Memoization**: React.memo and useMemo for expensive operations
3. **Debouncing**: Search inputs use debounced queries
4. **Caching**: API responses are cached where appropriate
5. **Bundle Analysis**: Regular bundle size monitoring

This documentation serves as a comprehensive guide for developers working with the admin system. For specific implementation details, refer to the source code and type definitions.