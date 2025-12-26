import axiosClient from "./axiosClient";

const routeApi = {
  getAll: (params) => axiosClient.get("/routess", { params }),
  get: (id) => axiosClient.get(`/routess/${id}`),
  create: (data) => axiosClient.post("/routess", data),
  update: (id, data) => axiosClient.put(`/routess/${id}`, data),
  delete: (id) => axiosClient.delete(`/routess/${id}`),
};

export default routeApi;
