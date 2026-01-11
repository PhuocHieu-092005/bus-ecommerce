import React from "react";

const UserTable = ({ users, onEdit, onDelete }) => {
  // Badge hiển thị quyền hạn
  const getRoleBadge = (role) => {
    if (role === "admin") {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
          Quản trị viên
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
        Khách hàng
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Họ và tên</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Số điện thoại</th>
            <th className="px-6 py-4 text-center">Vai trò</th>
            <th className="px-6 py-4 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {/* 👇 KIỂM TRA DỮ LIỆU TRƯỚC KHI RENDER ĐỂ TRÁNH LỖI .MAP */}
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-orange-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-500">#{user.id}</td>

                <td className="px-6 py-4 font-bold text-gray-800">
                  {user.full_name}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.email}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.phone || "---"}
                </td>

                <td className="px-6 py-4 text-center">
                  {getRoleBadge(user.role)}
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(user)}
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
                      onClick={() => onDelete(user.id)}
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
            ))
          ) : (
            /* 👇 Hiển thị thông báo nếu không có dữ liệu */
            <tr>
              <td
                colSpan="6"
                className="px-6 py-8 text-center text-gray-500 italic"
              >
                {users === null
                  ? "Đang tải dữ liệu..."
                  : "Không tìm thấy người dùng nào."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
