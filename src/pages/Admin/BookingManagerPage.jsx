import React, { useEffect, useState } from "react";
import bookingApi from "../../api/bookingApi"; // Đảm bảo bạn có file này
import BookingTable from "../../components/Admin/Booking/BookingTable";
import BookingModal from "../../components/Admin/Booking/BookingModal";
import Pagination from "../../components/common/Pagination"; // Import Pagination
import { toast } from "react-toastify";

const BookingManagerPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Gọi API có kèm page
      const res = await bookingApi.getAll({ page: currentPage });

      let dataList = [];
      let total = 1;

      // Xử lý dữ liệu trả về (tương tự User)
      if (res.data && Array.isArray(res.data)) {
        dataList = res.data;
        total = res.last_page || 1;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        dataList = res.data.data;
        total = res.data.last_page || 1;
      } else if (Array.isArray(res)) {
        dataList = res;
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

  useEffect(() => {
    fetchBookings();
  }, [currentPage]); // Chạy lại khi đổi trang

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn hủy vé này không?")) {
      try {
        await bookingApi.delete(id); // Hoặc update status thành cancelled
        toast.success("Đã xóa/hủy vé thành công");
        fetchBookings();
      } catch (error) {
        toast.error("Lỗi khi xóa vé");
      }
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

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

  // Hàm tải hóa đơn (nếu có)
  const handleDownloadInvoice = async (id) => {
    // Logic tải hóa đơn (có thể mở tab mới hoặc gọi API blob)
    // Ví dụ đơn giản: Mở link trực tiếp nếu backend hỗ trợ
    // window.open(`http://hoaitam123.xyz/index.php/invoices/${id}`, "_blank");

    // Hoặc gọi API invoiceApi.download(id)
    toast.info("Chức năng tải hóa đơn đang phát triển...");
  };

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
        {/* Nút thêm vé nếu cần (thường vé do khách đặt nên ít khi admin thêm tay) */}
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
