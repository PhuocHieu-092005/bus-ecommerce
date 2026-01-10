import axiosClient from "./axiosClient";

const busApi = {
  //thêm params để phân trang
  getAll: (params) => axiosClient.get("/buses", { params }),
  get: (id) => axiosClient.get(`/buses/${id}`),
  create: (data) => axiosClient.post("/buses", data),
  update: (id, data) => axiosClient.put(`/buses/${id}`, data),
  delete: (id) => axiosClient.delete(`/buses/${id}`),
};

export default busApi;
