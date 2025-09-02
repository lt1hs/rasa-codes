import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SignboardUser {
  id: string;
  name: string;
  email: string;
  dailyGenerationsUsed: number;
  maxDailyGenerations: number;
  totalDesigns: number;
  totalOrders: number;
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'suspended';
}

export const SignboardUserManager: React.FC = () => {
  const [users, setUsers] = useState<SignboardUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockUsers: SignboardUser[] = [
      {
        id: 'demo-user',
        name: 'کاربر آزمایشی',
        email: 'demo@test.com',
        dailyGenerationsUsed: 0,
        maxDailyGenerations: 2,
        totalDesigns: 1,
        totalOrders: 0,
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        status: 'active'
      },
      {
        id: 'user-2',
        name: 'احمد محمدی',
        email: 'ahmad@example.com',
        dailyGenerationsUsed: 2,
        maxDailyGenerations: 2,
        totalDesigns: 5,
        totalOrders: 2,
        joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'active'
      }
    ];
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateUserLimit = (userId: string, newLimit: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, maxDailyGenerations: newLimit } : user
    ));
  };

  const resetDailyUsage = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, dailyGenerationsUsed: 0 } : user
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold admin-title-accent">مدیریت کاربران تابلوساز</h2>
        <div className="text-sm admin-text-light opacity-70">
          کل کاربران: {users.length}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="جستجو کاربر..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-input px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="admin-input px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">همه وضعیت‌ها</option>
          <option value="active">فعال</option>
          <option value="inactive">غیرفعال</option>
          <option value="suspended">معلق</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="admin-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full admin-table">
            <thead>
              <tr>
                <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">کاربر</th>
                <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">استفاده روزانه</th>
                <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">کل طرح‌ها</th>
                <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">سفارشات</th>
                <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">وضعیت</th>
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
                    <div>
                      <div className="font-medium admin-text-light">{user.name}</div>
                      <div className="text-sm admin-text-light opacity-70">{user.email}</div>
                      <div className="text-xs admin-text-light opacity-50">
                        عضویت: {new Date(user.joinedAt).toLocaleDateString('fa-IR')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="admin-text-light">{user.dailyGenerationsUsed}/{user.maxDailyGenerations}</div>
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${(user.dailyGenerationsUsed / user.maxDailyGenerations) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 admin-text-light">{user.totalDesigns}</td>
                  <td className="px-6 py-4 admin-text-light">{user.totalOrders}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' ? 'admin-badge-success' :
                      user.status === 'inactive' ? 'bg-gray-500/20 text-gray-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {user.status === 'active' ? 'فعال' : user.status === 'inactive' ? 'غیرفعال' : 'معلق'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => resetDailyUsage(user.id)}
                        className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded text-xs hover:bg-teal-500/30"
                      >
                        ریست روزانه
                      </button>
                      <select
                        value={user.maxDailyGenerations}
                        onChange={(e) => updateUserLimit(user.id, parseInt(e.target.value))}
                        className="admin-input px-2 py-1 rounded text-xs"
                      >
                        <option value={1}>۱ تولید</option>
                        <option value={2}>۲ تولید</option>
                        <option value={5}>۵ تولید</option>
                        <option value={10}>۱۰ تولید</option>
                      </select>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
