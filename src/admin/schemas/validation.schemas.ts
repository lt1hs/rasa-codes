import { z } from 'zod';

// User validation schemas
export const userSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
  
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email cannot exceed 100 characters'),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password cannot exceed 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  confirmPassword: z.string(),
  
  role: z.enum(['super_admin', 'admin', 'editor', 'author', 'viewer'], {
    errorMap: () => ({ message: 'Please select a valid role' })
  }),
  
  status: z.enum(['active', 'inactive', 'suspended', 'pending'], {
    errorMap: () => ({ message: 'Please select a valid status' })
  }),
  
  profile: z.object({
    phone: z.string()
      .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
      .optional()
      .or(z.literal('')),
    
    bio: z.string()
      .max(500, 'Bio cannot exceed 500 characters')
      .optional(),
    
    location: z.string()
      .max(100, 'Location cannot exceed 100 characters')
      .optional(),
    
    website: z.string()
      .url('Please enter a valid URL')
      .optional()
      .or(z.literal('')),
    
    timezone: z.string().default('UTC'),
    
    language: z.string().default('en'),
    
    socialLinks: z.object({
      twitter: z.string().url('Please enter a valid Twitter URL').optional().or(z.literal('')),
      linkedin: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
      github: z.string().url('Please enter a valid GitHub URL').optional().or(z.literal(''))
    }).optional()
  }),
  
  settings: z.object({
    twoFactorEnabled: z.boolean().default(false),
    emailNotifications: z.boolean().default(true),
    pushNotifications: z.boolean().default(true),
    darkMode: z.boolean().default(false),
    language: z.string().default('en'),
    sessionTimeout: z.number().default(8)
  }).optional(),
  
  sendWelcomeEmail: z.boolean().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const userUpdateSchema = userSchema.partial().omit({ 
  password: true, 
  confirmPassword: true 
});

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password cannot exceed 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Content validation schemas
export const contentSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title cannot exceed 200 characters'),
  
  slug: z.string()
    .min(1, 'Slug is required')
    .max(200, 'Slug cannot exceed 200 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  
  content: z.string()
    .min(1, 'Content is required')
    .max(50000, 'Content cannot exceed 50,000 characters'),
  
  excerpt: z.string()
    .max(500, 'Excerpt cannot exceed 500 characters')
    .optional(),
  
  status: z.enum(['draft', 'published', 'archived', 'scheduled'], {
    errorMap: () => ({ message: 'Please select a valid status' })
  }),
  
  type: z.enum(['post', 'page', 'product', 'event'], {
    errorMap: () => ({ message: 'Please select a valid content type' })
  }),
  
  publishedAt: z.date().optional(),
  
  featuredImage: z.string().url('Please enter a valid image URL').optional().or(z.literal('')),
  
  tags: z.array(z.string().min(1).max(50)).max(20, 'Cannot have more than 20 tags'),
  
  categories: z.array(z.string().min(1)).min(1, 'At least one category is required'),
  
  seo: z.object({
    metaTitle: z.string()
      .max(60, 'Meta title cannot exceed 60 characters')
      .optional(),
    
    metaDescription: z.string()
      .max(160, 'Meta description cannot exceed 160 characters')
      .optional(),
    
    keywords: z.array(z.string()).max(10, 'Cannot have more than 10 keywords').optional(),
    
    canonicalUrl: z.string().url('Please enter a valid URL').optional().or(z.literal(''))
  }).optional(),
  
  settings: z.object({
    allowComments: z.boolean().default(true),
    featured: z.boolean().default(false),
    requireAuth: z.boolean().default(false),
    showAuthor: z.boolean().default(true),
    showDate: z.boolean().default(true)
  }).optional()
});

// Media validation schemas
export const mediaUploadSchema = z.object({
  files: z.array(z.instanceof(File))
    .min(1, 'At least one file is required')
    .max(10, 'Cannot upload more than 10 files at once'),
  
  alt: z.string()
    .max(200, 'Alt text cannot exceed 200 characters')
    .optional(),
  
  title: z.string()
    .max(200, 'Title cannot exceed 200 characters')
    .optional(),
  
  description: z.string()
    .max(1000, 'Description cannot exceed 1000 characters')
    .optional(),
  
  tags: z.array(z.string()).max(20, 'Cannot have more than 20 tags').optional(),
  
  folder: z.string()
    .max(100, 'Folder name cannot exceed 100 characters')
    .optional()
});

export const mediaUpdateSchema = z.object({
  alt: z.string()
    .max(200, 'Alt text cannot exceed 200 characters')
    .optional(),
  
  title: z.string()
    .max(200, 'Title cannot exceed 200 characters')
    .optional(),
  
  description: z.string()
    .max(1000, 'Description cannot exceed 1000 characters')
    .optional(),
  
  tags: z.array(z.string()).max(20, 'Cannot have more than 20 tags').optional()
});

