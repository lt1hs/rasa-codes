import { useState, useEffect, useCallback } from 'react';
import { apiService, ApiResponse, RequestConfig } from '../services/api.service';

// API hook state interface
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  isError: boolean;
}

// Query options
export interface QueryOptions {
  enabled?: boolean;
  refetchOnMount?: boolean;
}

// Mutation options
export interface MutationOptions<TData, TError, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
}

// Generic API hook
export function useApi<T>(
  endpoint: string,
  options: QueryOptions & RequestConfig = {}
): ApiState<T> & {
  refetch: () => Promise<void>;
} {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
    isSuccess: false,
    isError: false
  });

  const {
    enabled = true,
    refetchOnMount = true,
    ...requestConfig
  } = options;

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiService.get<T>(endpoint, undefined, {
        ...requestConfig,
        showErrorMessage: false
      });

      if (response.success && response.data) {
        setState({
          data: response.data,
          loading: false,
          error: null,
          isSuccess: true,
          isError: false
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: response.error?.message || 'Request failed',
          isSuccess: false,
          isError: true
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        isSuccess: false,
        isError: true
      });
    }
  }, [endpoint, enabled, requestConfig]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Initial fetch
  useEffect(() => {
    if (enabled && refetchOnMount) {
      fetchData();
    }
  }, [fetchData, enabled, refetchOnMount]);

  return {
    ...state,
    refetch
  };
}

// Mutation hook
export function useMutation<TData = any, TError = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options: MutationOptions<TData, TError, TVariables> = {}
) {
  const [state, setState] = useState<{
    data: TData | null;
    error: TError | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  }>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false
  });

  const mutate = useCallback(async (variables: TVariables) => {
    setState({
      data: null,
      error: null,
      isLoading: true,
      isSuccess: false,
      isError: false
    });

    try {
      const response = await mutationFn(variables);

      if (response.success && response.data) {
        setState({
          data: response.data,
          error: null,
          isLoading: false,
          isSuccess: true,
          isError: false
        });

        options.onSuccess?.(response.data, variables);
      } else {
        const error = response.error?.message || 'Mutation failed';
        setState({
          data: null,
          error: error as TError,
          isLoading: false,
          isSuccess: false,
          isError: true
        });

        options.onError?.(error as TError, variables);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState({
        data: null,
        error: errorMessage as TError,
        isLoading: false,
        isSuccess: false,
        isError: true
      });

      options.onError?.(errorMessage as TError, variables);
    }
  }, [mutationFn, options]);

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false
    });
  }, []);

  return {
    ...state,
    mutate,
    reset
  };
}

// GET request hook
export function useQuery<T>(endpoint: string, options?: QueryOptions & RequestConfig) {
  return useApi<T>(endpoint, options);
}

// POST mutation hook
export function useCreateMutation<TData = any, TVariables = any>(
  endpoint: string,
  options?: MutationOptions<TData, any, TVariables> & RequestConfig
) {
  const { onSuccess, onError, ...requestConfig } = options || {};
  
  return useMutation<TData, any, TVariables>(
    (variables: TVariables) => apiService.post<TData>(endpoint, variables, requestConfig),
    { onSuccess, onError }
  );
}

// PUT mutation hook
export function useUpdateMutation<TData = any, TVariables = any>(
  endpoint: string,
  options?: MutationOptions<TData, any, TVariables> & RequestConfig
) {
  const { onSuccess, onError, ...requestConfig } = options || {};
  
  return useMutation<TData, any, TVariables>(
    (variables: TVariables) => apiService.put<TData>(endpoint, variables, requestConfig),
    { onSuccess, onError }
  );
}

// DELETE mutation hook
export function useDeleteMutation<TData = any, TVariables = any>(
  endpointFn: (variables: TVariables) => string,
  options?: MutationOptions<TData, any, TVariables> & RequestConfig
) {
  const { onSuccess, onError, ...requestConfig } = options || {};
  
  return useMutation<TData, any, TVariables>(
    (variables: TVariables) => apiService.delete<TData>(endpointFn(variables), requestConfig),
    { onSuccess, onError }
  );
}

// Upload hook
export function useUploadMutation<TData = any, TVariables = any>(
  endpoint: string,
  options?: MutationOptions<TData, any, TVariables> & {
    onProgress?: (progress: number) => void;
  }
) {
  const { onSuccess, onError, onProgress, ...requestConfig } = options || {};
  
  return useMutation<TData, any, TVariables>(
    (variables: TVariables) => {
      const file = variables as any;
      return apiService.upload<TData>(endpoint, file, {
        onProgress,
        config: requestConfig
      });
    },
    { onSuccess, onError }
  );
}

// Paginated query hook
export function usePaginatedQuery<T>(
  endpoint: string,
  page: number = 1,
  pageSize: number = 10,
  filters?: Record<string, any>,
  options?: QueryOptions & RequestConfig
) {
  const params = {
    page: page.toString(),
    pageSize: pageSize.toString(),
    ...Object.fromEntries(
      Object.entries(filters || {}).map(([key, value]) => [key, String(value)])
    )
  };

  return useApi<{
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }>(`${endpoint}?${new URLSearchParams(params).toString()}`, options);
}