import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.jsx"; // Import vào
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Bao bọc App bằng AuthProvider */}
    <AuthProvider>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />{" "}
      {/* Để hiện thông báo đẹp */}
    </AuthProvider>
  </React.StrictMode>
);
