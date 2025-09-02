import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { z } from 'zod';
import { 
  useValidatedForm, 
  validateFormData, 
  fieldValidators, 
  validateFiles,
  validateUnique 
} from '../admin/hooks/useValidation';

// Mock antd message
vi.mock('antd', () => ({
  message: {
    error: vi.fn(),
  },
}));

describe('useValidatedForm', () => {
  const testSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(1, 'Name is required'),
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => 
      useValidatedForm(testSchema, {
        defaultValues: {
          email: 'test@example.com',
          password: '',
          name: 'John Doe',
        },
      })
    );

    expect(result.current.getValues()).toEqual({
      email: 'test@example.com',
      password: '',
      name: 'John Doe',
    });
  });

  it('should validate form data correctly', () => {
    const { result } = renderHook(() => useValidatedForm(testSchema));

    // Set valid data
    result.current.setValue('email', 'valid@example.com');
    result.current.setValue('password', 'password123');
    result.current.setValue('name', 'John Doe');

    // Should be valid
    expect(result.current.formState.isValid).toBe(true);
  });

  it('should handle validation errors', () => {
    const { result } = renderHook(() => useValidatedForm(testSchema));

    // Set invalid data
    result.current.setValue('email', 'invalid-email');
    result.current.setValue('password', '123'); // too short
    result.current.setValue('name', ''); // empty

    // Should have errors
    expect(result.current.formState.errors.email).toBeDefined();
    expect(result.current.formState.errors.password).toBeDefined();
    expect(result.current.formState.errors.name).toBeDefined();
  });

  it('should handle form submission with validation', async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useValidatedForm(testSchema));

    // Set valid data
    result.current.setValue('email', 'test@example.com');
    result.current.setValue('password', 'password123');
    result.current.setValue('name', 'John Doe');

    const submitHandler = result.current.submitWithValidation(onSubmit);
    
    await submitHandler({
      email: 'test@example.com',
      password: 'password123',
      name: 'John Doe',
    });

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      name: 'John Doe',
    });
  });

  it('should handle submission errors', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('Submission failed'));
    const { result } = renderHook(() => useValidatedForm(testSchema));

    const submitHandler = result.current.submitWithValidation(onSubmit);
    
    await submitHandler({
      email: 'test@example.com',
      password: 'password123',
      name: 'John Doe',
    });

    expect(result.current.isSubmitting).toBe(false);
  });

  it('should track submitting state', async () => {
    const onSubmit = vi.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );
    const { result } = renderHook(() => useValidatedForm(testSchema));

    const submitHandler = result.current.submitWithValidation(onSubmit);
    
    const submitPromise = submitHandler({
      email: 'test@example.com',
      password: 'password123',
      name: 'John Doe',
    });

    expect(result.current.isSubmitting).toBe(true);
    
    await submitPromise;
    
    await waitFor(() => {
      expect(result.current.isSubmitting).toBe(false);
    });
  });
});

