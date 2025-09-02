import React from 'react';

// Add process type definition
declare const process: {
  env: {
    NODE_ENV: string;
  };
};

/**
 * Error Tracking and Monitoring Service
 * Provides comprehensive error tracking, performance monitoring, and analytics
 */

interface ErrorReport {
  id: string;
  timestamp: number;
  type: 'error' | 'warning' | 'info';
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  userAgent: string;
  userId?: string;
  sessionId: string;
  metadata?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface PerformanceMetric {
  id: string;
  timestamp: number;
  metric: string;
  value: number;
  url: string;
  userId?: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

interface UserActivity {
  id: string;
  timestamp: number;
  action: string;
  component: string;
  url: string;
  userId?: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

class ErrorTrackingService {
  private static instance: ErrorTrackingService;
  private errorReports: ErrorReport[] = [];
  private performanceMetrics: PerformanceMetric[] = [];
  private userActivities: UserActivity[] = [];
  private sessionId: string;
  private userId: string | null = null;
  private isEnabled: boolean = true;
  private maxReports: number = 100;
  private maxMetrics: number = 1000;
  private maxActivities: number = 1000;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeErrorTracking();
  }

  public static getInstance(): ErrorTrackingService {
    if (!ErrorTrackingService.instance) {
      ErrorTrackingService.instance = new ErrorTrackingService();
    }
    return ErrorTrackingService.instance;
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private initializeErrorTracking() {
    // Capture unhandled errors
    window.addEventListener('error', (event: ErrorEvent) => {
      this.captureError({
        type: 'error',
        message: event.message,
        stack: event.error?.stack,
        metadata: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      });
    });

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      this.captureError({
        type: 'error',
        message: event.reason?.message || event.reason?.toString() || 'Unhandled promise rejection',
        stack: event.reason?.stack,
        metadata: {
          promise: event.promise
        }
      });
    });

    // Capture console errors
    const originalError = console.error;
    console.error = (...args: any[]) => {
      this.captureConsoleError('error', args);
      originalError.apply(console, args);
    };

    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      this.captureConsoleError('warning', args);
      originalWarn.apply(console, args);
    };
  }

  private captureConsoleError(type: 'error' | 'warning', args: any[]) {
    if (!this.isEnabled) return;

    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');

    this.captureError({
      type,
      message,
      timestamp: Date.now()
    });
  }

  public captureError(error: Partial<ErrorReport> & { message: string, type?: 'error' | 'warning' | 'info' }) {
    if (!this.isEnabled) return;

    const errorReport: ErrorReport = {
      id: 'err_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      timestamp: error.timestamp || Date.now(),
      type: error.type || 'error',
      message: error.message,
      stack: error.stack,
      componentStack: (error as any).componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId: this.userId || undefined,
      sessionId: this.sessionId,
      metadata: error.metadata,
      severity: error.severity || this.determineSeverity(error.message, error.type)
    };

    // Add to reports array
    this.errorReports.push(errorReport);

    // Trim array if too large
    if (this.errorReports.length > this.maxReports) {
      this.errorReports.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Error captured:', errorReport);
    }

    // Send to external service if configured
    this.sendToExternalService(errorReport);

    return errorReport.id;
  }

  private determineSeverity(message: string, type?: string): ErrorReport['severity'] {
    const criticalKeywords = ['security', 'authentication', 'authorization', 'permission'];
    const highKeywords = ['database', 'network', 'api', 'connection', 'timeout'];
    const mediumKeywords = ['validation', 'form', 'input', 'field'];

    const lowerMessage = message.toLowerCase();

    if (criticalKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'critical';
    }

    if (highKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'high';
    }

    if (mediumKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'medium';
    }

    if (type === 'error') {
      return 'high';
    }

    if (type === 'warning') {
      return 'medium';
    }

    return 'low';
  }

  public capturePerformanceMetric(metric: string, value: number, metadata?: Record<string, any>) {
    if (!this.isEnabled) return;

    const performanceMetric: PerformanceMetric = {
      id: 'perf_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      metric,
      value,
      url: window.location.href,
      userId: this.userId || undefined,
      sessionId: this.sessionId,
      metadata
    };

    // Add to metrics array
    this.performanceMetrics.push(performanceMetric);

    // Trim array if too large
    if (this.performanceMetrics.length > this.maxMetrics) {
      this.performanceMetrics.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance metric captured:', performanceMetric);
    }

    return performanceMetric.id;
  }

  public captureUserActivity(action: string, component: string, metadata?: Record<string, any>) {
    if (!this.isEnabled) return;

    const userActivity: UserActivity = {
      id: 'act_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      action,
      component,
      url: window.location.href,
      userId: this.userId || undefined,
      sessionId: this.sessionId,
      metadata
    };

    // Add to activities array
    this.userActivities.push(userActivity);

    // Trim array if too large
    if (this.userActivities.length > this.maxActivities) {
      this.userActivities.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('User activity captured:', userActivity);
    }

    return userActivity.id;
  }

  private sendToExternalService(report: ErrorReport | PerformanceMetric | UserActivity) {
    // In a real implementation, this would send data to an external service
    // like Sentry, LogRocket, or a custom analytics backend
    
    // Example implementation:
    /*
    fetch('/api/error-tracking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    }).catch(err => {
      // If we can't send the error, log it to console
      console.error('Failed to send error report:', err);
    });
    */
  }

  public setUserId(userId: string) {
    this.userId = userId;
  }

  public clearUserId() {
    this.userId = null;
  }

  public enable() {
    this.isEnabled = true;
  }

  public disable() {
    this.isEnabled = false;
  }

