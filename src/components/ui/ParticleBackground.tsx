import { motion } from 'framer-motion';
import React from 'react';

interface ParticleBackgroundProps {
  className?: string;
  particleColor?: string;
  particleCount?: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className = '',
  particleColor = 'primary',
  particleCount = 20
}) => {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Primary Gradient Orb */}
      <motion.div 
        className={`absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-${particleColor}/10 rounded-full blur-[120px]`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Secondary Gradient Orb */}
      <motion.div 
        className={`absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]`}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Particles */}
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 bg-${particleColor}/30 rounded-full`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;