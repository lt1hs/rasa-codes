export const ADMIN_ROUTES = {
  // Base admin route
  ADMIN: '/admin',
  
  // Dashboard
  DASHBOARD: '/admin/dashboard',
  
  // Content Management
  CONTENT: '/admin/content',
  CONTENT_PAGES: '/admin/content/pages',
  CONTENT_BLOG: '/admin/content/blog',
  CONTENT_BLOG_NEW: '/admin/content/blog/new',
  CONTENT_BLOG_EDIT: '/admin/content/blog/:id/edit',
  CONTENT_PROJECTS: '/admin/content/projects',
  CONTENT_PROJECTS_NEW: '/admin/content/projects/new',
  CONTENT_PROJECTS_EDIT: '/admin/content/projects/:id/edit',
  
  // User Management
  USERS: '/admin/users',
  USERS_LIST: '/admin/users/list',
  USERS_NEW: '/admin/users/new',
  USERS_EDIT: '/admin/users/:id/edit',
  USERS_ROLES: '/admin/users/roles',
  
  // Media Management
  MEDIA: '/admin/media',
  MEDIA_UPLOAD: '/admin/media/upload',
  
  // Analytics
  ANALYTICS: '/admin/analytics',
  
  // Settings
  SETTINGS: '/admin/settings',
  SETTINGS_GENERAL: '/admin/settings/general',
  SETTINGS_SECURITY: '/admin/settings/security',
  SETTINGS_INTEGRATIONS: '/admin/settings/integrations',
  
  // Profile
  PROFILE: '/admin/profile',
  
  // Auth routes
  LOGIN: '/admin/login',
  LOGOUT: '/admin/logout'
} as const;

// Route helpers
export const getContentBlogEditRoute = (id: string) => 
  ADMIN_ROUTES.CONTENT_BLOG_EDIT.replace(':id', id);

export const getContentProjectEditRoute = (id: string) => 
  ADMIN_ROUTES.CONTENT_PROJECTS_EDIT.replace(':id', id);

export const getUserEditRoute = (id: string) => 
  ADMIN_ROUTES.USERS_EDIT.replace(':id', id);

// Public route check
export const isPublicAdminRoute = (pathname: string): boolean => {
  const publicRoutes = [ADMIN_ROUTES.LOGIN];
  return publicRoutes.includes(pathname as any);
};

// Get route title for breadcrumbs
export const getRouteTitle = (pathname: string): string => {
  const routeTitles: Record<string, string> = {
    [ADMIN_ROUTES.DASHBOARD]: 'Dashboard',
    [ADMIN_ROUTES.CONTENT]: 'Content Management',
    [ADMIN_ROUTES.CONTENT_PAGES]: 'Pages',
    [ADMIN_ROUTES.CONTENT_BLOG]: 'Blog Posts',
    [ADMIN_ROUTES.CONTENT_BLOG_NEW]: 'New Blog Post',
    [ADMIN_ROUTES.CONTENT_PROJECTS]: 'Projects',
    [ADMIN_ROUTES.CONTENT_PROJECTS_NEW]: 'New Project',
    [ADMIN_ROUTES.USERS]: 'User Management',
    [ADMIN_ROUTES.USERS_LIST]: 'All Users',
    [ADMIN_ROUTES.USERS_NEW]: 'New User',
    [ADMIN_ROUTES.USERS_ROLES]: 'Roles & Permissions',
    [ADMIN_ROUTES.MEDIA]: 'Media Library',
    [ADMIN_ROUTES.MEDIA_UPLOAD]: 'Upload Media',
    [ADMIN_ROUTES.ANALYTICS]: 'Analytics',
    [ADMIN_ROUTES.SETTINGS]: 'Settings',
    [ADMIN_ROUTES.SETTINGS_GENERAL]: 'General Settings',
    [ADMIN_ROUTES.SETTINGS_SECURITY]: 'Security Settings',
    [ADMIN_ROUTES.SETTINGS_INTEGRATIONS]: 'Integrations',
    [ADMIN_ROUTES.PROFILE]: 'Profile',
  };

  // Handle dynamic routes
  if (pathname.includes('/edit')) {
    if (pathname.includes('/blog/')) return 'Edit Blog Post';
    if (pathname.includes('/projects/')) return 'Edit Project';
    if (pathname.includes('/users/')) return 'Edit User';
  }

  return routeTitles[pathname] || 'Admin';
};