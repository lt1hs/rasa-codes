import {
  Setting,
  SettingGroup,
  SettingsConfig,
  SystemInfo,
  IntegrationConfig,
  BackupConfig,
  SettingsHistory,
  MaintenanceMode,
  FeatureFlag,
  SecuritySettings
} from '../types/settings.types';

// Mock settings data
const mockSettings: Setting[] = [
  // General Settings
  {
    id: '1',
    key: 'site_name',
    name: 'Site Name',
    description: 'The name of your website displayed in the header and title',
    type: 'string',
    category: 'general',
    value: 'My Admin Dashboard',
    defaultValue: 'Admin Dashboard',
    required: true,
    sensitive: false,
    requiresRestart: false,
    updatedAt: new Date('2024-01-15T10:00:00'),
    updatedBy: {
      id: '1',
      name: 'John Admin',
      email: 'admin@example.com'
    }
  },
  {
    id: '2',
    key: 'site_description',
    name: 'Site Description',
    description: 'A brief description of your website for SEO purposes',
    type: 'string',
    category: 'general',
    value: 'Modern admin dashboard for content management',
    defaultValue: '',
    required: false,
    sensitive: false,
    requiresRestart: false,
    updatedAt: new Date('2024-01-15T10:00:00'),
    updatedBy: {
      id: '1',
      name: 'John Admin',
      email: 'admin@example.com'
    }
  },
  {
    id: '3',
    key: 'timezone',
    name: 'Default Timezone',
    description: 'The default timezone for the application',
    type: 'string',
    category: 'general',
    value: 'America/New_York',
    defaultValue: 'UTC',
    required: true,
    validation: {
      options: [
        { label: 'UTC', value: 'UTC' },
        { label: 'Eastern Time', value: 'America/New_York' },
        { label: 'Central Time', value: 'America/Chicago' },
        { label: 'Mountain Time', value: 'America/Denver' },
        { label: 'Pacific Time', value: 'America/Los_Angeles' }
      ]
    },
    sensitive: false,
    requiresRestart: true,
    updatedAt: new Date('2024-01-15T10:00:00'),
    updatedBy: {
      id: '1',
      name: 'John Admin',
      email: 'admin@example.com'
    }
  },
  // Security Settings
  {
    id: '4',
    key: 'password_min_length',
    name: 'Minimum Password Length',
    description: 'The minimum number of characters required for passwords',
    type: 'number',
    category: 'security',
    value: 8,
    defaultValue: 8,
    required: true,
    validation: {
      min: 6,
      max: 128
    },
    sensitive: false,
    requiresRestart: false,
    updatedAt: new Date('2024-01-15T10:00:00'),
    updatedBy: {
      id: '1',
      name: 'John Admin',
      email: 'admin@example.com'
    }
  },
  {
    id: '5',
    key: 'session_timeout',
    name: 'Session Timeout (minutes)',
    description: 'How long user sessions remain active without activity',
    type: 'number',
    category: 'security',
    value: 480,
    defaultValue: 480,
    required: true,
    validation: {
      min: 15,
      max: 1440
    },
    sensitive: false,
    requiresRestart: false,
    updatedAt: new Date('2024-01-15T10:00:00'),
    updatedBy: {
      id: '1',
      name: 'John Admin',
      email: 'admin@example.com'
    }
  },
  // Notification Settings
  {
    id: '6',
    key: 'email_notifications',
    name: 'Enable Email Notifications',
    description: 'Send email notifications for important events',
    type: 'boolean',
    category: 'notifications',
    value: true,
    defaultValue: true,
    required: false,
    sensitive: false,
    requiresRestart: false,
    updatedAt: new Date('2024-01-15T10:00:00'),
    updatedBy: {
      id: '1',
      name: 'John Admin',
      email: 'admin@example.com'
    }
  },
  {
    id: '7',
    key: 'smtp_host',
    name: 'SMTP Host',
    description: 'SMTP server hostname for sending emails',
    type: 'string',
    category: 'notifications',
    value: 'smtp.gmail.com',
    defaultValue: '',
    required: false,
    sensitive: false,
    requiresRestart: true,
    updatedAt: new Date('2024-01-15T10:00:00'),
    updatedBy: {
      id: '1',
      name: 'John Admin',
      email: 'admin@example.com'
    }
  },
  {
    id: '8',
    key: 'smtp_password',
    name: 'SMTP Password',
    description: 'Password for SMTP authentication',
    type: 'password',
    category: 'notifications',
    value: '••••••••',
    defaultValue: '',
    required: false,
    sensitive: true,
    requiresRestart: true,
    updatedAt: new Date('2024-01-15T10:00:00'),
    updatedBy: {
      id: '1',
      name: 'John Admin',
      email: 'admin@example.com'
    }
  }
];

