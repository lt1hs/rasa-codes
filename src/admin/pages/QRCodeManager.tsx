import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  ArrowDownTrayIcon as DownloadIcon, 
  QrCodeIcon,
  SparklesIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  EyeIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { message } from 'antd';
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import QRCodeGenerator from '../components/QRCode/QRCodeGenerator';
import QRCodePreview from '../components/QRCode/QRCodePreview';
import QRCodeTemplates from '../components/QRCode/QRCodeTemplates';
import { QRCodeService } from '../services/qrCodeService';
import { cn } from '../utils/cn';

export interface QRCodeData {
  id: string;
  name: string;
  content: string;
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  logo?: string;
  logoSize: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  createdAt: Date;
}

const QRCodeManager: React.FC = () => {
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [selectedQR, setSelectedQR] = useState<QRCodeData | null>(null);
  const [selectedQRs, setSelectedQRs] = useState<QRCodeData[]>([]);
  const [showGenerator, setShowGenerator] = useState(false);
  const [activeView, setActiveView] = useState<'grid' | 'templates'>('grid');
  const previewRef = useRef<{ downloadQR: () => void }>(null);

  // Load QR codes on component mount
  useEffect(() => {
    const loadedQRs = QRCodeService.getQRCodes();
    setQrCodes(loadedQRs);
  }, []);

  const handleCreateQR = (qrData: Omit<QRCodeData, 'id' | 'createdAt'>) => {
    const newQR = QRCodeService.createQRCode(qrData);
    setQrCodes(prev => [...prev, newQR]);
    setSelectedQR(newQR);
    setShowGenerator(false);
    setActiveView('grid');
    message.success('QR Code created successfully!');
  };

  const handleUpdateQR = (updatedQR: QRCodeData) => {
    QRCodeService.updateQRCode(updatedQR);
    setQrCodes(prev => prev.map(qr => qr.id === updatedQR.id ? updatedQR : qr));
    setSelectedQR(updatedQR);
    message.success('QR Code updated successfully!');
  };

  const handleDeleteQR = (id: string) => {
    QRCodeService.deleteQRCode(id);
    setQrCodes(prev => prev.filter(qr => qr.id !== id));
    if (selectedQR?.id === id) {
      setSelectedQR(null);
    }
    setSelectedQRs(prev => prev.filter(qr => qr.id !== id));
    message.success('QR Code deleted successfully!');
  };

  const handleTemplateSelect = (template: any) => {
    setShowGenerator(true);
  };

  const handleDownload = () => {
    if (previewRef.current) {
      previewRef.current.downloadQR();
    }
  };

  const stats = [
    {
      title: 'Total QR Codes',
      value: qrCodes.length,
      icon: QrCodeIcon,
      color: 'primary'
    },
    {
      title: 'This Month',
      value: qrCodes.filter(qr => {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return qr.createdAt > monthAgo;
      }).length,
      icon: SparklesIcon,
      color: 'accent'
    },
    {
      title: 'Selected',
      value: selectedQRs.length,
      icon: DocumentDuplicateIcon,
      color: 'lime'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold admin-title-primary">
            QR Code Manager
          </h1>
          <p className="admin-title-secondary mt-1">
            Create, customize, and manage your QR codes with advanced styling options
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant={activeView === 'grid' ? 'primary' : 'secondary'}
            onClick={() => setActiveView('grid')}
          >
            <QrCodeIcon className="w-4 h-4 mr-2" />
            QR Codes
          </Button>
          <Button
            variant={activeView === 'templates' ? 'primary' : 'secondary'}
            onClick={() => setActiveView('templates')}
          >
            <SparklesIcon className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button
            onClick={() => setShowGenerator(true)}
            variant="primary"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Create QR Code
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={stat.title} className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg hover:border-primary/40 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="admin-title-secondary text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold admin-text-light mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200",
                  stat.color === 'primary' && "bg-orange-500",
                  stat.color === 'accent' && "bg-teal-500",
                  stat.color === 'lime' && "bg-lime-500"
                )}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Panel - QR Codes List or Templates */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-1"
        >
          <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg h-[600px]">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="admin-heading" style={{ color: '#FFE4CC' }}>
                {activeView === 'grid' ? 'Your QR Codes' : 'Templates'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-full overflow-hidden">
              <AnimatePresence mode="wait">
                {activeView === 'grid' ? (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="h-full overflow-y-auto admin-scrollbar p-4"
                  >
                    {qrCodes.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <QrCodeIcon className="w-16 h-16 text-orange-500/50 mb-4" />
                        <p className="admin-title-secondary mb-4">No QR codes yet</p>
                        <Button
                          onClick={() => setShowGenerator(true)}
                          variant="primary"
                        >
                          Create Your First QR Code
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {qrCodes.map((qr) => (
                          <motion.div
                            key={qr.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                              "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                              selectedQR?.id === qr.id
                                ? "border-orange-500 bg-orange-500/10"
                                : "border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                            )}
                            onClick={() => setSelectedQR(qr)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium admin-text-light truncate">
                                  {qr.name}
                                </h4>
                                <p className="text-sm admin-text-light/60 truncate mt-1">
                                  {qr.content}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {qr.size}px
                                  </Badge>
                                  <Badge variant="secondary" className="text-xs">
                                    {qr.errorCorrectionLevel}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 ml-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedQR(qr);
                                  }}
                                  className="p-1 h-auto"
                                >
                                  <EyeIcon className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteQR(qr.id);
                                  }}
                                  className="p-1 h-auto text-red-400 hover:text-red-300"
                                >
                                  <TrashIcon className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="templates"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full overflow-y-auto admin-scrollbar p-4"
                  >
                    <QRCodeTemplates onSelectTemplate={handleTemplateSelect} />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Panel - Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2"
        >
          {selectedQR ? (
            <QRCodePreview
              ref={previewRef}
              qrData={selectedQR}
              onUpdate={handleUpdateQR}
            />
          ) : (
            <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg h-[600px]">
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center">
                  <QrCodeIcon className="w-24 h-24 text-orange-500/30 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold admin-title-primary mb-2">
                    Select a QR Code
                  </h3>
                  <p className="admin-title-secondary mb-6 max-w-md">
                    Choose a QR code from the list to preview and edit, or create a new one to get started.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      onClick={() => setShowGenerator(true)}
                      variant="primary"
                    >
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Create QR Code
                    </Button>
                    <Button
                      onClick={() => setActiveView('templates')}
                      variant="secondary"
                    >
                      <SparklesIcon className="w-4 h-4 mr-2" />
                      Browse Templates
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* QR Code Generator Modal */}
      <QRCodeGenerator
        visible={showGenerator}
        onClose={() => setShowGenerator(false)}
        onCreate={handleCreateQR}
      />
    </div>
  );
};

export default QRCodeManager;
