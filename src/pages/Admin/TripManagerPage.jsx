import React, { useEffect, useState } from "react";
import tripApi from "../../api/tripApi";
import routeApi from "../../api/routeApi";
import busApi from "../../api/busApi";
import TripTable from "../../components/Admin/Trip/TripTable";
import TripModal from "../../components/Admin/Trip/TripModal";
import Pagination from "../../components/common/Pagination"; // 👇 Import Pagination
import { toast } from "react-toastify";

const TripManagerPage = () => {
  const [trips, setTrips] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // 👇 State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load tất cả dữ liệu cần thiết
  const fetchData = async () => {
    setLoading(true);
    try {
      // Gọi song song: Trips (có page), Routes (all), Buses (all)
      const [tripRes, routeRes, busRes] = await Promise.all([
        tripApi.getAll({ page: currentPage }), // 👇 Truyền page
        routeApi.getAll(),
        busApi.getAll(),
      ]);

      // 1. Xử lý dữ liệu Trips (Phân trang)
      let tripList = [];
      let total = 1;

      if (tripRes.data && Array.isArray(tripRes.data)) {
        tripList = tripRes.data;
        total = tripRes.last_page || 1;
      } else if (tripRes.data?.data && Array.isArray(tripRes.data.data)) {
        tripList = tripRes.data.data;
        total = tripRes.data.last_page || 1;
      } else if (Array.isArray(tripRes)) {
        tripList = tripRes;
      }
      setTrips(tripList);
      setTotalPages(total);

      // 2. Xử lý Routes và Buses (Dữ liệu dropdown)
      setRoutes(routeRes.data?.data || routeRes.data || []);
      setBuses(busRes.data?.data || busRes.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi tải dữ liệu");
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  // 👇 Chạy lại khi currentPage thay đổi
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa chuyến này?")) {
      try {
        await tripApi.delete(id);
        toast.success("Xóa thành công");
        fetchData();
      } catch (error) {
        toast.error("Xóa thất bại (Có thể đã có người đặt vé)");
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedTrip) {
        await tripApi.update(selectedTrip.id, formData);
        toast.success("Cập nhật thành công!");
      } else {
        await tripApi.create(formData);
        toast.success("Tạo chuyến mới thành công!");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
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
          <h1 className="text-2xl font-bold text-gray-800">
            Quản lý Chuyến xe
          </h1>
          <p className="text-sm text-gray-500">
            Lên lịch trình chạy cho các xe
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedTrip(null);
            setIsModalOpen(true);
          }}
          className="bg-orange-600 text-white px-5 py-2 rounded-lg font-bold shadow hover:bg-orange-700 transition"
        >
          + Lên lịch chuyến
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      ) : (
        <>
          <TripTable
            trips={trips}
            onDelete={handleDelete}
            onEdit={(trip) => {
              setSelectedTrip(trip);
              setIsModalOpen(true);
            }}
          />

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

      <TripModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialData={selectedTrip}
        routes={routes}
        buses={buses}
      />
    </div>
  );
};

export default TripManagerPage;
