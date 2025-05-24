import { motion } from 'framer-motion';
import React from 'react';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color?: 'primary' | 'accent';
  className?: string;
  style?: React.CSSProperties;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  description,
  icon,
  color = 'primary',
  className = '',
  style
}) => {
  return (
    <motion.div
      className={`glass-card p-8 rounded-2xl border border-white/10 group hover:border-${color}/30 transition-colors duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={style}
    >
      {/* Icon */}
      <div className={`w-16 h-16 rounded-2xl bg-${color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <svg 
          className={`w-8 h-8 text-${color}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d={icon}
          />
        </svg>
      </div>

      {/* Content */}
      <h3 className={`text-2xl font-display font-semibold mb-3 group-hover:text-${color} transition-colors duration-300`}>
        {title}
      </h3>
      <p className={`text-lg font-medium text-${color}/80 mb-4`}>
        {subtitle}
      </p>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>

      {/* Hover Effect */}
      <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-${color}/50 to-accent/50 rounded-full transition-all duration-500`} />
    </motion.div>
  );
};

export default ServiceCard; 