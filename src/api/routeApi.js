import axiosClient from "./axiosClient";

const routeApi = {
  getAll: (params) => axiosClient.get("/routess", { params }),
  get: (id) => axiosClient.get(`/routess/${id}`),
  create: (formData) => {
    return axiosClient.post("/routess", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  update: (id, formData) => {
    if (formData instanceof FormData) {
      formData.append("_method", "PUT");
    }
    return axiosClient.post(`/routess/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  delete: (id) => axiosClient.delete(`/routess/${id}`),
  // danh sách điểm đi và đến
  getFromCities: () => axiosClient.get("/routess/from-city"),
  getToCities: () => axiosClient.get("/routess/to-city"),
};

export default routeApi;
