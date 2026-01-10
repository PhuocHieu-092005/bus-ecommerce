import React from "react";

const BusTable = ({ buses, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 uppercase text-xs font-bold tracking-wider">
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Tên xe</th>
            <th className="px-6 py-4 text-center">Biển số</th>
            <th className="px-6 py-4 text-center">Số ghế</th>
            <th className="px-6 py-4 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {/* 👇 KIỂM TRA MẢNG TRƯỚC KHI MAP */}
          {Array.isArray(buses) && buses.length > 0 ? (
            buses.map((bus) => (
              <tr
                key={bus.id}
                className="hover:bg-blue-50/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm text-gray-500">#{bus.id}</td>

                <td className="px-6 py-4">
                  <div className="font-bold text-gray-800 text-sm">
                    {bus.bus_name}
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {bus.license_plate}
                  </span>
                </td>

                <td className="px-6 py-4 text-center text-sm text-gray-600">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                    {bus.total_seats} ghế
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(bus)}
                      className="p-2.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-all duration-200 shadow-sm"
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
                      onClick={() => onDelete(bus.id)}
                      className="p-2.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-all duration-200 shadow-sm"
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
            ))
          ) : (
            /* 👇 Hiển thị khi không có dữ liệu */
            <tr>
              <td
                colSpan="5"
                className="text-center py-12 text-gray-400 italic"
              >
                {buses === null
                  ? "Đang tải dữ liệu..."
                  : "Chưa có xe nào trong danh sách."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BusTable;
