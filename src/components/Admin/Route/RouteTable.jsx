import React from "react";

const RouteTable = ({ routes, onEdit, onDelete }) => {
  // Hàm format tiền tệ (VND)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 uppercase text-xs font-bold tracking-wider">
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Hành trình (Đi ➝ Đến)</th>
            <th className="px-6 py-4 text-center">Khoảng cách</th>
            <th className="px-6 py-4 text-center">Thời gian</th>
            <th className="px-6 py-4 text-right">Giá vé chuẩn</th>
            <th className="px-6 py-4 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {routes.map((route) => (
            <tr
              key={route.id}
              className="hover:bg-orange-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 text-sm text-gray-500">#{route.id}</td>

              {/* Cột Hành trình đẹp mắt */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {route.from_city}
                  </span>
                  <span className="text-gray-400">➝</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    {route.to_city}
                  </span>
                </div>
              </td>

              <td className="px-6 py-4 text-center text-sm text-gray-600">
                {route.distance} km
              </td>
              <td className="px-6 py-4 text-center text-sm text-gray-600">
                {route.duration}
              </td>

              {/* Giá vé nổi bật */}
              <td className="px-6 py-4 text-right font-bold text-orange-600">
                {formatCurrency(route.price)}
              </td>

              {/* Nút thao tác dùng Icon */}
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(route)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition"
                    title="Sửa"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(route.id)}
                    className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition"
                    title="Xóa"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {routes.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          Chưa có tuyến đường nào.
        </div>
      )}
    </div>
  );
};

export default RouteTable;
