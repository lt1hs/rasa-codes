export type UserRole = 'super_admin' | 'admin' | 'editor' | 'author' | 'viewer';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description: string;
  category: string;
}

export interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean;
  userCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  permissions: Permission[];
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  profile: {
    bio?: string;
    phone?: string;
    timezone: string;
    language: string;
    theme: 'light' | 'dark' | 'auto';
  };
  settings: {
    emailNotifications: boolean;
    twoFactorEnabled: boolean;
    sessionTimeout: number;
  };
  stats: {
    loginCount: number;
    postsCreated: number;
    lastActivity: Date;
  };
}

export interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  permissions: string[];
  profile: {
    bio: string;
    phone: string;
    timezone: string;
    language: string;
  };
  settings: {
    emailNotifications: boolean;
    twoFactorEnabled: boolean;
    sessionTimeout: number;
  };
  sendWelcomeEmail: boolean;
}

export interface UserFilters {
  role?: UserRole;
  status?: UserStatus;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  permission?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  pendingUsers: number;
  newUsersThisMonth: number;
  totalLogins: number;
}

export interface UserSearchResult {
  items: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UserListQuery {
  page?: number;
  pageSize?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'lastLoginAt' | 'email' | 'firstName';
  sortOrder?: 'asc' | 'desc';
  filters?: UserFilters;
}

export interface RoleFormData {
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
}

export interface PermissionCategory {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

export type BulkUserAction = 'activate' | 'deactivate' | 'suspend' | 'delete' | 'change_role';

export interface BulkUserOperationResult {
  success: number;
  failed: number;
  errors: Array<{
    userId: string;
    error: string;
  }>;
}