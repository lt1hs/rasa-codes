import React from 'react';
import { Tabs } from 'antd';
import {
  CloudUploadOutlined,
  PictureOutlined
} from '@ant-design/icons';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import MediaUploader from '../../components/media/MediaUploader';
import MediaLibrary from '../../components/media/MediaLibrary';

const MediaManagement: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab from current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/upload')) return 'upload';
    if (path.includes('/library')) return 'library';
    return 'library'; // default
  };

  const handleTabChange = (key: string) => {
    switch (key) {
      case 'upload':
        navigate('/admin/media/upload');
        break;
      case 'library':
        navigate('/admin/media/library');
        break;
      default:
        navigate('/admin/media/library');
    }
  };

  const handleUploadComplete = () => {
    // Switch to library tab after upload
    navigate('/admin/media/library');
  };

  return (
    <div className="media-management">
      <Routes>
        {/* Default route - redirect to library */}
        <Route index element={<Navigate to="library" replace />} />
        
        {/* Library route */}
        <Route 
          path="library" 
          element={
            <Tabs 
              activeKey="library" 
              onChange={handleTabChange}
              type="card"
              className="media-tabs"
              items={[
                {
                  key: 'library',
                  label: (
                    <span>
                      <PictureOutlined />
                      Media Library
                    </span>
                  ),
                  children: <MediaLibrary />
                },
                {
                  key: 'upload',
                  label: (
                    <span>
                      <CloudUploadOutlined />
                      Upload
                    </span>
                  ),
                  children: <MediaUploader onUploadComplete={handleUploadComplete} />
                }
              ]}
            />
          } 
        />
        
        {/* Upload route */}
        <Route 
          path="upload" 
          element={
            <Tabs 
              activeKey="upload" 
              onChange={handleTabChange}
              type="card"
              className="media-tabs"
              items={[
                {
                  key: 'library',
                  label: (
                    <span>
                      <PictureOutlined />
                      Media Library
                    </span>
                  ),
                  children: <MediaLibrary />
                },
                {
                  key: 'upload',
                  label: (
                    <span>
                      <CloudUploadOutlined />
                      Upload
                    </span>
                  ),
                  children: <MediaUploader onUploadComplete={handleUploadComplete} />
                }
              ]}
            />
          } 
        />
      </Routes>
    </div>
  );
};

export default MediaManagement;