import axiosClient from "./axiosClient";

const invoiceApi = {
  download: (id) => {
    return axiosClient.get(`/invoices/${id}/download`, {
      responseType: "blob",
    });
  },
};

export default invoiceApi;
