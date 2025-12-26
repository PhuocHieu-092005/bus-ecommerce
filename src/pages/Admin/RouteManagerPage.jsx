import React, { useEffect, useState } from "react";
import routeApi from "../../api/routeApi";
import RouteTable from "../../components/Admin/Route/RouteTable";
import RouteModal from "../../components/Admin/Route/RouteModal";
import { toast } from "react-toastify";
import axios from "axios";
import Pagination from "../../components/common/Pagination";
const RouteManagerPage = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // --- THÊM STATE PHÂN TRANG ---
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const fetchRoutes = async () => {
    try {
      const res = await routeApi.getAll();
      setRoutes(res.data?.data || res.data || []);
    } catch (error) {
      toast.error("Lỗi tải danh sách tuyến đường");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tuyến đường này?")) {
      try {
        await routeApi.delete(id);
        toast.success("Xóa thành công");
        fetchRoutes();
      } catch (error) {
        toast.error("Xóa thất bại (Có thể tuyến đang có chuyến chạy)");
      }
    }
  };

  const handleAdd = () => {
    setSelectedRoute(null);
    setIsModalOpen(true);
  };

  const handleEdit = (route) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (selectedRoute) {
        await routeApi.update(selectedRoute.id, formData);
        toast.success("Cập nhật thành công!");
      } else {
        await routeApi.create(formData);
        toast.success("Tạo tuyến mới thành công!");
      }
      setIsModalOpen(false);
      fetchRoutes();
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra!");
    }
  };

  return (
    <div className="p-2">
      {/* Header Page đẹp hơn */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Quản lý Tuyến đường
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý các lộ trình di chuyển của nhà xe
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-orange-500/40 transition transform hover:-translate-y-1 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Thêm Tuyến Mới
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <RouteTable
          routes={routes}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      <RouteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialData={selectedRoute}
      />
    </div>
  );
};

export default RouteManagerPage;
