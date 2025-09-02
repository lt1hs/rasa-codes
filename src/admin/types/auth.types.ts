// Admin Authentication Types
export type Role = 'super_admin' | 'admin' | 'editor' | 'viewer';

export type Permission = 
  | 'admin.dashboard.view'
  | 'content.create' 
  | 'content.edit' 
  | 'content.delete'
  | 'content.view'
  | 'content.pages.view'
  | 'content.blog.view'
  | 'content.projects.view'
  | 'users.view' 
  | 'users.create' 
  | 'users.edit'
  | 'users.delete'
  | 'users.roles.manage'
  | 'media.view'
  | 'media.upload' 
  | 'media.delete'
  | 'analytics.view'
  | 'qr.view'
  | 'qr.create'
  | 'qr.edit'
  | 'qr.delete'
  | 'signboard.view'
  | 'signboard.manage'
  | 'signboard.users.view'
  | 'signboard.designs.view'
  | 'signboard.orders.view'
  | 'settings.view' 
  | 'settings.edit'
  | 'settings.general.edit'
  | 'settings.security.edit'
  | 'settings.integrations.edit';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: Role;
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  permissions: Permission[];
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

// Role-based permission mapping
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [
    'admin.dashboard.view',
    'content.create', 'content.edit', 'content.delete', 'content.view',
    'content.pages.view', 'content.blog.view', 'content.projects.view',
    'users.view', 'users.create', 'users.edit', 'users.delete', 'users.roles.manage',
    'media.view', 'media.upload', 'media.delete',
    'analytics.view',
    'qr.view', 'qr.create', 'qr.edit', 'qr.delete',
    'signboard.view', 'signboard.manage', 'signboard.users.view', 'signboard.designs.view', 'signboard.orders.view',
    'settings.view', 'settings.edit', 'settings.general.edit', 
    'settings.security.edit', 'settings.integrations.edit'
  ],
  admin: [
    'admin.dashboard.view',
    'content.create', 'content.edit', 'content.delete', 'content.view',
    'content.pages.view', 'content.blog.view', 'content.projects.view',
    'users.view', 'users.create', 'users.edit',
    'media.view', 'media.upload', 'media.delete',
    'analytics.view',
    'qr.view', 'qr.create', 'qr.edit', 'qr.delete',
    'signboard.view', 'signboard.manage', 'signboard.users.view', 'signboard.designs.view', 'signboard.orders.view',
    'settings.view', 'settings.general.edit'
  ],
  editor: [
    'admin.dashboard.view',
    'content.create', 'content.edit', 'content.view',
    'content.pages.view', 'content.blog.view', 'content.projects.view',
    'media.view', 'media.upload',
    'qr.view', 'qr.create', 'qr.edit',
    'signboard.view', 'signboard.designs.view'
  ],
  viewer: [
    'admin.dashboard.view',
    'content.view', 'content.pages.view', 'content.blog.view', 'content.projects.view',
    'media.view',
    'qr.view',
    'signboard.view'
  ]
};