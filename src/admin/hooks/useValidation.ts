import { useForm, UseFormProps, UseFormReturn, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useCallback } from 'react';
import { message } from 'antd';

// Generic form validation hook
export function useValidatedForm<T extends FieldValues = FieldValues>(
  schema: z.ZodSchema<T>,
  options?: UseFormProps<T>
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<T>({
    resolver: zodResolver(schema) as any,
    mode: 'onChange',
    reValidateMode: 'onChange',
    ...options
  });

  const submitWithValidation = useCallback(
    (onSubmit: (data: T) => Promise<void> | void) => 
      async (data: T) => {
        setIsSubmitting(true);
        try {
          await onSubmit(data);
        } catch (error) {
          console.error('Form submission error:', error);
          message.error(error instanceof Error ? error.message : 'An error occurred');
        } finally {
          setIsSubmitting(false);
        }
      },
    []
  );

  return {
    ...form,
    submitWithValidation,
    isSubmitting
  };
}

// Form validation utilities
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateFormData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult {
  try {
    schema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach(issue => {
        const path = issue.path.join('.');
        errors[path] = issue.message;
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
}

// Custom validation messages
export const customErrorMessages = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidUrl: 'Please enter a valid URL',
  passwordMismatch: "Passwords don't match",
  weakPassword: 'Password is too weak',
  invalidPhone: 'Please enter a valid phone number',
  invalidDate: 'Please enter a valid date',
  fileTooLarge: 'File size is too large',
  invalidFileType: 'File type is not supported',
  tooManyFiles: 'Too many files selected',
  invalidCron: 'Please enter a valid cron expression',
  invalidIP: 'Please enter a valid IP address'
};

// Form field validators
export const fieldValidators = {
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || customErrorMessages.invalidEmail;
  },
  
  url: (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return customErrorMessages.invalidUrl;
    }
  },
  
  phone: (value: string) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(value) || customErrorMessages.invalidPhone;
  },
  
  strongPassword: (value: string) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    return strongPasswordRegex.test(value) || customErrorMessages.weakPassword;
  },
  
  cron: (value: string) => {
    const cronRegex = /^(\*|[0-9,\-\/\*]+)\s+(\*|[0-9,\-\/\*]+)\s+(\*|[0-9,\-\/\*]+)\s+(\*|[0-9,\-\/\*]+)\s+(\*|[0-9,\-\/\*]+)$/;
    return cronRegex.test(value) || customErrorMessages.invalidCron;
  },
  
  ip: (value: string) => {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipRegex.test(value) || customErrorMessages.invalidIP;
  }
};

// File validation utilities
export interface FileValidationOptions {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  maxFiles?: number;
}

export function validateFiles(
  files: File[],
  options: FileValidationOptions = {}
): { isValid: boolean; errors: string[] } {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxFiles = 10
  } = options;

  const errors: string[] = [];

  // Check file count
  if (files.length > maxFiles) {
    errors.push(`Cannot upload more than ${maxFiles} files at once`);
  }

  // Check each file
  files.forEach((file, index) => {
    // Check file size
    if (file.size > maxSize) {
      errors.push(
        `File ${index + 1} (${file.name}) is too large. Maximum size is ${
          maxSize / (1024 * 1024)
        }MB`
      );
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      errors.push(
        `File ${index + 1} (${file.name}) has an unsupported format. Allowed types: ${
          allowedTypes.join(', ')
        }`
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Async validation for unique values
export async function validateUnique(
  value: string,
  endpoint: string,
  excludeId?: string
): Promise<boolean> {
  try {
    const response = await fetch(`${endpoint}?value=${encodeURIComponent(value)}&exclude=${excludeId || ''}`);
    const result = await response.json();
    return result.isUnique;
  } catch (error) {
    console.error('Unique validation error:', error);
    return true; // Assume valid if check fails
  }
}