import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowDownTrayIcon as DownloadIcon, 
  BookmarkIcon as SaveIcon, 
  PhotoIcon,
  EyeIcon,
  PencilIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import { message } from 'antd';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import QRCodeCanvas from './QRCodeCanvas';
import { QRCodeData } from '../../pages/QRCodeManager';
import html2canvas from 'html2canvas';
import { cn } from '../../utils/cn';

interface QRCodePreviewProps {
  qrData: QRCodeData;
  onUpdate: (updatedQR: QRCodeData) => void;
}

export interface QRCodePreviewRef {
  downloadQR: () => void;
}

const QRCodePreview = forwardRef<QRCodePreviewRef, QRCodePreviewProps>(({ qrData, onUpdate }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(qrData);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setFormData(qrData);
  }, [qrData]);

  useImperativeHandle(ref, () => ({
    downloadQR: handleDownload,
  }));

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

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(qrData);
    setIsEditing(false);
    setLogoFile(null);
  };

  const handleDownload = async () => {
    if (!canvasContainerRef.current) return;

    try {
      const canvas = await html2canvas(canvasContainerRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      
      const link = document.createElement('a');
      link.download = `${formData.name || 'qrcode'}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      message.success('QR Code downloaded successfully!');
    } catch (error) {
      message.error('Failed to download QR Code');
      console.error('Download error:', error);
    }
  };

  const errorCorrectionOptions = [
    { value: 'L', label: 'Low (7%)', description: 'Basic error correction' },
    { value: 'M', label: 'Medium (15%)', description: 'Standard error correction' },
    { value: 'Q', label: 'Quartile (25%)', description: 'Good error correction' },
    { value: 'H', label: 'High (30%)', description: 'Best error correction' },
  ];

  return (
    <Card className="admin-card h-[600px]">
      <CardHeader className="border-b border-white/10">
        <div className="flex items-center justify-between">
          <CardTitle className="admin-text-light flex items-center gap-2">
            <EyeIcon className="w-5 h-5 admin-text-primary" />
            {formData.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button
                  onClick={handleCancel}
                  variant="secondary"
                  size="sm"
                  className="admin-btn-secondary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  size="sm"
                  className="admin-btn-primary"
                >
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleDownload}
                  variant="secondary"
                  size="sm"
                  className="admin-btn-secondary"
                >
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={() => setIsEditing(true)}
                  size="sm"
                  className="admin-btn-primary"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 h-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Preview Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6">
              <h3 className="text-lg font-semibold admin-text-light mb-4 text-center">
                {isEditing ? 'Live Preview' : 'QR Code Preview'}
              </h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant="secondary">{formData.size}px</Badge>
                <Badge variant="secondary">{formData.errorCorrectionLevel}</Badge>
                {formData.logo && <Badge variant="secondary">Logo</Badge>}
                <Badge variant="secondary">
                  {new Date(formData.createdAt).toLocaleDateString()}
                </Badge>
              </div>
            </div>
            
            <div className="p-6 rounded-lg border border-white/10 bg-white/5 mb-6">
              <div ref={canvasContainerRef}>
                <QRCodeCanvas {...formData} />
              </div>
            </div>

            {!isEditing && (
              <div className="text-center">
                <p className="admin-text-light/70 text-sm mb-4 max-w-md">
                  {formData.content}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button
                    onClick={handleDownload}
                    className="admin-btn-primary"
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(formData.content);
                      message.success('Content copied to clipboard!');
                    }}
                    variant="secondary"
                    className="admin-btn-secondary"
                  >
                    <DocumentDuplicateIcon className="w-4 h-4 mr-2" />
                    Copy Content
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Edit Form Section */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 overflow-y-auto admin-scrollbar"
            >
              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">
                  QR Code Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg admin-input focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg admin-input focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none"
                />
              </div>

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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium admin-text-light mb-2">
                    Foreground
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.foregroundColor}
                      onChange={(e) => handleInputChange('foregroundColor', e.target.value)}
                      className="w-10 h-10 rounded border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.foregroundColor}
                      onChange={(e) => handleInputChange('foregroundColor', e.target.value)}
                      className="flex-1 px-3 py-2 rounded admin-input focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium admin-text-light mb-2">
                    Background
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.backgroundColor}
                      onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                      className="w-10 h-10 rounded border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.backgroundColor}
                      onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                      className="flex-1 px-3 py-2 rounded admin-input focus:outline-none focus:ring-2 focus:ring-orange-500/50"
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
                        "p-2 rounded border text-left transition-all duration-200",
                        formData.errorCorrectionLevel === option.value
                          ? "admin-border-primary bg-orange-500/10"
                          : "border-white/10 hover:border-white/20"
                      )}
                    >
                      <div className="font-medium admin-text-light text-xs">
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">
                  Logo
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="secondary"
                    size="sm"
                    className="admin-btn-secondary"
                  >
                    <PhotoIcon className="w-4 h-4 mr-2" />
                    {formData.logo ? 'Change' : 'Upload'}
                  </Button>
                  {formData.logo && (
                    <Button
                      onClick={() => handleInputChange('logo', '')}
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
                
                {formData.logo && (
                  <div className="mt-3">
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
            </motion.div>
          )}

          {/* Info Section when not editing */}
          {!isEditing && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold admin-text-light mb-4">QR Code Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="admin-text-light/70">Size</span>
                    <span className="admin-text-light">{formData.size}px</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="admin-text-light/70">Error Correction</span>
                    <span className="admin-text-light">{formData.errorCorrectionLevel}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="admin-text-light/70">Foreground</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded border border-white/20"
                        style={{ backgroundColor: formData.foregroundColor }}
                      />
                      <span className="admin-text-light text-sm">{formData.foregroundColor}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="admin-text-light/70">Background</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded border border-white/20"
                        style={{ backgroundColor: formData.backgroundColor }}
                      />
                      <span className="admin-text-light text-sm">{formData.backgroundColor}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="admin-text-light/70">Logo</span>
                    <span className="admin-text-light">{formData.logo ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="admin-text-light/70">Created</span>
                    <span className="admin-text-light text-sm">
                      {new Date(formData.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

QRCodePreview.displayName = 'QRCodePreview';

export default QRCodePreview;
