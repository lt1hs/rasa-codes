import React, { useState, useEffect } from 'react';
import '../../styles/admin/UserManager.scss';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  dateCreated: string;
}

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<keyof User>('lastLogin');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate fetching users from an API
    const fetchUsers = () => {
      setIsLoading(true);

      // In a real application, you would fetch this data from your API
      setTimeout(() => {
        const mockUsers: User[] = [
          {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
            status: 'active',
            lastLogin: '2023-06-15 10:30',
            dateCreated: '2023-01-10'
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'editor',
            status: 'active',
            lastLogin: '2023-06-14 15:45',
            dateCreated: '2023-02-22'
          },
          {
            id: '3',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user',
            status: 'active',
            lastLogin: '2023-06-10 09:15',
            dateCreated: '2023-03-05'
          },
          {
            id: '4',
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            role: 'editor',
            status: 'inactive',
            lastLogin: '2023-05-30 11:20',
            dateCreated: '2023-03-18'
          },
          {
            id: '5',
            name: 'Mike Wilson',
            email: 'mike@example.com',
            role: 'user',
            status: 'pending',
            lastLogin: 'Never',
            dateCreated: '2023-06-14'
          },
        ];

        setUsers(mockUsers);
        setIsLoading(false);
      }, 800);
    };

    fetchUsers();
  }, []);

  // Filter and sort users
  const filteredAndSortedUsers = users
    .filter(user => {
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRole && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(filteredAndSortedUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleSort = (field: keyof User) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAddNew = () => {
    setCurrentUser(null);
    setShowAddEditModal(true);
  };

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setShowAddEditModal(true);
  };

  const handleDelete = () => {
    // In a real application, you would call your API to delete the selected users
    setUsers(users.filter(user => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
    setShowDeleteModal(false);
  };

  const handleStatusChange = (id: string, newStatus: 'active' | 'inactive' | 'pending') => {
    // In a real application, you would call your API to update the status
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active': return 'status-badge active';
      case 'inactive': return 'status-badge inactive';
      case 'pending': return 'status-badge pending';
      default: return 'status-badge';
    }
  };

  return (
    <div className="user-manager">
      <div className="user-header">
        <h2>مدیریت کاربران</h2>
        <div className="user-actions">
          <button className="add-new-button" onClick={handleAddNew}>
            افزودن کاربر جدید
          </button>
          {selectedUsers.length > 0 && (
            <button 
              className="delete-button" 
              onClick={() => setShowDeleteModal(true)}
            >
              حذف انتخاب شده ({selectedUsers.length})
            </button>
          )}
        </div>
      </div>

      <div className="user-filters">
        <div className="search-filter">
          <input
            type="text"
            placeholder="جستجوی کاربران..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="role-filter">
          <label htmlFor="role-select">نقش:</label>
          <select 
            id="role-select" 
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">همه نقش‌ها</option>
            <option value="admin">مدیر</option>
            <option value="editor">ویرایشگر</option>
            <option value="user">کاربر</option>
          </select>
        </div>
        
        <div className="status-filter">
          <label htmlFor="status-select">وضعیت:</label>
          <select 
            id="status-select" 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="active">فعال</option>
            <option value="inactive">غیرفعال</option>
            <option value="pending">در انتظار</option>
          </select>
        </div>
      </div>

      <div className="user-table-container">
        {isLoading ? (
          <div className="loading-indicator">Loading users...</div>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th className="checkbox-column">
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.length === filteredAndSortedUsers.length && filteredAndSortedUsers.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th 
                  className={`sortable ${sortField === 'name' ? 'sorted' : ''}`}
                  onClick={() => handleSort('name')}
                >
                  نام
                  {sortField === 'name' && (
                    <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th 
                  className={`sortable ${sortField === 'email' ? 'sorted' : ''}`}
                  onClick={() => handleSort('email')}
                >
                  ایمیل
                  {sortField === 'email' && (
                    <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th 
                  className={`sortable ${sortField === 'role' ? 'sorted' : ''}`}
                  onClick={() => handleSort('role')}
                >
                  نقش
                  {sortField === 'role' && (
                    <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th 
                  className={`sortable ${sortField === 'status' ? 'sorted' : ''}`}
                  onClick={() => handleSort('status')}
                >
                  وضعیت
                  {sortField === 'status' && (
                    <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th 
                  className={`sortable ${sortField === 'lastLogin' ? 'sorted' : ''}`}
                  onClick={() => handleSort('lastLogin')}
                >
                  آخرین ورود
                  {sortField === 'lastLogin' && (
                    <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th 
                  className={`sortable ${sortField === 'dateCreated' ? 'sorted' : ''}`}
                  onClick={() => handleSort('dateCreated')}
                >
                  تاریخ ایجاد
                  {sortField === 'dateCreated' && (
                    <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="no-items">
                    هیچ کاربری یافت نشد.
                  </td>
                </tr>
              ) : (
                filteredAndSortedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="role-cell">
                      <span className={`role-badge ${user.role}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td>{user.lastLogin}</td>
                    <td>{user.dateCreated}</td>
                    <td className="actions-cell">
                      <button 
                        className="edit-button" 
                        onClick={() => handleEdit(user)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <div className="status-dropdown">
                        <button className="status-button" title="Change Status">⚙️</button>
                        <div className="status-options">
                          <button onClick={() => handleStatusChange(user.id, 'active')}>فعال‌سازی</button>
                          <button onClick={() => handleStatusChange(user.id, 'inactive')}>غیرفعال‌سازی</button>
                          <button onClick={() => handleStatusChange(user.id, 'pending')}>تنظیم به حالت انتظار</button>
                        </div>
                      </div>
                      <button 
                        className="delete-button" 
                        onClick={() => {
                          setSelectedUsers([user.id]);
                          setShowDeleteModal(true);
                        }}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <h3>تایید حذف</h3>
            <p>آیا مطمئن هستید که می‌خواهید {selectedUsers.length} کاربر انتخاب شده را حذف کنید؟</p>
            <p className="warning">این عمل قابل بازگشت نیست.</p>
            <div className="modal-actions">
              <button 
                className="cancel-button" 
                onClick={() => setShowDeleteModal(false)}
              >
                انصراف
              </button>
              <button 
                className="confirm-delete-button" 
                onClick={handleDelete}
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit User Modal */}
      {showAddEditModal && (
        <div className="modal-overlay">
          <div className="modal add-edit-modal">
            <h3>{currentUser ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}</h3>
            <form className="user-form">
              <div className="form-group">
                <label htmlFor="user-name">نام</label>
                <input 
                  type="text" 
                  id="user-name" 
                  defaultValue={currentUser?.name || ''}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="user-email">ایمیل</label>
                <input 
                  type="email" 
                  id="user-email" 
                  defaultValue={currentUser?.email || ''}
                />
              </div>
              
              {!currentUser && (
                <div className="form-group">
                  <label htmlFor="user-password">رمز عبور</label>
                  <input 
                    type="password" 
                    id="user-password" 
                  />
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="user-role">نقش</label>
                <select 
                  id="user-role" 
                  defaultValue={currentUser?.role || 'user'}
                >
                  <option value="admin">مدیر</option>
                  <option value="editor">ویرایشگر</option>
                  <option value="user">کاربر</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="user-status">وضعیت</label>
                <select 
                  id="user-status" 
                  defaultValue={currentUser?.status || 'pending'}
                >
                  <option value="active">فعال</option>
                  <option value="inactive">غیرفعال</option>
                  <option value="pending">در انتظار</option>
                </select>
              </div>
            </form>
            
            <div className="modal-actions">
              <button 
                className="cancel-button" 
                onClick={() => setShowAddEditModal(false)}
              >
                انصراف
              </button>
              <button 
                className="save-button" 
                onClick={() => {
                  // In a real application, you would save the form data to your API
                  setShowAddEditModal(false);
                }}
              >
                ذخیره کاربر
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;