const mockSystemInfo: SystemInfo = {
  version: '2.1.0',
  environment: 'development',
  database: {
    type: 'PostgreSQL',
    version: '14.2',
    status: 'connected'
  },
  cache: {
    type: 'Redis',
    status: 'connected',
    memoryUsage: 45
  },
  storage: {
    type: 'Local Storage',
    totalSpace: 100 * 1024 * 1024 * 1024, // 100GB
    usedSpace: 25 * 1024 * 1024 * 1024,   // 25GB
    availableSpace: 75 * 1024 * 1024 * 1024 // 75GB
  },
  performance: {
    cpuUsage: 23,
    memoryUsage: 67,
    uptime: 86400 * 7, // 7 days in seconds
    responseTime: 120
  },
  security: {
    sslEnabled: true,
    lastSecurityScan: new Date('2024-01-14T00:00:00'),
    vulnerabilities: 0
  }
};

const mockIntegrations: IntegrationConfig[] = [
  {
    id: '1',
    name: 'Google Analytics',
    type: 'analytics',
    enabled: true,
    config: {
      trackingId: 'GA-XXXXXXXXX',
      enableEcommerce: false
    },
    status: 'connected',
    lastSync: new Date('2024-01-15T09:00:00')
  },
  {
    id: '2',
    name: 'AWS S3',
    type: 'storage',
    enabled: true,
    config: {
      bucket: 'my-app-storage',
      region: 'us-east-1',
      accessKey: 'AKIA...'
    },
    status: 'connected',
    lastSync: new Date('2024-01-15T08:30:00')
  },
  {
    id: '3',
    name: 'Mailgun',
    type: 'email',
    enabled: false,
    config: {
      domain: 'mg.example.com',
      apiKey: 'key-...'
    },
    status: 'disconnected'
  }
];

const mockBackups: BackupConfig[] = [
  {
    id: '1',
    name: 'Daily Full Backup',
    type: 'full',
    schedule: '0 2 * * *', // Every day at 2 AM
    enabled: true,
    retention: 7,
    compression: true,
    encryption: true,
    destination: 'cloud',
    cloudConfig: {
      provider: 'AWS S3',
      bucket: 'my-app-backups',
      region: 'us-east-1'
    },
    lastBackup: new Date('2024-01-15T02:00:00'),
    nextBackup: new Date('2024-01-16T02:00:00'),
    status: 'completed'
  },
  {
    id: '2',
    name: 'Hourly Database Backup',
    type: 'database',
    schedule: '0 * * * *', // Every hour
    enabled: true,
    retention: 3,
    compression: true,
    encryption: false,
    destination: 'local',
    lastBackup: new Date('2024-01-15T14:00:00'),
    nextBackup: new Date('2024-01-15T15:00:00'),
    status: 'completed'
  }
];

// API simulation
export const getSettings = async (): Promise<Setting[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockSettings;
};

export const getSettingsByCategory = async (category: string): Promise<Setting[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockSettings.filter(setting => setting.category === category);
};

export const updateSetting = async (key: string, value: any): Promise<Setting> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const settingIndex = mockSettings.findIndex(s => s.key === key);
  if (settingIndex === -1) {
    throw new Error('Setting not found');
  }
  
  mockSettings[settingIndex] = {
    ...mockSettings[settingIndex],
    value,
    updatedAt: new Date(),
    updatedBy: {
      id: '1',
      name: 'Current User',
      email: 'user@example.com'
    }
  };
  
  return mockSettings[settingIndex];
};

