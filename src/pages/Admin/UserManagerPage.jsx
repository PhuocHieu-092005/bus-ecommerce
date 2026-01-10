import React, { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import UserTable from "../../components/Admin/User/UserTable";
import UserModal from "../../components/Admin/User/UserModal";
import Pagination from "../../components/common/Pagination"; // 👇 Import Pagination
import { toast } from "react-toastify";

const UserManagerPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // 👇 Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await userApi.getAll({ page: currentPage });

      // LOG KIỂM TRA: Bạn hãy mở F12 xem dòng này in ra gì để hiểu cấu trúc
      console.log("API Response User:", res);

      let userList = [];
      let total = 1;

      // TRƯỜNG HỢP 1: Nếu axiosClient ĐÃ xử lý (trả về body)
      // Cấu trúc: { current_page: 1, data: [Array], last_page: 5 }
      if (res.data && Array.isArray(res.data)) {
        userList = res.data;
        total = res.last_page || 1;
      }
      // TRƯỜNG HỢP 2: Nếu axiosClient CHƯA xử lý (trả về full response)
      // Cấu trúc: { status: 200, data: { current_page: 1, data: [Array] } }
      else if (res.data?.data && Array.isArray(res.data.data)) {
        userList = res.data.data;
        total = res.data.last_page || 1;
      }
      // TRƯỜNG HỢP 3: API trả về mảng trực tiếp (không phân trang)
      else if (Array.isArray(res)) {
        userList = res;
      }

      setUsers(userList);
      setTotalPages(total);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi tải danh sách người dùng");
      setUsers([]); // Reset về mảng rỗng để tránh lỗi map
    } finally {
      setLoading(false);
    }
  };

  // 👇 Khi currentPage thay đổi -> Gọi lại API
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await userApi.delete(id);
        toast.success("Xóa thành công");
        fetchUsers(); // Load lại trang hiện tại
      } catch (error) {
        toast.error("Xóa thất bại (Có thể tài khoản đang có vé đặt)");
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (selectedUser && !formData.password) {
        delete formData.password;
      }

      if (selectedUser) {
        await userApi.update(selectedUser.id, formData);
        toast.success("Cập nhật thành công!");
      } else {
        await userApi.create(formData);
        toast.success("Tạo tài khoản mới thành công!");
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  // 👇 Hàm xử lý khi bấm chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Quản lý Người dùng
          </h1>
          <p className="text-sm text-gray-500">
            Quản lý tài khoản khách hàng và quản trị viên
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedUser(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold shadow hover:bg-blue-700 transition flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          Thêm User
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      ) : (
        <>
          <UserTable
            users={users}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

          {/* 👇 Hiển thị Pagination */}
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialData={selectedUser}
      />
    </div>
  );
};

export default UserManagerPage;
