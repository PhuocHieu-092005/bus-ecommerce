import React from "react";

// Nhớ thêm onDownload vào props
const BookingTable = ({ bookings, onEdit, onDelete, onDownload }) => {
  // ... (Giữ nguyên các hàm format tiền, ngày, badge...)
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
        {/* ... Phần Header giữ nguyên ... */}
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
          {bookings.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-orange-50 transition-colors text-sm"
            >
              {/* ... Các cột dữ liệu giữ nguyên ... */}
              <td className="px-4 py-3 font-mono font-bold text-orange-600">
                {item.booking_code || `#${item.id}`}
              </td>
              <td className="px-4 py-3">
                <div>{item.passenger_name}</div>
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
                  {/* --- SỬA LẠI THÀNH BUTTON ĐỂ GỌI HÀM --- */}
                  {item.payment_status === "paid" && (
                    <button
                      onClick={() => onDownload(item.invoice?.id || item.id)}
                      className="p-2 bg-purple-50 text-purple-600 rounded hover:bg-purple-100"
                      title="Tải hóa đơn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                  {/* --------------------------------------- */}

                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
