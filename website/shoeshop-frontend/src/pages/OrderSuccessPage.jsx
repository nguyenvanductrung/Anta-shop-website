import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '../components';
import { useOrders } from '../contexts';
import './OrderSuccessPage.css';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;
  const { refreshOrders } = useOrders();

  useEffect(() => {
    if (orderData) {
      refreshOrders();
    }
  }, [orderData, refreshOrders]);

  if (!orderData) {
    return (
      <Layout>
        <div className="order-success-page">
          <div className="container">
            <div className="no-order-message">
              <h2>Không tìm thấy thông tin đơn hàng</h2>
              <button className="back-home-btn" onClick={() => navigate('/home')}>
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const orderNumber = `ANT${Date.now().toString().slice(-8)}`;
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN');

  return (
    <Layout>
      <div className="order-success-page">
        <div className="container">
          <div className="success-animation">
            <div className="checkmark-circle">
              <div className="checkmark">✓</div>
            </div>
          </div>

          <div className="success-message">
            <h1>Đặt hàng thành công!</h1>
            <p>Cảm ơn bạn đã đặt hàng tại ANTA Việt Nam</p>
          </div>

          <div className="order-info-card">
            <div className="order-header">
              <div className="order-number-section">
                <span className="label">Mã đơn hàng:</span>
                <span className="order-number">{orderNumber}</span>
              </div>
              <div className="order-status">
                <span className="status-badge processing">Đang xử lý</span>
              </div>
            </div>

            <div className="order-details">
              <div className="detail-section">
                <h3 className="section-heading">Thông tin giao hàng</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Người nhận:</span>
                    <span className="info-value">{orderData.customer.fullName}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Số điện thoại:</span>
                    <span className="info-value">{orderData.customer.phone}</span>
                  </div>
                  {orderData.customer.email && (
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{orderData.customer.email}</span>
                    </div>
                  )}
                  <div className="info-item full-width">
                    <span className="info-label">Địa chỉ:</span>
                    <span className="info-value">
                      {orderData.customer.address}, {orderData.customer.ward && `${orderData.customer.ward}, `}
                      {orderData.customer.district && `${orderData.customer.district}, `}
                      {orderData.customer.city}
                    </span>
                  </div>
                  {orderData.customer.note && (
                    <div className="info-item full-width">
                      <span className="info-label">Ghi chú:</span>
                      <span className="info-value">{orderData.customer.note}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="detail-section">
                <h3 className="section-heading">Chi tiết đơn hàng</h3>
                <div className="order-items-list">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                        <span className="item-quantity-badge">{item.quantity}</span>
                      </div>
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        <p className="item-variant">Size: {item.size} | Màu: {item.color}</p>
                      </div>
                      <div className="item-price">
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h3 className="section-heading">Tổng quan thanh toán</h3>
                <div className="payment-summary">
                  <div className="summary-row">
                    <span>Tạm tính:</span>
                    <span>{orderData.subtotal.toLocaleString()}₫</span>
                  </div>
                  <div className="summary-row">
                    <span>Phí vận chuyển:</span>
                    <span>{orderData.shipping === 0 ? 'Miễn phí' : `${orderData.shipping.toLocaleString()}₫`}</span>
                  </div>
                  {orderData.discount > 0 && (
                    <div className="summary-row discount">
                      <span>Giảm giá {orderData.promoCode && `(${orderData.promoCode})`}:</span>
                      <span>-{orderData.discount.toLocaleString()}₫</span>
                    </div>
                  )}
                  <div className="summary-row total">
                    <span>Tổng cộng:</span>
                    <span className="total-amount">{orderData.total.toLocaleString()}₫</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3 className="section-heading">Phương thức thanh toán</h3>
                <div className="payment-method-display">
                  {orderData.customer.paymentMethod === 'cod' && (
                    <div className="payment-info">
                      <span className="payment-icon">💵</span>
                      <span>Thanh toán khi nhận hàng (COD)</span>
                    </div>
                  )}
                  {orderData.customer.paymentMethod === 'bank-transfer' && (
                    <div className="payment-info">
                      <span className="payment-icon">🏦</span>
                      <span>Chuyển khoản ngân hàng</span>
                    </div>
                  )}
                  {orderData.customer.paymentMethod === 'momo' && (
                    <div className="payment-info">
                      <span className="payment-icon">📱</span>
                      <span>Ví MoMo</span>
                    </div>
                  )}
                  {orderData.customer.paymentMethod === 'zalopay' && (
                    <div className="payment-info">
                      <span className="payment-icon">💳</span>
                      <span>Ví ZaloPay</span>
                    </div>
                  )}
                  {orderData.customer.paymentMethod === 'vnpay' && (
                    <div className="payment-info">
                      <span className="payment-icon">💳</span>
                      <span>VNPay</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="delivery-estimate">
              <div className="estimate-icon">📦</div>
              <div className="estimate-text">
                <h4>Dự kiến giao hàng</h4>
                <p>{estimatedDelivery}</p>
              </div>
            </div>
          </div>

          <div className="next-steps-section">
            <h3>Bước tiếp theo</h3>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon">📧</div>
                <h4>Kiểm tra email</h4>
                <p>Chúng tôi đã gửi xác nhận đơn hàng đến email của bạn</p>
              </div>
              <div className="step-card">
                <div className="step-icon">📱</div>
                <h4>Theo dõi đơn hàng</h4>
                <p>Bạn có thể theo dõi trạng thái đơn hàng qua số điện thoại</p>
              </div>
              <div className="step-card">
                <div className="step-icon">🚚</div>
                <h4>Nhận hàng</h4>
                <p>Đơn hàng sẽ được giao trong vòng 3-5 ngày làm việc</p>
              </div>
            </div>
          </div>

          <div className="contact-support">
            <p>Cần hỗ trợ? Liên hệ ngay: <a href="tel:0974945488">0974 945 488</a> hoặc email: <a href="mailto:saleonline@anta.com">saleonline@anta.com</a></p>
          </div>

          <div className="action-buttons">
            <button className="btn-secondary" onClick={() => navigate('/home')}>
              Tiếp tục mua sắm
            </button>
            <button className="btn-primary" onClick={() => navigate('/account/orders')}>
              Xem đơn hàng
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
