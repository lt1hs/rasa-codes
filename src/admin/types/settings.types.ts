export type SettingType = 'string' | 'number' | 'boolean' | 'array' | 'object' | 'password' | 'email' | 'url' | 'color' | 'file';
export type SettingCategory = 'general' | 'security' | 'notifications' | 'integrations' | 'appearance' | 'performance' | 'advanced';

export interface Setting {
  id: string;
  key: string;
  name: string;
  description: string;
  type: SettingType;
  category: SettingCategory;
  value: any;
  defaultValue: any;
  required: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    options?: Array<{ label: string; value: any }>;
  };
  sensitive: boolean;
  requiresRestart: boolean;
  updatedAt: Date;
  updatedBy: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SettingGroup {
  id: string;
  name: string;
  description: string;
  category: SettingCategory;
  icon: string;
  settings: Setting[];
  order: number;
}

export interface SettingsConfig {
  version: string;
  lastUpdated: Date;
  categories: SettingCategory[];
  groups: SettingGroup[];
}

export interface SystemInfo {
  version: string;
  environment: 'development' | 'staging' | 'production';
  database: {
    type: string;
    version: string;
    status: 'connected' | 'disconnected' | 'error';
  };
  cache: {
    type: string;
    status: 'connected' | 'disconnected' | 'error';
    memoryUsage?: number;
  };
  storage: {
    type: string;
    totalSpace: number;
    usedSpace: number;
    availableSpace: number;
  };
  performance: {
    cpuUsage: number;
    memoryUsage: number;
    uptime: number;
    responseTime: number;
  };
  security: {
    sslEnabled: boolean;
    lastSecurityScan: Date;
    vulnerabilities: number;
  };
}

export interface IntegrationConfig {
  id: string;
  name: string;
  type: 'api' | 'webhook' | 'oauth' | 'database' | 'email' | 'storage' | 'analytics';
  enabled: boolean;
  config: Record<string, any>;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  lastSync?: Date;
  errorMessage?: string;
}

export interface BackupConfig {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'database' | 'files';
  schedule: string; // cron expression
  enabled: boolean;
  retention: number; // days
  compression: boolean;
  encryption: boolean;
  destination: 'local' | 'cloud';
  cloudConfig?: {
    provider: string;
    bucket: string;
    region?: string;
  };
  lastBackup?: Date;
  nextBackup?: Date;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

export interface SettingsHistory {
  id: string;
  settingKey: string;
  oldValue: any;
  newValue: any;
  changedBy: {
    id: string;
    name: string;
    email: string;
  };
  changedAt: Date;
  reason?: string;
  ipAddress: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push' | 'webhook';
  event: string;
  enabled: boolean;
  subject?: string;
  content: string;
  variables: string[];
  recipients: {
    type: 'all' | 'role' | 'specific';
    values: string[];
  };
}

export interface MaintenanceMode {
  enabled: boolean;
  startTime?: Date;
  endTime?: Date;
  message: string;
  allowedIPs: string[];
  allowedRoles: string[];
  showCountdown: boolean;
}

export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  conditions?: {
    userRoles?: string[];
    userAttributes?: Record<string, any>;
    environment?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceId?: string;
  userId: string;
  userName: string;
  userEmail: string;
  changes?: Record<string, { old: any; new: any }>;
  metadata?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface SecuritySettings {
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
    preventReuse: number;
    expirationDays: number;
  };
  sessionSettings: {
    timeoutMinutes: number;
    maxConcurrentSessions: number;
    requireReauthentication: boolean;
  };
  twoFactorAuth: {
    enabled: boolean;
    required: boolean;
    methods: string[];
  };
  loginAttempts: {
    maxAttempts: number;
    lockoutDuration: number;
    alertOnFailure: boolean;
  };
  ipRestrictions: {
    enabled: boolean;
    allowedIPs: string[];
    blockedIPs: string[];
  };
}