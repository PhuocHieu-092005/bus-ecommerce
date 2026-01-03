import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bookingApi from "../api/bookingApi"; // Tận dụng API đã có
import { toast } from "react-toastify";

const MyTicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        setLoading(true);
        const res = await bookingApi.getBookingUser(userId);
        const list = res.data?.data;
        setTickets(list);
      } catch (error) {
        console.error("Lỗi tải vé:", error);
        // Không toast lỗi nếu chỉ là do chưa có vé
      } finally {
        setLoading(false);
      }
    };

    fetchMyTickets();
  }, []);

  // Hàm format tiền
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  // Hàm format ngày giờ
  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Badge trạng thái
  const getStatusBadge = (status, paymentStatus) => {
    if (status === "cancelled")
      return (
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
          Đã hủy
        </span>
      );
    if (paymentStatus === "paid")
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
          Đã thanh toán
        </span>
      );
    return (
      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
        Chờ thanh toán
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-orange-600 pl-4">
            Vé của tôi
          </h1>
          <Link to="/" className="text-orange-600 hover:underline font-medium">
            + Đặt vé mới
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Đang tải danh sách vé...</p>
          </div>
        ) : tickets.length > 0 ? (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100"
              >
                {/* Header Vé */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <span className="text-gray-500 text-sm mr-2">Mã vé:</span>
                    <span className="font-mono font-bold text-orange-600 text-lg">
                      {ticket.booking_code}
                    </span>
                  </div>
                  <div>
                    {getStatusBadge(ticket.status, ticket.payment_status)}
                  </div>
                </div>

                {/* Nội dung Vé */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Cột 1: Thông tin chuyến */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Hành trình</p>
                        <p className="font-bold text-lg text-gray-800">
                          {ticket.trip?.route?.from_city}{" "}
                          <span className="text-gray-400 mx-1">➝</span>{" "}
                          {ticket.trip?.route?.to_city}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Khởi hành</p>
                        <p className="font-bold text-gray-800">
                          {formatDateTime(ticket.trip?.departure_time)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Xe / Biển số</p>
                        <p className="font-medium text-gray-800">
                          {ticket.trip?.bus?.bus_name} (
                          {ticket.trip?.bus?.license_plate})
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cột 2: Thông tin thanh toán & Ghế */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Ghế đã đặt:</p>
                      <p className="text-2xl font-bold text-orange-600 mb-4">
                        {ticket.seat_numbers}
                      </p>

                      <p className="text-sm text-gray-500 mb-1">
                        Tổng thanh toán:
                      </p>
                      <p className="text-xl font-bold text-gray-800">
                        {formatCurrency(ticket.total_amount)}
                      </p>
                    </div>

                    {/* Nút tải hóa đơn (Chỉ hiện khi đã thanh toán và có Invoice ID) */}
                    {ticket.payment_status === "paid" && ticket.invoice && (
                      <a
                        // href={`http://hoaitam123.xyz/index.php/invoices/${ticket.invoice.id}/download`}
                        href={`https://alec-vicegeral-exuberantly.ngrok-free.dev/invoices/${ticket.invoice.id}/download`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full block text-center bg-white border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100 transition text-sm font-medium"
                      >
                        🖨️ Tải hóa đơn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Bạn chưa có vé nào
            </h3>
            <p className="text-gray-500 mb-6">
              Hãy đặt vé ngay để bắt đầu hành trình của bạn!
            </p>
            <Link
              to="/"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition"
            >
              Tìm chuyến xe ngay
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTicketPage;