export const resetSetting = async (key: string): Promise<Setting> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const settingIndex = mockSettings.findIndex(s => s.key === key);
  if (settingIndex === -1) {
    throw new Error('Setting not found');
  }
  
  mockSettings[settingIndex] = {
    ...mockSettings[settingIndex],
    value: mockSettings[settingIndex].defaultValue,
    updatedAt: new Date(),
    updatedBy: {
      id: '1',
      name: 'Current User',
      email: 'user@example.com'
    }
  };
  
  return mockSettings[settingIndex];
};

export const getSystemInfo = async (): Promise<SystemInfo> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockSystemInfo;
};

export const getIntegrations = async (): Promise<IntegrationConfig[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockIntegrations;
};

export const updateIntegration = async (id: string, config: Partial<IntegrationConfig>): Promise<IntegrationConfig> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const integrationIndex = mockIntegrations.findIndex(i => i.id === id);
  if (integrationIndex === -1) {
    throw new Error('Integration not found');
  }
  
  mockIntegrations[integrationIndex] = {
    ...mockIntegrations[integrationIndex],
    ...config,
    lastSync: new Date()
  };
  
  return mockIntegrations[integrationIndex];
};

export const testIntegration = async (id: string): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const integration = mockIntegrations.find(i => i.id === id);
  if (!integration) {
    throw new Error('Integration not found');
  }
  
  // Simulate test result
  const success = Math.random() > 0.2; // 80% success rate
  
  return {
    success,
    message: success 
      ? `Successfully connected to ${integration.name}` 
      : `Failed to connect to ${integration.name}. Please check your configuration.`
  };
};

export const getBackups = async (): Promise<BackupConfig[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockBackups;
};

export const createBackup = async (config: Partial<BackupConfig>): Promise<BackupConfig> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const newBackup: BackupConfig = {
    id: Date.now().toString(),
    name: config.name || 'Manual Backup',
    type: config.type || 'full',
    schedule: config.schedule || '',
    enabled: config.enabled || false,
    retention: config.retention || 7,
    compression: config.compression || false,
    encryption: config.encryption || false,
    destination: config.destination || 'local',
    cloudConfig: config.cloudConfig,
    status: 'pending'
  };
  
  mockBackups.push(newBackup);
  return newBackup;
};

export const runBackup = async (id: string): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const backup = mockBackups.find(b => b.id === id);
  if (!backup) {
    throw new Error('Backup configuration not found');
  }
  
  // Simulate backup process
  backup.status = 'running';
  
  setTimeout(() => {
    backup.status = 'completed';
    backup.lastBackup = new Date();
  }, 1000);
  
  return {
    success: true,
    message: `Backup "${backup.name}" started successfully`
  };
};

export const exportSettings = async (): Promise<{ data: string; filename: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const exportData = {
    version: '2.1.0',
    exportedAt: new Date().toISOString(),
    settings: mockSettings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, any>)
  };
  
  return {
    data: JSON.stringify(exportData, null, 2),
    filename: `settings-export-${new Date().toISOString().split('T')[0]}.json`
  };
};

export const importSettings = async (data: string): Promise<{ imported: number; errors: string[] }> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    const importData = JSON.parse(data);
    let imported = 0;
    const errors: string[] = [];
    
    if (importData.settings) {
      for (const [key, value] of Object.entries(importData.settings)) {
        const setting = mockSettings.find(s => s.key === key);
        if (setting) {
          setting.value = value;
          setting.updatedAt = new Date();
          imported++;
        } else {
          errors.push(`Setting "${key}" not found`);
        }
      }
    }
    
    return { imported, errors };
  } catch (error) {
    throw new Error('Invalid settings file format');
  }
};

export const clearCache = async (): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    success: true,
    message: 'Cache cleared successfully'
  };
};

export const restartApplication = async (): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    message: 'Application restart initiated. Please wait a moment...'
  };
};