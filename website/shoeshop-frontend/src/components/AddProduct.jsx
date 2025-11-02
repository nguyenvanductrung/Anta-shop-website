import React, { useState } from 'react';
import './AddProduct.css';

export default function AddProduct({ setActiveSubTab }) {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState([]);

  const categories = [
    { id: 'giay-bong-ro', name: 'Giày Bóng Rổ' },
    { id: 'giay-chay-bo', name: 'Giày Chạy Bộ' },
    { id: 'giay-lifestyle', name: 'Giày Lifestyle' },
    { id: 'ao-thun', name: 'Áo Thun' },
    { id: 'ao-khoac', name: 'Áo Khoác' },
    { id: 'quan-short', name: 'Quần Short' },
    { id: 'quan-dai', name: 'Quần Dài' },
    { id: 'phu-kien', name: 'Phụ Kiện' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    const category = categories.find(cat => cat.id === categoryId);
    setFormData(prev => ({
      ...prev,
      category: category?.name || ''
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (images.length + files.length > 6) {
      alert('Tối đa 6 hình ảnh');
      return;
    }
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (imageId) => {
    setImages(prev => {
      const image = prev.find(img => img.id === imageId);
      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter(img => img.id !== imageId);
    });
  };

  const handleSubmit = () => {
    if (!formData.productName || !formData.price || !formData.stock || !formData.category) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
    
    console.log('Submitting product:', formData);
    console.log('Images:', images);
    alert('Sản phẩm đã được thêm thành công!');
    
    setFormData({
      productName: '',
      description: '',
      price: '',
      stock: '',
      category: ''
    });
    setImages([]);
    setSelectedCategory('');
  };

  const handleCancel = () => {
    if (window.confirm('Bạn có chắc muốn hủy? Tất cả thông tin sẽ bị mất.')) {
      if (setActiveSubTab) {
        setActiveSubTab('my-products');
      }
    }
  };

  return (
    <div className="add-product-component">
      <div className="add-product-content">
        <div className="page-header-section">
          <div className="header-left">
            <h1 className="page-main-title">Thêm Sản Phẩm Mới</h1>
            <p className="page-subtitle">Điền thông tin sản phẩm của bạn</p>
          </div>
          <button className="cancel-add-btn" onClick={handleCancel}>
            <span className="btn-icon">←</span>
            Quay lại
          </button>
        </div>

        <div className="add-product-grid">
          <div className="product-info-section">
            <div className="section-card">
              <h3 className="section-card-title">Thông Tin Cơ Bản</h3>
              
              <div className="form-fields-group">
                <div className="form-input-group">
                  <label className="input-label required">Tên sản phẩm</label>
                  <input
                    type="text"
                    className="form-text-input"
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    placeholder="Ví dụ: Giày ANTA KT7 - Đen"
                  />
                </div>
                
                <div className="form-input-group">
                  <label className="input-label">Mô tả sản phẩm</label>
                  <textarea
                    className="form-textarea-input"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Mô tả chi tiết về sản phẩm..."
                    rows="4"
                  />
                </div>
                
                <div className="form-row-grid">
                  <div className="form-input-group">
                    <label className="input-label required">Giá bán (VNĐ)</label>
                    <input
                      type="number"
                      className="form-text-input"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="Ví dụ: 2990000"
                    />
                  </div>
                  
                  <div className="form-input-group">
                    <label className="input-label required">Số lượng</label>
                    <input
                      type="number"
                      className="form-text-input"
                      value={formData.stock}
                      onChange={(e) => handleInputChange('stock', e.target.value)}
                      placeholder="Ví dụ: 100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h3 className="section-card-title">Hình Ảnh Sản Phẩm</h3>
              <p className="section-card-subtitle">Tối đa 6 hình ảnh. Hình đầu tiên sẽ là ảnh đại diện.</p>
              
              <div className="images-upload-grid">
                {Array.from({ length: 6 }, (_, index) => {
                  const image = images[index];
                  return (
                    <div key={index} className="image-upload-slot">
                      {image ? (
                        <div className="image-preview-wrapper">
                          <img src={image.preview} alt={`Preview ${index + 1}`} className="uploaded-image-preview" />
                          <button 
                            className="remove-image-btn"
                            onClick={() => removeImage(image.id)}
                            type="button"
                          >
                            ✕
                          </button>
                          {index === 0 && (
                            <span className="primary-image-badge">Ảnh chính</span>
                          )}
                        </div>
                      ) : (
                        <label className="upload-image-label">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                            multiple={images.length === 0}
                          />
                          <div className="upload-image-placeholder">
                            <span className="upload-placeholder-icon">📷</span>
                            <span className="upload-placeholder-text">Thêm ảnh</span>
                          </div>
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="category-section-sidebar">
            <div className="section-card">
              <h3 className="section-card-title">Danh Mục</h3>
              
              <div className="form-input-group">
                <label className="input-label required">Chọn danh mục</label>
                <input
                  type="text"
                  className="form-text-input"
                  value={formData.category}
                  readOnly
                  placeholder="Chọn danh mục bên dưới..."
                />
              </div>
              
              <div className="category-selection-list">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={`category-selection-item ${selectedCategory === category.id ? 'selected' : ''}`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <span className="category-item-icon">
                      {selectedCategory === category.id ? '✓' : '○'}
                    </span>
                    <span className="category-item-name">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="submit-actions-card">
              <button className="submit-product-btn" onClick={handleSubmit}>
                <span className="btn-icon">✓</span>
                Thêm Sản Phẩm
              </button>
              <button className="cancel-product-btn" onClick={handleCancel}>
                <span className="btn-icon">✕</span>
                Hủy Bỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
