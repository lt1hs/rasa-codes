import { motion } from 'framer-motion';
import React from 'react';
import ParticleBackground from '../ui/ParticleBackground';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <ParticleBackground />
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-secondary-dark/50" />
        <motion.div 
          className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-center text-4xl font-display font-bold text-white">
            {title}
          </h2>
          <p className="mt-2 text-center text-lg text-gray-300">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-card p-8 rounded-2xl border border-white/10"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout; 