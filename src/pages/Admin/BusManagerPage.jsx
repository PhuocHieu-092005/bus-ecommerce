import React, { useEffect, useState } from "react";
import busApi from "../../api/busApi";
import BusTable from "../../components/Admin/Bus/BusTable";
import BusModal from "../../components/Admin/Bus/BusModal"; // Import Modal vừa tạo
import { toast } from "react-toastify";

const BusManagerPage = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  // State quản lý Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null); // Lưu xe đang sửa (nếu có)

  // 1. Lấy danh sách xe
  const fetchBuses = async () => {
    try {
      const res = await busApi.getAll();
      setBuses(res.data?.data || res.data || []);
    } catch (error) {
      toast.error("Lỗi tải danh sách xe");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  // 2. Xử lý Xóa xe
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Bạn có chắc muốn xóa xe này? Hành động này không thể hoàn tác."
      )
    ) {
      try {
        await busApi.delete(id);
        toast.success("Xóa thành công");
        fetchBuses(); // Tải lại danh sách
      } catch (error) {
        toast.error("Xóa thất bại (Có thể xe đang có chuyến chạy)");
      }
    }
  };

  // 3. Mở Modal Thêm mới
  const handleAdd = () => {
    setSelectedBus(null); // Không có dữ liệu cũ
    setIsModalOpen(true);
  };

  // 4. Mở Modal Sửa
  const handleEdit = (bus) => {
    setSelectedBus(bus); // Gán dữ liệu xe cần sửa
    setIsModalOpen(true);
  };

  // 5. Xử lý Lưu (Gọi API Thêm hoặc Sửa)
  const handleSave = async (formData) => {
    try {
      if (selectedBus) {
        // --- Logic CẬP NHẬT ---
        await busApi.update(selectedBus.id, formData);
        toast.success("Cập nhật xe thành công!");
      } else {
        // --- Logic THÊM MỚI ---
        await busApi.create(formData);
        toast.success("Thêm xe mới thành công!");
      }

      setIsModalOpen(false); // Đóng modal
      fetchBuses(); // Tải lại danh sách mới nhất
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Có lỗi xảy ra!";
      toast.error(message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Quản lý Xe (Bus)</h1>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
        >
          <span className="text-xl font-bold">+</span> Thêm xe mới
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      ) : (
        <BusTable buses={buses} onDelete={handleDelete} onEdit={handleEdit} />
      )}

      {/* Modal Form */}
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
