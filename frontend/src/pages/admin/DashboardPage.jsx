// src/pages/admin/DashboardPage.jsx
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Book,
  List,
  ShoppingCart,
  Users,
  CreditCard,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const DashboardPage = () => {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const navItems = [
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/admin'
    },
    {
      id: 'books',
      icon: Book,
      label: 'Book Management',
      path: '/admin/books',
      subItems: [
        { label: 'All Books', path: '/admin/books' },
        { label: 'Add New', path: '/admin/books/new' },
        { label: 'Inventory', path: '/admin/books/inventory' }
      ]
    },
    {
      id: 'categories',
      icon: List,
      label: 'Categories',
      path: '/admin/categories'
    },
    {
      id: 'orders',
      icon: ShoppingCart,
      label: 'Order Management',
      path: '/admin/orders'
    },
    {
      id: 'users',
      icon: Users,
      label: 'User Management',
      path: '/admin/users'
    },
    {
      id: 'payments',
      icon: CreditCard,
      label: 'Payments',
      path: '/admin/payments'
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      path: '/admin/settings'
    }
  ];

  const toggleSubmenu = (id) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Sample stats for dashboard overview
  const stats = [
    { label: 'Total Sales', value: '$24,580', change: '+12%' },
    { label: 'New Orders', value: '142', change: '+5%' },
    { label: 'Books Sold', value: '892', change: '+8%' },
    { label: 'New Users', value: '56', change: '+3%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Nav Toggle */}
      <div className="lg:hidden bg-primary text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">BookNest Admin</h1>
        <button 
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded-lg hover:bg-primary/80"
        >
          {mobileNavOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={`${mobileNavOpen ? 'block' : 'hidden'} lg:block w-64 bg-primary text-white fixed h-full z-10`}>
          <div className="p-4 border-b border-primary/20">
            <h1 className="text-xl font-bold">BookNest Admin</h1>
            <p className="text-sm text-white/80">Administrator Panel</p>
          </div>

          <nav className="p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                          location.pathname.startsWith(item.path)
                            ? 'bg-white/10'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center">
                          <item.icon className="h-5 w-5 mr-3" />
                          <span>{item.label}</span>
                        </div>
                        {openSubmenus[item.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      {openSubmenus[item.id] && (
                        <ul className="ml-8 mt-1 space-y-1">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.label}>
                              <Link
                                to={subItem.path}
                                className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                                  location.pathname === subItem.path
                                    ? 'bg-white/10'
                                    : 'hover:bg-white/5'
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? 'bg-white/10'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary/20">
            <button className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          {/* Top Navigation */}
          <header className="bg-white shadow-sm p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-primary">
                {location.pathname === '/admin' 
                  ? 'Dashboard Overview' 
                  : navItems.find(item => 
                      location.pathname.startsWith(item.path)
                    )?.label || 'Admin Panel'}
              </h2>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Bell className="h-5 w-5 text-muted" />
                </button>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center mr-2">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-medium text-primary hidden md:inline">
                    Admin User
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="p-4 md:p-6">
            {location.pathname === '/admin' ? (
              <DashboardOverview stats={stats} />
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;