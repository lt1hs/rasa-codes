import { 
  AuditLog, 
  AuditAction, 
  AuditResource, 
  AuditSeverity, 
  AuditFilters,
  AuditStats,
  AuditContext,
  SecurityAlert,
  AuditConfiguration,
  UserActivity,
  ActivitySummary,
  PerformanceLog
} from '../types/audit.types';
import { apiService } from './api.service';

class AuditService {
  private context: AuditContext = {};
  private config: AuditConfiguration = {
    enabled: true,
    retentionDays: 365,
    logLevel: 'low',
    excludedActions: [],
    excludedResources: [],
    enableRealTimeAlerts: true,
    alertThresholds: {
      failedLogins: 5,
      dataExports: 3,
      privilegeChanges: 1,
      systemChanges: 1
    },
    enableDataExportTracking: true,
    enablePerformanceTracking: true,
    enableDetailedChanges: true
  };

  // Set audit context for tracking
  setContext(context: Partial<AuditContext>): void {
    this.context = { ...this.context, ...context };
  }

  // Clear audit context
  clearContext(): void {
    this.context = {};
  }

  // Get current user info
  private getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  // Get client metadata
  private getClientMetadata() {
    return {
      ipAddress: this.context.ipAddress || 'unknown',
      userAgent: navigator.userAgent,
      sessionId: this.context.sessionId || sessionStorage.getItem('sessionId') || 'unknown',
      requestId: this.context.requestId || this.generateRequestId()
    };
  }

  // Generate unique request ID
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Check if action should be logged
  private shouldLog(action: AuditAction, resource: AuditResource, severity: AuditSeverity): boolean {
    if (!this.config.enabled) return false;
    if (this.config.excludedActions.includes(action)) return false;
    if (this.config.excludedResources.includes(resource)) return false;
    
    // Check severity level
    const severityLevels = { low: 0, medium: 1, high: 2, critical: 3 };
    const minLevel = severityLevels[this.config.logLevel];
    const currentLevel = severityLevels[severity];
    
    return currentLevel >= minLevel;
  }

  // Create audit log entry
  private createAuditLog(
    action: AuditAction,
    resource: AuditResource,
    resourceId: string | undefined,
    description: string,
    options: {
      severity?: AuditSeverity;
      details?: Record<string, any>;
      changes?: Array<{ field: string; oldValue: any; newValue: any }>;
      tags?: string[];
      success?: boolean;
      errorMessage?: string;
      duration?: number;
    } = {}
  ): AuditLog {
    const user = this.getCurrentUser();
    const metadata = this.getClientMetadata();
    
    return {
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      action,
      resource,
      resourceId,
      userId: user?.id || 'anonymous',
      userName: user ? `${user.firstName} ${user.lastName}` : 'Anonymous',
      userEmail: user?.email || 'unknown',
      userRole: user?.role || 'unknown',
      severity: options.severity || 'low',
      description,
      details: options.details,
      changes: options.changes,
      metadata: {
        ...metadata,
        duration: options.duration
      },
      tags: options.tags,
      success: options.success !== false,
      errorMessage: options.errorMessage
    };
  }

  // Log audit event
  async logAudit(
    action: AuditAction,
    resource: AuditResource,
    description: string,
    options: {
      resourceId?: string;
      severity?: AuditSeverity;
      details?: Record<string, any>;
      changes?: Array<{ field: string; oldValue: any; newValue: any }>;
      tags?: string[];
      success?: boolean;
      errorMessage?: string;
    } = {}
  ): Promise<void> {
    const severity = options.severity || 'low';
    
    if (!this.shouldLog(action, resource, severity)) {
      return;
    }

    const auditLog = this.createAuditLog(
      action,
      resource,
      options.resourceId,
      description,
      options
    );

    try {
      // Send to audit API
      await apiService.post('/audit/logs', auditLog, {
        showErrorMessage: false,
        timeout: 5000
      });

      // Check for security alerts
      if (options.severity && ['high', 'critical'].includes(options.severity)) {
        await this.checkSecurityAlerts(auditLog);
      }
    } catch (error) {
      // Store locally if API fails (for reliability)
      this.storeLocalAudit(auditLog);
      console.warn('Failed to send audit log to server:', error);
    }
  }

  // Store audit log locally as fallback
  private storeLocalAudit(auditLog: AuditLog): void {
    try {
      const stored = localStorage.getItem('audit_logs_pending') || '[]';
      const logs = JSON.parse(stored);
      logs.push(auditLog);
      
      // Keep only last 100 logs locally
      if (logs.length > 100) {
        logs.splice(0, logs.length - 100);
      }
      
      localStorage.setItem('audit_logs_pending', JSON.stringify(logs));
    } catch (error) {
      console.warn('Failed to store audit log locally:', error);
    }
  }

  // Sync pending local audit logs
  async syncPendingLogs(): Promise<void> {
    try {
      const stored = localStorage.getItem('audit_logs_pending');
      if (!stored) return;

      const logs = JSON.parse(stored);
      if (logs.length === 0) return;

      await apiService.post('/audit/logs/batch', { logs }, {
        showErrorMessage: false
      });

      localStorage.removeItem('audit_logs_pending');
    } catch (error) {
      console.warn('Failed to sync pending audit logs:', error);
    }
  }

