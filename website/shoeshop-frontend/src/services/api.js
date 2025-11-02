import axios from 'axios';
import { API_ENDPOINTS, STORAGE_KEYS } from '../constants';
import { getErrorMessage } from '../utils';

// Create axios instance
const api = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, clear storage and let AuthContext handle redirect
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      // Dispatch custom event for AuthContext to handle navigation
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.REFRESH);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

// Product services
export const productService = {
  getProducts: async (params = {}) => {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS.LIST, { params });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getProduct: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS.DETAIL.replace(':id', id));
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  searchProducts: async (query) => {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS.SEARCH, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

// Cart services
export const cartService = {
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await api.post(API_ENDPOINTS.CART.ADD, {
        productId,
        quantity
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  removeFromCart: async (productId) => {
    try {
      const response = await api.delete(API_ENDPOINTS.CART.REMOVE, {
        data: { productId }
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  updateCartItem: async (productId, quantity) => {
    try {
      const response = await api.put(API_ENDPOINTS.CART.UPDATE, {
        productId,
        quantity
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

// User services
export const userService = {
  getProfile: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.USER.PROFILE);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put(API_ENDPOINTS.USER.UPDATE_PROFILE, userData);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  changePassword: async (passwordData) => {
    try {
      const response = await api.post(API_ENDPOINTS.USER.CHANGE_PASSWORD, passwordData);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getAddresses: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.USER.ADDRESSES);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  addAddress: async (addressData) => {
    try {
      const response = await api.post(API_ENDPOINTS.USER.ADD_ADDRESS, addressData);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  updateAddress: async (id, addressData) => {
    try {
      const response = await api.put(
        API_ENDPOINTS.USER.UPDATE_ADDRESS.replace(':id', id),
        addressData
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  deleteAddress: async (id) => {
    try {
      const response = await api.delete(
        API_ENDPOINTS.USER.DELETE_ADDRESS.replace(':id', id)
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  setDefaultAddress: async (id) => {
    try {
      const response = await api.put(
        API_ENDPOINTS.USER.SET_DEFAULT_ADDRESS.replace(':id', id)
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

// Order services
export const orderService = {
  getOrders: async (params = {}) => {
    try {
      const response = await api.get(API_ENDPOINTS.ORDERS.LIST, { params });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getOrder: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.ORDERS.DETAIL.replace(':id', id));
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

// Wishlist services
export const wishlistService = {
  getWishlist: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.WISHLIST.LIST);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  addToWishlist: async (productId) => {
    try {
      const response = await api.post(API_ENDPOINTS.WISHLIST.ADD, { productId });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  removeFromWishlist: async (id) => {
    try {
      const response = await api.delete(
        API_ENDPOINTS.WISHLIST.REMOVE.replace(':id', id)
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default api;
