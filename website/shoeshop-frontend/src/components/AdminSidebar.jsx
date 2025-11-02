import React from 'react';
import { useAuth } from '../contexts';
import './AdminSidebar.css';

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Bảng Điều Khiển', icon: '📊' },
    { id: 'products', label: 'Sản Phẩm', icon: '🛒' },
    { id: 'shipping', label: 'Vận Chuyển', icon: '📦' },
    { id: 'messages', label: 'Tin Nhắn', icon: '💬', badge: 49 },
    { id: 'notifications', label: 'Thông Báo', icon: '🔔' },
    { id: 'settings', label: 'Cài Đặt', icon: '⚙️' }
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-text">ANTA</span>
          <span className="logo-subtitle">ADMIN</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-item-icon">{item.icon}</span>
            <span className="nav-item-label">{item.label}</span>
            {item.badge && (
              <span className="nav-item-badge">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            <span className="user-avatar-icon">👤</span>
          </div>
          <div className="user-info">
            <div className="user-name">{user?.name || 'Admin'}</div>
            <div className="user-role">Quản Trị Viên</div>
          </div>
        </div>
      </div>
    </div>
  );
}
