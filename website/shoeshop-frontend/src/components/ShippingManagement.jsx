import React, { useState } from 'react';
import './ShippingManagement.css';

export default function ShippingManagement() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchOrder, setSearchOrder] = useState('');

  const statusFilters = [
    { id: 'all', label: 'Tất cả', count: 18 },
    { id: 'unpaid', label: 'Chưa thanh toán', count: 3 },
    { id: 'needs-shipping', label: 'Cần gửi', count: 5 },
    { id: 'sent', label: 'Đã gửi', count: 10 },
    { id: 'completed', label: 'Hoàn thành', count: 2 },
    { id: 'cancelled', label: 'Hủy bỏ', count: 0 },
    { id: 'return', label: 'Trả hàng', count: 0 }
  ];

  const mockOrders = [
    {
      id: 1,
      customer: 'Nguyễn Văn A',
      orderNumber: '2201223FJAOQ',
      date: '25/12/2024',
      total: '1.000.000 VNĐ',
      status: 'needs-shipping',
      products: [
        {
          id: 1,
          name: 'Giày ANTA KT7 - Đen',
          image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=80',
          price: '600.000 VNĐ',
          quantity: 1,
          dueDate: 'Trước 28/12/2024',
          shippingService: 'J&T'
        }
      ]
    },
    {
      id: 2,
      customer: 'Trần Thị B',
      orderNumber: '2197139TYQPWO',
      date: '24/12/2024',
      total: '800.000 VNĐ',
      status: 'needs-shipping',
      products: [
        {
          id: 2,
          name: 'Áo thun ANTA Running',
          image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=80',
          price: '400.000 VNĐ',
          quantity: 2,
          dueDate: 'Trước 27/12/2024',
          shippingService: 'GHTK'
        }
      ]
    },
    {
      id: 3,
      customer: 'Lê Văn C',
      orderNumber: '2198456ABCDE',
      date: '23/12/2024',
      total: '2.990.000 VNĐ',
      status: 'sent',
      products: [
        {
          id: 3,
          name: 'Giày ANTA C202 GT',
          image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=80',
          price: '1.790.000 VNĐ',
          quantity: 1,
          dueDate: 'Đang giao hàng',
          shippingService: 'Viettel Post'
        }
      ]
    },
    {
      id: 4,
      customer: 'Phạm Thị D',
      orderNumber: '2199678FGHIJ',
      date: '22/12/2024',
      total: '1.340.000 VNĐ',
      status: 'completed',
      products: [
        {
          id: 4,
          name: 'Quần short ANTA Training',
          image: 'https://images.pexels.com/photos/7432926/pexels-photo-7432926.jpeg?auto=compress&cs=tinysrgb&w=80',
          price: '450.000 VNĐ',
          quantity: 2,
          dueDate: 'Đã hoàn thành',
          shippingService: 'J&T'
        }
      ]
    }
  ];

  const [orders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);

  const handleSearch = () => {
    let filtered = [...orders];
    
    if (searchOrder) {
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(searchOrder.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchOrder.toLowerCase())
      );
    }
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus);
    }
    
    setFilteredOrders(filtered);
  };

  const handleReset = () => {
    setSearchOrder('');
    setSelectedStatus('all');
    setFilteredOrders(orders);
  };

  const handleStatusChange = (statusId) => {
    setSelectedStatus(statusId);
    let filtered = [...orders];
    
    if (statusId !== 'all') {
      filtered = filtered.filter(order => order.status === statusId);
    }
    
    setFilteredOrders(filtered);
  };

  const handleArrangeShipping = (orderId, productId) => {
    console.log('Arranging shipping for order:', orderId, 'product:', productId);
    alert('Chức năng sắp xếp giao hàng sẽ được phát triển');
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'all': { label: 'Tất cả', class: '' },
      'unpaid': { label: 'Chưa thanh toán', class: 'unpaid' },
      'needs-shipping': { label: 'Cần gửi', class: 'needs-shipping' },
      'sent': { label: 'Đang giao', class: 'sent' },
      'completed': { label: 'Hoàn thành', class: 'completed' },
      'cancelled': { label: 'Hủy bỏ', class: 'cancelled' },
      'return': { label: 'Trả hàng', class: 'return' }
    };
    return statusMap[status] || statusMap['all'];
  };

  return (
    <div className="shipping-management">
      <div className="shipping-management-content">
        <div className="page-header-section">
          <h1 className="page-main-title">Quản Lý Vận Chuyển</h1>
          <p className="page-subtitle">Quản lý tất cả đơn hàng và vận chuyển</p>
        </div>

        <div className="status-filters-section">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              className={`status-filter-btn ${selectedStatus === filter.id ? 'active' : ''}`}
              onClick={() => handleStatusChange(filter.id)}
            >
              <span className="filter-label">{filter.label}</span>
              {filter.count > 0 && (
                <span className="filter-count">{filter.count}</span>
              )}
            </button>
          ))}
        </div>

        <div className="search-filters-card">
          <div className="search-input-wrapper">
            <input
              type="text"
              className="search-order-input"
              placeholder="Nhập số đơn hàng hoặc tên khách hàng..."
              value={searchOrder}
              onChange={(e) => setSearchOrder(e.target.value)}
            />
            <span className="search-input-icon">🔍</span>
          </div>
          
          <div className="search-actions-row">
            <button className="search-action-btn primary" onClick={handleSearch}>
              <span className="btn-icon">🔍</span>
              Tìm kiếm
            </button>
            <button className="search-action-btn secondary" onClick={handleReset}>
              <span className="btn-icon">↻</span>
              Đặt lại
            </button>
            <div className="total-orders-info">
              <span className="orders-count">{filteredOrders.length}</span> đơn hàng
            </div>
          </div>
        </div>

        <div className="orders-list-section">
          {filteredOrders.length === 0 ? (
            <div className="empty-orders-state">
              <span className="empty-orders-icon">📦</span>
              <p className="empty-orders-title">Không tìm thấy đơn hàng</p>
              <p className="empty-orders-description">Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-info-left">
                    <div className="customer-name-section">
                      <span className="customer-icon">👤</span>
                      <span className="customer-name">{order.customer}</span>
                    </div>
                    <div className="order-meta">
                      <span className="order-number-label">Số đơn hàng:</span>
                      <span className="order-number-value">{order.orderNumber}</span>
                      <span className="order-date">• {order.date}</span>
                    </div>
                  </div>
                  <div className="order-info-right">
                    <div className="order-total-section">
                      <span className="total-label">Tổng cộng:</span>
                      <span className="total-value">{order.total}</span>
                    </div>
                    <span className={`order-status-badge ${order.status}`}>
                      {getStatusBadge(order.status).label}
                    </span>
                  </div>
                </div>
                
                <div className="order-products-list">
                  {order.products.map((product) => (
                    <div key={product.id} className="order-product-row">
                      <div className="product-main-info">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="product-order-thumbnail"
                        />
                        <div className="product-order-details">
                          <h4 className="product-order-name">{product.name}</h4>
                          <p className="product-order-price">
                            {product.price} × {product.quantity}
                          </p>
                        </div>
                      </div>
                      
                      <div className="product-shipping-info">
                        <div className="shipping-status-section">
                          <span className="shipping-status-label">Trạng thái:</span>
                          <span className={`shipping-status-text ${order.status}`}>
                            {product.dueDate}
                          </span>
                        </div>
                        <div className="shipping-service-section">
                          <span className="shipping-service-icon">🚚</span>
                          <span className="shipping-service-name">{product.shippingService}</span>
                        </div>
                      </div>
                      
                      <div className="product-quantity-section">
                        <span className="quantity-label">SL:</span>
                        <span className="quantity-value">{product.quantity}</span>
                      </div>
                      
                      {order.status === 'needs-shipping' && (
                        <div className="product-actions-section">
                          <button 
                            className="arrange-shipping-button"
                            onClick={() => handleArrangeShipping(order.id, product.id)}
                          >
                            <span className="btn-icon">📦</span>
                            Sắp xếp giao hàng
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
