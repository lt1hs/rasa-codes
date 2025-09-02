# 📱 Admin Dashboard Navigation & Responsive Design

## 🧭 Navigation Structure

### **Primary Navigation (Sidebar)**
```typescript
interface NavigationItem {
  key: string;
  label: string;
  icon: string;
  path: string;
  permission: Permission;
  children?: NavigationItem[];
  badge?: number | string;
}

const adminNavigation: NavigationItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/admin/dashboard',
    permission: 'admin.dashboard.view'
  },
  {
    key: 'content',
    label: 'Content Management',
    icon: 'FileText',
    path: '/admin/content',
    permission: 'content.view',
    children: [
      {
        key: 'pages',
        label: 'Pages',
        icon: 'File',
        path: '/admin/content/pages',
        permission: 'content.pages.view'
      },
      {
        key: 'blog',
        label: 'Blog Posts',
        icon: 'BookOpen',
        path: '/admin/content/blog',
        permission: 'content.blog.view',
        badge: 'new'
      },
      {
        key: 'projects',
        label: 'Projects',
        icon: 'Briefcase',
        path: '/admin/content/projects',
        permission: 'content.projects.view'
      }
    ]
  },
  {
    key: 'users',
    label: 'User Management',
    icon: 'Users',
    path: '/admin/users',
    permission: 'users.view',
    children: [
      {
        key: 'users-list',
        label: 'All Users',
        icon: 'UserCheck',
        path: '/admin/users/list',
        permission: 'users.view'
      },
      {
        key: 'roles',
        label: 'Roles & Permissions',
        icon: 'Shield',
        path: '/admin/users/roles',
        permission: 'users.roles.manage'
      }
    ]
  },
  {
    key: 'media',
    label: 'Media Library',
    icon: 'Image',
    path: '/admin/media',
    permission: 'media.view'
  },
  {
    key: 'analytics',
    label: 'Analytics',
    icon: 'TrendingUp',
    path: '/admin/analytics',
    permission: 'analytics.view'
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: 'Settings',
    path: '/admin/settings',
    permission: 'settings.view',
    children: [
      {
        key: 'general',
        label: 'General',
        icon: 'Sliders',
        path: '/admin/settings/general',
        permission: 'settings.general.edit'
      },
      {
        key: 'security',
        label: 'Security',
        icon: 'Lock',
        path: '/admin/settings/security',
        permission: 'settings.security.edit'
      },
      {
        key: 'integrations',
        label: 'Integrations',
        icon: 'Zap',
        path: '/admin/settings/integrations',
        permission: 'settings.integrations.edit'
      }
    ]
  }
];
```

### **Secondary Navigation (Breadcrumbs)**
```typescript
// Dynamic breadcrumb generation
const breadcrumbs = [
  { label: 'Admin', path: '/admin' },
  { label: 'Content Management', path: '/admin/content' },
  { label: 'Blog Posts', path: '/admin/content/blog' },
  { label: 'Edit Post', path: null } // Current page
];

// Breadcrumb Component
<Breadcrumb className="mb-4">
  {breadcrumbs.map((crumb, index) => (
    <Breadcrumb.Item key={index}>
      {crumb.path ? (
        <Link to={crumb.path}>{crumb.label}</Link>
      ) : (
        <span className="text-gray-500">{crumb.label}</span>
      )}
    </Breadcrumb.Item>
  ))}
</Breadcrumb>
```

## 📐 Layout Structure

### **Desktop Layout (> 1024px)**
```
┌─────────────────────────────────────────────────────────┐
│ Header (60px)                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Logo    Breadcrumbs        Search    Profile  Notif │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ │ Sidebar │ Main Content Area                           │
│ │ (280px) │                                             │
│ │         │ ┌─────────────────────────────────────────┐ │
│ │ 📊 Dash │ │ Page Header                             │ │
│ │ 📝 Cont │ │ ┌─────────────────────────────────────┐ │ │
│ │ 👥 User │ │ │ Content Area                        │ │ │
│ │ 🖼️ Media │ │ │                                     │ │ │
│ │ 📈 Anal │ │ │                                     │ │ │
│ │ ⚙️ Sett │ │ │                                     │ │ │
│ │         │ │ └─────────────────────────────────────┘ │ │
│ │         │ └─────────────────────────────────────────┘ │
│ │         │                                             │
└─┴─────────┴─────────────────────────────────────────────┘
```

### **Tablet Layout (768px - 1024px)**
```
┌─────────────────────────────────────────────────────────┐
│ Header (60px)                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ ☰ Logo           Search      Profile           Notif │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ │ Side│ Main Content Area                               │
│ │ bar │                                                 │
│ │(60px│ ┌─────────────────────────────────────────────┐ │
│ │     │ │ Page Header                                 │ │
│ │ 📊  │ │ ┌─────────────────────────────────────────┐ │ │
│ │ 📝  │ │ │ Content Area                            │ │ │
│ │ 👥  │ │ │                                         │ │ │
│ │ 🖼️   │ │ │                                         │ │ │
│ │ 📈  │ │ │                                         │ │ │
│ │ ⚙️   │ │ └─────────────────────────────────────────┘ │ │
│ │     │ └─────────────────────────────────────────────┘ │
└─┴─────┴─────────────────────────────────────────────────┘
```

### **Mobile Layout (< 768px)**
```
┌─────────────────────────────────────────────────────────┐
│ Header (60px)                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ ☰ Logo                              Profile    ⋮   │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ Main Content Area (Full Width)                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Page Header                                         │ │
│ │ ┌─────────────────────────────────────────────────┐ │ │
│ │ │ Content Area                                    │ │ │
│ │ │                                                 │ │ │
│ │ │                                                 │ │ │
│ │ │                                                 │ │ │
│ │ └─────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [Drawer Sidebar - Overlay when opened]                 │
└─────────────────────────────────────────────────────────┘
```

