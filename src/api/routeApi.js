import axiosClient from "./axiosClient";

const routeApi = {
  getAll: () => axiosClient.get("/listroutes"),
  get: (id) => axiosClient.get(`/routes/${id}`),
  create: (data) => axiosClient.post("/routes", data),
  update: (id, data) => axiosClient.put(`/routes/${id}`, data),
  delete: (id) => axiosClient.delete(`/routes/${id}`),
};

export default routeApi;
