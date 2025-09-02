import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeCanvasProps {
  content: string;
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  logo?: string;
  logoSize?: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

const QRCodeCanvas: React.FC<QRCodeCanvasProps> = ({
  content,
  size,
  foregroundColor,
  backgroundColor,
  logo,
  logoSize = 20,
  errorCorrectionLevel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      try {
        // Generate QR code
        await QRCode.toCanvas(canvas, content, {
          width: size,
          margin: 2,
          color: {
            dark: foregroundColor,
            light: backgroundColor,
          },
          errorCorrectionLevel,
        });

        // Add logo if provided
        if (logo) {
          const logoImg = new Image();
          logoImg.onload = () => {
            const logoSizePixels = (size * logoSize) / 100;
            const x = (size - logoSizePixels) / 2;
            const y = (size - logoSizePixels) / 2;

            // Create a white background for the logo
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(x - 5, y - 5, logoSizePixels + 10, logoSizePixels + 10);

            // Draw the logo
            ctx.drawImage(logoImg, x, y, logoSizePixels, logoSizePixels);
          };
          logoImg.src = logo;
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [content, size, foregroundColor, backgroundColor, logo, logoSize, errorCorrectionLevel]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '1px solid #d9d9d9',
        borderRadius: '6px',
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
};

export default QRCodeCanvas;
