import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  Space,
  message,
  Typography
} from 'antd';
import {
  SaveOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import RichTextEditor from '../editor/RichTextEditor';
import { 
  ContentFormData, 
  ContentItem, 
  ContentType, 
  ContentStatus
} from '../../types/content.types';
import { 
  createContent, 
  updateContent, 
  getContentById
} from '../../services/content.service';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

interface ContentEditorProps {
  mode?: 'create' | 'edit';
  contentType?: ContentType;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ 
  mode = 'create', 
  contentType = 'blog_post' 
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ContentItem | null>(null);

  // Load initial data
  useEffect(() => {
    if (mode === 'edit' && id) {
      loadContent();
    }
  }, [id, mode]);

  const loadContent = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const contentData = await getContentById(id);
      setContent(contentData);
      
      // Populate form
      form.setFieldsValue({
        title: contentData.title,
        slug: contentData.slug,
        content: contentData.content,
        excerpt: contentData.excerpt,
        status: contentData.status,
        tags: contentData.tags,
        categories: contentData.categories
      });
    } catch (error) {
      message.error('Failed to load content data');
    } finally {
      setLoading(false);
    }
  };

  // Handle save
  const handleSave = async (status: ContentStatus = 'draft') => {
    setSaving(true);
    try {
      const formData = await form.validateFields();
      const submitData: ContentFormData = {
        ...formData,
        status,
        type: contentType,
        seo: {}
      };

      let result;
      if (mode === 'create') {
        result = await createContent(submitData);
        message.success('Content created successfully!');
        navigate(`/admin/content/edit/${result.id}`);
      } else {
        result = await updateContent(id!, submitData);
        message.success('Content updated successfully!');
        setContent(result);
      }
    } catch (error) {
      message.error('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = generateSlug(title);
    form.setFieldValue('slug', slug);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="content-editor"
    >
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <Title level={3} className="mb-1">
              {mode === 'create' ? 'Create New Content' : 'Edit Content'}
            </Title>
            <Text className="text-gray-500">
              {mode === 'create' ? 'Write and publish amazing content' : 'Update your content'}
            </Text>
          </div>
          <Space>
            <Button onClick={() => navigate('/admin/content')}>Cancel</Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={saving}
              onClick={() => handleSave()}
            >
              Save Draft
            </Button>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              loading={saving}
              onClick={() => handleSave('published')}
              style={{ backgroundColor: '#10b981' }}
            >
              Publish
            </Button>
          </Space>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            type: contentType,
            status: 'draft'
          }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card title="Content" className="h-full">
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: 'Title is required' }]}
                >
                  <Input
                    placeholder="Enter content title..."
                    size="large"
                    onChange={handleTitleChange}
                  />
                </Form.Item>

                <Form.Item
                  name="slug"
                  label="Slug"
                  rules={[{ required: true, message: 'Slug is required' }]}
                >
                  <Input
                    placeholder="content-slug"
                    addonBefore="/"
                  />
                </Form.Item>

                <Form.Item name="excerpt" label="Excerpt">
                  <TextArea
                    placeholder="Brief description or excerpt (optional)..."
                    rows={3}
                  />
                </Form.Item>

                <Form.Item
                  name="content"
                  label="Content"
                  rules={[{ required: true, message: 'Content is required' }]}
                >
                  <RichTextEditor
                    height={400}
                    placeholder="Start writing your content..."
                    onSave={(contentValue) => {
                      form.setFieldValue('content', contentValue);
                      handleSave();
                    }}
                  />
                </Form.Item>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Space direction="vertical" className="w-full" size="large">
                {/* Publishing Options */}
                <Card title="Publishing" size="small">
                  <Form.Item name="status" label="Status">
                    <Select>
                      <Option value="draft">Draft</Option>
                      <Option value="published">Published</Option>
                      <Option value="scheduled">Scheduled</Option>
                      <Option value="archived">Archived</Option>
                    </Select>
                  </Form.Item>
                </Card>

                {/* Categories and Tags */}
                <Card title="Categories & Tags" size="small">
                  <Form.Item name="categories" label="Categories">
                    <Select
                      mode="multiple"
                      placeholder="Select categories"
                      options={[
                        { label: 'Development', value: 'development' },
                        { label: 'Frontend', value: 'frontend' },
                        { label: 'Backend', value: 'backend' }
                      ]}
                    />
                  </Form.Item>

                  <Form.Item name="tags" label="Tags">
                    <Select
                      mode="tags"
                      placeholder="Add tags"
                      options={[
                        { label: 'React', value: 'react' },
                        { label: 'TypeScript', value: 'typescript' },
                        { label: 'JavaScript', value: 'javascript' }
                      ]}
                    />
                  </Form.Item>
                </Card>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    </motion.div>
  );
};

export default ContentEditor;