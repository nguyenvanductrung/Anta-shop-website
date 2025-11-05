import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components';
import { useCart, useDataSync } from '../contexts';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const dataSync = useDataSync();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: '',
    shippingMethod: 'standard',
    paymentMethod: 'cod'
  });
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const shippingMethods = [
    { id: 'standard', name: 'Giao hàng tiêu chuẩn', price: 30000, time: '3-5 ngày' },
    { id: 'express', name: 'Giao hàng nhanh', price: 50000, time: '1-2 ngày' },
    { id: 'super-express', name: 'Giao hàng siêu tốc', price: 80000, time: 'Trong ngày' }
  ];

  const paymentMethods = [
    { id: 'cod', name: 'Thanh toán khi nhận hàng (COD)', icon: '💵' },
    { id: 'bank-transfer', name: 'Chuyển khoản ngân hàng', icon: '🏦' },
    { id: 'momo', name: 'Ví MoMo', icon: '📱' },
    { id: 'zalopay', name: 'Ví ZaloPay', icon: '💳' },
    { id: 'vnpay', name: 'VNPay', icon: '💳' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleApplyPromoCode = () => {
    const validCodes = {
      'CAMP50': { minOrder: 999000, discount: 50000 },
      'CAMP100': { minOrder: 1599000, discount: 100000 },
      'CAMP250': { minOrder: 2999000, discount: 250000 }
    };

    const code = validCodes[promoCode];
    if (code && getTotalPrice() >= code.minOrder) {
      setDiscount(code.discount);
      alert(`Áp dụng mã giảm giá thành công! Giảm ${code.discount.toLocaleString()}₫`);
    } else if (code) {
      alert(`Đơn hàng tối thiểu ${code.minOrder.toLocaleString()}₫`);
    } else {
      alert('Mã giảm giá không hợp lệ');
    }
  };

  const getShippingPrice = () => {
    const method = shippingMethods.find(m => m.id === formData.shippingMethod);
    return getTotalPrice() >= 500000 ? 0 : method?.price || 0;
  };

  const calculateFinalTotal = () => {
    return getTotalPrice() + getShippingPrice() - discount;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng');
      return;
    }

    if (items.length === 0) {
      alert('Giỏ hàng trống');
      return;
    }

    const orderData = {
      customer: formData,
      items: items,
      subtotal: getTotalPrice(),
      shipping: getShippingPrice(),
      discount: discount,
      total: calculateFinalTotal(),
      promoCode: promoCode,
      orderDate: new Date().toISOString()
    };

    console.log('Order placed:', orderData);

    clearCart();

    if (dataSync) {
      dataSync.emitOrdersUpdate({ action: 'create', order: orderData });
    }

    navigate('/order-success', { state: { orderData } });
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="checkout-page">
          <div className="container">
            <div className="empty-cart-message">
              <h2>Giỏ hàng của bạn đang trống</h2>
              <button className="continue-shopping-btn" onClick={() => navigate('/home')}>
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="checkout-page">
        <div className="breadcrumbs">
          <div className="container">
            <span className="breadcrumb-link" onClick={() => navigate('/home')}>Trang chủ</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-link" onClick={() => navigate('/cart')}>Giỏ hàng</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Thanh toán</span>
          </div>
        </div>

        <div className="checkout-container">
          <div className="container">
            <h1 className="checkout-title">Thanh toán</h1>
            
            <div className="checkout-layout">
              <div className="checkout-form-section">
                <form onSubmit={handlePlaceOrder}>
                  <div className="checkout-section">
                    <h2 className="section-title">Thông tin giao hàng</h2>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label htmlFor="fullName">Họ và tên *</label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Nhập họ và tên"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="phone">Số điện thoại *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Nhập số điện thoại"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Nhập email"
                        />
                      </div>
                      
                      <div className="form-group full-width">
                        <label htmlFor="address">Địa chỉ *</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Số nhà, tên đường"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="city">Tỉnh/Thành phố *</label>
                        <select
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Chọn Tỉnh/Thành phố</option>
                          <option value="hanoi">Hà Nội</option>
                          <option value="hcm">TP. Hồ Chí Minh</option>
                          <option value="danang">Đà Nẵng</option>
                          <option value="haiphong">Hải Phòng</option>
                          <option value="cantho">Cần Thơ</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="district">Quận/Huyện</label>
                        <input
                          type="text"
                          id="district"
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          placeholder="Nhập Quận/Huyện"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="ward">Phường/Xã</label>
                        <input
                          type="text"
                          id="ward"
                          name="ward"
                          value={formData.ward}
                          onChange={handleInputChange}
                          placeholder="Nhập Phường/Xã"
                        />
                      </div>
                      
                      <div className="form-group full-width">
                        <label htmlFor="note">Ghi chú đơn hàng (tùy chọn)</label>
                        <textarea
                          id="note"
                          name="note"
                          value={formData.note}
                          onChange={handleInputChange}
                          placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="checkout-section">
                    <h2 className="section-title">Phương thức vận chuyển</h2>
                    <div className="shipping-methods">
                      {shippingMethods.map((method) => (
                        <label key={method.id} className="shipping-option">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={method.id}
                            checked={formData.shippingMethod === method.id}
                            onChange={handleInputChange}
                          />
                          <div className="shipping-info">
                            <div className="shipping-name">{method.name}</div>
                            <div className="shipping-time">{method.time}</div>
                          </div>
                          <div className="shipping-price">
                            {getTotalPrice() >= 500000 && method.id === 'standard' 
                              ? 'Miễn phí' 
                              : `${method.price.toLocaleString()}₫`}
                          </div>
                        </label>
                      ))}
                    </div>
                    {getTotalPrice() < 500000 && (
                      <p className="shipping-note">
                        💡 Mua thêm {(500000 - getTotalPrice()).toLocaleString()}₫ để được miễn phí vận chuyển
                      </p>
                    )}
                  </div>

                  <div className="checkout-section">
                    <h2 className="section-title">Phương thức thanh toán</h2>
                    <div className="payment-methods">
                      {paymentMethods.map((method) => (
                        <label key={method.id} className="payment-option">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={handleInputChange}
                          />
                          <div className="payment-info">
                            <span className="payment-icon">{method.icon}</span>
                            <span className="payment-name">{method.name}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="place-order-btn">
                    Đặt hàng
                  </button>
                </form>
              </div>

              <div className="order-summary-section">
                <div className="order-summary-sticky">
                  <h2 className="section-title">Đơn hàng của bạn</h2>
                  
                  <div className="order-items">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="order-item">
                        <div className="order-item-image">
                          <img src={item.image} alt={item.name} />
                          <span className="item-quantity">{item.quantity}</span>
                        </div>
                        <div className="order-item-details">
                          <h4>{item.name}</h4>
                          <p className="item-variant">Size: {item.size} | Màu: {item.color}</p>
                          <p className="item-price">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="promo-code-section">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Nhập mã giảm giá"
                      className="promo-input"
                    />
                    <button type="button" onClick={handleApplyPromoCode} className="apply-btn">
                      Áp dụng
                    </button>
                  </div>

                  <div className="promo-suggestions">
                    <p className="promo-title">Mã giảm giá khả dụng:</p>
                    <div className="promo-codes">
                      <span className="promo-code-tag">CAMP50</span>
                      <span className="promo-code-tag">CAMP100</span>
                      <span className="promo-code-tag">CAMP250</span>
                    </div>
                  </div>

                  <div className="order-totals">
                    <div className="total-row">
                      <span>Tạm tính:</span>
                      <span>{getTotalPrice().toLocaleString()}₫</span>
                    </div>
                    <div className="total-row">
                      <span>Phí vận chuyển:</span>
                      <span>
                        {getShippingPrice() === 0 
                          ? 'Miễn phí' 
                          : `${getShippingPrice().toLocaleString()}₫`}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="total-row discount-row">
                        <span>Giảm giá:</span>
                        <span>-{discount.toLocaleString()}₫</span>
                      </div>
                    )}
                    <div className="total-row final-total">
                      <span>Tổng cộng:</span>
                      <span className="final-amount">{calculateFinalTotal().toLocaleString()}₫</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
