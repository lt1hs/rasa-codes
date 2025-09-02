import React from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon,
  SparklesIcon,
  GlobeAltIcon,
  TicketIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

interface QRTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  logoSize: number;
  icon: React.ComponentType<{ className?: string }>;
  gradient?: string;
}

interface QRCodeTemplatesProps {
  onSelectTemplate: (template: Omit<QRTemplate, 'id' | 'icon'>) => void;
}

const QRCodeTemplates: React.FC<QRCodeTemplatesProps> = ({ onSelectTemplate }) => {
  const templates: QRTemplate[] = [
    {
      id: '1',
      name: 'Business Card',
      description: 'Professional black & white design for business contacts',
      category: 'Business',
      size: 200,
      foregroundColor: '#000000',
      backgroundColor: '#ffffff',
      errorCorrectionLevel: 'M',
      logoSize: 25,
      icon: UserGroupIcon,
    },
    {
      id: '2',
      name: 'Website Link',
      description: 'Modern blue theme perfect for web links and URLs',
      category: 'Web',
      size: 250,
      foregroundColor: '#1890ff',
      backgroundColor: '#f0f8ff',
      errorCorrectionLevel: 'L',
      logoSize: 20,
      icon: GlobeAltIcon,
    },
    {
      id: '3',
      name: 'Event Ticket',
      description: 'High contrast design optimized for event scanning',
      category: 'Events',
      size: 300,
      foregroundColor: '#000000',
      backgroundColor: '#ffffff',
      errorCorrectionLevel: 'H',
      logoSize: 30,
      icon: TicketIcon,
    },
    {
      id: '4',
      name: 'Social Media',
      description: 'Vibrant purple design for social media profiles',
      category: 'Social',
      size: 200,
      foregroundColor: '#722ed1',
      backgroundColor: '#f9f0ff',
      errorCorrectionLevel: 'M',
      logoSize: 25,
      icon: SparklesIcon,
    },
    {
      id: '5',
      name: 'Restaurant Menu',
      description: 'Warm orange colors perfect for food service',
      category: 'Food & Dining',
      size: 250,
      foregroundColor: '#fa8c16',
      backgroundColor: '#fff7e6',
      errorCorrectionLevel: 'M',
      logoSize: 20,
      icon: BuildingStorefrontIcon,
    },
    {
      id: '6',
      name: 'Contact Info',
      description: 'Fresh green theme for contact details and vCards',
      category: 'Contact',
      size: 200,
      foregroundColor: '#52c41a',
      backgroundColor: '#f6ffed',
      errorCorrectionLevel: 'Q',
      logoSize: 25,
      icon: PhoneIcon,
    },
  ];

  const categories = [...new Set(templates.map(t => t.category))];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold admin-text-light mb-2">
          Choose a Template
        </h3>
        <p className="admin-text-light/60 text-sm">
          Start with a professionally designed template and customize it to your needs
        </p>
      </div>

      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
          className="space-y-3"
        >
          <h4 className="font-medium admin-text-light text-sm uppercase tracking-wide opacity-70">
            {category}
          </h4>
          
          <div className="grid grid-cols-1 gap-3">
            {templates
              .filter(template => template.category === category)
              .map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                  className="group relative overflow-hidden rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-white/5"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-lg flex-shrink-0",
                        "bg-gradient-to-br from-orange-500/20 to-cyan-500/20"
                      )}>
                        <template.icon className="w-5 h-5 admin-text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium admin-text-light text-sm truncate">
                            {template.name}
                          </h5>
                          <div className="flex items-center gap-1">
                            <div 
                              className="w-3 h-3 rounded-full border border-white/20"
                              style={{ backgroundColor: template.foregroundColor }}
                            />
                            <div 
                              className="w-3 h-3 rounded-full border border-white/20"
                              style={{ backgroundColor: template.backgroundColor }}
                            />
                          </div>
                        </div>
                        
                        <p className="admin-text-light/60 text-xs mb-3 line-clamp-2">
                          {template.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Badge variant="secondary" className="text-xs px-2 py-0.5">
                              {template.size}px
                            </Badge>
                            <Badge variant="secondary" className="text-xs px-2 py-0.5">
                              {template.errorCorrectionLevel}
                            </Badge>
                          </div>
                          
                          <Button
                            size="sm"
                            onClick={() => onSelectTemplate(template)}
                            className="admin-btn-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <PlusIcon className="w-3 h-3 mr-1" />
                            Use
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </motion.div>
              ))}
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center pt-6 border-t border-white/10"
      >
        <p className="admin-text-light/60 text-sm mb-4">
          Need something custom? Start from scratch
        </p>
        <Button
          onClick={() => onSelectTemplate({
            name: '',
            description: '',
            category: 'Custom',
            size: 200,
            foregroundColor: '#000000',
            backgroundColor: '#ffffff',
            errorCorrectionLevel: 'M',
            logoSize: 20,
          })}
          variant="secondary"
          className="admin-btn-secondary"
        >
          <SparklesIcon className="w-4 h-4 mr-2" />
          Create Custom QR Code
        </Button>
      </motion.div>
    </div>
  );
};

export default QRCodeTemplates;
