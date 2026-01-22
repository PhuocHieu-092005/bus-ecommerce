import axiosClient from "./axiosClient";

const tripApi = {
  // =================================================
  // 1. CÁC HÀM CHUNG (Dùng cho cả User & Admin)
  // =================================================
  getAll: (params) => axiosClient.get("/trips", { params }),
  // Lấy chi tiết 1 chuyến xe (Admin dùng để sửa, User dùng để xem trước khi đặt)
  get(id) {
    const url = `/trips/${id}`;
    return axiosClient.get(url);
  },
  // =================================================
  // 2. CÁC HÀM DÀNH RIÊNG CHO ADMIN (Quản lý)
  // =================================================

  // Thêm chuyến xe mới
  create(data) {
    const url = "/trips";
    return axiosClient.post(url, data);
  },
  // Cập nhật chuyến xe
  update(id, data) {
    const url = `/trips/${id}`;
    return axiosClient.put(url, data);
  },
  // Xóa chuyến xe
  delete(id) {
    const url = `/trips/${id}`;
    return axiosClient.delete(url);
  },

  // =================================================
  // 3. CÁC HÀM DÀNH RIÊNG CHO USER (Đặt vé & Tìm kiếm)
  // =================================================

  // Tìm kiếm chuyến xe (Trang chủ)
  searchTrips(data) {
    const url = "/search-trips";
    return axiosClient.post(url, data);
  },

  // Lấy danh sách ghế của chuyến xe
  getSeats(id) {
    const url = `/trips/${id}/seats`;
    return axiosClient.get(url);
  },

  // Lấy điểm đón theo Route ID
  getPickupPoints(routeId) {
    const url = `/routes/${routeId}/pickup-points`;
    return axiosClient.get(url);
  },

  // Gửi yêu cầu Đặt vé
  createBooking(data) {
    const url = "/bookings";
    return axiosClient.post(url, data);
  },

  // --- Các hàm hỗ trợ khác (Route) ---
  getRoutes() {
    return axiosClient.get("/routes");
  },

  searchRoutes(keyword) {
    const url = "/search-routes";
    return axiosClient.post(url, { keyword });
  },

  getPopularRoutes() {
    const url = "/popular-routes";
    return axiosClient.get(url);
  },
};

export default tripApi;
