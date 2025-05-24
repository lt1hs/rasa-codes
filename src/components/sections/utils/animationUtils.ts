import type { Variants } from 'framer-motion';

// Shared animation variants for consistent animations across sections
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 70,
      delay: custom * 0.1,
      duration: 0.7
    }
  })
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  })
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 70,
      delay: custom * 0.1
    }
  })
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      delay: custom * 0.1
    }
  })
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      delay: custom * 0.1
    }
  })
};

// Hover animations
export const hoverScale = {
  scale: 1.03,
  transition: { duration: 0.3 }
};

// Parallax effect utility
export const useParallax = (value: any, distance: number) => {
  return {
    y: value.scrollYProgress.to(
      [0, 1], 
      [0, distance]
    )
  };
};

// Floating animation for decorative elements
export const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut"
  }
};

// Pulse animation for attention-grabbing elements
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.7, 1, 0.7],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Shimmer effect for gradient borders and highlights
export const shimmerAnimation = {
  backgroundPosition: ["200% 0", "0% 0", "-200% 0"],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "linear"
  }
};