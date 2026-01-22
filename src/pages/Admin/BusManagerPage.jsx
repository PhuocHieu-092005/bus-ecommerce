import React, { useEffect, useState } from "react";
import busApi from "../../api/busApi";
import BusTable from "../../components/Admin/Bus/BusTable";
import BusModal from "../../components/Admin/Bus/BusModal";
import Pagination from "../../components/common/Pagination"; // 👇 Import Pagination
import { toast } from "react-toastify";

const BusManagerPage = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  // 👇 State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBuses = async () => {
    setLoading(true);
    try {
      // Gọi API kèm page
      const res = await busApi.getAll({ page: currentPage });

      console.log("Bus Response:", res); // Debug xem trả về gì

      let busList = [];
      let total = 1;

      // 👇 LOGIC MỚI: Dựa trên cấu trúc Controller của Tâm
      // Controller trả về: { success: true, data: [...], pagination: { last_page: 5, ... } }

      if (res.pagination) {
        // Trường hợp chuẩn theo code Tâm gửi
        busList = res.data || [];
        total = res.pagination.last_page || 1;
      } else if (res.data && res.last_page) {
        // Trường hợp Laravel mặc định (dự phòng)
        busList = res.data;
        total = res.last_page;
      } else if (res.data?.data) {
        // Trường hợp bọc trong data (dự phòng)
        busList = res.data.data;
        total = res.data.last_page || 1;
      } else {
        // Trường hợp không phân trang
        busList = Array.isArray(res) ? res : res.data || [];
      }

      setBuses(busList);
      setTotalPages(total);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi tải danh sách xe");
      setBuses([]);
    } finally {
      setLoading(false);
    }
  };

  // 👇 Chạy lại khi currentPage thay đổi
  useEffect(() => {
    fetchBuses();
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa xe này?")) {
      try {
        await busApi.delete(id);
        toast.success("Xóa thành công");
        fetchBuses();
      } catch (error) {
        toast.error("Xóa thất bại (Có thể xe đang có chuyến chạy)");
      }
    }
  };

  const handleAdd = () => {
    setSelectedBus(null);
    setIsModalOpen(true);
  };

  const handleEdit = (bus) => {
    setSelectedBus(bus);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (selectedBus) {
        await busApi.update(selectedBus.id, formData);
        toast.success("Cập nhật xe thành công!");
      } else {
        await busApi.create(formData);
        toast.success("Thêm xe mới thành công!");
      }
      setIsModalOpen(false);
      fetchBuses();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra!");
    }
  };

  // 👇 Hàm đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Xe (Bus)</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý thông tin các đầu xe
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2 font-bold shadow"
        >
          <span className="text-xl">+</span> Thêm xe mới
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      ) : (
        <>
          <BusTable buses={buses} onDelete={handleDelete} onEdit={handleEdit} />

          {/* 👇 PHÂN TRANG CĂN GIỮA */}
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

      <BusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialData={selectedBus}
      />
    </div>
  );
};

export default BusManagerPage;
