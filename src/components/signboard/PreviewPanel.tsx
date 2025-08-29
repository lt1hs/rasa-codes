import React from 'react';
import { PreviewPanelProps } from '../../types/signboard';
import { LoadingSpinner } from './LoadingSpinner';

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ 
  config, 
  generatedImage, 
  isGenerating, 
  error 
}) => {
  const { 
    signText, 
    businessName, 
    width, 
    height, 
    fontFamily, 
    fontSize, 
    fontWeight, 
    textColor, 
    backgroundColor 
  } = config;

  // Map font family from our type to CSS
  const getFontFamily = () => {
    switch (fontFamily) {
      case 'sans': return 'ui-sans-serif, system-ui, sans-serif';
      case 'serif': return 'ui-serif, Georgia, serif';
      case 'mono': return 'ui-monospace, SFMono-Regular, monospace';
      case 'display': return '"Playfair Display", serif';
      case 'handwritten': return '"Caveat", cursive';
      case 'decorative': return '"Lobster", cursive';
      default: return 'ui-sans-serif, system-ui, sans-serif';
    }
  };

  // Map font weight from our type to CSS
  const getFontWeight = () => {
    switch (fontWeight) {
      case 'light': return 300;
      case 'regular': return 400;
      case 'medium': return 500;
      case 'semibold': return 600;
      case 'bold': return 700;
      default: return 400;
    }
  };

  // Style for the canvas preview
  const canvasStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    backgroundColor,
    color: textColor,
    fontFamily: getFontFamily(),
    fontSize: `${fontSize}px`,
    fontWeight: getFontWeight(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    position: 'relative',
    overflow: 'hidden',
    aspectRatio: `${width} / ${height}`
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Preview</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {generatedImage ? 'AI-generated preview of your sign' : 'Live preview of your sign design'}
        </p>
      </div>

      <div className="relative rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-lg">
        {/* Dimensions display */}
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md z-10">
          {width} × {height} mm
        </div>
        
        {/* Business name display */}
        {businessName && (
          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md z-10">
            {businessName}
          </div>
        )}

        {/* Loading overlay */}
        {isGenerating && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <div className="text-center">
              <LoadingSpinner />
              <p className="text-white mt-2">Generating AI preview...</p>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="absolute inset-0 bg-red-900/30 flex items-center justify-center z-20">
            <div className="bg-red-800 text-white p-4 rounded-md max-w-md">
              <h3 className="font-bold mb-2">Error</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* AI Generated Image */}
        {generatedImage && !isGenerating ? (
          <div className="w-full h-full">
            <img 
              src={generatedImage} 
              alt="AI Generated Sign Preview" 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          // Live Preview Canvas (shown when no AI image is available)
          <div style={canvasStyle}>
            <span className="break-words max-w-full">{signText || "Your Sign Text"}</span>
          </div>
        )}
      </div>

      {/* Preview controls */}
      <div className="mt-4 flex justify-end space-x-2">
        {generatedImage && (
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => {
              // Download the generated image
              const link = document.createElement('a');
              link.href = generatedImage;
              link.download = `sign-preview-${Date.now()}.jpg`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Download Preview
          </button>
        )}
      </div>
    </div>
  );
}; 