import React from "react";

const BookingTable = ({ bookings, onEdit, onDelete, onDownload }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const map = {
      confirmed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    const label = {
      confirmed: "Đã xác nhận",
      pending: "Chờ xử lý",
      cancelled: "Đã hủy",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-bold border ${map[status]}`}
      >
        {label[status] || status}
      </span>
    );
  };

  const getPaymentBadge = (status) => {
    const map = {
      paid: "bg-blue-100 text-blue-800",
      pending: "bg-gray-100 text-gray-600",
      refunded: "bg-purple-100 text-purple-800",
    };
    const label = {
      paid: "Đã thanh toán",
      pending: "Chưa thanh toán",
      refunded: "Đã hoàn tiền",
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-bold ${map[status]}`}>
        {label[status] || status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
            <th className="px-4 py-3 text-left">Mã vé</th>
            <th className="px-4 py-3 text-left">Khách hàng</th>
            <th className="px-4 py-3 text-left">Chuyến đi</th>
            <th className="px-4 py-3 text-center">Ghế</th>
            <th className="px-4 py-3 text-right">Tổng tiền</th>
            <th className="px-4 py-3 text-center">Trạng thái</th>
            <th className="px-4 py-3 text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {/* 👇 KIỂM TRA MẢNG AN TOÀN */}
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-orange-50 transition-colors text-sm"
              >
                <td className="px-4 py-3 font-mono font-bold text-orange-600">
                  {item.booking_code || `#${item.id}`}
                </td>
                <td className="px-4 py-3">
                  <div className="font-bold text-gray-800">
                    {item.passenger_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.passenger_phone}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    {item.trip?.route?.from_city} ➝ {item.trip?.route?.to_city}
                  </div>
                  <div className="text-xs text-blue-500">
                    {formatDateTime(item.trip?.departure_time)}
                  </div>
                </td>
                <td className="px-4 py-3 text-center font-bold">
                  {item.seat_numbers}
                </td>
                <td className="px-4 py-3 text-right font-bold text-red-600">
                  {formatCurrency(item.total_amount)}
                </td>
                <td className="px-4 py-3 text-center space-y-1">
                  <div className="flex justify-center">
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="flex justify-center">
                    {getPaymentBadge(item.payment_status)}
                  </div>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    {/* Nút Tải Hóa Đơn (Chỉ hiện khi đã thanh toán) */}
                    {item.payment_status === "paid" && (
                      <button
                        onClick={() => onDownload(item.invoice?.id || item.id)}
                        className="p-2 bg-purple-50 text-purple-600 rounded hover:bg-purple-100"
                        title="Tải hóa đơn"
                      >
                        ⬇️
                      </button>
                    )}

                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center py-10 text-gray-500 italic"
              >
                {bookings === null
                  ? "Đang tải dữ liệu..."
                  : "Chưa có vé nào được đặt."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
