import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SignboardOrder {
  id: string;
  designId: string;
  userId: string;
  userName: string;
  userEmail: string;
  storeName: string;
  businessType: string;
  selectedImage: string;
  orderDate: string;
  status: 'pending' | 'contacted' | 'in_production' | 'ready' | 'delivered' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  notes: string;
  estimatedDelivery?: string;
  contactAttempts: number;
  lastContactDate?: string;
}

export const SignboardOrderManager: React.FC = () => {
  const [orders, setOrders] = useState<SignboardOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<SignboardOrder | null>(null);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockOrders: SignboardOrder[] = [
      {
        id: 'order-1',
        designId: 'design-2',
        userId: 'user-2',
        userName: 'احمد محمدی',
        userEmail: 'ahmad@example.com',
        storeName: 'رستوران سنتی',
        businessType: 'رستوران',
        selectedImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzNBQURBQiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPtix2LPYqtmI2LHYp9mGINiz2YbYqtuMPC90ZXh0Pjwvc3ZnPg==',
        orderDate: new Date(Date.now() - 86400000).toISOString(),
        status: 'contacted',
        priority: 'high',
        notes: 'مشتری برای جزئیات بیشتر تماس گرفته',
        estimatedDelivery: new Date(Date.now() + 7 * 86400000).toISOString(),
        contactAttempts: 1,
        lastContactDate: new Date(Date.now() - 3600000).toISOString()
      }
    ];
    setOrders(mockOrders);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: SignboardOrder['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const updateOrderPriority = (orderId: string, newPriority: SignboardOrder['priority']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, priority: newPriority } : order
    ));
  };

  const addContactAttempt = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { 
        ...order, 
        contactAttempts: order.contactAttempts + 1,
        lastContactDate: new Date().toISOString()
      } : order
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300';
      case 'contacted': return 'bg-blue-500/20 text-blue-300';
      case 'in_production': return 'bg-purple-500/20 text-purple-300';
      case 'ready': return 'bg-green-500/20 text-green-300';
      case 'delivered': return 'bg-emerald-500/20 text-emerald-300';
      case 'cancelled': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'در انتظار تماس';
      case 'contacted': return 'تماس برقرار شده';
      case 'in_production': return 'در حال تولید';
      case 'ready': return 'آماده تحویل';
      case 'delivered': return 'تحویل داده شده';
      case 'cancelled': return 'لغو شده';
      default: return 'نامشخص';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold admin-title-accent">مدیریت سفارشات تابلو</h2>
        <div className="text-sm admin-text-light opacity-70">
          کل سفارشات: {orders.length} | در انتظار: {orders.filter(o => o.status === 'pending').length}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="جستجو سفارش..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-input px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="admin-input px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">همه سفارشات</option>
          <option value="pending">در انتظار تماس</option>
          <option value="contacted">تماس برقرار شده</option>
          <option value="in_production">در حال تولید</option>
          <option value="ready">آماده تحویل</option>
          <option value="delivered">تحویل داده شده</option>
          <option value="cancelled">لغو شده</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="admin-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full admin-table">
            <thead>
              <tr>
                <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">سفارش</th>
                <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">مشتری</th>
                <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">وضعیت</th>
                <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">اولویت</th>
                <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">تماس</th>
                <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  className="hover:bg-orange-500/5 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={order.selectedImage} 
                        alt={order.storeName}
                        className="w-12 h-8 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium admin-text-light">{order.storeName}</div>
                        <div className="text-sm admin-text-light opacity-70">{order.businessType}</div>
                        <div className="text-xs admin-text-light opacity-50">
                          {new Date(order.orderDate).toLocaleDateString('fa-IR')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium admin-text-light">{order.userName}</div>
                      <div className="text-sm admin-text-light opacity-70">{order.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(order.priority)}`}>
                      {order.priority === 'high' ? 'بالا' : order.priority === 'medium' ? 'متوسط' : 'پایین'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="admin-text-light">{order.contactAttempts} بار</div>
                      {order.lastContactDate && (
                        <div className="text-xs admin-text-light opacity-60">
                          آخرین: {new Date(order.lastContactDate).toLocaleDateString('fa-IR')}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(order.id, e.target.value as SignboardOrder['status']);
                        }}
                        className="admin-input px-2 py-1 rounded text-xs"
                      >
                        <option value="pending">در انتظار</option>
                        <option value="contacted">تماس شده</option>
                        <option value="in_production">تولید</option>
                        <option value="ready">آماده</option>
                        <option value="delivered">تحویل</option>
                        <option value="cancelled">لغو</option>
                      </select>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addContactAttempt(order.id);
                        }}
                        className="px-2 py-1 bg-teal-500/20 text-teal-300 rounded text-xs hover:bg-teal-500/30"
                      >
                        تماس
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedOrder(null)}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">سفارش {selectedOrder.storeName}</h2>
                  <p className="text-gray-300">شناسه: {selectedOrder.id}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">اطلاعات مشتری</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-400">نام:</span> {selectedOrder.userName}</div>
                      <div><span className="text-gray-400">ایمیل:</span> {selectedOrder.userEmail}</div>
                      <div><span className="text-gray-400">نوع کسب‌وکار:</span> {selectedOrder.businessType}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-3">وضعیت سفارش</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-400">تاریخ سفارش:</span> {new Date(selectedOrder.orderDate).toLocaleDateString('fa-IR')}</div>
                      <div><span className="text-gray-400">تعداد تماس:</span> {selectedOrder.contactAttempts}</div>
                      {selectedOrder.estimatedDelivery && (
                        <div><span className="text-gray-400">تحویل تخمینی:</span> {new Date(selectedOrder.estimatedDelivery).toLocaleDateString('fa-IR')}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-3">طرح انتخاب شده</h3>
                  <img 
                    src={selectedOrder.selectedImage} 
                    alt={selectedOrder.storeName}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                {selectedOrder.notes && (
                  <div>
                    <h3 className="font-semibold text-white mb-3">یادداشت‌ها</h3>
                    <p className="text-gray-300 text-sm bg-white/5 p-3 rounded-lg">
                      {selectedOrder.notes}
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <select
                    value={selectedOrder.priority}
                    onChange={(e) => updateOrderPriority(selectedOrder.id, e.target.value as SignboardOrder['priority'])}
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="low">اولویت پایین</option>
                    <option value="medium">اولویت متوسط</option>
                    <option value="high">اولویت بالا</option>
                  </select>
                  <button
                    onClick={() => addContactAttempt(selectedOrder.id)}
                    className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30"
                  >
                    ثبت تماس
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
