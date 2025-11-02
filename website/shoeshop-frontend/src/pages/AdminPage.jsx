import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { AdminSidebar, ProductManagement, ShippingManagement } from '../components';
import './AdminPage.css';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState('my-products');
  const { logout, user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        alert('Vui lòng đăng nhập để truy cập trang Admin!');
        navigate('/login');
        return;
      }

      if (!isAdmin) {
        alert('Bạn không có quyền truy cập trang này!');
        navigate('/home');
        return;
      }
    }
  }, [isLoading, isAuthenticated, isAdmin, navigate]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Đang tải...
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="admin-dashboard">
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Bảng Điều Khiển</h1>
                <p className="dashboard-subtitle">Chào mừng trở lại, {user?.username || 'Admin'}</p>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <span className="logout-icon">🚪</span>
                Đăng xuất
              </button>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon-wrapper products">
                  <span className="stat-icon">📦</span>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Tổng Sản Phẩm</p>
                  <p className="stat-value">156</p>
                  <p className="stat-change positive">+12% so với tháng trước</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper orders">
                  <span className="stat-icon">🛒</span>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Đơn Hàng Mới</p>
                  <p className="stat-value">28</p>
                  <p className="stat-change positive">+8% so với tuần trước</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper revenue">
                  <span className="stat-icon">💰</span>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Doanh Thu Tháng</p>
                  <p className="stat-value">45.6M VNĐ</p>
                  <p className="stat-change positive">+23% so với tháng trước</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper customers">
                  <span className="stat-icon">👥</span>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Khách Hàng</p>
                  <p className="stat-value">1,248</p>
                  <p className="stat-change positive">+5% so với tháng trước</p>
                </div>
              </div>
            </div>

            <div className="dashboard-sections">
              <div className="section-card recent-orders">
                <div className="section-header">
                  <h2 className="section-title">Đơn Hàng Gần Đây</h2>
                  <button className="view-all-btn" onClick={() => setActiveTab('shipping')}>
                    Xem tất cả →
                  </button>
                </div>
                <div className="section-content">
                  <div className="quick-stats">
                    <div className="quick-stat-item">
                      <span className="quick-stat-icon pending">⏳</span>
                      <div>
                        <p className="quick-stat-value">5</p>
                        <p className="quick-stat-label">Cần xử lý</p>
                      </div>
                    </div>
                    <div className="quick-stat-item">
                      <span className="quick-stat-icon processing">📦</span>
                      <div>
                        <p className="quick-stat-value">10</p>
                        <p className="quick-stat-label">Đang giao</p>
                      </div>
                    </div>
                    <div className="quick-stat-item">
                      <span className="quick-stat-icon completed">✓</span>
                      <div>
                        <p className="quick-stat-value">2</p>
                        <p className="quick-stat-label">Hoàn thành</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-card quick-actions">
                <div className="section-header">
                  <h2 className="section-title">Thao Tác Nhanh</h2>
                </div>
                <div className="section-content">
                  <div className="action-buttons">
                    <button className="action-btn" onClick={() => {
                      setActiveTab('products');
                      setActiveSubTab('add-product');
                    }}>
                      <span className="action-btn-icon">➕</span>
                      <span>Thêm Sản Phẩm</span>
                    </button>
                    <button className="action-btn" onClick={() => setActiveTab('products')}>
                      <span className="action-btn-icon">📋</span>
                      <span>Quản Lý Sản Phẩm</span>
                    </button>
                    <button className="action-btn" onClick={() => setActiveTab('shipping')}>
                      <span className="action-btn-icon">🚚</span>
                      <span>Quản Lý Vận Chuyển</span>
                    </button>
                    <button className="action-btn" onClick={() => setActiveTab('messages')}>
                      <span className="action-btn-icon">💬</span>
                      <span>Tin Nh��n</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <ProductManagement 
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
          />
        );

      case 'shipping':
        return <ShippingManagement />;

      case 'messages':
        return (
          <div className="admin-content-section">
            <div className="section-header">
              <h1 className="section-title-main">Tin Nh���n</h1>
            </div>
            <div className="empty-state">
              <span className="empty-state-icon">💬</span>
              <p className="empty-state-text">Không có tin nhắn mới</p>
              <p className="empty-state-description">Tất cả tin nhắn từ khách hàng sẽ hiển thị tại đây</p>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="admin-content-section">
            <div className="section-header">
              <h1 className="section-title-main">Thông Báo</h1>
            </div>
            <div className="notifications-list">
              <div className="notification-item">
                <span className="notification-icon new">🔔</span>
                <div className="notification-content">
                  <p className="notification-title">Đơn hàng mới #2201223FJAOQ</p>
                  <p className="notification-time">5 phút trước</p>
                </div>
              </div>
              <div className="notification-item">
                <span className="notification-icon">📦</span>
                <div className="notification-content">
                  <p className="notification-title">Sản phẩm "Giày ANTA KT7" đã được cập nhật</p>
                  <p className="notification-time">2 giờ trước</p>
                </div>
              </div>
              <div className="notification-item">
                <span className="notification-icon">✓</span>
                <div className="notification-content">
                  <p className="notification-title">Đơn hàng #2197139TYQPWO đã hoàn thành</p>
                  <p className="notification-time">1 ngày trước</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="admin-content-section">
            <div className="section-header">
              <h1 className="section-title-main">Cài Đ���t</h1>
            </div>
            <div className="settings-content">
              <div className="settings-section">
                <h3 className="settings-section-title">Thông Tin Cửa Hàng</h3>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Tên Cửa Hàng</label>
                    <input type="text" defaultValue="ANTA Store" />
                  </div>
                  <div className="form-group">
                    <label>Email Liên Hệ</label>
                    <input type="email" defaultValue="admin@anta.com.vn" />
                  </div>
                  <div className="form-group">
                    <label>Số Điện Thoại</label>
                    <input type="tel" defaultValue="1900 xxxx" />
                  </div>
                  <div className="form-group">
                    <label>Địa Chỉ</label>
                    <textarea rows="3" defaultValue="Hà Nội, Việt Nam"></textarea>
                  </div>
                  <button className="save-settings-btn">Lưu Thay Đổi</button>
                </div>
              </div>

              <div className="settings-section">
                <h3 className="settings-section-title">Cài Đặt Thông Báo</h3>
                <div className="settings-options">
                  <label className="setting-option">
                    <input type="checkbox" defaultChecked />
                    <span>Nhận thông báo đơn hàng mới</span>
                  </label>
                  <label className="setting-option">
                    <input type="checkbox" defaultChecked />
                    <span>Nhận thông báo tin nhắn</span>
                  </label>
                  <label className="setting-option">
                    <input type="checkbox" />
                    <span>Nhận email t���ng kết hàng tuần</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="admin-content-section">
            <h1>Dashboard</h1>
          </div>
        );
    }
  };

  return (
    <div className="admin-page">
      <AdminSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="admin-main">
        <div className="admin-content-wrapper">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
