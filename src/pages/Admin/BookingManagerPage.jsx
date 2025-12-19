import React, { useEffect, useState } from "react";
import bookingApi from "../../api/bookingApi";
import invoiceApi from "../../api/invoiceApi"; // Import API
import BookingTable from "../../components/Admin/Booking/BookingTable";
import BookingModal from "../../components/Admin/Booking/BookingModal";
import { toast } from "react-toastify";

const BookingManagerPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await bookingApi.getAll();
      setBookings(res.data?.data || res.data || []);
    } catch (error) {
      toast.error("Lỗi tải danh sách vé");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa vé này?")) {
      try {
        await bookingApi.delete(id);
        toast.success("Xóa vé thành công");
        fetchBookings();
      } catch (error) {
        toast.error("Xóa thất bại");
      }
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      await bookingApi.update(selectedBooking.id, formData);
      toast.success("Cập nhật vé thành công!");
      setIsModalOpen(false);
      fetchBookings();
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật thất bại");
    }
  };

  // --- HÀM XỬ LÝ TẢI HÓA ĐƠN (QUAN TRỌNG) ---
  const handleDownloadInvoice = async (invoiceId) => {
    if (!invoiceId) {
      toast.warning("Đơn hàng này chưa có hóa đơn");
      return;
    }

    try {
      toast.info("Đang tải hóa đơn...");

      // Axios sẽ tự động gửi kèm Token đăng nhập ở đây
      const response = await invoiceApi.download(invoiceId);

      // Tạo link ảo để tải file về
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Hoa_don_${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      toast.success("Tải thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tải hóa đơn (Có thể do Server)");
    }
  };
  // -------------------------------------------

  return (
    <div className="p-2">
      {/* ... Header ... */}
      <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Đặt vé</h1>
          <p className="text-sm text-gray-500">
            Xem và xử lý các đơn đặt vé của khách hàng
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Đang tải...</div>
      ) : (
        <BookingTable
          bookings={bookings}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onDownload={handleDownloadInvoice} // Truyền hàm xuống
        />
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