  // Check for security alerts
  private async checkSecurityAlerts(auditLog: AuditLog): Promise<void> {
    try {
      await apiService.post('/audit/security-check', {
        auditLog,
        thresholds: this.config.alertThresholds
      }, {
        showErrorMessage: false
      });
    } catch (error) {
      console.warn('Failed to check security alerts:', error);
    }
  }

  // Convenience methods for common actions

  // User actions
  async logUserLogin(userId: string, success: boolean, details?: Record<string, any>): Promise<void> {
    await this.logAudit(
      'login',
      'user',
      success ? 'User logged in successfully' : 'User login failed',
      {
        resourceId: userId,
        severity: success ? 'low' : 'medium',
        success,
        details: {
          loginMethod: details?.loginMethod || 'email',
          twoFactorUsed: details?.twoFactorUsed || false,
          ...details
        },
        tags: ['authentication']
      }
    );
  }

  async logUserLogout(userId: string): Promise<void> {
    await this.logAudit(
      'logout',
      'user',
      'User logged out',
      {
        resourceId: userId,
        severity: 'low',
        tags: ['authentication']
      }
    );
  }

  async logUserCreated(userId: string, createdBy: string, userRole: string): Promise<void> {
    await this.logAudit(
      'create',
      'user',
      `New user created with role: ${userRole}`,
      {
        resourceId: userId,
        severity: 'medium',
        details: { createdBy, userRole },
        tags: ['user-management']
      }
    );
  }

  async logUserUpdated(userId: string, changes: Array<{ field: string; oldValue: any; newValue: any }>): Promise<void> {
    await this.logAudit(
      'update',
      'user',
      'User information updated',
      {
        resourceId: userId,
        severity: 'low',
        changes,
        tags: ['user-management']
      }
    );
  }

  async logUserDeleted(userId: string, deletedUserName: string): Promise<void> {
    await this.logAudit(
      'delete',
      'user',
      `User deleted: ${deletedUserName}`,
      {
        resourceId: userId,
        severity: 'high',
        details: { deletedUserName },
        tags: ['user-management', 'data-deletion']
      }
    );
  }

  async logRoleChange(userId: string, oldRole: string, newRole: string): Promise<void> {
    await this.logAudit(
      'role_change',
      'user',
      `User role changed from ${oldRole} to ${newRole}`,
      {
        resourceId: userId,
        severity: 'high',
        changes: [{ field: 'role', oldValue: oldRole, newValue: newRole }],
        tags: ['role-management', 'privilege-change']
      }
    );
  }

  async logPasswordChange(userId: string, forced: boolean = false): Promise<void> {
    await this.logAudit(
      'password_change',
      'user',
      forced ? 'Password reset by admin' : 'Password changed by user',
      {
        resourceId: userId,
        severity: 'medium',
        details: { forced },
        tags: ['security', 'password']
      }
    );
  }

  // Content actions
  async logContentCreated(contentId: string, contentType: string, title: string): Promise<void> {
    await this.logAudit(
      'create',
      'content',
      `${contentType} created: ${title}`,
      {
        resourceId: contentId,
        severity: 'low',
        details: { contentType, title },
        tags: ['content-management']
      }
    );
  }

  async logContentUpdated(contentId: string, title: string, changes: Array<{ field: string; oldValue: any; newValue: any }>): Promise<void> {
    await this.logAudit(
      'update',
      'content',
      `Content updated: ${title}`,
      {
        resourceId: contentId,
        severity: 'low',
        changes,
        tags: ['content-management']
      }
    );
  }

  async logContentDeleted(contentId: string, title: string): Promise<void> {
    await this.logAudit(
      'delete',
      'content',
      `Content deleted: ${title}`,
      {
        resourceId: contentId,
        severity: 'medium',
        details: { title },
        tags: ['content-management', 'data-deletion']
      }
    );
  }

  async logContentPublished(contentId: string, title: string): Promise<void> {
    await this.logAudit(
      'publish',
      'content',
      `Content published: ${title}`,
      {
        resourceId: contentId,
        severity: 'low',
        details: { title },
        tags: ['content-management', 'publishing']
      }
    );
  }

  // Media actions
  async logMediaUploaded(mediaId: string, filename: string, fileSize: number): Promise<void> {
    await this.logAudit(
      'upload',
      'media',
      `Media uploaded: ${filename}`,
      {
        resourceId: mediaId,
        severity: 'low',
        details: { filename, fileSize },
        tags: ['media-management']
      }
    );
  }

  async logMediaDeleted(mediaId: string, filename: string): Promise<void> {
    await this.logAudit(
      'delete',
      'media',
      `Media deleted: ${filename}`,
      {
        resourceId: mediaId,
        severity: 'medium',
        details: { filename },
        tags: ['media-management', 'data-deletion']
      }
    );
  }

