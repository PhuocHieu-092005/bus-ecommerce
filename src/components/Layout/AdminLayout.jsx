import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Admin/Layout/Sidebar";
import { useAuth } from "../../contexts/AuthContext";

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar cố định bên trái */}
      <Sidebar />

      {/* Nội dung chính bên phải */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header nhỏ */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h2 className="font-bold text-gray-700">
            Xin chào, {user?.full_name || "Admin"}
          </h2>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Đăng xuất
          </button>
        </header>

        {/* Nội dung thay đổi (Outlet) */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