## 📱 Responsive Breakpoints

### **Tailwind CSS Breakpoints**
```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait
  lg: '1024px',  // Tablet landscape / Small desktop
  xl: '1280px',  // Desktop
  '2xl': '1536px' // Large desktop
};

// Responsive behavior
const layoutConfig = {
  mobile: {
    breakpoint: 'max-md',
    sidebar: 'drawer',
    siderWidth: 0,
    collapsedWidth: 0
  },
  tablet: {
    breakpoint: 'md:max-lg',
    sidebar: 'collapsed',
    siderWidth: 80,
    collapsedWidth: 80
  },
  desktop: {
    breakpoint: 'lg:',
    sidebar: 'expanded',
    siderWidth: 280,
    collapsedWidth: 80
  }
};
```

## 🎨 Component Specifications

### **Header Component**
```typescript
interface AdminHeaderProps {
  onMenuClick: () => void;
  collapsed: boolean;
  isMobile: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  onMenuClick, 
  collapsed, 
  isMobile 
}) => (
  <Header className="bg-white border-b border-gray-200 px-4 flex items-center justify-between">
    {/* Left Section */}
    <div className="flex items-center space-x-4">
      {isMobile && (
        <Button 
          type="text" 
          icon={<MenuOutlined />} 
          onClick={onMenuClick}
        />
      )}
      <div className="font-bold text-xl text-blue-600">
        Admin Portal
      </div>
      {!isMobile && (
        <Breadcrumb>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      )}
    </div>

    {/* Center Section - Search */}
    {!isMobile && (
      <div className="flex-1 max-w-md mx-8">
        <Input.Search 
          placeholder="Search..." 
          className="w-full"
        />
      </div>
    )}

    {/* Right Section */}
    <div className="flex items-center space-x-4">
      <Badge count={5}>
        <Button type="text" icon={<BellOutlined />} />
      </Badge>
      <Dropdown menu={{ items: userMenuItems }}>
        <Button type="text" className="flex items-center space-x-2">
          <Avatar src="/api/placeholder/32/32" />
          {!isMobile && <span>Admin User</span>}
        </Button>
      </Dropdown>
    </div>
  </Header>
);
```

### **Sidebar Component**
```typescript
interface AdminSidebarProps {
  collapsed: boolean;
  isMobile: boolean;
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  collapsed, 
  isMobile, 
  onClose 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = adminNavigation.map(item => ({
    key: item.key,
    icon: <item.icon />,
    label: item.label,
    children: item.children?.map(child => ({
      key: child.key,
      label: child.label,
      onClick: () => {
        navigate(child.path);
        isMobile && onClose?.();
      }
    }))
  }));

  return (
    <Sider
      collapsed={collapsed && !isMobile}
      width={280}
      collapsedWidth={isMobile ? 0 : 80}
      className="bg-gray-900"
      trigger={null}
    >
      <div className="p-4">
        {!collapsed && (
          <div className="text-white font-bold text-lg mb-8">
            Admin Panel
          </div>
        )}
      </div>
      
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKey(location.pathname)]}
        items={menuItems}
        className="border-r-0"
      />
    </Sider>
  );
};
```

## 📊 Interactive Elements

### **Quick Actions (Dashboard)**
```typescript
const quickActions = [
  {
    icon: <PlusOutlined />,
    label: 'New Post',
    description: 'Create a new blog post',
    action: () => navigate('/admin/content/blog/new'),
    color: 'blue'
  },
  {
    icon: <UserAddOutlined />,
    label: 'Add User',
    description: 'Invite a new team member', 
    action: () => navigate('/admin/users/new'),
    color: 'green'
  },
  {
    icon: <UploadOutlined />,
    label: 'Upload Media',
    description: 'Add images or documents',
    action: () => navigate('/admin/media/upload'),
    color: 'purple'
  }
];

// Quick Actions Grid
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
  {quickActions.map((action) => (
    <Card 
      key={action.label}
      hoverable
      onClick={action.action}
      className="cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-${action.color}-100`}>
          {action.icon}
        </div>
        <div>
          <div className="font-medium">{action.label}</div>
          <div className="text-sm text-gray-500">{action.description}</div>
        </div>
      </div>
    </Card>
  ))}
</div>
```

### **Context Actions (Page Level)**
```typescript
// Page-level action bar
const PageHeader: React.FC<{
  title: string;
  subtitle?: string;
  actions?: React.ReactNode[];
}> = ({ title, subtitle, actions }) => (
  <div className="flex justify-between items-start mb-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle && (
        <p className="text-gray-600 mt-1">{subtitle}</p>
      )}
    </div>
    {actions && (
      <div className="flex space-x-2">
        {actions.map((action, index) => (
          <div key={index}>{action}</div>
        ))}
      </div>
    )}
  </div>
);

// Usage
<PageHeader 
  title="Blog Posts"
  subtitle="Manage your blog content"
  actions={[
    <Button type="primary" icon={<PlusOutlined />}>
      New Post
    </Button>,
    <Button icon={<DownloadOutlined />}>
      Export
    </Button>
  ]}
/>
```

## 🔄 State Management Integration

### **Responsive Hook**
```typescript
const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) setBreakpoint('mobile');
      else if (width < 1024) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };
    
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);
  
  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop'
  };
};
```

### **Layout Context**
```typescript
interface LayoutContextType {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
  currentBreakpoint: string;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) throw new Error('useLayout must be used within LayoutProvider');
  return context;
};
```

This navigation and responsive design system provides a **professional, accessible, and mobile-first** admin interface that adapts seamlessly across all device sizes while maintaining consistent functionality and user experience.