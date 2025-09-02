import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Form, Input, Button, Checkbox, message, Typography } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const { Title, Text } = Typography;

interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Handle form submission
  const handleSubmit = async (values: LoginFormData) => {
    setSubmitLoading(true);
    
    try {
      await login({ email: values.email, password: values.password });
      message.success('ورود موفقیت‌آمیز بود!');
      navigate('/admin/dashboard');
    } catch (error) {
      message.error('نام کاربری یا رمز عبور اشتباه است');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Fill demo credentials
  const fillDemoCredentials = () => {
    form.setFieldsValue({
      email: 'admin@example.com',
      password: 'admin123'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo/Brand Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <UserOutlined className="text-2xl text-white" />
          </div>
          <Title level={2} className="text-gray-800 mb-2">
            پنل مدیریت
          </Title>
          <Text className="text-gray-600">
            وارد حساب کاربری خود شوید
          </Text>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <Form
            form={form}
            name="admin-login"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            className="space-y-4"
          >
            <Form.Item
              name="email"
              label="ایمیل"
              rules={[
                { required: true, message: 'لطفا ایمیل خود را وارد کنید' },
                { type: 'email', message: 'فرمت ایمیل صحیح نیست' }
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="admin@example.com"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="رمز عبور"
              rules={[
                { required: true, message: 'لطفا رمز عبور خود را وارد کنید' },
                { min: 6, message: 'رمز عبور باید حداقل 6 کاراکتر باشد' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="رمز عبور"
                className="rounded-lg"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>مرا به خاطر بسپار</Checkbox>
                </Form.Item>
                <Button type="link" className="p-0 text-blue-600 hover:text-blue-800">
                  فراموشی رمز عبور؟
                </Button>
              </div>
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={submitLoading || isLoading}
                className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 border-none hover:from-blue-700 hover:to-purple-700 text-lg font-medium"
              >
                ورود به پنل
              </Button>
            </Form.Item>
          </Form>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 p-4 bg-gray-50 rounded-lg"
          >
            <Text className="text-gray-600 text-sm block mb-2">
              برای تست سیستم:
            </Text>
            <Button
              type="dashed"
              onClick={fillDemoCredentials}
              className="w-full rounded-lg"
            >
              استفاده از اطلاعات نمونه
            </Button>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-8"
        >
          <Text className="text-gray-500 text-sm">
            ساخته شده با React، TypeScript و Ant Design
          </Text>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
