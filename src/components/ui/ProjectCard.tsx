import { motion } from 'framer-motion';
import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
  year: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  category,
  location,
  year,
  isHovered,
  onHover,
  onLeave,
  className = ''
}) => {
  return (
    <motion.div
      className={`group relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
    >
      {/* Project Card */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden group-hover:border-primary/30 transition-colors duration-300">
        {/* Project Image */}
        <div className="aspect-[4/3] relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-gray-900"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          >
            <div className="text-center p-6">
              <p className="text-lg text-gray-300 mb-4">{description}</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-primary">{location}</span>
                <span className="w-1 h-1 bg-primary/50 rounded-full" />
                <span className="text-primary">{year}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <span className="text-sm text-primary/80">{category}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 