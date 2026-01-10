import axiosClient from "./axiosClient";

const userApi = {
  // 👇 SỬA DÒNG NÀY: Thêm params để truyền { page: 1 }
  getAll: (params) => axiosClient.get("/users", { params }),

  get: (id) => axiosClient.get(`/users/${id}`),
  create: (data) => axiosClient.post("/users", data),
  update: (id, data) => axiosClient.put(`/users/${id}`, data),
  delete: (id) => axiosClient.delete(`/users/${id}`),
};

export default userApi;
