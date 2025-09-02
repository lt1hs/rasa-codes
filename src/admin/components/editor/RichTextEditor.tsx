import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Tooltip, Modal, Upload, message } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  LinkOutlined,
  PictureOutlined,
  CodeOutlined,
  EyeOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  height?: number;
  preview?: boolean;
  toolbar?: boolean;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = '',
  onChange,
  placeholder = 'Start writing...',
  height = 400,
  preview = true,
  toolbar = true,
  className = ''
}) => {
  const [content, setContent] = useState(value);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleChange = (val?: string) => {
    const newValue = val || '';
    setContent(newValue);
    onChange?.(newValue);
  };

  const insertText = (text: string) => {
    const newContent = content + text;
    handleChange(newContent);
  };

  const formatText = (prefix: string, suffix: string = prefix) => {
    const selection = window.getSelection()?.toString() || 'text';
    const formatted = `${prefix}${selection}${suffix}`;
    insertText(formatted);
  };

  const handleImageUpload = (info: any) => {
    if (info.file.status === 'done') {
      const imageUrl = info.file.response?.url || URL.createObjectURL(info.file.originFileObj);
      const imageMarkdown = `![Image](${imageUrl})`;
      insertText(imageMarkdown);
      message.success('Image uploaded successfully');
      setShowImageModal(false);
    } else if (info.file.status === 'error') {
      message.error('Image upload failed');
    }
  };

  const insertLink = () => {
    if (linkText && linkUrl) {
      const linkMarkdown = `[${linkText}](${linkUrl})`;
      insertText(linkMarkdown);
      setLinkText('');
      setLinkUrl('');
      setShowLinkModal(false);
    }
  };

  const customToolbar = toolbar ? (
    <div className="flex items-center justify-between p-2 border-b bg-gray-50">
      <Space>
        <Tooltip title="Bold">
          <Button
            type="text"
            size="small"
            icon={<BoldOutlined />}
            onClick={() => formatText('**')}
          />
        </Tooltip>
        
        <Tooltip title="Italic">
          <Button
            type="text"
            size="small"
            icon={<ItalicOutlined />}
            onClick={() => formatText('*')}
          />
        </Tooltip>
        
        <Tooltip title="Strikethrough">
          <Button
            type="text"
            size="small"
            icon={<StrikethroughOutlined />}
            onClick={() => formatText('~~')}
          />
        </Tooltip>
        
        <div className="w-px h-4 bg-gray-300 mx-1" />
        
        <Tooltip title="Ordered List">
          <Button
            type="text"
            size="small"
            icon={<OrderedListOutlined />}
            onClick={() => insertText('\n1. List item\n')}
          />
        </Tooltip>
        
        <Tooltip title="Unordered List">
          <Button
            type="text"
            size="small"
            icon={<UnorderedListOutlined />}
            onClick={() => insertText('\n- List item\n')}
          />
        </Tooltip>
        
        <div className="w-px h-4 bg-gray-300 mx-1" />
        
        <Tooltip title="Insert Link">
          <Button
            type="text"
            size="small"
            icon={<LinkOutlined />}
            onClick={() => setShowLinkModal(true)}
          />
        </Tooltip>
        
        <Tooltip title="Insert Image">
          <Button
            type="text"
            size="small"
            icon={<PictureOutlined />}
            onClick={() => setShowImageModal(true)}
          />
        </Tooltip>
        
        <Tooltip title="Code Block">
          <Button
            type="text"
            size="small"
            icon={<CodeOutlined />}
            onClick={() => insertText('\n```\ncode here\n```\n')}
          />
        </Tooltip>
      </Space>
      
      <Space>
        <Tooltip title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
          <Button
            type="text"
            size="small"
            icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            onClick={() => setIsFullscreen(!isFullscreen)}
          />
        </Tooltip>
      </Space>
    </div>
  ) : null;

  const editorProps = {
    value: content,
    onChange: handleChange,
    height,
    preview: preview ? 'edit' : 'edit',
    hideToolbar: !toolbar,
    visibleDragBar: false,
    data: {
      'data-color-mode': 'light'
    }
  };

  const editorContent = (
    <div className={`rich-text-editor ${className}`}>
      {customToolbar}
      <MDEditor {...editorProps} />
    </div>
  );

  return (
    <>
      {isFullscreen ? (
        <div className="fixed inset-0 z-50 bg-white">
          <Card className="h-full" bodyStyle={{ height: '100%', padding: 0 }}>
            {editorContent}
          </Card>
        </div>
      ) : (
        <Card bodyStyle={{ padding: 0 }}>
          {editorContent}
        </Card>
      )}

      {/* Link Modal */}
      <Modal
        title="Insert Link"
        open={showLinkModal}
        onOk={insertLink}
        onCancel={() => {
          setShowLinkModal(false);
          setLinkText('');
          setLinkUrl('');
        }}
        okText="Insert"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Link Text</label>
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Enter link text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Modal>

      {/* Image Modal */}
      <Modal
        title="Insert Image"
        open={showImageModal}
        onCancel={() => setShowImageModal(false)}
        footer={null}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <Upload.Dragger
              name="image"
              multiple={false}
              accept="image/*"
              action="/api/upload"
              onChange={handleImageUpload}
              showUploadList={false}
            >
              <p className="ant-upload-drag-icon">
                <PictureOutlined />
              </p>
              <p className="ant-upload-text">Click or drag image to upload</p>
              <p className="ant-upload-hint">Support for single image upload. Max size: 5MB</p>
            </Upload.Dragger>
          </div>
          
          <div className="text-center text-gray-500">or</div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <div className="flex space-x-2">
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const url = (e.target as HTMLInputElement).value;
                    if (url) {
                      insertText(`![Image](${url})`);
                      setShowImageModal(false);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
              <Button
                type="primary"
                onClick={(e) => {
                  const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                  const url = input?.value;
                  if (url) {
                    insertText(`![Image](${url})`);
                    setShowImageModal(false);
                    input.value = '';
                  }
                }}
              >
                Insert
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RichTextEditor;