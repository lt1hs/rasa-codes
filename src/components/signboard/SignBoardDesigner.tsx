import React, { useState, useCallback } from 'react';
import { SignBoardConfig, SignBoardDesignerProps, OrderDetails } from '../../types/signboard';
import { PreviewPanel } from './PreviewPanel';
import { ControlPanel } from './ControlPanel';
import { OrderModal } from './OrderModal';
import { generateSignBoardPreview, uploadLogo, submitOrder } from '../../services/signboardService';

export const SignBoardDesigner: React.FC<SignBoardDesignerProps> = ({
  initialConfig,
  onSave,
  onOrder
}) => {
  // Default configuration
  const [config, setConfig] = useState<SignBoardConfig>({
    businessName: '',
    businessType: '',
    signText: 'Your Sign Text',
    logo: null,
    logoUrl: undefined,
    width: 800,
    height: 400,
    fontFamily: 'sans',
    fontSize: 48,
    fontWeight: 'bold',
    textColor: '#FFFFFF',
    backgroundColor: '#000000',
    signType: 'neon',
    effectType: 'glow',
    designStyle: 'Modern and professional'
  });

  // Preview state
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Order modal state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Initialize with any provided config
  React.useEffect(() => {
    if (initialConfig) {
      setConfig(prev => ({ ...prev, ...initialConfig }));
    }
  }, [initialConfig]);

  // Handle config changes
  const handleConfigChange = useCallback((updates: Partial<SignBoardConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  // Handle logo upload
  const handleLogoUpload = useCallback(async (file: File) => {
    try {
      const logoUrl = await uploadLogo(file);
      handleConfigChange({ logo: file, logoUrl });
    } catch (err) {
      console.error('Error uploading logo:', err);
      setError('Failed to upload logo. Please try again.');
    }
  }, [handleConfigChange]);

  // Generate AI preview
  const handleGeneratePreview = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const imageUrl = await generateSignBoardPreview(config);
      setGeneratedImage(imageUrl);
      
      // If there's a save callback, call it with the updated config and image
      if (onSave) {
        onSave(config, imageUrl);
      }
    } catch (err) {
      console.error('Error generating preview:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate preview. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [config, onSave]);

  // Open order modal
  const handleOpenOrderModal = useCallback(() => {
    if (!generatedImage && !isGenerating) {
      // Auto-generate preview if not already generated
      handleGeneratePreview();
    }
    setIsOrderModalOpen(true);
  }, [generatedImage, isGenerating, handleGeneratePreview]);

  // Handle order submission
  const handleSubmitOrder = useCallback(async (orderDetails: OrderDetails): Promise<{ orderId: string; estimatedDelivery: string }> => {
    // If there's an external order handler, use it
    if (onOrder && generatedImage) {
      const result = await onOrder(config, generatedImage);
      return result;
    }
    
    // Otherwise use the default implementation
    return submitOrder(orderDetails);
  }, [config, generatedImage, onOrder]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Preview Panel - Full width on top */}
        <div>
          <PreviewPanel
            config={config}
            generatedImage={generatedImage}
            isGenerating={isGenerating}
            error={error}
          />
        </div>
        
        {/* Control Panel - Full width below preview */}
        <div>
          <ControlPanel
            config={config}
            onConfigChange={handleConfigChange}
            onGeneratePreview={handleGeneratePreview}
            onOrder={handleOpenOrderModal}
            isGenerating={isGenerating}
            onUploadLogo={handleLogoUpload}
          />
        </div>
      </div>
      
      {/* Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        config={config}
        previewImage={generatedImage}
        onSubmitOrder={handleSubmitOrder}
      />
    </div>
  );
}; 