  // Settings actions
  async logSettingsChanged(settingKey: string, oldValue: any, newValue: any): Promise<void> {
    await this.logAudit(
      'settings_change',
      'settings',
      `Setting changed: ${settingKey}`,
      {
        resourceId: settingKey,
        severity: this.isSecuritySetting(settingKey) ? 'high' : 'medium',
        changes: [{ field: settingKey, oldValue, newValue }],
        tags: ['settings', this.isSecuritySetting(settingKey) ? 'security' : 'configuration']
      }
    );
  }

  private isSecuritySetting(settingKey: string): boolean {
    const securitySettings = [
      'password_min_length',
      'session_timeout',
      'two_factor_required',
      'max_login_attempts',
      'lockout_duration',
      'allowed_ips',
      'ssl_enabled'
    ];
    return securitySettings.includes(settingKey);
  }

  // System actions
  async logSystemBackup(backupId: string, backupType: string, success: boolean): Promise<void> {
    await this.logAudit(
      'backup',
      'system',
      `System backup ${success ? 'completed' : 'failed'}: ${backupType}`,
      {
        resourceId: backupId,
        severity: success ? 'low' : 'high',
        success,
        details: { backupType },
        tags: ['system', 'backup']
      }
    );
  }

  async logDataExport(exportType: string, recordCount: number): Promise<void> {
    await this.logAudit(
      'export',
      'system',
      `Data exported: ${exportType} (${recordCount} records)`,
      {
        severity: 'high',
        details: { exportType, recordCount },
        tags: ['data-export', 'security']
      }
    );
  }

  // Performance tracking
  async logPerformance(
    action: AuditAction,
    resource: AuditResource,
    duration: number,
    success: boolean = true,
    metadata?: Record<string, any>
  ): Promise<void> {
    if (!this.config.enablePerformanceTracking) return;

    const performanceLog: PerformanceLog = {
      id: `perf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      action,
      resource,
      duration,
      success,
      userId: this.getCurrentUser()?.id,
      metadata: metadata || {}
    };

    try {
      await apiService.post('/audit/performance', performanceLog, {
        showErrorMessage: false,
        timeout: 2000
      });
    } catch (error) {
      console.warn('Failed to log performance data:', error);
    }
  }

  // API methods for retrieving audit data
  async getAuditLogs(filters: AuditFilters = {}, page: number = 1, pageSize: number = 50): Promise<{
    logs: AuditLog[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await apiService.get('/audit/logs', {
      ...filters,
      page,
      pageSize
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error?.message || 'Failed to fetch audit logs');
  }

  async getAuditStats(dateRange?: { start: Date; end: Date }): Promise<AuditStats> {
    const response = await apiService.get('/audit/stats', dateRange);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error?.message || 'Failed to fetch audit stats');
  }

  async getUserActivity(userId: string, days: number = 30): Promise<UserActivity> {
    const response = await apiService.get(`/audit/users/${userId}/activity`, { days });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error?.message || 'Failed to fetch user activity');
  }

  async getSecurityAlerts(resolved: boolean = false): Promise<SecurityAlert[]> {
    const response = await apiService.get('/audit/security-alerts', { resolved });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error?.message || 'Failed to fetch security alerts');
  }

  async acknowledgeSecurityAlert(alertId: string): Promise<void> {
    const response = await apiService.post(`/audit/security-alerts/${alertId}/acknowledge`);

    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to acknowledge alert');
    }
  }

  async resolveSecurityAlert(alertId: string, resolution: string): Promise<void> {
    const response = await apiService.post(`/audit/security-alerts/${alertId}/resolve`, {
      resolution
    });

    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to resolve alert');
    }
  }

  // Configuration
  async getAuditConfiguration(): Promise<AuditConfiguration> {
    const response = await apiService.get('/audit/config');

    if (response.success && response.data) {
      this.config = response.data;
      return response.data;
    }

    throw new Error(response.error?.message || 'Failed to fetch audit configuration');
  }

  async updateAuditConfiguration(config: Partial<AuditConfiguration>): Promise<void> {
    const response = await apiService.put('/audit/config', config);

    if (response.success) {
      this.config = { ...this.config, ...config };
    } else {
      throw new Error(response.error?.message || 'Failed to update audit configuration');
    }
  }
}

// Create and export singleton instance
export const auditService = new AuditService();

// Export helper functions
export const withAuditLogging = <T extends any[], R>(
  action: AuditAction,
  resource: AuditResource,
  description: string,
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R> => {
    const startTime = Date.now();
    let success = true;
    let error: Error | null = null;

    try {
      const result = await fn(...args);
      return result;
    } catch (e) {
      success = false;
      error = e instanceof Error ? e : new Error('Unknown error');
      throw e;
    } finally {
      const duration = Date.now() - startTime;
      
      await auditService.logAudit(action, resource, description, {
        success,
        errorMessage: error?.message,
        details: { duration }
      });

      if (auditService['config'].enablePerformanceTracking) {
        await auditService.logPerformance(action, resource, duration, success);
      }
    }
  };
};

export default auditService;