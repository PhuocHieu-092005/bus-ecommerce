import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://hoaitam123.xyz",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
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
      console.log("✅ [Axios] Token attached:", token);
      console.log("✅ [Axios] Headers:", config.headers);
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
