/**
 * Utility functions for performance optimization
 */

/**
 * Checks if the current device/browser should use the lite version
 * based on device capabilities and user preferences
 */
export const shouldUseLiteVersion = (): boolean => {
  // Check if user has a saved preference
  const savedPreference = localStorage.getItem('liteModeEnabled');
  if (savedPreference !== null) {
    return savedPreference === 'true';
  }

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check if device is low-end (using CPU cores as indicator)
  const isLowEnd = !navigator.hardwareConcurrency || navigator.hardwareConcurrency <= 4;
  
  // Check if the device has a slow connection
  const isSlowConnection = !!(navigator as any).connection && 
    ((navigator as any).connection.saveData || 
     (navigator as any).connection.effectiveType === 'slow-2g' ||
     (navigator as any).connection.effectiveType === '2g' ||
     (navigator as any).connection.effectiveType === '3g');
  
  return prefersReducedMotion || isLowEnd || isSlowConnection;
};

/**
 * Debounce function to limit the rate at which a function is called
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number | undefined;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function to ensure a function is called at most once in a specified time period
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Lazy loads an image and returns a promise that resolves when the image is loaded
 */
export const lazyLoadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

/**
 * Checks if the browser supports certain features
 */
export const browserCapabilities = {
  webGL: (): boolean => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  },
  
  webP: async (): Promise<boolean> => {
    try {
      const webPImage = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
      const result = await fetch(webPImage).then(r => r.blob());
      return result.type === 'image/webp';
    } catch (e) {
      return false;
    }
  },
  
  intersectionObserver: (): boolean => {
    return 'IntersectionObserver' in window;
  }
}; 