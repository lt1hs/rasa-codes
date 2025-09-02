import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowRightIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ShieldCheckIcon,
  KeyIcon,
  PhotoIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../utils/cn';
import { userService } from '../../services/user.service';

const UserEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'super_admin' | 'admin' | 'editor' | 'viewer' | 'user'
  });

  useEffect(() => {
    if (isEditing && id) {
      loadUser(id);
    }
  }, [id, isEditing]);

  const loadUser = async (userId: string) => {
    try {
      setIsLoading(true);
      const user = await userService.getById(userId);
      if (user) {
        setUserData({
          name: user.name,
          email: user.email,
          password: '',
          confirmPassword: '',
          role: user.role
        });
      }
    } catch (error) {
      console.error('Failed to load user:', error);
      alert('خطا در بارگذاری اطلاعات کاربر');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Validation
      if (!userData.name.trim()) {
        alert('نام کاربر الزامی است');
        return;
      }
      if (!userData.email.trim()) {
        alert('ایمیل الزامی است');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        alert('فرمت ایمیل صحیح نیست. مثال: user@example.com');
        return;
      }
      
      // Check for valid domain
      const domain = userData.email.split('@')[1];
      const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'example.com', 'test.com', 'rasacodes.com'];
      if (!validDomains.some(validDomain => domain.endsWith(validDomain))) {
        alert('لطفاً از یک ایمیل معتبر استفاده کنید (مثل gmail.com, yahoo.com)');
        return;
      }
      
      if (!isEditing && !userData.password) {
        alert('رمز عبور الزامی است');
        return;
      }
      if (!isEditing && userData.password !== userData.confirmPassword) {
        alert('رمز عبور و تکرار آن مطابقت ندارند');
        return;
      }

      setIsSaving(true);

      if (isEditing && id) {
        // Update existing user
        await userService.updateUser(id, {
          name: userData.name,
          email: userData.email,
          role: userData.role
        });
        alert('کاربر با موفقیت به‌روزرسانی شد');
      } else {
        // Create new user
        await userService.createUser({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role
        });
        alert('کاربر با موفقیت ایجاد شد');
      }

      navigate('/admin/users');
    } catch (error: any) {
      console.error('Failed to save user:', error);
      alert('خطا در ذخیره کاربر: ' + (error.message || 'خطای نامشخص'));
    } finally {
      setIsSaving(false);
    }
  };

  const roles = [
    { 
      value: 'super_admin', 
      label: 'مدیر کل', 
      color: 'bg-red-500',
      description: 'دسترسی کامل به تمام بخشهای سیستم'
    },
    { 
      value: 'admin', 
      label: 'مدیر', 
      color: 'bg-orange-500',
      description: 'مدیریت کاربران و محتوا'
    },
    { 
      value: 'editor', 
      label: 'ویرایشگر', 
      color: 'bg-blue-500',
      description: 'مدیریت و ویرایش محتوای سایت'
    },
    { 
      value: 'viewer', 
      label: 'بیننده', 
      color: 'bg-green-500',
      description: 'مشاهده محتوا بدون امکان ویرایش'
    },
    { 
      value: 'user', 
      label: 'کاربر عادی', 
      color: 'bg-gray-500',
      description: 'دسترسی محدود به بخش عمومی'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="admin-text-light">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold admin-title-primary">
              {isEditing ? 'ویرایش کاربر' : 'کاربر جدید'}
            </h1>
            <p className="admin-text-light opacity-70 mt-2">
              {isEditing ? 'ویرایش اطلاعات کاربر موجود' : 'ایجاد حساب کاربری جدید'}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
            >
              {isSaving ? 'در حال ذخیره...' : 'ذخیره'}
            </button>
            <button
              onClick={() => navigate('/admin/users')}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              لغو
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="admin-card rounded-xl p-6">
              <h3 className="text-lg font-semibold admin-title-accent mb-4">اطلاعات پایه</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium admin-text-light mb-2">نام کامل</label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    className="admin-input w-full px-4 py-3 rounded-lg"
                    placeholder="نام کامل کاربر"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium admin-text-light mb-2">ایمیل</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    className="admin-input w-full px-4 py-3 rounded-lg"
                    placeholder="example@domain.com"
                  />
                </div>

                {!isEditing && (
                  <>
                    <div>
                      <label className="block text-sm font-medium admin-text-light mb-2">رمز عبور</label>
                      <input
                        type="password"
                        value={userData.password}
                        onChange={(e) => setUserData(prev => ({ ...prev, password: e.target.value }))}
                        className="admin-input w-full px-4 py-3 rounded-lg"
                        placeholder="رمز عبور"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium admin-text-light mb-2">تکرار رمز عبور</label>
                      <input
                        type="password"
                        value={userData.confirmPassword}
                        onChange={(e) => setUserData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="admin-input w-full px-4 py-3 rounded-lg"
                        placeholder="تکرار رمز عبور"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Role Selection */}
            <div className="admin-card rounded-xl p-6">
              <h3 className="text-lg font-semibold admin-title-accent mb-4">نقش کاربر</h3>
              <div className="space-y-3">
                {roles.map((role) => (
                  <label
                    key={role.value}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                      userData.role === role.value
                        ? "bg-orange-500/20 border border-orange-500/50"
                        : "bg-white/5 hover:bg-white/10"
                    )}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={userData.role === role.value}
                      onChange={(e) => setUserData(prev => ({ ...prev, role: e.target.value as any }))}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={cn("w-3 h-3 rounded-full", role.color)}></div>
                        <span className="font-medium admin-text-light">{role.label}</span>
                      </div>
                      <p className="text-sm admin-text-light opacity-70">{role.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="admin-card rounded-xl p-6">
              <h3 className="text-lg font-semibold admin-title-accent mb-4">عملیات</h3>
              <div className="space-y-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
                >
                  {isSaving ? 'در حال ذخیره...' : (isEditing ? 'به‌روزرسانی' : 'ایجاد کاربر')}
                </button>
                <button
                  onClick={() => navigate('/admin/users')}
                  className="w-full px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  بازگشت به لیست
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditor;
