export type AuditAction = 
  | 'create' | 'read' | 'update' | 'delete'
  | 'login' | 'logout' | 'password_change'
  | 'role_change' | 'permission_change'
  | 'export' | 'import' | 'backup' | 'restore'
  | 'settings_change' | 'integration_change'
  | 'upload' | 'download' | 'publish' | 'unpublish';

export type AuditSeverity = 'low' | 'medium' | 'high' | 'critical';

export type AuditResource = 
  | 'user' | 'role' | 'permission' | 'content' | 'media' 
  | 'settings' | 'integration' | 'backup' | 'system';

export interface AuditLog {
  id: string;
  timestamp: Date;
  action: AuditAction;
  resource: AuditResource;
  resourceId?: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  severity: AuditSeverity;
  description: string;
  details?: Record<string, any>;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  metadata: {
    ipAddress: string;
    userAgent: string;
    sessionId?: string;
    requestId?: string;
    duration?: number;
  };
  tags?: string[];
  success: boolean;
  errorMessage?: string;
}

export interface AuditFilters {
  startDate?: Date;
  endDate?: Date;
  actions?: AuditAction[];
  resources?: AuditResource[];
  userIds?: string[];
  severity?: AuditSeverity[];
  success?: boolean;
  search?: string;
  tags?: string[];
}

export interface AuditStats {
  totalLogs: number;
  todayLogs: number;
  weekLogs: number;
  monthLogs: number;
  actionBreakdown: Record<AuditAction, number>;
  resourceBreakdown: Record<AuditResource, number>;
  severityBreakdown: Record<AuditSeverity, number>;
  topUsers: Array<{
    userId: string;
    userName: string;
    count: number;
  }>;
  recentActivity: AuditLog[];
  failureRate: number;
}

export interface ActivitySummary {
  date: string;
  totalActions: number;
  uniqueUsers: number;
  successRate: number;
  topActions: Array<{
    action: AuditAction;
    count: number;
  }>;
}

export interface UserActivity {
  userId: string;
  userName: string;
  userEmail: string;
  totalActions: number;
  lastActivity: Date;
  actionBreakdown: Record<AuditAction, number>;
  recentLogs: AuditLog[];
  riskScore: number;
  suspiciousActivity: boolean;
}

export interface SecurityAlert {
  id: string;
  type: 'multiple_failures' | 'unusual_activity' | 'privilege_escalation' | 'data_export' | 'system_change';
  severity: AuditSeverity;
  title: string;
  description: string;
  userId?: string;
  relatedLogs: string[];
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
  actions?: string[];
}

export interface AuditConfiguration {
  enabled: boolean;
  retentionDays: number;
  logLevel: AuditSeverity;
  excludedActions: AuditAction[];
  excludedResources: AuditResource[];
  enableRealTimeAlerts: boolean;
  alertThresholds: {
    failedLogins: number;
    dataExports: number;
    privilegeChanges: number;
    systemChanges: number;
  };
  enableDataExportTracking: boolean;
  enablePerformanceTracking: boolean;
  enableDetailedChanges: boolean;
  archiveAfterDays?: number;
  anonymizeAfterDays?: number;
}

export interface AuditExportOptions {
  format: 'json' | 'csv' | 'pdf';
  filters: AuditFilters;
  includeDetails: boolean;
  includeChanges: boolean;
  includeMetadata: boolean;
  dateRange: {
    start: Date;
    end: Date;
  };
}

export interface AuditReport {
  id: string;
  title: string;
  description: string;
  generatedAt: Date;
  generatedBy: string;
  filters: AuditFilters;
  stats: AuditStats;
  logs: AuditLog[];
  summary: {
    totalRecords: number;
    timeRange: string;
    keyFindings: string[];
    recommendations: string[];
  };
}

// Audit context for tracking request context
export interface AuditContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  ipAddress?: string;
  userAgent?: string;
  action?: AuditAction;
  resource?: AuditResource;
  resourceId?: string;
  startTime?: number;
}

// Performance tracking
export interface PerformanceLog {
  id: string;
  timestamp: Date;
  action: AuditAction;
  resource: AuditResource;
  duration: number;
  success: boolean;
  userId?: string;
  metadata: {
    endpoint?: string;
    method?: string;
    statusCode?: number;
    responseSize?: number;
    memoryUsage?: number;
    cpuUsage?: number;
  };
}

