import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { usePerformance } from '../../admin/hooks/usePerformance';
import { errorTrackingService } from '../../admin/services/errorTracking.service.tsx';

// Mock React hooks
const mockUseState = vi.fn();
const mockUseEffect = vi.fn();
const mockUseCallback = vi.fn();
const mockUseRef = vi.fn();
const mockUseLocation = vi.fn();

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useState: mockUseState,
    useEffect: mockUseEffect,
    useCallback: mockUseCallback,
    useRef: mockUseRef,
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: mockUseLocation,
  };
});

describe('Performance Monitoring', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock useState to return default values
    mockUseState.mockImplementation((initialValue) => [initialValue, vi.fn()]);
    
    // Mock useEffect to call the callback immediately
    mockUseEffect.mockImplementation((callback) => {
      callback();
    });
    
    // Mock useCallback to return the function as-is
    mockUseCallback.mockImplementation((fn) => fn);
    
    // Mock useRef to return an object with current property
    mockUseRef.mockImplementation((initialValue) => ({ current: initialValue }));
    
    // Mock useLocation
    mockUseLocation.mockReturnValue({
      pathname: '/admin/dashboard',
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Performance Hook', () => {
    it('should provide performance measurement functions', () => {
      const {
        measureOperation,
        getMetrics,
        getMemoryUsage,
        exportPerformanceData,
        clearPerformanceData,
        measureWebVitals
      } = usePerformance();
      
      expect(typeof measureOperation).toBe('function');
      expect(typeof getMetrics).toBe('function');
      expect(typeof getMemoryUsage).toBe('function');
      expect(typeof exportPerformanceData).toBe('function');
      expect(typeof clearPerformanceData).toBe('function');
      expect(typeof measureWebVitals).toBe('function');
    });

    it('should measure operations', () => {
      const { measureOperation } = usePerformance();
      
      const operation = vi.fn().mockReturnValue('result');
      const result = measureOperation(operation, 'test-operation');
      
      expect(operation).toHaveBeenCalled();
      expect(result).toBe('result');
    });

    it('should export performance data', () => {
      const { exportPerformanceData } = usePerformance();
      const data = exportPerformanceData();
      expect(typeof data).toBe('string');
    });
  });

  describe('Error Tracking Service', () => {
    it('should capture errors', () => {
      const errorId = errorTrackingService.captureError({
        message: 'Test error',
        type: 'error',
      });
      
      expect(errorId).toBeDefined();
      expect(typeof errorId).toBe('string');
    });

    it('should capture performance metrics', () => {
      const metricId = errorTrackingService.capturePerformanceMetric(
        'test-metric',
        100,
        { test: 'data' }
      );
      
      expect(metricId).toBeDefined();
      expect(typeof metricId).toBe('string');
    });

    it('should capture user activities', () => {
      const activityId = errorTrackingService.captureUserActivity(
        'click',
        'test-button',
        { test: 'data' }
      );
      
      expect(activityId).toBeDefined();
      expect(typeof activityId).toBe('string');
    });

    it('should get error reports', () => {
      errorTrackingService.captureError({
        message: 'Test error',
        type: 'error',
      });
      
      const reports = errorTrackingService.getErrorReports();
      expect(reports.length).toBeGreaterThan(0);
    });

    it('should get performance metrics', () => {
      errorTrackingService.capturePerformanceMetric('test-metric', 100);
      
      const metrics = errorTrackingService.getPerformanceMetrics();
      expect(metrics.length).toBeGreaterThan(0);
    });

    it('should get user activities', () => {
      errorTrackingService.captureUserActivity('click', 'test-button');
      
      const activities = errorTrackingService.getUserActivities();
      expect(activities.length).toBeGreaterThan(0);
    });

    it('should get summary', () => {
      const summary = errorTrackingService.getSummary();
      expect(summary).toBeDefined();
      expect(typeof summary.totalErrors).toBe('number');
    });
  });
});