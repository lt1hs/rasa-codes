import { motion } from 'framer-motion';
import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  fullWidth?: boolean;
  withBackground?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className = '',
  title,
  subtitle,
  fullWidth = false,
  withBackground = false
}) => {
  return (
    <section className={`py-24 relative overflow-hidden ${className}`}>
      {withBackground && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] opacity-50" />
        </div>
      )}
      
      <div className={fullWidth ? 'w-full' : 'container'}>
        {(title || subtitle) && (
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {title && (
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                {title.split(' ').map((word, i) => (
                  <span key={i}>
                    {i === title.split(' ').length - 1 ? (
                      <span className="gradient-text">{word}</span>
                    ) : (
                      `${word} `
                    )}
                  </span>
                ))}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-300 leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;