// Settings validation schemas
export const settingsSchema = z.object({
  siteName: z.string()
    .min(1, 'Site name is required')
    .max(100, 'Site name cannot exceed 100 characters'),
  
  siteDescription: z.string()
    .max(500, 'Site description cannot exceed 500 characters')
    .optional(),
  
  siteUrl: z.string()
    .url('Please enter a valid URL'),
  
  timezone: z.string()
    .min(1, 'Timezone is required'),
  
  language: z.string()
    .min(1, 'Language is required'),
  
  dateFormat: z.string()
    .min(1, 'Date format is required'),
  
  maintenanceMode: z.boolean().default(false),
  
  maintenanceMessage: z.string()
    .max(500, 'Maintenance message cannot exceed 500 characters')
    .optional(),
  
  emailSettings: z.object({
    smtpHost: z.string().min(1, 'SMTP host is required'),
    smtpPort: z.number().int().min(1).max(65535, 'Port must be between 1 and 65535'),
    smtpUser: z.string().email('Please enter a valid email'),
    smtpPassword: z.string().min(1, 'SMTP password is required'),
    fromEmail: z.string().email('Please enter a valid email'),
    fromName: z.string().min(1, 'From name is required')
  }).optional(),
  
  securitySettings: z.object({
    passwordMinLength: z.number()
      .int('Password length must be a whole number')
      .min(6, 'Minimum password length cannot be less than 6')
      .max(128, 'Maximum password length cannot exceed 128'),
    
    sessionTimeout: z.number()
      .int('Session timeout must be a whole number')
      .min(15, 'Session timeout cannot be less than 15 minutes')
      .max(1440, 'Session timeout cannot exceed 24 hours'),
    
    maxLoginAttempts: z.number()
      .int('Max login attempts must be a whole number')
      .min(3, 'Max login attempts cannot be less than 3')
      .max(10, 'Max login attempts cannot exceed 10'),
    
    lockoutDuration: z.number()
      .int('Lockout duration must be a whole number')
      .min(5, 'Lockout duration cannot be less than 5 minutes')
      .max(1440, 'Lockout duration cannot exceed 24 hours'),
    
    twoFactorRequired: z.boolean().default(false),
    
    allowedIPs: z.array(
      z.string().regex(/^(\d{1,3}\.){3}\d{1,3}$/, 'Please enter a valid IP address')
    ).optional()
  }).optional()
});

// Authentication validation schemas
export const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
  
  password: z.string()
    .min(1, 'Password is required'),
  
  rememberMe: z.boolean().default(false),
  
  twoFactorCode: z.string()
    .regex(/^\d{6}$/, 'Two-factor code must be 6 digits')
    .optional()
});

export const forgotPasswordSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password cannot exceed 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Integration validation schemas
export const integrationSchema = z.object({
  name: z.string()
    .min(1, 'Integration name is required')
    .max(100, 'Name cannot exceed 100 characters'),
  
  type: z.enum(['api', 'webhook', 'oauth', 'database', 'email', 'storage', 'analytics']),
  
  enabled: z.boolean().default(false),
  
  config: z.record(z.any()),
  
  webhookUrl: z.string()
    .url('Please enter a valid webhook URL')
    .optional()
    .or(z.literal('')),
  
  apiKey: z.string()
    .min(1, 'API key is required for this integration type')
    .optional(),
  
  secretKey: z.string()
    .min(1, 'Secret key is required for this integration type')
    .optional()
});

// Backup validation schemas
export const backupSchema = z.object({
  name: z.string()
    .min(1, 'Backup name is required')
    .max(100, 'Name cannot exceed 100 characters'),
  
  type: z.enum(['full', 'incremental', 'database', 'files']),
  
  schedule: z.string()
    .regex(/^(\*|[0-9,\-\/\*]+)\s+(\*|[0-9,\-\/\*]+)\s+(\*|[0-9,\-\/\*]+)\s+(\*|[0-9,\-\/\*]+)\s+(\*|[0-9,\-\/\*]+)$/, 
      'Please enter a valid cron expression')
    .optional(),
  
  enabled: z.boolean().default(false),
  
  retention: z.number()
    .int('Retention days must be a whole number')
    .min(1, 'Retention must be at least 1 day')
    .max(365, 'Retention cannot exceed 365 days'),
  
  compression: z.boolean().default(false),
  
  encryption: z.boolean().default(false),
  
  destination: z.enum(['local', 'cloud']),
  
  cloudConfig: z.object({
    provider: z.string().min(1, 'Cloud provider is required'),
    bucket: z.string().min(1, 'Bucket name is required'),
    region: z.string().optional(),
    accessKey: z.string().min(1, 'Access key is required'),
    secretKey: z.string().min(1, 'Secret key is required')
  }).optional()
});

// Type exports for TypeScript
export type UserFormData = z.infer<typeof userSchema>;
export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;
export type ContentFormData = z.infer<typeof contentSchema>;
export type MediaUploadFormData = z.infer<typeof mediaUploadSchema>;
export type MediaUpdateFormData = z.infer<typeof mediaUpdateSchema>;
export type SettingsFormData = z.infer<typeof settingsSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type IntegrationFormData = z.infer<typeof integrationSchema>;
export type BackupFormData = z.infer<typeof backupSchema>;

// Schema validation helper
export const validateSchema = <T>(schema: z.ZodSchema<T>, data: unknown): { 
  success: boolean; 
  data?: T; 
  errors?: z.ZodError 
} => {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
};

// Format validation errors for display
export const formatValidationErrors = (errors: z.ZodError): Record<string, string> => {
  const formattedErrors: Record<string, string> = {};
  
  errors.errors.forEach((error) => {
    const path = error.path.join('.');
    formattedErrors[path] = error.message;
  });
  
  return formattedErrors;
};