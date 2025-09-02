import { useAuth as useAuthContext } from '../contexts/AuthContext';
import { Permission } from '../types/auth.types';

// Re-export the auth hook with additional utilities
export const useAuth = () => {
  const auth = useAuthContext();
  
  // Additional auth utilities
  const isAdmin = auth.user?.role === 'admin' || auth.user?.role === 'super_admin';
  const isSuperAdmin = auth.user?.role === 'super_admin';
  const isEditor = auth.user?.role === 'editor';
  const isViewer = auth.user?.role === 'viewer';
  
  // Permission helpers with better names
  const can = (permission: Permission): boolean => {
    return auth.hasPermission(permission);
  };
  
  const canAny = (permissions: Permission[]): boolean => {
    return auth.hasAnyPermission(permissions);
  };
  
  const canAll = (permissions: Permission[]): boolean => {
    return auth.hasAllPermissions(permissions);
  };
  
  // Role-based helpers
  const canManageUsers = (): boolean => {
    return canAny(['users.create', 'users.edit', 'users.delete']);
  };
  
  const canManageContent = (): boolean => {
    return canAny(['content.create', 'content.edit', 'content.delete']);
  };
  
  const canManageMedia = (): boolean => {
    return canAny(['media.upload', 'media.delete']);
  };
  
  const canManageSettings = (): boolean => {
    return canAny(['settings.edit', 'settings.general.edit', 'settings.security.edit']);
  };
  
  return {
    ...auth,
    // Role checks
    isAdmin,
    isSuperAdmin,
    isEditor,
    isViewer,
    // Permission checks
    can,
    canAny,
    canAll,
    // Feature checks
    canManageUsers,
    canManageContent,
    canManageMedia,
    canManageSettings,
  };
};

export default useAuth;