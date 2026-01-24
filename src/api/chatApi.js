import axiosClient from "./axiosClient"; // Import cái file bạn vừa gửi

const chatApi = {
  sendMessage: (message) => {
    const url = "/chat";
    return axiosClient.post(url, { message });
  },
};

export default chatApi;
