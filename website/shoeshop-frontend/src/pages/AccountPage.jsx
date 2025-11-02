import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components';
import { useAuth } from '../contexts';
import './AccountPage.css';

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

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

  if (!isAuthenticated) {
    return null;
  }

  const mockOrders = [
    {
      id: 'ANT12345678',
      date: '2024-01-15',
      status: 'Đã giao',
      total: 2599000,
      items: 2,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'ANT12345679',
      date: '2024-01-10',
      status: 'Đang giao',
      total: 1899000,
      items: 1,
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'ANT12345680',
      date: '2024-01-05',
      status: 'Đã giao',
      total: 3450000,
      items: 3,
      image: 'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const mockWishlist = [
    {
      id: 1,
      name: 'Giày Chạy Thể Thao Nam ANTA Running Pro',
      price: '1.259.100₫',
      originalPrice: '1.399.000₫',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: true
    },
    {
      id: 2,
      name: 'Giày Bóng Rổ ANTA Basketball Elite',
      price: '2.199.000₫',
      originalPrice: '2.499.000₫',
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: true
    },
    {
      id: 3,
      name: 'Áo Khoác Thể Thao ANTA Windbreaker',
      price: '1.359.000₫',
      originalPrice: '1.699.000₫',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: false
    }
  ];

  const [profileData, setProfileData] = useState({
    fullName: user?.username || '',
    email: user?.email || '',
    phone: '',
    birthday: '',
    gender: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Cập nhật thông tin thành công!');
  };

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Đã giao':
        return 'delivered';
      case 'Đang giao':
        return 'shipping';
      case 'Đang xử lý':
        return 'processing';
      case 'Đã hủy':
        return 'cancelled';
      default:
        return '';
    }
  };

  const renderOverview = () => (
    <div className="overview-content">
      <div className="account-welcome">
        <h1>Tài khoản của tôi</h1>
        <p>Xin chào, <strong>{user?.username}</strong>!</p>
      </div>

      <div className="account-stats">
        <div className="stat-box">
          <div className="stat-number">3</div>
          <div className="stat-text">Đơn hàng</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{mockWishlist.length}</div>
          <div className="stat-text">Yêu thích</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">0</div>
          <div className="stat-text">Điểm thưởng</div>
        </div>
      </div>

      <div className="recent-section">
        <div className="section-title">
          <h3>Đơn hàng gần đây</h3>
          <button className="link-btn" onClick={() => setActiveTab('orders')}>Xem tất cả →</button>
        </div>
        {mockOrders.length > 0 ? (
          <div className="recent-orders">
            {mockOrders.slice(0, 2).map((order) => (
              <div key={order.id} className="recent-order-item">
                <div className="order-thumbnail">
                  <img src={order.image} alt="Sản phẩm" />
                </div>
                <div className="order-content">
                  <div className="order-row">
                    <span className="order-number">#{order.id}</span>
                    <span className={`status-badge status-${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-meta">
                    <span>{new Date(order.date).toLocaleDateString('vi-VN')}</span>
                    <span>•</span>
                    <span>{order.items} sản phẩm</span>
                  </div>
                  <div className="order-price">{order.total.toLocaleString()}₫</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Bạn chưa có đơn hàng nào</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="orders-section">
      <h2>Đơn hàng của tôi</h2>

      <div className="order-tabs">
        <button className="order-tab active">Tất cả</button>
        <button className="order-tab">Chờ xử lý</button>
        <button className="order-tab">Đang giao</button>
        <button className="order-tab">Đã giao</button>
        <button className="order-tab">Đã hủy</button>
      </div>

      {mockOrders.length > 0 ? (
        <div className="order-list">
          {mockOrders.map((order) => (
            <div key={order.id} className="order-detail-card">
              <div className="order-card-header">
                <div className="order-info-top">
                  <span className="order-code">Đơn hàng #{order.id}</span>
                  <span className="order-date-text">{new Date(order.date).toLocaleDateString('vi-VN')}</span>
                </div>
                <span className={`order-status-tag status-${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-card-body">
                <div className="order-product-info">
                  <img src={order.image} alt="Sản phẩm" className="order-img" />
                  <div className="order-details">
                    <div className="order-quantity">{order.items} sản phẩm</div>
                    <div className="order-amount">Tổng cộng: <strong>{order.total.toLocaleString()}₫</strong></div>
                  </div>
                </div>
              </div>
              <div className="order-card-footer">
                <button className="order-action-btn secondary">Xem chi tiết</button>
                {order.status === 'Đã giao' && (
                  <>
                    <button className="order-action-btn secondary">Mua lại</button>
                    <button className="order-action-btn primary">Đánh giá</button>
                  </>
                )}
                {order.status === 'Đang giao' && (
                  <button className="order-action-btn primary">Theo dõi đơn hàng</button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Bạn chưa có đơn hàng nào</p>
        </div>
      )}
    </div>
  );

  const renderWishlist = () => (
    <div className="wishlist-section">
      <h2>Sản phẩm yêu thích</h2>
      {mockWishlist.length > 0 ? (
        <div className="wishlist-products">
          {mockWishlist.map((item) => (
            <div key={item.id} className="wishlist-product">
              <button className="remove-item" aria-label="Xóa khỏi yêu thích">×</button>
              <div className="product-img-wrapper">
                <img src={item.image} alt={item.name} />
                {!item.inStock && (
                  <div className="out-of-stock-label">Hết hàng</div>
                )}
              </div>
              <div className="product-details">
                <h4 className="product-name">{item.name}</h4>
                <div className="product-pricing">
                  <span className="price-current">{item.price}</span>
                  {item.originalPrice && (
                    <span className="price-original">{item.originalPrice}</span>
                  )}
                </div>
                {item.inStock ? (
                  <button className="cart-add-btn" onClick={() => navigate(`/product/${item.id}`)}>
                    Thêm vào giỏ hàng
                  </button>
                ) : (
                  <button className="notify-stock-btn">Thông báo khi có hàng</button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Bạn chưa có sản phẩm yêu thích nào</p>
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="profile-section">
      <h2>Thông tin tài khoản</h2>
      <form onSubmit={handleSaveProfile} className="account-form">
        <div className="field-group">
          <label htmlFor="fullName">Họ và tên *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={profileData.fullName}
            onChange={handleProfileChange}
            placeholder="Nhập họ và tên"
            required
          />
        </div>

        <div className="field-row">
          <div className="field-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              placeholder="example@email.com"
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profileData.phone}
              onChange={handleProfileChange}
              placeholder="0123456789"
            />
          </div>
        </div>

        <div className="field-row">
          <div className="field-group">
            <label htmlFor="birthday">Ngày sinh</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={profileData.birthday}
              onChange={handleProfileChange}
            />
          </div>
          <div className="field-group">
            <label htmlFor="gender">Giới tính</label>
            <select
              id="gender"
              name="gender"
              value={profileData.gender}
              onChange={handleProfileChange}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="save-btn">Cập nhật thông tin</button>
          <button type="button" className="cancel-btn" onClick={() => setProfileData({
            fullName: user?.username || '',
            email: user?.email || '',
            phone: '',
            birthday: '',
            gender: ''
          })}>Hủy</button>
        </div>
      </form>

      <div className="password-change-section">
        <h3>Thay đổi mật khẩu</h3>
        <form className="password-change-form" onSubmit={(e) => { e.preventDefault(); alert('Cập nhật mật khẩu thành công!'); }}>
          <div className="field-group">
            <label htmlFor="currentPassword">Mật khẩu hiện tại *</label>
            <input type="password" id="currentPassword" placeholder="Nhập mật khẩu hiện tại" required />
          </div>
          <div className="field-group">
            <label htmlFor="newPassword">Mật khẩu mới *</label>
            <input type="password" id="newPassword" placeholder="Nhập mật khẩu mới" required />
          </div>
          <div className="field-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu *</label>
            <input type="password" id="confirmPassword" placeholder="Nhập lại mật khẩu mới" required />
          </div>
          <button type="submit" className="save-btn">Cập nhật mật khẩu</button>
        </form>
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="addresses-section">
      <div className="section-title">
        <h2>Sổ địa chỉ</h2>
        <button className="add-new-btn">+ Thêm địa chỉ mới</button>
      </div>

      <div className="address-list">
        <div className="address-item is-default">
          <div className="address-header-row">
            <div className="address-recipient">
              <h4>Nguyễn Văn A</h4>
              <span className="default-tag">Mặc định</span>
            </div>
          </div>
          <div className="address-content">
            <p className="recipient-phone">+84 123 456 789</p>
            <p className="recipient-address">123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh</p>
          </div>
          <div className="address-action-buttons">
            <button className="edit-btn">Chỉnh sửa</button>
            <button className="delete-btn">Xóa</button>
          </div>
        </div>

        <div className="address-item">
          <div className="address-header-row">
            <div className="address-recipient">
              <h4>Nguyễn Văn B</h4>
            </div>
          </div>
          <div className="address-content">
            <p className="recipient-phone">+84 987 654 321</p>
            <p className="recipient-address">456 Đường DEF, Phường LMN, Quận 3, TP. Hồ Chí Minh</p>
          </div>
          <div className="address-action-buttons">
            <button className="edit-btn">Chỉnh sửa</button>
            <button className="delete-btn">Xóa</button>
            <button className="set-default-btn">Đặt làm mặc định</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="account-page">
        <div className="page-breadcrumb">
          <div className="container">
            <a onClick={() => navigate('/home')} className="breadcrumb-item">Trang chủ</a>
            <span className="breadcrumb-divider">/</span>
            <span className="breadcrumb-active">Tài khoản</span>
          </div>
        </div>

        <div className="account-wrapper">
          <div className="container">
            <div className="account-grid">
              <aside className="account-menu">
                <div className="user-profile">
                  <div className="user-avatar-circle">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info-text">
                    <h3 className="user-name">{user?.username}</h3>
                    <p className="user-email">{user?.email}</p>
                  </div>
                </div>

                <nav className="menu-nav">
                  <button
                    className={`menu-link ${activeTab === 'overview' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <svg className="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>Tổng quan</span>
                  </button>
                  <button
                    className={`menu-link ${activeTab === 'orders' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <svg className="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                    <span>Đơn hàng</span>
                  </button>
                  <button
                    className={`menu-link ${activeTab === 'wishlist' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <svg className="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>Yêu thích</span>
                  </button>
                  <button
                    className={`menu-link ${activeTab === 'profile' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <svg className="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Thông tin tài khoản</span>
                  </button>
                  <button
                    className={`menu-link ${activeTab === 'addresses' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('addresses')}
                  >
                    <svg className="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>Sổ địa chỉ</span>
                  </button>
                  <button className="menu-link logout-link" onClick={handleLogout}>
                    <svg className="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>Đăng xuất</span>
                  </button>
                </nav>
              </aside>

              <main className="account-content">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'orders' && renderOrders()}
                {activeTab === 'wishlist' && renderWishlist()}
                {activeTab === 'profile' && renderProfile()}
                {activeTab === 'addresses' && renderAddresses()}
              </main>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
