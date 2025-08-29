import { browserCapabilities } from './performance';

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
}

/**
 * Optimizes image URL based on device capabilities and preferences
 */
export const getOptimizedImageUrl = async (
  originalUrl: string,
  options: ImageOptimizationOptions = {}
): Promise<string> => {
  const supportsWebP = await browserCapabilities.webP();
  const defaultFormat = supportsWebP ? 'webp' : 'jpeg';

  const {
    width,
    height,
    quality = 80,
    format = defaultFormat
  } = options;

  // If the URL is already optimized or is a data URL, return as is
  if (originalUrl.startsWith('data:') || originalUrl.includes('?opt=')) {
    return originalUrl;
  }

  // Build optimization parameters
  const params = new URLSearchParams();
  
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  params.append('fm', format);
  params.append('opt', '1');

  // Add optimization parameters to URL
  const separator = originalUrl.includes('?') ? '&' : '?';
  return `${originalUrl}${separator}${params.toString()}`;
};

/**
 * Returns srcSet for responsive images
 */
export const getResponsiveSrcSet = async (
  originalUrl: string,
  widths: number[],
  options: Omit<ImageOptimizationOptions, 'width'> = {}
): Promise<string> => {
  const srcSetPromises = widths.map(async width => {
    const optimizedUrl = await getOptimizedImageUrl(originalUrl, { ...options, width });
    return `${optimizedUrl} ${width}w`;
  });

  const srcSetEntries = await Promise.all(srcSetPromises);
  return srcSetEntries.join(', ');
};

/**
 * Returns sizes attribute for responsive images
 */
export const getResponsiveSizes = (
  mobileSizePercent: number = 100,
  desktopSizePercent: number = 50,
  breakpoint: number = 768
): string => {
  return `(max-width: ${breakpoint}px) ${mobileSizePercent}vw, ${desktopSizePercent}vw`;
};

/**
 * Preloads critical images
 */
export const preloadCriticalImages = async (urls: string[]): Promise<void> => {
  const preloadPromises = urls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      link.onload = () => resolve();
      link.onerror = reject;
      document.head.appendChild(link);
    });
  });

  await Promise.all(preloadPromises);
};

/**
 * Creates a blur hash placeholder for an image
 */
export const createBlurPlaceholder = async (
  url: string,
  width: number = 32,
  height: number = 32
): Promise<string> => {
  // This is a simplified version that creates a low-res base64 image
  // In a production environment, you might want to use a proper blur hash library
  const optimizedUrl = await getOptimizedImageUrl(url, {
    width,
    height,
    quality: 30,
    format: 'jpeg'
  });

  return optimizedUrl;
}; 