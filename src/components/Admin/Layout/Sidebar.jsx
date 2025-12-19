import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", label: "📊 Thống kê", icon: "" },
    { path: "/admin/buses", label: "🚌 Quản lý Xe", icon: "" },
    { path: "/admin/routes", label: "🛣️ Quản lý Tuyến", icon: "" },
    { path: "/admin/trips", label: "📅 Quản lý Chuyến", icon: "" },
    { path: "/admin/bookings", label: "🎫 Quản lý Vé", icon: "" },
    { path: "/admin/users", label: "👥 Quản lý User", icon: "" },
  ];

  return (
    <div className="w-64 bg-gray-800 min-h-screen text-white flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-700">
        <h1 className="text-2xl font-bold text-orange-500">BUS VIP ADMIN</h1>
      </div>
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${
              location.pathname.startsWith(item.path)
                ? "bg-orange-600 border-r-4 border-white"
                : ""
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
