import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
  bundleSize?: number;
}

interface RoutePerformance {
  route: string;
  loadTime: number;
  renderTime: number;
  timestamp: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, RoutePerformance[]> = new Map();
  private observers: PerformanceObserver[] = [];

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Observe navigation timing
    if (typeof PerformanceObserver !== 'undefined') {
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            this.logNavigation(entry as PerformanceNavigationTiming);
          }
        });
      });

      try {
        navigationObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navigationObserver);
      } catch (error) {
        console.warn('Navigation timing observer not supported:', error);
      }

      // Observe largest contentful paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (error) {
        console.warn('LCP observer not supported:', error);
      }

      // Observe cumulative layout shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        if (clsValue > 0) {
          console.log('CLS:', clsValue);
        }
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (error) {
        console.warn('CLS observer not supported:', error);
      }
    }
  }

  private logNavigation(entry: PerformanceNavigationTiming) {
    const metrics = {
      dns: entry.domainLookupEnd - entry.domainLookupStart,
      tcp: entry.connectEnd - entry.connectStart,
      ttfb: entry.responseStart - entry.requestStart,
      download: entry.responseEnd - entry.responseStart,
      domInteractive: entry.domInteractive - entry.navigationStart,
      domComplete: entry.domComplete - entry.navigationStart,
      loadComplete: entry.loadEventEnd - entry.navigationStart,
    };

    console.log('Navigation Performance:', metrics);
  }

  public recordRoutePerformance(route: string, metrics: Omit<RoutePerformance, 'route' | 'timestamp'>) {
    const performance: RoutePerformance = {
      route,
      ...metrics,
      timestamp: Date.now(),
    };

    if (!this.metrics.has(route)) {
      this.metrics.set(route, []);
    }

    const routeMetrics = this.metrics.get(route)!;
    routeMetrics.push(performance);

    // Keep only last 10 entries per route
    if (routeMetrics.length > 10) {
      routeMetrics.shift();
    }

    // Log performance data in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Route Performance [${route}]:`, metrics);
    }
  }

  public getRouteMetrics(route: string): RoutePerformance[] {
    return this.metrics.get(route) || [];
  }

  public getAllMetrics(): Map<string, RoutePerformance[]> {
    return new Map(this.metrics);
  }

  public getAverageMetrics(route: string): Partial<RoutePerformance> | null {
    const routeMetrics = this.metrics.get(route);
    if (!routeMetrics || routeMetrics.length === 0) return null;

    const total = routeMetrics.reduce(
      (acc, metric) => ({
        loadTime: acc.loadTime + metric.loadTime,
        renderTime: acc.renderTime + metric.renderTime,
      }),
      { loadTime: 0, renderTime: 0 }
    );

    return {
      route,
      loadTime: total.loadTime / routeMetrics.length,
      renderTime: total.renderTime / routeMetrics.length,
    };
  }

  public exportMetrics(): string {
    const allMetrics = Object.fromEntries(this.metrics);
    return JSON.stringify(allMetrics, null, 2);
  }

  public clearMetrics() {
    this.metrics.clear();
  }

  public destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

export const usePerformance = () => {
  const location = useLocation();
  const performanceMonitor = useRef(PerformanceMonitor.getInstance());
  const routeStartTime = useRef<number>(Date.now());
  const renderStartTime = useRef<number>(Date.now());

  // Record route change performance
  useEffect(() => {
    routeStartTime.current = Date.now();
    renderStartTime.current = performance.now();

    // Record navigation performance after component mounts
    const timeout = setTimeout(() => {
      const loadTime = Date.now() - routeStartTime.current;
      const renderTime = performance.now() - renderStartTime.current;

      performanceMonitor.current.recordRoutePerformance(location.pathname, {
        loadTime,
        renderTime,
      });
    }, 0);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const measureOperation = useCallback(
    async <T>(operation: () => Promise<T>, operationName: string): Promise<T> => {
      const startTime = performance.now();
      
      try {
        const result = await operation();
        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log(`Operation "${operationName}" took ${duration.toFixed(2)}ms`);
        
        return result;
      } catch (error) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        console.error(`Operation "${operationName}" failed after ${duration.toFixed(2)}ms:`, error);
        throw error;
      }
    },
    []
  );

  const getMetrics = useCallback(() => {
    return {
      current: performanceMonitor.current.getRouteMetrics(location.pathname),
      average: performanceMonitor.current.getAverageMetrics(location.pathname),
      all: performanceMonitor.current.getAllMetrics(),
    };
  }, [location.pathname]);

  const getMemoryUsage = useCallback(() => {
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
  }, []);

  const exportPerformanceData = useCallback(() => {
    return performanceMonitor.current.exportMetrics();
  }, []);

  const clearPerformanceData = useCallback(() => {
    performanceMonitor.current.clearMetrics();
  }, []);

  // Web Vitals measurement
  const measureWebVitals = useCallback(() => {
    // First Contentful Paint
    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');

    // Time to Interactive (approximate)
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const tti = navigationEntry ? navigationEntry.domInteractive - navigationEntry.navigationStart : null;

    return {
      fcp: fcp ? fcp.startTime : null,
      tti,
      // Add more vitals as needed
    };
  }, []);

  return {
    measureOperation,
    getMetrics,
    getMemoryUsage,
    exportPerformanceData,
    clearPerformanceData,
    measureWebVitals,
  };
};

export default usePerformance;