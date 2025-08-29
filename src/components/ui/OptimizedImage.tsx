import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePerformanceContext } from '../../contexts/PerformanceContext';
import {
  getOptimizedImageUrl,
  getResponsiveSrcSet,
  getResponsiveSizes,
  createBlurPlaceholder
} from '../../utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  quality = 75,
  onLoad
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState<string>('');
  const [blurPlaceholder, setBlurPlaceholder] = useState<string>('');
  const [srcSet, setSrcSet] = useState<string>('');
  const { isLiteVersion, supportsWebP } = usePerformanceContext();

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Generate optimized image URL
        const optimized = await getOptimizedImageUrl(src, {
          width,
          height,
          quality: isLiteVersion ? Math.min(quality, 60) : quality,
          format: supportsWebP ? 'webp' : 'jpeg'
        });
        setOptimizedSrc(optimized);

        // Generate srcSet for responsive images if width is provided
        if (width) {
          const widths = [width / 2, width, width * 2].filter(w => w <= 3840);
          const responsiveSrcSet = await getResponsiveSrcSet(src, widths, {
            quality: isLiteVersion ? Math.min(quality, 60) : quality,
            format: supportsWebP ? 'webp' : 'jpeg'
          });
          setSrcSet(responsiveSrcSet);
        }

        // Generate blur placeholder
        if (!priority) {
          const placeholder = await createBlurPlaceholder(src);
          setBlurPlaceholder(placeholder);
        }
      } catch (error) {
        console.error('Error optimizing image:', error);
        setOptimizedSrc(src); // Fallback to original source
      }
    };

    loadImage();
  }, [src, width, height, quality, isLiteVersion, supportsWebP, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur Placeholder */}
      {!isLoaded && blurPlaceholder && (
        <motion.img
          src={blurPlaceholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-lg transform scale-110"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Main Image */}
      <motion.img
        src={optimizedSrc || src}
        srcSet={srcSet}
        sizes={sizes || getResponsiveSizes()}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleLoad}
        className={`w-full h-full object-cover ${!isLoaded ? 'opacity-0' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default OptimizedImage; 