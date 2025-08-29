import { useState, useEffect } from 'react';
import { shouldUseLiteVersion, browserCapabilities } from '../utils/performance';

interface PerformanceState {
  isLiteVersion: boolean;
  supportsWebGL: boolean;
  supportsWebP: boolean;
  supportsIntersectionObserver: boolean;
  isSlowConnection: boolean;
}

export const usePerformance = (): PerformanceState => {
  const [state, setState] = useState<PerformanceState>({
    isLiteVersion: shouldUseLiteVersion(),
    supportsWebGL: true,
    supportsWebP: true,
    supportsIntersectionObserver: true,
    isSlowConnection: false
  });

  useEffect(() => {
    const checkCapabilities = async () => {
      const [hasWebGL, hasWebP] = await Promise.all([
        browserCapabilities.webGL(),
        browserCapabilities.webP()
      ]);

      const hasIntersectionObserver = browserCapabilities.intersectionObserver();
      
      // Check connection speed
      const isSlowConnection = !!(navigator as any).connection && 
        ((navigator as any).connection.saveData || 
         (navigator as any).connection.effectiveType === 'slow-2g' ||
         (navigator as any).connection.effectiveType === '2g' ||
         (navigator as any).connection.effectiveType === '3g');

      setState(prev => ({
        ...prev,
        supportsWebGL: hasWebGL,
        supportsWebP: hasWebP,
        supportsIntersectionObserver: hasIntersectionObserver,
        isSlowConnection,
        // Force lite version if essential features are not supported
        isLiteVersion: prev.isLiteVersion || !hasWebGL || isSlowConnection
      }));
    };

    checkCapabilities();

    // Listen for connection changes if the API is available
    if ((navigator as any).connection) {
      (navigator as any).connection.addEventListener('change', checkCapabilities);
      return () => {
        (navigator as any).connection.removeEventListener('change', checkCapabilities);
      };
    }
  }, []);

  return state;
};

export default usePerformance; 