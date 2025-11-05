// Mock User Service với dữ liệu hardcode
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data storage
let mockUserProfile = {
  fullName: 'Nguyễn Văn A',
  email: 'user@anta.com',
  phone: '0123456789',
  birthday: '1990-01-01',
  gender: 'male'
};

let mockOrders = [
  {
    id: 'ORD001',
    date: '2024-01-15',
    createdAt: '2024-01-15T10:30:00',
    status: 'Đã giao',
    total: 2990000,
    totalAmount: 2990000,
    items: 2,
    totalItems: 2,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [
      {
        id: 1,
        name: 'Giày ANTA KT7 - Đen',
        image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 2990000,
        quantity: 1
      }
    ]
  },
  {
    id: 'ORD002',
    date: '2024-01-20',
    createdAt: '2024-01-20T14:20:00',
    status: 'Đang giao',
    total: 1790000,
    totalAmount: 1790000,
    items: 1,
    totalItems: 1,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [
      {
        id: 2,
        name: 'Giày ANTA C202 GT - Xanh',
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 1790000,
        quantity: 1
      }
    ]
  },
  {
    id: 'ORD003',
    date: '2024-01-25',
    createdAt: '2024-01-25T09:15:00',
    status: 'Đang xử lý',
    total: 1049000,
    totalAmount: 1049000,
    items: 2,
    totalItems: 2,
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [
      {
        id: 3,
        name: 'Áo thun ANTA Running - Trắng',
        image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 599000,
        quantity: 1
      },
      {
        id: 4,
        name: 'Quần short ANTA Training',
        image: 'https://images.pexels.com/photos/7432926/pexels-photo-7432926.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 450000,
        quantity: 1
      }
    ]
  },
  {
    id: 'ORD004',
    date: '2024-02-01',
    createdAt: '2024-02-01T16:45:00',
    status: 'Đã hủy',
    total: 890000,
    totalAmount: 890000,
    items: 1,
    totalItems: 1,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
    products: [
      {
        id: 5,
        name: 'Balo ANTA Sport - Đen',
        image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 890000,
        quantity: 1
      }
    ]
  }
];

let mockWishlist = [
  {
    id: 1,
    productId: 101,
    name: 'Giày ANTA KT8 - Trắng',
    image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 3290000,
    originalPrice: 3990000,
    inStock: true,
    product: {
      id: 101,
      name: 'Giày ANTA KT8 - Trắng',
      image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 3290000
    }
  },
  {
    id: 2,
    productId: 102,
    name: 'Áo khoác ANTA Wind Breaker',
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 1290000,
    originalPrice: 1590000,
    inStock: true,
    product: {
      id: 102,
      name: 'Áo khoác ANTA Wind Breaker',
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 1290000
    }
  },
  {
    id: 3,
    productId: 103,
    name: 'Giày ANTA Running Flash',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 1990000,
    inStock: false,
    product: {
      id: 103,
      name: 'Giày ANTA Running Flash',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 1990000
    }
  }
];

let mockAddresses = [
  {
    id: 1,
    recipientName: 'Nguyễn Văn A',
    phone: '0123456789',
    address: '123 Đường Láng, Đống Đa, Hà Nội',
    isDefault: true
  },
  {
    id: 2,
    recipientName: 'Nguyễn Văn A',
    phone: '0987654321',
    address: '456 Trần Duy Hưng, Cầu Giấy, Hà Nội',
    isDefault: false
  }
];

// User Profile Service
export const userProfileService = {
  getProfile: async () => {
    await delay();
    return mockUserProfile;
  },

  updateProfile: async (profileData) => {
    await delay();
    mockUserProfile = { ...mockUserProfile, ...profileData };
    return mockUserProfile;
  },

  changePassword: async (passwordData) => {
    await delay();
    // Mock validation
    if (passwordData.currentPassword !== 'password123') {
      throw new Error('Mật khẩu hiện tại không đúng');
    }
    return { message: 'Đổi mật khẩu thành công' };
  }
};

// Order Service
export const userOrderService = {
  getOrders: async (params = {}) => {
    await delay();
    return mockOrders;
  },

  getOrder: async (id) => {
    await delay();
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      throw new Error('Không tìm thấy đơn hàng');
    }
    return order;
  },

  cancelOrder: async (id) => {
    await delay();
    const order = mockOrders.find(o => o.id === id);
    if (order) {
      order.status = 'Đã hủy';
    }
    return { message: 'Hủy đơn hàng thành công' };
  }
};

// Wishlist Service
export const userWishlistService = {
  getWishlist: async () => {
    await delay();
    return mockWishlist;
  },

  addToWishlist: async (productId) => {
    await delay();
    const newItem = {
      id: mockWishlist.length + 1,
      productId,
      name: 'Sản phẩm mới',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 1000000,
      inStock: true
    };
    mockWishlist.push(newItem);
    return newItem;
  },

  removeFromWishlist: async (id) => {
    await delay();
    const index = mockWishlist.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      mockWishlist.splice(index, 1);
      return { message: 'Đã xóa khỏi danh sách yêu thích' };
    }
    throw new Error('Không tìm thấy sản phẩm');
  }
};

// Address Service
export const userAddressService = {
  getAddresses: async () => {
    await delay();
    return mockAddresses;
  },

  addAddress: async (addressData) => {
    await delay();
    const newAddress = {
      id: mockAddresses.length + 1,
      ...addressData
    };
    
    // If set as default, remove default from others
    if (addressData.isDefault) {
      mockAddresses.forEach(addr => addr.isDefault = false);
    }
    
    mockAddresses.push(newAddress);
    return newAddress;
  },

  updateAddress: async (id, addressData) => {
    await delay();
    const index = mockAddresses.findIndex(addr => addr.id === parseInt(id));
    if (index !== -1) {
      // If set as default, remove default from others
      if (addressData.isDefault) {
        mockAddresses.forEach(addr => addr.isDefault = false);
      }
      
      mockAddresses[index] = { ...mockAddresses[index], ...addressData };
      return mockAddresses[index];
    }
    throw new Error('Không tìm thấy địa chỉ');
  },

  deleteAddress: async (id) => {
    await delay();
    const index = mockAddresses.findIndex(addr => addr.id === parseInt(id));
    if (index !== -1) {
      mockAddresses.splice(index, 1);
      return { message: 'Xóa địa chỉ thành công' };
    }
    throw new Error('Không tìm thấy địa chỉ');
  },

  setDefaultAddress: async (id) => {
    await delay();
    mockAddresses.forEach(addr => {
      addr.isDefault = addr.id === parseInt(id);
    });
    return { message: 'Đã đặt làm địa chỉ mặc định' };
  }
};

export default {
  profile: userProfileService,
  orders: userOrderService,
  wishlist: userWishlistService,
  addresses: userAddressService
};
