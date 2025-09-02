import React, { useState, useEffect } from 'react';
import {
  Card,
  Upload,
  Button,
  Space,
  Select,
  Input,
  Modal,
  message,
  Progress,
  Typography,
  Row,
  Col,
  Statistic,
  Tabs,
  Switch,
  Form,
  InputNumber
} from 'antd';
import {
  UploadOutlined,
  CloudUploadOutlined,
  SettingOutlined,
  FolderOutlined,
  FileImageOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  FileZipOutlined,
  ApiOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { 
  MediaFile, 
  MediaUploadProgress, 
  MediaUploadConfig, 
  MediaStats,
  CloudStorage,
  StorageProvider 
} from '../../types/media.types';
import { 
  uploadMedia, 
  getMediaStats, 
  getCloudStorages, 
  connectCloudStorage 
} from '../../services/media.service';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { Dragger } = Upload;

interface MediaUploaderProps {
  onUploadComplete?: (files: MediaFile[]) => void;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<MediaUploadProgress[]>([]);
  const [stats, setStats] = useState<MediaStats | null>(null);
  const [cloudStorages, setCloudStorages] = useState<CloudStorage[]>([]);
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [storageModalVisible, setStorageModalVisible] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<StorageProvider>('local');
  const [uploadConfig, setUploadConfig] = useState<MediaUploadConfig>({
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/*', 'video/*', 'application/pdf', '.zip'],
    autoOptimize: true,
    generateThumbnails: true,
    storageProvider: 'local',
    compressionQuality: 80
  });
  const [form] = Form.useForm();

  // Load data
  useEffect(() => {
    loadStats();
    loadCloudStorages();
  }, []);

  const loadStats = async () => {
    try {
      const mediaStats = await getMediaStats();
      setStats(mediaStats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const loadCloudStorages = async () => {
    try {
      const storages = await getCloudStorages();
      setCloudStorages(storages);
    } catch (error) {
      console.error('Failed to load cloud storages:', error);
    }
  };

  // Handle file upload
  const handleUpload = async (info: any) => {
    const files = info.fileList.map((file: any) => file.originFileObj).filter(Boolean);
    
    if (files.length === 0) return;

    setUploading(true);
    try {
      const progressItems = await uploadMedia(files, uploadConfig);
      setUploadProgress(progressItems);
      
      // Simulate real-time progress updates
      const interval = setInterval(() => {
        setUploadProgress(current => {
          const allComplete = current.every(item => item.status === 'complete' || item.status === 'error');
          if (allComplete) {
            clearInterval(interval);
            setUploading(false);
            message.success(`${current.length} files uploaded successfully`);
            loadStats();
            onUploadComplete?.([] as MediaFile[]); // Refresh parent component
          }
          return current;
        });
      }, 1000);
      
    } catch (error) {
      message.error('Upload failed');
      setUploading(false);
    }
  };

  // Handle cloud storage connection
  const handleConnectStorage = async (values: any) => {
    try {
      await connectCloudStorage(selectedProvider, values);
      message.success(`Connected to ${selectedProvider} successfully`);
      setStorageModalVisible(false);
      form.resetFields();
      loadCloudStorages();
    } catch (error) {
      message.error('Failed to connect storage provider');
    }
  };

  // Format file size
  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get storage usage percentage
  const getStorageUsagePercent = (): number => {
    if (!stats) return 0;
    return Math.round((stats.storageUsed / stats.storageLimit) * 100);
  };

  const storageUsagePercent = getStorageUsagePercent();

  return (
    <div className="media-uploader">
      {/* Statistics */}
      {stats && (
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <Statistic
                  title="Total Files"
                  value={stats.totalFiles}
                  prefix={<FileImageOutlined style={{ color: '#3b82f6' }} />}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <Statistic
                  title="Storage Used"
                  value={formatSize(stats.storageUsed)}
                  suffix={`/ ${formatSize(stats.storageLimit)}`}
                  prefix={<CloudUploadOutlined style={{ color: '#10b981' }} />}
                />
                <Progress 
                  percent={storageUsagePercent} 
                  size="small" 
                  className="mt-2"
                  status={storageUsagePercent > 80 ? 'exception' : 'normal'}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <Statistic
                  title="Images"
                  value={stats.imageCount}
                  prefix={<FileImageOutlined style={{ color: '#f59e0b' }} />}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <Statistic
                  title="Videos"
                  value={stats.videoCount}
                  prefix={<VideoCameraOutlined style={{ color: '#ef4444' }} />}
                />
              </Card>
            </motion.div>
          </Col>
        </Row>
      )}

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <Title level={3} className="mb-1">
                Media Upload
              </Title>
              <Text className="text-gray-500">
                Upload and manage your media files with cloud integration
              </Text>
            </div>
            <Space>
              <Button
                icon={<ApiOutlined />}
                onClick={() => setStorageModalVisible(true)}
              >
                Cloud Storage
              </Button>
              <Button
                icon={<SettingOutlined />}
                onClick={() => setConfigModalVisible(true)}
              >
                Settings
              </Button>
            </Space>
          </div>

          {/* Upload Component */}
          <Dragger
            name="files"
            multiple
            accept={uploadConfig.allowedTypes.join(',')}
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleUpload}
            disabled={uploading}
            className="mb-4"
          >
            <p className="ant-upload-drag-icon">
              <CloudUploadOutlined style={{ fontSize: 48, color: '#1890ff' }} />
            </p>
            <p className="ant-upload-text">
              Click or drag files to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for single or bulk upload. Max file size: {formatSize(uploadConfig.maxFileSize)}
            </p>
            <div className="mt-2">
              <Text type="secondary">
                Allowed types: Images, Videos, Documents, Archives
              </Text>
            </div>
          </Dragger>

          {/* Upload Progress */}
          {uploadProgress.length > 0 && (
            <div className="mb-4">
              <Title level={5}>Upload Progress</Title>
              {uploadProgress.map((item) => (
                <div key={item.id} className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <Text className="text-sm">{item.fileName}</Text>
                    <Text className="text-sm text-gray-500">{item.status}</Text>
                  </div>
                  <Progress 
                    percent={item.progress} 
                    size="small"
                    status={item.status === 'error' ? 'exception' : 'normal'}
                  />
                  {item.error && (
                    <Text type="danger" className="text-xs">{item.error}</Text>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Cloud Storage Status */}
          <div className="border-t pt-4">
            <Title level={5}>Connected Storage Providers</Title>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cloudStorages.map((storage) => (
                <div 
                  key={storage.provider}
                  className={`p-3 border rounded-lg ${storage.isConnected ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <Text strong className="capitalize">
                        {storage.provider.replace('_', ' ')}
                      </Text>
                      <div className="text-xs text-gray-500">
                        {storage.isConnected ? 'Connected' : 'Not Connected'}
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${storage.isConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
                  </div>
                  {storage.lastSync && (
                    <div className="text-xs text-gray-400 mt-1">
                      Last sync: {storage.lastSync.toLocaleString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Upload Configuration Modal */}
      <Modal
        title="Upload Configuration"
        open={configModalVisible}
        onCancel={() => setConfigModalVisible(false)}
        onOk={() => {
          message.success('Configuration updated');
          setConfigModalVisible(false);
        }}
        width={600}
      >
        <Form layout="vertical" initialValues={uploadConfig}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label="Max File Size (MB)">
                <InputNumber
                  min={1}
                  max={100}
                  value={uploadConfig.maxFileSize / (1024 * 1024)}
                  onChange={(value) => setUploadConfig(prev => ({
                    ...prev,
                    maxFileSize: (value || 10) * 1024 * 1024
                  }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Compression Quality">
                <InputNumber
                  min={10}
                  max={100}
                  value={uploadConfig.compressionQuality}
                  onChange={(value) => setUploadConfig(prev => ({
                    ...prev,
                    compressionQuality: value || 80
                  }))}
                  formatter={value => `${value}%`}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Auto Optimize">
                <Switch
                  checked={uploadConfig.autoOptimize}
                  onChange={(checked) => setUploadConfig(prev => ({
                    ...prev,
                    autoOptimize: checked
                  }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Generate Thumbnails">
                <Switch
                  checked={uploadConfig.generateThumbnails}
                  onChange={(checked) => setUploadConfig(prev => ({
                    ...prev,
                    generateThumbnails: checked
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Default Storage Provider">
                <Select
                  value={uploadConfig.storageProvider}
                  onChange={(value) => setUploadConfig(prev => ({
                    ...prev,
                    storageProvider: value
                  }))}
                >
                  <Option value="local">Local Storage</Option>
                  <Option value="aws_s3">AWS S3</Option>
                  <Option value="cloudinary">Cloudinary</Option>
                  <Option value="google_cloud">Google Cloud</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Cloud Storage Connection Modal */}
      <Modal
        title="Connect Cloud Storage"
        open={storageModalVisible}
        onCancel={() => {
          setStorageModalVisible(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleConnectStorage}>
          <Form.Item label="Storage Provider">
            <Select
              value={selectedProvider}
              onChange={setSelectedProvider}
            >
              <Option value="aws_s3">AWS S3</Option>
              <Option value="cloudinary">Cloudinary</Option>
              <Option value="google_cloud">Google Cloud Storage</Option>
            </Select>
          </Form.Item>

          {selectedProvider === 'aws_s3' && (
            <>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item name="accessKey" label="Access Key" rules={[{ required: true }]}>
                    <Input placeholder="Your AWS access key" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="secretKey" label="Secret Key" rules={[{ required: true }]}>
                    <Input.Password placeholder="Your AWS secret key" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="bucket" label="Bucket Name" rules={[{ required: true }]}>
                    <Input placeholder="my-bucket-name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="region" label="Region" rules={[{ required: true }]}>
                    <Select placeholder="Select region">
                      <Option value="us-east-1">US East (N. Virginia)</Option>
                      <Option value="us-west-2">US West (Oregon)</Option>
                      <Option value="eu-west-1">Europe (Ireland)</Option>
                      <Option value="ap-southeast-1">Asia Pacific (Singapore)</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          {selectedProvider === 'cloudinary' && (
            <>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item name="cloudName" label="Cloud Name" rules={[{ required: true }]}>
                    <Input placeholder="Your Cloudinary cloud name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="apiKey" label="API Key" rules={[{ required: true }]}>
                    <Input placeholder="Your Cloudinary API key" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="apiSecret" label="API Secret" rules={[{ required: true }]}>
                    <Input.Password placeholder="Your Cloudinary API secret" />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          {selectedProvider === 'google_cloud' && (
            <>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item name="bucket" label="Bucket Name" rules={[{ required: true }]}>
                    <Input placeholder="my-gcs-bucket" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="serviceAccount" label="Service Account JSON">
                    <Input.TextArea
                      rows={4}
                      placeholder="Paste your service account JSON here"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default MediaUploader;