import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { Result, Spin } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { Permission } from '../../types/auth.types';

interface ProtectedRouteProps {
  children: ReactElement;
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean; // If true, user must have ALL permissions; if false, user needs ANY permission
  fallback?: ReactElement;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  permission,
  permissions = [],
  requireAll = false,
  fallback,
  redirectTo = '/admin/login' // Fixed: redirect to admin login instead of user login
}) => {
  const { 
    isAuthenticated, 
    isLoading, 
    user,
    can,
    canAny,
    canAll 
  } = useAuth();

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Redirect to admin login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Build permission requirements array
  const requiredPermissions = permission 
    ? [permission, ...permissions]
    : permissions;

  // Check permissions if any are specified
  if (requiredPermissions.length > 0) {
    // For admin panel, if user is authenticated, allow access
    if (isAuthenticated && user) {
      return children;
    }

    const hasRequiredPermissions = requireAll 
      ? canAll(requiredPermissions)
      : canAny(requiredPermissions);

    if (!hasRequiredPermissions) {
      // Show custom fallback or default unauthorized message
      if (fallback) {
        return fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <Result
            status="403"
            icon={<LockOutlined className="text-red-500" />}
            title="Access Denied"
            subTitle="You don't have permission to access this resource."
            extra={
              <div className="text-sm text-gray-600 mt-4 space-y-2">
                <p><strong>Required permissions:</strong></p>
                <ul className="list-disc list-inside">
                  {requiredPermissions.map((perm) => (
                    <li key={perm} className="font-mono text-xs">
                      {perm}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400 mt-4">
                  Contact your administrator to request access.
                </p>
              </div>
            }
          />
        </div>
      );
    }
  }

  // User is authenticated and has required permissions
  return children;
};

// Convenience HOC for protecting components
export const withPermission = (
  permission: Permission | Permission[],
  requireAll: boolean = false,
  fallback?: ReactElement
) => {
  return <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P) => {
      const permissions = Array.isArray(permission) ? permission : [permission];
      
      return (
        <ProtectedRoute 
          permissions={permissions}
          requireAll={requireAll}
          fallback={fallback}
        >
          <Component {...props} />
        </ProtectedRoute>
      );
    };
  };
};

// Role-based route protection
interface RoleProtectedRouteProps {
  children: ReactElement;
  allowedRoles: string[];
  fallback?: ReactElement;
}

export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles,
  fallback
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    if (fallback) {
      return fallback;
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Result
          status="403"
          icon={<LockOutlined className="text-red-500" />}
          title="Access Denied"
          subTitle={`This feature is restricted to: ${allowedRoles.join(', ')}`}
          extra={
            <div className="text-sm text-gray-600 mt-4">
              <p>Your role: <span className="font-semibold">{user.role}</span></p>
              <p className="text-xs text-gray-400 mt-2">
                Contact your administrator to request role changes.
              </p>
            </div>
          }
        />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;