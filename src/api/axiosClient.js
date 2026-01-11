import axios from "axios";

const axiosClient = axios.create({
  baseURL: " http://127.0.0.1:8000",
  // baseURL: "https://alec-vicegeral-exuberantly.ngrok-free.dev",
  // baseURL: "https://hoaitam123.xyz",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": "69420", // test với gork
  },
});

// Tự động thêm Token vào header nếu có
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // Gán token vào header
      config.headers.Authorization = `Bearer ${token}`;

      // LOG KIỂM TRA: In ra console để xem token đã được lấy và gán chưa
    } else {
      console.warn("⚠️ [Axios] No token found in localStorage");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý lỗi trả về
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
