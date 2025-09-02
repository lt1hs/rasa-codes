import { message } from 'antd';

// API Error types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  statusCode: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Request configuration
export interface RequestConfig {
  timeout?: number;
  retries?: number;
  showErrorMessage?: boolean;
  showSuccessMessage?: boolean;
  successMessage?: string;
}

// Default configuration
const DEFAULT_CONFIG: RequestConfig = {
  timeout: 30000,
  retries: 3,
  showErrorMessage: true,
  showSuccessMessage: false
};

class ApiService {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = import.meta.env.VITE_API_URL || '/api') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
  }

  // Build full URL
  private buildURL(endpoint: string): string {
    if (endpoint.startsWith('http')) {
      return endpoint;
    }
    return `${this.baseURL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  }

  // Make HTTP request
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    const url = this.buildURL(endpoint);
    
    // Add authorization header
    const token = localStorage.getItem('auth_token');
    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` })
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      // Handle unauthorized
      if (response.status === 401) {
        localStorage.removeItem('auth_token');
        window.location.href = '/admin/login';
        throw new Error('Unauthorized access. Please login again.');
      }

      // Parse response
      const contentType = response.headers.get('content-type');
      
      if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;
        let errorDetails: any = null;

        try {
          if (contentType?.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
            errorDetails = errorData;
          } else {
            errorMessage = await response.text();
          }
        } catch (e) {
          // Use default error message if parsing fails
        }

        const apiError: ApiError = {
          code: `HTTP_${response.status}`,
          message: errorMessage,
          details: errorDetails,
          statusCode: response.status
        };

        if (finalConfig.showErrorMessage) {
          message.error(apiError.message);
        }

        return {
          success: false,
          error: apiError
        };
      }

      // Parse successful response
      if (contentType?.includes('application/json')) {
        const data = await response.json();
        
        if (finalConfig.showSuccessMessage && finalConfig.successMessage) {
          message.success(finalConfig.successMessage);
        }

        return {
          success: true,
          data: data.data || data,
          pagination: data.pagination
        };
      } else {
        const text = await response.text();
        return {
          success: true,
          data: text as any
        };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Request failed';
      
      if (finalConfig.showErrorMessage) {
        message.error(errorMessage);
      }
      
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: errorMessage,
          statusCode: 0
        }
      };
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, params?: Record<string, any>, config?: RequestConfig): Promise<ApiResponse<T>> {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }

    return this.makeRequest<T>(url, { method: 'GET' }, config);
  }

  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    const headers = data instanceof FormData ? {} : { 'Content-Type': 'application/json' };

    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body,
      headers
    }, config);
  }

  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    const headers = data instanceof FormData ? {} : { 'Content-Type': 'application/json' };

    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body,
      headers
    }, config);
  }

  async patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    const headers = data instanceof FormData ? {} : { 'Content-Type': 'application/json' };

    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body,
      headers
    }, config);
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' }, config);
  }

  // File upload
  async upload<T>(
    endpoint: string,
    file: File | FormData,
    options?: {
      onProgress?: (progress: number) => void;
      config?: RequestConfig;
    }
  ): Promise<ApiResponse<T>> {
    const formData = file instanceof FormData ? file : new FormData();
    if (file instanceof File) {
      formData.append('file', file);
    }

    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      const url = this.buildURL(endpoint);

      // Set headers
      const token = localStorage.getItem('auth_token');
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      // Progress tracking
      if (options?.onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            options.onProgress!(progress);
          }
        });
      }

      // Response handling
      xhr.addEventListener('load', () => {
        try {
          const response = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({
              success: true,
              data: response.data || response
            });
          } else {
            resolve({
              success: false,
              error: {
                code: `HTTP_${xhr.status}`,
                message: response.message || 'Upload failed',
                statusCode: xhr.status
              }
            });
          }
        } catch (error) {
          resolve({
            success: false,
            error: {
              code: 'PARSE_ERROR',
              message: 'Failed to parse upload response',
              statusCode: xhr.status
            }
          });
        }
      });

      xhr.addEventListener('error', () => {
        resolve({
          success: false,
          error: {
            code: 'NETWORK_ERROR',
            message: 'Upload failed',
            statusCode: 0
          }
        });
      });

      xhr.open('POST', url);
      xhr.send(formData);
    });
  }
}

// Create and export singleton instance
export const apiService = new ApiService();

// Response helper functions
export const isApiSuccess = <T>(response: ApiResponse<T>): response is ApiResponse<T> & { success: true; data: T } => {
  return response.success && !!response.data;
};

export const getApiError = <T>(response: ApiResponse<T>): ApiError | null => {
  return response.error || null;
};

export default apiService;