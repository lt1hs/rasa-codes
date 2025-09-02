import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon,
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  EyeIcon,
  UserPlusIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../utils/cn';
import { userService, User } from '../../services/user.service';

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0,
    users: 0,
    newThisMonth: 0
  });

  useEffect(() => {
    loadUsers();
    loadStats();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const userData = await userService.getAll();
      setUsers(userData);
    } catch (error) {
      console.error('Failed to load users:', error);
      // Fallback to mock data
      setUsers([
        {
          id: '1',
          name: 'مدیر سیستم',
          email: 'admin@rasacodes.com',
          role: 'super_admin',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          avatar_url: null
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const userStats = await userService.getUserStats();
      setStats(userStats);
    } catch (error) {
      console.error('Failed to load user stats:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('آیا از حذف این کاربر اطمینان دارید؟')) {
      try {
        await userService.deleteUser(userId);
        await loadUsers();
        await loadStats();
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('خطا در حذف کاربر');
      }
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        await userService.deactivateUser(userId);
      } else {
        await userService.activateUser(userId);
      }
      await loadUsers();
      await loadStats();
    } catch (error) {
      console.error('Failed to toggle user status:', error);
      alert('خطا در تغییر وضعیت کاربر');
    }
  };

  const handleChangeRole = async (userId: string, newRole: string) => {
    try {
      await userService.changeUserRole(userId, newRole as any);
      await loadUsers();
      await loadStats();
    } catch (error) {
      console.error('Failed to change user role:', error);
      alert('خطا در تغییر نقش کاربر');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && user.is_active) ||
                      (activeTab === 'inactive' && !user.is_active) ||
                      (activeTab === 'admins' && ['super_admin', 'admin', 'editor'].includes(user.role));
    
    return matchesSearch && matchesTab;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-500/20 text-red-300';
      case 'admin': return 'bg-orange-500/20 text-orange-300';
      case 'editor': return 'bg-blue-500/20 text-blue-300';
      case 'viewer': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'super_admin': return 'مدیر کل';
      case 'admin': return 'مدیر';
      case 'editor': return 'ویرایشگر';
      case 'viewer': return 'بیننده';
      default: return 'کاربر';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="admin-text-light">در حال بارگذاری کاربران...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold admin-title-primary">مدیریت کاربران</h1>
            <p className="admin-text-light opacity-70 mt-2">
              مدیریت کاربران و دسترسی‌های سیستم
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/admin/users/new'}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            کاربر جدید
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          <div className="admin-card rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold admin-text-light">{stats.total}</div>
              <div className="text-sm admin-text-light opacity-70">کل کاربران</div>
            </div>
          </div>
          <div className="admin-card rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{stats.active}</div>
              <div className="text-sm admin-text-light opacity-70">فعال</div>
            </div>
          </div>
          <div className="admin-card rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{stats.inactive}</div>
              <div className="text-sm admin-text-light opacity-70">غیرفعال</div>
            </div>
          </div>
          <div className="admin-card rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.admins}</div>
              <div className="text-sm admin-text-light opacity-70">مدیران</div>
            </div>
          </div>
          <div className="admin-card rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.users}</div>
              <div className="text-sm admin-text-light opacity-70">کاربران عادی</div>
            </div>
          </div>
          <div className="admin-card rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.newThisMonth}</div>
              <div className="text-sm admin-text-light opacity-70">جدید این ماه</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="جستجو کاربران..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-input px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'همه' },
              { key: 'active', label: 'فعال' },
              { key: 'inactive', label: 'غیرفعال' },
              { key: 'admins', label: 'مدیران' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  activeTab === tab.key
                    ? "bg-orange-500 text-white"
                    : "bg-white/10 admin-text-light hover:bg-white/20"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="admin-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full admin-table">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">کاربر</th>
                  <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">نقش</th>
                  <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">وضعیت</th>
                  <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">تاریخ عضویت</th>
                  <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    className="hover:bg-orange-500/5 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                          {user.avatar_url ? (
                            <img src={user.avatar_url} alt={user.name} className="w-10 h-10 rounded-full" />
                          ) : (
                            <UserIcon className="w-5 h-5 text-orange-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium admin-text-light">{user.name}</div>
                          <div className="text-sm admin-text-light opacity-70">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleChangeRole(user.id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)} bg-transparent border-0`}
                      >
                        <option value="super_admin">مدیر کل</option>
                        <option value="admin">مدیر</option>
                        <option value="editor">ویرایشگر</option>
                        <option value="viewer">بیننده</option>
                        <option value="user">کاربر</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleUserStatus(user.id, user.is_active)}
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.is_active 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {user.is_active ? 'فعال' : 'غیرفعال'}
                      </button>
                    </td>
                    <td className="px-6 py-4 admin-text-light">
                      {new Date(user.created_at).toLocaleDateString('fa-IR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.location.href = `/admin/users/edit/${user.id}`}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-xs hover:bg-blue-500/30"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="px-3 py-1 bg-red-500/20 text-red-300 rounded text-xs hover:bg-red-500/30"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold admin-text-light mb-2">هیچ کاربری یافت نشد</h3>
            <p className="admin-text-light opacity-70 mb-6">اولین کاربر را ایجاد کنید</p>
            <button
              onClick={() => window.location.href = '/admin/users/new'}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              ایجاد کاربر جدید
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
