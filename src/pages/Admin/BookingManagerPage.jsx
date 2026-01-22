import React, { useEffect, useState } from "react";
import bookingApi from "../../api/bookingApi";
import invoiceApi from "../../api/invoiceApi"; // 👇 Import API hóa đơn
import BookingTable from "../../components/Admin/Booking/BookingTable";
import BookingModal from "../../components/Admin/Booking/BookingModal";
import Pagination from "../../components/common/Pagination"; // 👇 Import Pagination
import { toast } from "react-toastify";

const BookingManagerPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // 👇 State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Gọi API kèm page
      const res = await bookingApi.getAll({ page: currentPage });

      console.log("Booking Response:", res); // Debug xem cấu trúc

      let dataList = [];
      let total = 1;

      // 👇 LOGIC XỬ LÝ DỮ LIỆU THÔNG MINH (Hỗ trợ cả 2 kiểu trả về của Tâm)

      // Kiểu 1: Custom Pagination ({ success: true, data: [...], pagination: {...} })
      if (res.pagination) {
        dataList = res.data || [];
        total = res.pagination.last_page || 1;
      }
      // Kiểu 2: Laravel Default ({ current_page: 1, data: [...], last_page: 5 })
      else if (res.data && res.last_page) {
        dataList = res.data;
        total = res.last_page;
      }
      // Kiểu 3: Bọc trong data ({ data: { data: [...] } })
      else if (res.data?.data && Array.isArray(res.data.data)) {
        dataList = res.data.data;
        total = res.data.last_page || 1;
      }
      // Kiểu 4: Không phân trang
      else {
        dataList = Array.isArray(res) ? res : res.data || [];
      }

      setBookings(dataList);
      setTotalPages(total);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi tải danh sách vé");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Chạy lại khi đổi trang
  useEffect(() => {
    fetchBookings();
  }, [currentPage]);

  // Xử lý Xóa/Hủy vé
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn hủy vé này không?")) {
      try {
        await bookingApi.delete(id);
        toast.success("Đã xóa/hủy vé thành công");
        fetchBookings();
      } catch (error) {
        toast.error("Lỗi khi xóa vé");
      }
    }
  };

  // Mở Modal Sửa
  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  // Lưu thay đổi từ Modal
  const handleSave = async (formData) => {
    try {
      if (selectedBooking) {
        await bookingApi.update(selectedBooking.id, formData);
        toast.success("Cập nhật vé thành công!");
        setIsModalOpen(false);
        fetchBookings();
      }
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật thất bại");
    }
  };

  // 👇 Xử lý Tải Hóa Đơn (Gọi invoiceApi)
  const handleDownloadInvoice = async (id) => {
    try {
      const response = await invoiceApi.download(id);

      // Tạo link ảo để tải file
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${id}.pdf`);
      document.body.appendChild(link);
      link.click();

      // Dọn dẹp
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Đang tải hóa đơn...");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi tải hóa đơn (Có thể chưa thanh toán)");
    }
  };

  // Đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Vé đặt</h1>
          <p className="text-sm text-gray-500">
            Xem và cập nhật trạng thái vé của khách hàng
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      ) : (
        <>
          <BookingTable
            bookings={bookings}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDownload={handleDownloadInvoice} // Truyền hàm download
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

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialData={selectedBooking}
      />
    </div>
  );
};

export default BookingManagerPage;
