import { useReducedMotion } from 'framer-motion';
import { usePerformanceContext } from '../contexts/PerformanceContext';

interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  type?: 'spring' | 'tween';
  stiffness?: number;
  damping?: number;
}

interface AnimationVariants {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  transition?: AnimationConfig;
}

export const useOptimizedAnimation = (variants: AnimationVariants, priority: boolean = false) => {
  const prefersReducedMotion = useReducedMotion();
  const { isLiteVersion, isSlowConnection } = usePerformanceContext();

  // Disable animations if user prefers reduced motion or using lite version
  if (prefersReducedMotion || (isLiteVersion && !priority)) {
    return {
      initial: variants.animate, // Skip animation by setting initial to final state
      animate: variants.animate,
      exit: variants.exit,
      transition: { duration: 0 }
    };
  }

  // Optimize animation config based on performance context
  const optimizedTransition = {
    ...variants.transition,
    duration: isSlowConnection
      ? Math.min(variants.transition?.duration || 0.3, 0.3) // Cap duration at 300ms for slow connections
      : variants.transition?.duration,
    delay: isSlowConnection
      ? 0 // Remove delays for slow connections
      : variants.transition?.delay,
    // Use simpler animation type for better performance
    type: isLiteVersion ? 'tween' : variants.transition?.type
  };

  return {
    ...variants,
    transition: optimizedTransition
  };
};

// Preset animations optimized for performance
export const optimizedAnimations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.4 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.3 }
  },
  // Stagger children animations
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

// Helper function to create staggered animations
export const createStaggeredAnimation = (
  childVariants: AnimationVariants,
  staggerDelay: number = 0.1,
  containerDelay: number = 0
) => ({
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: {
    initial: {},
    animate: {
      transition: {
        delayChildren: containerDelay,
        staggerChildren: staggerDelay
      }
    },
    exit: {
      transition: {
        staggerChildren: staggerDelay / 2
      }
    }
  }
}); 