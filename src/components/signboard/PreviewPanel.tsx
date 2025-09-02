import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PreviewPanelProps } from '../../types/signboard';
import { LoadingSpinner } from './LoadingSpinner';

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ 
  config, 
  generatedImage, 
  isGenerating, 
  error 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const { 
    text,
    subtitle,
    width, 
    height, 
    fontFamily, 
    fontSize, 
    fontWeight, 
    textColor, 
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius,
    effectType,
    hasLighting
  } = config;

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

  const getEffectStyles = () => {
    const effects: React.CSSProperties = {};
    
    switch (effectType) {
      case 'glow':
        effects.textShadow = `0 0 20px ${textColor}80, 0 0 40px ${textColor}40`;
        break;
      case 'shadow':
        effects.textShadow = '4px 4px 8px rgba(0,0,0,0.5)';
        break;
      case 'outline':
        effects.textStroke = `2px ${borderColor || '#000000'}`;
        effects.WebkitTextStroke = `2px ${borderColor || '#000000'}`;
        break;
      case 'neon':
        effects.textShadow = `0 0 10px ${textColor}, 0 0 20px ${textColor}, 0 0 30px ${textColor}`;
        break;
    }
    
    return effects;
  };

  const canvasStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    backgroundColor,
    color: textColor,
    fontFamily: getFontFamily(),
    fontSize: `${fontSize}px`,
    fontWeight: getFontWeight(),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '2rem',
    borderRadius: `${borderRadius || 0}px`,
    border: borderWidth ? `${borderWidth}px solid ${borderColor || '#000000'}` : 'none',
    position: 'relative',
    overflow: 'hidden',
    aspectRatio: `${width} / ${height}`,
    boxShadow: hasLighting 
      ? `0 0 30px ${textColor}40, inset 0 0 30px ${backgroundColor}20`
      : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    ...getEffectStyles()
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `sign-preview-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">پیش‌نمای تابلو</h2>
          <p className="text-gray-400">
            {generatedImage ? 'پیش‌نمای تولید شده با هوش مصنوعی' : 'پیش‌نمای زنده طراحی شما'}
          </p>
        </div>
        
        {/* Control Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              showGrid 
                ? 'bg-[#57DCDA] text-white' 
                : 'bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.1]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="نمایش شبکه"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={() => setIsFullscreen(true)}
            className="p-2 bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.1] rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="نمایش تمام صفحه"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Preview Container */}
      <motion.div 
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Grid Overlay */}
        {showGrid && (
          <div 
            className="absolute inset-6 pointer-events-none z-10 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(to right, #57DCDA 1px, transparent 1px),
                linear-gradient(to bottom, #57DCDA 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
        )}

        {/* Dimensions Display */}
        <motion.div 
          className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg z-20 flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
          </svg>
          {width} × {height} سانتی‌متر
        </motion.div>

        {/* Status Indicators */}
        <div className="absolute top-2 left-2 flex gap-2 z-20">
          {hasLighting && (
            <motion.div 
              className="bg-yellow-500/20 backdrop-blur-sm text-yellow-300 text-xs px-2 py-1 rounded-lg flex items-center gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              LED
            </motion.div>
          )}
          
          {effectType && effectType !== 'none' && (
            <motion.div 
              className="bg-purple-500/20 backdrop-blur-sm text-purple-300 text-xs px-2 py-1 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {effectType}
            </motion.div>
          )}
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                <LoadingSpinner />
                <motion.p 
                  className="text-white mt-4 text-lg"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  در حال تولید پیش‌نمای هوشمند...
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className="absolute inset-0 bg-red-900/30 backdrop-blur-sm flex items-center justify-center z-30 rounded-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="bg-red-800/80 backdrop-blur-sm text-white p-6 rounded-xl max-w-md text-center">
                <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h3 className="font-bold mb-2 text-lg">خطا در تولید پیش‌نمای</h3>
                <p className="text-red-200">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preview Content */}
        {generatedImage && !isGenerating ? (
          <motion.div 
            className="w-full h-full rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={generatedImage} 
              alt="AI Generated Sign Preview" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        ) : (
          <motion.div 
            style={canvasStyle}
            className="rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center">
                <h3 className="mb-2 leading-tight">
                  {text || "متن تابلو شما"}
                </h3>
                {subtitle && (
                  <p className="text-sm opacity-80 mt-2">
                    {subtitle}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="text-sm text-gray-400">
          آخرین بروزرسانی: {new Date().toLocaleTimeString('fa-IR')}
        </div>
        
        <div className="flex gap-3">
          {generatedImage && (
            <motion.button
              onClick={downloadImage}
              className="flex items-center gap-2 px-6 py-3 bg-white/[0.08] backdrop-blur-sm rounded-xl text-white font-medium hover:bg-white/[0.12] transition-all duration-300 border border-white/[0.12]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              دانلود پیش‌نمای
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              className="max-w-4xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {generatedImage ? (
                <img 
                  src={generatedImage} 
                  alt="Fullscreen Preview" 
                  className="max-w-full max-h-full object-contain rounded-xl"
                />
              ) : (
                <div style={{...canvasStyle, maxWidth: '800px', maxHeight: '600px'}} className="rounded-xl">
                  <div className="text-center">
                    <h3 className="mb-2 leading-tight">
                      {text || "متن تابلو شما"}
                    </h3>
                    {subtitle && (
                      <p className="text-sm opacity-80 mt-2">
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              <motion.button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
