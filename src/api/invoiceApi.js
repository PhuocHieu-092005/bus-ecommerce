import axiosClient from "./axiosClient";

const invoiceApi = {
  // 👇 Phải có params để truyền page
  getAll: (params) => axiosClient.get("/invoices", { params }),

  get: (id) => axiosClient.get(`/invoices/${id}`),
  updateStatus: (id, status) => axiosClient.put(`/invoices/${id}`, { status }),

  // API tải PDF (trả về blob để trình duyệt tải file)
  download: (id) =>
    axiosClient.get(`/invoices/${id}/download`, { responseType: "blob" }),
};

export default invoiceApi;
