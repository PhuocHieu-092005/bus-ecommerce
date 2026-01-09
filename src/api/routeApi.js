import axiosClient from "./axiosClient";

const routeApi = {
  // Đổi hết thành /routess
  getAll: (params) => axiosClient.get("/routess", { params }),
  get: (id) => axiosClient.get(`/routess/${id}`),
  create: (data) => axiosClient.post("/routess", data),
  update: (id, data) => axiosClient.put(`/routess/${id}`, data),
  delete: (id) => axiosClient.delete(`/routess/${id}`),

  // --- THÊM 2 HÀM MỚI ---
  getFromCities: () => axiosClient.get("/routess/from-city"),
  getToCities: () => axiosClient.get("/routess/to-city"),
};

export default routeApi;
