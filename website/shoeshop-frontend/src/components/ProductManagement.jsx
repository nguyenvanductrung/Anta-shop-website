import React, { useState } from 'react';
import AddProduct from './AddProduct';
import './ProductManagement.css';

export default function ProductManagement({ activeSubTab, setActiveSubTab }) {
  const [filters, setFilters] = useState({
    productName: '',
    quantityMin: '',
    quantityMax: '',
    category: '',
    priceMin: '',
    priceMax: ''
  });

  const mockProducts = [
    {
      id: 1,
      name: 'Giày ANTA KT7 - Đen',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=200',
      price: '2.990.000',
      quantity: 45,
      category: 'Giày Bóng Rổ',
      rating: 5,
      status: 'active',
      sales: 128
    },
    {
      id: 2,
      name: 'Áo thun ANTA Running - Trắng',
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=200',
      price: '599.000',
      quantity: 120,
      category: 'Áo thun',
      rating: 5,
      status: 'active',
      sales: 89
    },
    {
      id: 3,
      name: 'Giày ANTA C202 GT - Xanh',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=200',
      price: '1.790.000',
      quantity: 28,
      category: 'Giày Chạy Bộ',
      rating: 4,
      status: 'active',
      sales: 56
    },
    {
      id: 4,
      name: 'Quần short ANTA Training',
      image: 'https://images.pexels.com/photos/7432926/pexels-photo-7432926.jpeg?auto=compress&cs=tinysrgb&w=200',
      price: '450.000',
      quantity: 85,
      category: 'Quần short',
      rating: 5,
      status: 'active',
      sales: 73
    },
    {
      id: 5,
      name: 'Balo ANTA Sport - Đen',
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=200',
      price: '890.000',
      quantity: 12,
      category: 'Phụ kiện',
      rating: 4,
      status: 'low-stock',
      sales: 34
    }
  ];

  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    let filtered = [...products];

    if (filters.productName) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(filters.productName.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(p => 
        p.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.quantityMin) {
      filtered = filtered.filter(p => p.quantity >= parseInt(filters.quantityMin));
    }

    if (filters.quantityMax) {
      filtered = filtered.filter(p => p.quantity <= parseInt(filters.quantityMax));
    }

    if (filters.priceMin) {
      filtered = filtered.filter(p => 
        parseInt(p.price.replace(/\./g, '')) >= parseInt(filters.priceMin) * 1000
      );
    }

    if (filters.priceMax) {
      filtered = filtered.filter(p => 
        parseInt(p.price.replace(/\./g, '')) <= parseInt(filters.priceMax) * 1000
      );
    }

    setFilteredProducts(filtered);
  };

  const handleReset = () => {
    setFilters({
      productName: '',
      quantityMin: '',
      quantityMax: '',
      category: '',
      priceMin: '',
      priceMax: ''
    });
    setFilteredProducts(products);
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      console.log('Deleting product:', productId);
    }
  };

  const handleEditProduct = (productId) => {
    console.log('Editing product:', productId);
    setActiveSubTab('add-product');
  };

  if (activeSubTab === 'add-product') {
    return <AddProduct setActiveSubTab={setActiveSubTab} />;
  }

  if (activeSubTab === 'violations') {
    return (
      <div className="product-management">
        <div className="product-management-content">
          <div className="page-header-section">
            <h1 className="page-main-title">Quản Lý Sản Phẩm</h1>
            <p className="page-subtitle">Vi phạm và cảnh báo</p>
          </div>

          <div className="tabs-section">
            <button 
              className="tab-button"
              onClick={() => setActiveSubTab('my-products')}
            >
              Sản phẩm của tôi
            </button>
            <button 
              className="tab-button"
              onClick={() => setActiveSubTab('add-product')}
            >
              Thêm sản phẩm
            </button>
            <button 
              className="tab-button active"
              onClick={() => setActiveSubTab('violations')}
            >
              Vi phạm
            </button>
          </div>

          <div className="empty-state-container">
            <span className="empty-icon">✓</span>
            <p className="empty-title">Không có vi phạm</p>
            <p className="empty-description">Tất cả sản phẩm đều tuân thủ chính sách của hệ thống</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-management">
      <div className="product-management-content">
        <div className="page-header-section">
          <h1 className="page-main-title">Quản Lý Sản Phẩm</h1>
          <p className="page-subtitle">Quản lý tất cả sản phẩm của bạn</p>
        </div>

        <div className="tabs-section">
          <button 
            className={`tab-button ${activeSubTab === 'my-products' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('my-products')}
          >
            Sản phẩm của tôi
          </button>
          <button 
            className="tab-button"
            onClick={() => setActiveSubTab('add-product')}
          >
            Thêm sản phẩm
          </button>
          <button 
            className="tab-button"
            onClick={() => setActiveSubTab('violations')}
          >
            Vi phạm
          </button>
        </div>

        <div className="filters-card">
          <div className="filters-grid">
            <div className="filter-input-group">
              <label className="filter-label">Tên sản phẩm</label>
              <input
                type="text"
                className="filter-input"
                value={filters.productName}
                onChange={(e) => handleFilterChange('productName', e.target.value)}
                placeholder="Nhập tên sản phẩm..."
              />
            </div>

            <div className="filter-input-group">
              <label className="filter-label">Danh mục</label>
              <input
                type="text"
                className="filter-input"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                placeholder="Nhập danh mục..."
              />
            </div>

            <div className="filter-input-group">
              <label className="filter-label">Số lượng</label>
              <div className="range-filter">
                <input
                  type="number"
                  className="filter-input small"
                  value={filters.quantityMin}
                  onChange={(e) => handleFilterChange('quantityMin', e.target.value)}
                  placeholder="Tối thiểu"
                />
                <span className="range-separator">-</span>
                <input
                  type="number"
                  className="filter-input small"
                  value={filters.quantityMax}
                  onChange={(e) => handleFilterChange('quantityMax', e.target.value)}
                  placeholder="Tối đa"
                />
              </div>
            </div>

            <div className="filter-input-group">
              <label className="filter-label">Giá (x1000 VNĐ)</label>
              <div className="range-filter">
                <input
                  type="number"
                  className="filter-input small"
                  value={filters.priceMin}
                  onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                  placeholder="Tối thiểu"
                />
                <span className="range-separator">-</span>
                <input
                  type="number"
                  className="filter-input small"
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                  placeholder="Tối đa"
                />
              </div>
            </div>
          </div>
          
          <div className="filter-actions-row">
            <button className="filter-search-btn" onClick={handleSearch}>
              <span className="btn-icon">🔍</span>
              Tìm kiếm
            </button>
            <button className="filter-reset-btn" onClick={handleReset}>
              <span className="btn-icon">↻</span>
              Đặt lại
            </button>
            <div className="total-results">
              <span className="result-count">{filteredProducts.length}</span> sản phẩm
            </div>
          </div>
        </div>

        <div className="products-table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th className="col-product">Sản phẩm</th>
                <th className="col-category">Danh mục</th>
                <th className="col-price">Giá</th>
                <th className="col-quantity">Số lượng</th>
                <th className="col-sales">Đã bán</th>
                <th className="col-rating">Đánh giá</th>
                <th className="col-status">Trạng thái</th>
                <th className="col-actions">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="table-row">
                  <td className="product-cell">
                    <div className="product-info-cell">
                      <img src={product.image} alt={product.name} className="product-thumbnail" />
                      <span className="product-name">{product.name}</span>
                    </div>
                  </td>
                  <td className="category-cell">{product.category}</td>
                  <td className="price-cell">{product.price} VNĐ</td>
                  <td className="quantity-cell">
                    <span className={product.status === 'low-stock' ? 'low-stock-badge' : ''}>
                      {product.quantity}
                    </span>
                  </td>
                  <td className="sales-cell">{product.sales}</td>
                  <td className="rating-cell">
                    <span className="star-rating">{renderStars(product.rating)}</span>
                  </td>
                  <td className="status-cell">
                    <span className={`status-indicator ${product.status}`}>
                      {product.status === 'active' ? 'Đang bán' : 'Sắp h��t'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons-group">
                      <button 
                        className="action-edit-btn"
                        onClick={() => handleEditProduct(product.id)}
                        title="Chỉnh sửa"
                      >
                        ✏️
                      </button>
                      <button 
                        className="action-delete-btn"
                        onClick={() => handleDeleteProduct(product.id)}
                        title="Xóa"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