export interface PerformanceStats {
  averageResponseTime: number;
  slowestEndpoints: Array<{
    endpoint: string;
    averageTime: number;
    callCount: number;
  }>;
  errorRate: number;
  throughput: number;
  peakUsage: {
    time: Date;
    requests: number;
  };
}export type AuditAction = 
  | 'create' | 'read' | 'update' | 'delete'
  | 'login' | 'logout' | 'password_change'
  | 'role_change' | 'permission_change'
  | 'export' | 'import' | 'backup' | 'restore'
  | 'settings_change' | 'integration_change'
  | 'upload' | 'download' | 'publish' | 'unpublish';

export type AuditSeverity = 'low' | 'medium' | 'high' | 'critical';

export type AuditResource = 
  | 'user' | 'role' | 'permission' | 'content' | 'media' 
  | 'settings' | 'integration' | 'backup' | 'system';

export interface AuditLog {
  id: string;
  timestamp: Date;
  action: AuditAction;
  resource: AuditResource;
  resourceId?: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  severity: AuditSeverity;
  description: string;
  details?: Record<string, any>;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  metadata: {
    ipAddress: string;
    userAgent: string;
    sessionId?: string;
    requestId?: string;
    duration?: number;
  };
  tags?: string[];
  success: boolean;
  errorMessage?: string;
}

export interface AuditFilters {
  startDate?: Date;
  endDate?: Date;
  actions?: AuditAction[];
  resources?: AuditResource[];
  userIds?: string[];
  severity?: AuditSeverity[];
  success?: boolean;
  search?: string;
  tags?: string[];
}

export interface AuditStats {
  totalLogs: number;
  todayLogs: number;
  weekLogs: number;
  monthLogs: number;
  actionBreakdown: Record<AuditAction, number>;
  resourceBreakdown: Record<AuditResource, number>;
  severityBreakdown: Record<AuditSeverity, number>;
  topUsers: Array<{
    userId: string;
    userName: string;
    count: number;
  }>;
  recentActivity: AuditLog[];
  failureRate: number;
}

export interface ActivitySummary {
  date: string;
  totalActions: number;
  uniqueUsers: number;
  successRate: number;
  topActions: Array<{
    action: AuditAction;
    count: number;
  }>;
}

export interface UserActivity {
  userId: string;
  userName: string;
  userEmail: string;
  totalActions: number;
  lastActivity: Date;
  actionBreakdown: Record<AuditAction, number>;
  recentLogs: AuditLog[];
  riskScore: number;
  suspiciousActivity: boolean;
}

export interface SecurityAlert {
  id: string;
  type: 'multiple_failures' | 'unusual_activity' | 'privilege_escalation' | 'data_export' | 'system_change';
  severity: AuditSeverity;
  title: string;
  description: string;
  userId?: string;
  relatedLogs: string[];
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
  actions?: string[];
}

export interface AuditConfiguration {
  enabled: boolean;
  retentionDays: number;
  logLevel: AuditSeverity;
  excludedActions: AuditAction[];
  excludedResources: AuditResource[];
  enableRealTimeAlerts: boolean;
  alertThresholds: {
    failedLogins: number;
    dataExports: number;
    privilegeChanges: number;
    systemChanges: number;
  };
  enableDataExportTracking: boolean;
  enablePerformanceTracking: boolean;
  enableDetailedChanges: boolean;
  archiveAfterDays?: number;
  anonymizeAfterDays?: number;
}

export interface AuditExportOptions {
  format: 'json' | 'csv' | 'pdf';
  filters: AuditFilters;
  includeDetails: boolean;
  includeChanges: boolean;
  includeMetadata: boolean;
  dateRange: {
    start: Date;
    end: Date;
  };
}

export interface AuditReport {
  id: string;
  title: string;
  description: string;
  generatedAt: Date;
  generatedBy: string;
  filters: AuditFilters;
  stats: AuditStats;
  logs: AuditLog[];
  summary: {
    totalRecords: number;
    timeRange: string;
    keyFindings: string[];
    recommendations: string[];
  };
}

// Audit context for tracking request context
export interface AuditContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  ipAddress?: string;
  userAgent?: string;
  action?: AuditAction;
  resource?: AuditResource;
  resourceId?: string;
  startTime?: number;
}

// Performance tracking
export interface PerformanceLog {
  id: string;
  timestamp: Date;
  action: AuditAction;
  resource: AuditResource;
  duration: number;
  success: boolean;
  userId?: string;
  metadata: {
    endpoint?: string;
    method?: string;
    statusCode?: number;
    responseSize?: number;
    memoryUsage?: number;
    cpuUsage?: number;
  };
}

export interface PerformanceStats {
  averageResponseTime: number;
  slowestEndpoints: Array<{
    endpoint: string;
    averageTime: number;
    callCount: number;
  }>;
  errorRate: number;
  throughput: number;
  peakUsage: {
    time: Date;
    requests: number;
  };
}