# Hướng Dẫn Sử Dụng Account Page

## Đăng Nhập Test Account

Account Page đã được hoàn thiện với dữ liệu hardcode để test. Sử dụng tài khoản sau để đăng nhập:

### Tài Khoản User (Người Dùng)
- **Username**: `user`
- **Password**: `123456`

### Tài Khoản Admin (Quản Trị Viên)
- **Username**: `admin`
- **Password**: `abc123!@#`

## Các Tính Năng Đã Hoàn Thiện

### 1. **Tổng Quan (Overview)**
- Hiển thị thông tin user đã đăng nhập
- Thống kê số lượng đơn hàng, sản phẩm yêu thích
- Danh sách đơn hàng gần đây

### 2. **Đơn Hàng (Orders)**
- Xem danh sách tất cả đơn hàng
- Lọc đơn hàng theo trạng thái:
  - Tất cả
  - Chờ xử lý
  - Đang giao
  - Đã giao
  - Đã hủy
- Hiển thị chi tiết từng đơn hàng với:
  - Mã đơn hàng
  - Ngày đặt
  - Trạng thái
  - Tổng tiền
  - Hình ảnh sản phẩm

**Mock Data**: 4 đơn hàng mẫu với các trạng thái khác nhau

### 3. **Sản Phẩm Yêu Thích (Wishlist)**
- Danh sách sản phẩm đã lưu yêu thích
- Hiển thị giá gốc và giá khuyến mãi
- Thông báo trạng thái hết hàng
- Xóa sản phẩm khỏi danh sách yêu thích
- Nút "Thêm vào giỏ hàng" hoặc "Thông báo khi có hàng"

**Mock Data**: 3 sản phẩm mẫu (1 hết hàng, 2 còn hàng)

### 4. **Thông Tin Tài Khoản (Profile)**
- **Thông tin cá nhân:**
  - Họ và tên
  - Email
  - Số điện thoại
  - Ngày sinh
  - Giới tính
- Cập nhật thông tin với validation
- Nút "Cập nhật" và "Hủy"

- **Đổi mật khẩu:**
  - Mật khẩu hiện tại
  - Mật khẩu mới
  - Xác nhận mật khẩu mới
  - Validation độ dài mật khẩu (tối thiểu 6 ký tự)
  - Kiểm tra mật khẩu mới khớp nhau

**Mock Data**: Thông tin user mặc định, mật khẩu test là `password123`

### 5. **Sổ Địa Chỉ (Addresses)**
- Xem danh sách địa chỉ giao hàng
- Thêm địa chỉ mới
- Chỉnh sửa địa chỉ
- Xóa địa chỉ (có confirm)
- Đặt địa chỉ mặc định
- Modal form đầy đủ với các trường:
  - Họ tên người nhận
  - Số điện thoại
  - Địa chỉ chi tiết
  - Checkbox đặt làm mặc định

**Mock Data**: 2 địa chỉ mẫu

## Dữ Liệu Mock Hiện Có

### Thông Tin User Mặc Định
```javascript
{
  fullName: 'Nguyễn Văn A',
  email: 'user@anta.com',
  phone: '0123456789',
  birthday: '1990-01-01',
  gender: 'male'
}
```

### Đơn Hàng (4 đơn)
1. **ORD001** - Đã giao - 2,990,000₫
2. **ORD002** - Đang giao - 1,790,000₫
3. **ORD003** - Đang xử lý - 1,049,000₫
4. **ORD004** - Đã hủy - 890,000₫

### Sản Phẩm Yêu Thích (3 sản phẩm)
1. Giày ANTA KT8 - Trắng (Còn hàng) - 3,290,000₫
2. Áo khoác ANTA Wind Breaker (Còn hàng) - 1,290,000₫
3. Giày ANTA Running Flash (Hết hàng) - 1,990,000₫

### Địa Chỉ (2 địa chỉ)
1. 123 Đường Láng, Đống Đa, Hà Nội (Mặc định)
2. 456 Trần Duy Hưng, Cầu Giấy, Hà Nội

## Kiểm Tra Chức Năng

### Test Flow Hoàn Chỉnh:

1. **Đăng nhập**
   - Truy cập `/login`
   - Nhập username: `user`, password: `123456`
   - Nhấn Login
   - Sẽ redirect tới `/account`

2. **Tổng quan**
   - Xem thống kê đơn hàng và wishlist
   - Click vào các số li���u để chuyển tab

3. **Đơn hàng**
   - Xem danh sách đơn hàng
   - Lọc theo trạng thái
   - Kiểm tra hiển thị thông tin đầy đủ

4. **Wishlist**
   - Xem sản phẩm yêu thích
   - Test xóa sản phẩm khỏi wishlist
   - Kiểm tra trạng thái hết hàng

5. **Profile**
   - Sửa thông tin cá nhân
   - Nhấn "Cập nhật thông tin" (sẽ thông báo thành công)
   - Test đổi mật khẩu:
     - Nhập mật khẩu hiện tại: `password123`
     - Nhập mật khẩu mới bất kỳ
     - Kiểm tra validation

6. **Địa chỉ**
   - Xem danh sách địa chỉ
   - Thêm địa chỉ mới
   - Chỉnh sửa địa chỉ
   - Đặt địa chỉ mặc định
   - Xóa địa chỉ

7. **Đăng xuất**
   - Click "Đăng xuất" ở menu bên trái
   - Sẽ redirect về `/home`

## Responsive Design

Account Page đã được tối ưu cho tất cả kích thước màn hình:
- Desktop: Layout 2 cột (sidebar + content)
- Tablet: Sidebar thu gọn
- Mobile: Sidebar chuyển thành menu dropdown

## Lưu Ý Kỹ Thuật

1. **Mock Services**: Tất cả dữ liệu được lưu trong `src/services/userService.js`
2. **API Integration**: Khi backend sẵn sàng, chỉ cần thay đổi trong `src/services/api.js`
3. **Data Persistence**: Dữ liệu mock được lưu trong memory, sẽ reset khi reload trang
4. **Authentication**: Sử dụng JWT mock, token được lưu trong localStorage

## Files Liên Quan

- `src/pages/AccountPage.jsx` - Component chính
- `src/pages/AccountPage.css` - Styles
- `src/services/userService.js` - Mock data và services
- `src/services/api.js` - API wrapper (đã integrate mock services)
- `src/components/AuthForm.jsx` - Login form (có mock user)
- `src/contexts/AuthContext.jsx` - Authentication context

## Chuyển Sang Backend Thật

Khi muốn kết nối backend thật, sửa file `src/services/api.js`:

```javascript
// Thay vì:
import mockUserService from './userService';
return await mockUserService.profile.getProfile();

// Sửa thành:
const response = await api.get(API_ENDPOINTS.USER.PROFILE);
return response.data;
```

---

**Phát triển bởi**: ANTA Shop Frontend Team  
**Ngày cập nhật**: 2024