  public getErrorReports(options?: {
    type?: 'error' | 'warning' | 'info';
    severity?: ErrorReport['severity'];
    limit?: number;
  }): ErrorReport[] {
    let reports = [...this.errorReports];

    if (options?.type) {
      reports = reports.filter(report => report.type === options.type);
    }

    if (options?.severity) {
      reports = reports.filter(report => report.severity === options.severity);
    }

    if (options?.limit) {
      reports = reports.slice(-options.limit);
    }

    return reports;
  }

  public getPerformanceMetrics(options?: {
    metric?: string;
    limit?: number;
  }): PerformanceMetric[] {
    let metrics = [...this.performanceMetrics];

    if (options?.metric) {
      metrics = metrics.filter(metric => metric.metric === options.metric);
    }

    if (options?.limit) {
      metrics = metrics.slice(-options.limit);
    }

    return metrics;
  }

  public getUserActivities(options?: {
    action?: string;
    component?: string;
    limit?: number;
  }): UserActivity[] {
    let activities = [...this.userActivities];

    if (options?.action) {
      activities = activities.filter(activity => activity.action === options.action);
    }

    if (options?.component) {
      activities = activities.filter(activity => activity.component === options.component);
    }

    if (options?.limit) {
      activities = activities.slice(-options.limit);
    }

    return activities;
  }

  public getSummary(): {
    totalErrors: number;
    totalWarnings: number;
    totalPerformanceMetrics: number;
    totalUserActivities: number;
    criticalErrors: number;
    sessionDuration: number;
  } {
    const startTime = this.errorReports.length > 0 
      ? this.errorReports[0].timestamp 
      : Date.now();
    
    return {
      totalErrors: this.errorReports.filter(r => r.type === 'error').length,
      totalWarnings: this.errorReports.filter(r => r.type === 'warning').length,
      totalPerformanceMetrics: this.performanceMetrics.length,
      totalUserActivities: this.userActivities.length,
      criticalErrors: this.errorReports.filter(r => r.severity === 'critical').length,
      sessionDuration: Date.now() - startTime
    };
  }

  public exportData(): string {
    return JSON.stringify({
      errors: this.errorReports,
      performance: this.performanceMetrics,
      activities: this.userActivities,
      sessionId: this.sessionId,
      userId: this.userId
    }, null, 2);
  }

  public clearData() {
    this.errorReports = [];
    this.performanceMetrics = [];
    this.userActivities = [];
  }

  // Performance monitoring methods
  public measureOperation<T>(operation: () => T, operationName: string): T {
    const startTime = performance.now();
    
    try {
      const result = operation();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.capturePerformanceMetric(`operation_${operationName}`, duration, {
        operation: operationName
      });
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.capturePerformanceMetric(`operation_${operationName}_error`, duration, {
        operation: operationName,
        error: error instanceof Error ? error.message : String(error)
      });
      
      throw error;
    }
  }

  public async measureAsyncOperation<T>(
    operation: () => Promise<T>, 
    operationName: string
  ): Promise<T> {
    const startTime = performance.now();
    
    try {
      const result = await operation();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.capturePerformanceMetric(`async_operation_${operationName}`, duration, {
        operation: operationName
      });
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.capturePerformanceMetric(`async_operation_${operationName}_error`, duration, {
        operation: operationName,
        error: error instanceof Error ? error.message : String(error)
      });
      
      throw error;
    }
  }

  // Memory usage monitoring
  public getMemoryUsage(): {
    used?: number;
    total?: number;
    limit?: number;
    percentage?: number;
  } | null {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100,
      };
    }
    return null;
  }

  // Web Vitals monitoring
  public measureWebVitals() {
    // First Contentful Paint
    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    
    if (fcp) {
      this.capturePerformanceMetric('web_vital_fcp', fcp.startTime);
    }

    // Time to Interactive (approximate)
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const tti = navigationEntry.domInteractive - navigationEntry.startTime;
      this.capturePerformanceMetric('web_vital_tti', tti);
    }

    // Largest Contentful Paint
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    const lcp = lcpEntries[lcpEntries.length - 1];
    if (lcp) {
      this.capturePerformanceMetric('web_vital_lcp', lcp.startTime);
    }
  }
}

// Create a React error boundary component
export class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}, {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}> {
  private errorTracker = ErrorTrackingService.getInstance();

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Capture the error with component stack
    this.errorTracker.captureError({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack || undefined,
      type: 'error',
      severity: 'high'
    });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
            <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              We're sorry, but something went wrong. Our team has been notified.
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// React hook for error tracking
export function useErrorTracking() {
  const errorTracker = ErrorTrackingService.getInstance();
  
  const captureError = (error: Partial<ErrorReport> & { message: string }) => {
    return errorTracker.captureError(error);
  };
  
  const capturePerformanceMetric = (metric: string, value: number, metadata?: Record<string, any>) => {
    return errorTracker.capturePerformanceMetric(metric, value, metadata);
  };
  
  const captureUserActivity = (action: string, component: string, metadata?: Record<string, any>) => {
    return errorTracker.captureUserActivity(action, component, metadata);
  };
  
  const measureOperation = <T,>(operation: () => T, operationName: string) => {
    return errorTracker.measureOperation(operation, operationName);
  };
  
  const measureAsyncOperation = <T,>(operation: () => Promise<T>, operationName: string) => {
    return errorTracker.measureAsyncOperation(operation, operationName);
  };
  
  return {
    captureError,
    capturePerformanceMetric,
    captureUserActivity,
    measureOperation,
    measureAsyncOperation,
    errorTracker
  };
}

// Export the service instance for direct use
export const errorTrackingService = ErrorTrackingService.getInstance();

// Export types
export type { ErrorReport, PerformanceMetric, UserActivity };