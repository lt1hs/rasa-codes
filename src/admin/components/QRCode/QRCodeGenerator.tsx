import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon,
  PhotoIcon,
  SparklesIcon,
  EyeIcon,
  ArrowDownTrayIcon as DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { message } from 'antd';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import QRCodeCanvas from './QRCodeCanvas';
import { QRCodeData } from '../../pages/QRCodeManager';
import { cn } from '../../utils/cn';

interface QRCodeGeneratorProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (qrData: Omit<QRCodeData, 'id' | 'createdAt'>) => void;
  template?: any;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  visible, 
  onClose, 
  onCreate,
  template 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    content: 'https://example.com',
    size: 200,
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    logo: '',
    logoSize: 20,
    errorCorrectionLevel: 'M' as const,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (template) {
      setFormData(prev => ({
        ...prev,
        ...template,
        name: '',
        content: 'https://example.com'
      }));
    }
  }, [template]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        setFormData(prev => ({ ...prev, logo: logoUrl }));
        setLogoFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    if (!formData.name.trim()) {
      message.error('Please enter a name for your QR code');
      return;
    }
    if (!formData.content.trim()) {
      message.error('Please enter content for your QR code');
      return;
    }

    onCreate(formData);
    setFormData({
      name: '',
      content: 'https://example.com',
      size: 200,
      foregroundColor: '#000000',
      backgroundColor: '#ffffff',
      logo: '',
      logoSize: 20,
      errorCorrectionLevel: 'M',
    });
    setLogoFile(null);
  };

  const errorCorrectionOptions = [
    { value: 'L', label: 'Low (7%)', description: 'Basic error correction' },
    { value: 'M', label: 'Medium (15%)', description: 'Standard error correction' },
    { value: 'Q', label: 'Quartile (25%)', description: 'Good error correction' },
    { value: 'H', label: 'High (30%)', description: 'Best error correction' },
  ];

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-6xl max-h-[90vh] overflow-hidden"
        >
          <Card className="admin-card">
            <CardHeader className="border-b border-white/10 flex flex-row items-center justify-between">
              <CardTitle className="admin-text-light flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 admin-text-primary" />
                Create QR Code
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
              >
                <XMarkIcon className="w-5 h-5" />
              </Button>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium admin-text-light mb-2">
                      QR Code Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter a descriptive name"
                      className="w-full px-4 py-3 rounded-lg admin-input focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium admin-text-light mb-2">
                      Content *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Enter URL, text, or any content to encode"
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg admin-input focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium admin-text-light mb-2">
                        Size: {formData.size}px
                      </label>
                      <input
                        type="range"
                        min="100"
                        max="500"
                        step="10"
                        value={formData.size}
                        onChange={(e) => handleInputChange('size', parseInt(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                    
                    {formData.logo && (
                      <div>
                        <label className="block text-sm font-medium admin-text-light mb-2">
                          Logo Size: {formData.logoSize}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="40"
                          step="1"
                          value={formData.logoSize}
                          onChange={(e) => handleInputChange('logoSize', parseInt(e.target.value))}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium admin-text-light mb-2">
                        Foreground Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={formData.foregroundColor}
                          onChange={(e) => handleInputChange('foregroundColor', e.target.value)}
                          className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.foregroundColor}
                          onChange={(e) => handleInputChange('foregroundColor', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg admin-input focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium admin-text-light mb-2">
                        Background Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={formData.backgroundColor}
                          onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                          className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.backgroundColor}
                          onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg admin-input focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium admin-text-light mb-2">
                      Error Correction Level
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {errorCorrectionOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleInputChange('errorCorrectionLevel', option.value)}
                          className={cn(
                            "p-3 rounded-lg border text-left transition-all duration-200",
                            formData.errorCorrectionLevel === option.value
                              ? "admin-border-primary bg-orange-500/10"
                              : "border-white/10 hover:border-white/20"
                          )}
                        >
                          <div className="font-medium admin-text-light text-sm">
                            {option.label}
                          </div>
                          <div className="text-xs admin-text-light/60">
                            {option.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium admin-text-light mb-2">
                      Logo (Optional)
                    </label>
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="secondary"
                        className="admin-btn-secondary"
                      >
                        <PhotoIcon className="w-4 h-4 mr-2" />
                        {formData.logo ? 'Change Logo' : 'Upload Logo'}
                      </Button>
                      {formData.logo && (
                        <Button
                          onClick={() => {
                            handleInputChange('logo', '');
                            setLogoFile(null);
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    {logoFile && (
                      <p className="text-xs admin-text-light/60 mt-2">
                        {logoFile.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Preview Section */}
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold admin-text-light mb-2 text-center">
                      Live Preview
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Badge variant="secondary">{formData.size}px</Badge>
                      <Badge variant="secondary">{formData.errorCorrectionLevel}</Badge>
                      {formData.logo && <Badge variant="secondary">Logo</Badge>}
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-lg border border-white/10 bg-white/5 mb-6">
                    <QRCodeCanvas {...formData} />
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={onClose}
                      variant="secondary"
                      className="admin-btn-secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreate}
                      className="admin-btn-primary"
                    >
                      <SparklesIcon className="w-4 h-4 mr-2" />
                      Create QR Code
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QRCodeGenerator;