describe('validateFormData', () => {
  const schema = z.object({
    email: z.string().email(),
    age: z.number().min(0),
  });

  it('should return valid result for correct data', () => {
    const result = validateFormData(schema, {
      email: 'test@example.com',
      age: 25,
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('should return invalid result with errors for incorrect data', () => {
    const result = validateFormData(schema, {
      email: 'invalid-email',
      age: -5,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBeDefined();
    expect(result.errors.age).toBeDefined();
  });

  it('should handle non-zod errors', () => {
    const invalidSchema = null as any;
    const result = validateFormData(invalidSchema, {});

    expect(result.isValid).toBe(false);
    expect(result.errors.general).toBe('Validation failed');
  });
});

describe('fieldValidators', () => {
  describe('email validator', () => {
    it('should validate correct email', () => {
      expect(fieldValidators.email('test@example.com')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(fieldValidators.email('invalid-email')).toBe('Please enter a valid email address');
    });
  });

  describe('url validator', () => {
    it('should validate correct URL', () => {
      expect(fieldValidators.url('https://example.com')).toBe(true);
    });

    it('should reject invalid URL', () => {
      expect(fieldValidators.url('invalid-url')).toBe('Please enter a valid URL');
    });
  });

  describe('phone validator', () => {
    it('should validate correct phone', () => {
      expect(fieldValidators.phone('+1234567890')).toBe(true);
      expect(fieldValidators.phone('123-456-7890')).toBe(true);
    });

    it('should reject invalid phone', () => {
      expect(fieldValidators.phone('abc')).toBe('Please enter a valid phone number');
    });
  });

  describe('strongPassword validator', () => {
    it('should validate strong password', () => {
      expect(fieldValidators.strongPassword('StrongPass123!')).toBe(true);
    });

    it('should reject weak password', () => {
      expect(fieldValidators.strongPassword('weak')).toBe('Password is too weak');
    });
  });

  describe('cron validator', () => {
    it('should validate correct cron expression', () => {
      expect(fieldValidators.cron('0 0 * * *')).toBe(true);
      expect(fieldValidators.cron('*/15 * * * *')).toBe(true);
    });

    it('should reject invalid cron expression', () => {
      expect(fieldValidators.cron('invalid')).toBe('Please enter a valid cron expression');
    });
  });

  describe('ip validator', () => {
    it('should validate correct IP address', () => {
      expect(fieldValidators.ip('192.168.1.1')).toBe(true);
      expect(fieldValidators.ip('0.0.0.0')).toBe(true);
    });

    it('should reject invalid IP address', () => {
      expect(fieldValidators.ip('256.256.256.256')).toBe('Please enter a valid IP address');
      expect(fieldValidators.ip('invalid')).toBe('Please enter a valid IP address');
    });
  });
});

describe('validateFiles', () => {
  const createMockFile = (name: string, size: number, type: string): File => {
    return new File(['content'], name, { type });
  };

  it('should validate files within limits', () => {
    const files = [
      createMockFile('image1.jpg', 1024 * 1024, 'image/jpeg'), // 1MB
      createMockFile('image2.png', 2 * 1024 * 1024, 'image/png'), // 2MB
    ];

    const result = validateFiles(files, {
      maxSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ['image/jpeg', 'image/png'],
      maxFiles: 5,
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('should reject files exceeding size limit', () => {
    const files = [
      createMockFile('large.jpg', 10 * 1024 * 1024, 'image/jpeg'), // 10MB
    ];

    const result = validateFiles(files, {
      maxSize: 5 * 1024 * 1024, // 5MB
    });

    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toContain('too large');
  });

  it('should reject files with invalid types', () => {
    const files = [
      createMockFile('document.pdf', 1024, 'application/pdf'),
    ];

    const result = validateFiles(files, {
      allowedTypes: ['image/jpeg', 'image/png'],
    });

    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toContain('unsupported format');
  });

  it('should reject too many files', () => {
    const files = Array.from({ length: 15 }, (_, i) => 
      createMockFile(`image${i}.jpg`, 1024, 'image/jpeg')
    );

    const result = validateFiles(files, {
      maxFiles: 10,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toContain('Cannot upload more than 10 files');
  });

  it('should use default options when none provided', () => {
    const files = [
      createMockFile('image.jpg', 1024, 'image/jpeg'),
    ];

    const result = validateFiles(files);

    expect(result.isValid).toBe(true);
  });
});

describe('validateUnique', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return true for unique values', async () => {
    (global.fetch as any).mockResolvedValue({
      json: () => Promise.resolve({ isUnique: true }),
    });

    const result = await validateUnique('unique-value', '/api/check-unique');
    
    expect(result).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith('/api/check-unique?value=unique-value&exclude=');
  });

  it('should return false for non-unique values', async () => {
    (global.fetch as any).mockResolvedValue({
      json: () => Promise.resolve({ isUnique: false }),
    });

    const result = await validateUnique('duplicate-value', '/api/check-unique');
    
    expect(result).toBe(false);
  });

  it('should handle API errors gracefully', async () => {
    (global.fetch as any).mockRejectedValue(new Error('Network error'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const result = await validateUnique('value', '/api/check-unique');
    
    expect(result).toBe(true); // Assume valid if check fails
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('should include excludeId in request', async () => {
    (global.fetch as any).mockResolvedValue({
      json: () => Promise.resolve({ isUnique: true }),
    });

    await validateUnique('value', '/api/check-unique', 'exclude-id');
    
    expect(global.fetch).toHaveBeenCalledWith('/api/check-unique?value=value&exclude=exclude-id');
  });
});