import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SignboardDesign {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  storeName: string;
  businessType: string;
  aiPrompt: string;
  generatedImages: string[];
  createdAt: string;
  ordered: boolean;
  orderDate?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

export const SignboardDesignManager: React.FC = () => {
  const [designs, setDesigns] = useState<SignboardDesign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDesign, setSelectedDesign] = useState<SignboardDesign | null>(null);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockDesigns: SignboardDesign[] = [
      {
        id: 'demo-design-1',
        userId: 'demo-user',
        userName: 'کاربر آزمایشی',
        userEmail: 'demo@test.com',
        storeName: 'کافه رویا',
        businessType: 'کافه',
        aiPrompt: 'تابلو مدرن با رنگ‌های گرم و نور LED',
        generatedImages: [
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzU3RENEQSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPtmG2YXZiNmG2Ycg2LfYsdit8J+OqDwvdGV4dD48L3N2Zz4='
        ],
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        ordered: false,
        status: 'pending'
      },
      {
        id: 'design-2',
        userId: 'user-2',
        userName: 'احمد محمدی',
        userEmail: 'ahmad@example.com',
        storeName: 'رستوران سنتی',
        businessType: 'رستوران',
        aiPrompt: 'تابلو کلاسیک با طراحی سنتی ایرانی',
        generatedImages: [
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzNBQURBQiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPtix2LPYqtmI2LHYp9mGINiz2YbYqtuMPC90ZXh0Pjwvc3ZnPg=='
        ],
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        ordered: true,
        orderDate: new Date(Date.now() - 86400000).toISOString(),
        status: 'in_progress'
      }
    ];
    setDesigns(mockDesigns);
  }, []);

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.businessType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'ordered' && design.ordered) ||
                         (statusFilter === 'pending' && !design.ordered) ||
                         design.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateDesignStatus = (designId: string, newStatus: SignboardDesign['status']) => {
    setDesigns(prev => prev.map(design => 
      design.id === designId ? { ...design, status: newStatus } : design
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300';
      case 'in_progress': return 'bg-blue-500/20 text-blue-300';
      case 'completed': return 'bg-green-500/20 text-green-300';
      case 'cancelled': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'در انتظار';
      case 'in_progress': return 'در حال انجام';
      case 'completed': return 'تکمیل شده';
      case 'cancelled': return 'لغو شده';
      default: return 'نامشخص';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold admin-title-accent">مدیریت طرح‌های تابلو</h2>
        <div className="text-sm admin-text-light opacity-70">
          کل طرح‌ها: {designs.length} | سفارش شده: {designs.filter(d => d.ordered).length}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="جستجو طرح..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-input px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="admin-input px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">همه طرح‌ها</option>
          <option value="pending">در انتظار</option>
          <option value="ordered">سفارش شده</option>
          <option value="in_progress">در حال انجام</option>
          <option value="completed">تکمیل شده</option>
          <option value="cancelled">لغو شده</option>
        </select>
      </div>

      {/* Designs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDesigns.map((design) => (
          <motion.div
            key={design.id}
            className="admin-card rounded-xl p-6 hover:bg-orange-500/5 transition-colors cursor-pointer"
            onClick={() => setSelectedDesign(design)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold admin-text-light text-lg">{design.storeName}</h3>
                <p className="admin-text-light opacity-70 text-sm">{design.businessType}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(design.status)}`}>
                {getStatusText(design.status)}
              </span>
            </div>

            <div className="mb-4">
              <img 
                src={design.generatedImages[0]} 
                alt={design.storeName}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-2 text-sm">
              <div className="admin-text-light opacity-80">
                <span className="opacity-60">کاربر:</span> {design.userName}
              </div>
              <div className="admin-text-light opacity-80">
                <span className="opacity-60">تاریخ:</span> {new Date(design.createdAt).toLocaleDateString('fa-IR')}
              </div>
              {design.ordered && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-lime-500 rounded-full"></span>
                  <span className="text-lime-300 text-xs">سفارش داده شده</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <select
                value={design.status}
                onChange={(e) => {
                  e.stopPropagation();
                  updateDesignStatus(design.id, e.target.value as SignboardDesign['status']);
                }}
                className="admin-input flex-1 px-2 py-1 rounded text-xs"
              >
                <option value="pending">در انتظار</option>
                <option value="in_progress">در حال انجام</option>
                <option value="completed">تکمیل شده</option>
                <option value="cancelled">لغو شده</option>
              </select>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Design Detail Modal */}
      {selectedDesign && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedDesign(null)}
        >
          <motion.div
            className="admin-modal rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold admin-title-accent">{selectedDesign.storeName}</h2>
                  <p className="admin-text-light opacity-70">{selectedDesign.businessType}</p>
                </div>
                <button
                  onClick={() => setSelectedDesign(null)}
                  className="admin-text-light opacity-70 hover:opacity-100"
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold admin-text-light mb-3">اطلاعات کاربر</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="admin-text-light opacity-60">نام:</span> <span className="admin-text-light">{selectedDesign.userName}</span></div>
                    <div><span className="admin-text-light opacity-60">ایمیل:</span> <span className="admin-text-light">{selectedDesign.userEmail}</span></div>
                    <div><span className="admin-text-light opacity-60">تاریخ ایجاد:</span> <span className="admin-text-light">{new Date(selectedDesign.createdAt).toLocaleDateString('fa-IR')}</span></div>
                    {selectedDesign.orderDate && (
                      <div><span className="admin-text-light opacity-60">تاریخ سفارش:</span> <span className="admin-text-light">{new Date(selectedDesign.orderDate).toLocaleDateString('fa-IR')}</span></div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold admin-text-light mb-3">درخواست طراحی</h3>
                  <p className="admin-text-light text-sm admin-card p-3 rounded-lg">
                    {selectedDesign.aiPrompt}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold admin-text-light mb-3">طرح‌های تولید شده</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedDesign.generatedImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`طرح ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
