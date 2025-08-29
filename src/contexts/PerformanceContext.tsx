import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { shouldUseLiteVersion, browserCapabilities } from '../utils/performance';

interface PerformanceContextType {
  isLiteVersion: boolean;
  setIsLiteVersion: (value: boolean) => void;
  supportsWebGL: boolean;
  supportsWebP: boolean;
  supportsIntersectionObserver: boolean;
  isSlowConnection: boolean;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

interface PerformanceProviderProps {
  children: ReactNode;
}

export const PerformanceProvider = ({ children }: PerformanceProviderProps) => {
  // Initialize state from localStorage or device capabilities
  const [isLiteVersion, setIsLiteVersion] = useState(() => {
    const savedPreference = localStorage.getItem('liteModeEnabled');
    if (savedPreference !== null) {
      return savedPreference === 'true';
    }
    return shouldUseLiteVersion();
  });

  const [supportsWebGL, setSupportsWebGL] = useState(true);
  const [supportsWebP, setSupportsWebP] = useState(true);
  const [supportsIntersectionObserver, setSupportsIntersectionObserver] = useState(true);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  // Handle mode switching
  const handleSetLiteVersion = (value: boolean) => {
    console.log('Setting lite version to:', value);
    setIsLiteVersion(value);
    localStorage.setItem('liteModeEnabled', value.toString());
    // Force a page reload to ensure all components are properly re-rendered
    window.location.reload();
  };

  useEffect(() => {
    const checkCapabilities = async () => {
      const [hasWebGL, hasWebP] = await Promise.all([
        browserCapabilities.webGL(),
        browserCapabilities.webP()
      ]);

      const hasIntersectionObserver = browserCapabilities.intersectionObserver();
      
      // Check connection speed
      const isSlowConn = !!(navigator as any).connection && 
        ((navigator as any).connection.saveData || 
         (navigator as any).connection.effectiveType === 'slow-2g' ||
         (navigator as any).connection.effectiveType === '2g' ||
         (navigator as any).connection.effectiveType === '3g');

      setSupportsWebGL(hasWebGL);
      setSupportsWebP(hasWebP);
      setSupportsIntersectionObserver(hasIntersectionObserver);
      setIsSlowConnection(isSlowConn);

      // Force lite version if essential features are not supported
      if (!hasWebGL || isSlowConn) {
        handleSetLiteVersion(true);
      }
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

  return (
    <PerformanceContext.Provider
      value={{
        isLiteVersion,
        setIsLiteVersion: handleSetLiteVersion,
        supportsWebGL,
        supportsWebP,
        supportsIntersectionObserver,
        isSlowConnection
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformanceContext = () => {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformanceContext must be used within a PerformanceProvider');
  }
  return context;
};

export default PerformanceContext; 