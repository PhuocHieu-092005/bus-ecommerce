import React from "react";

const TripTable = ({ trips, onEdit, onDelete }) => {
  // Format tiền
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  // Format ngày giờ
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Badge trạng thái đẹp
  const getStatusBadge = (status) => {
    const styles = {
      scheduled: "bg-green-100 text-green-800 border-green-200",
      completed: "bg-blue-100 text-blue-800 border-blue-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    const labels = {
      scheduled: "Sắp chạy",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold border ${
          styles[status] || "bg-gray-100"
        }`}
      >
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Tuyến đường</th>
            <th className="px-6 py-4 text-left">Xe & Biển số</th>
            <th className="px-6 py-4 text-center">Khởi hành</th>
            <th className="px-6 py-4 text-right">Giá vé</th>
            <th className="px-6 py-4 text-center">Trạng thái</th>
            <th className="px-6 py-4 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {trips.map((trip) => (
            <tr key={trip.id} className="hover:bg-orange-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-500">#{trip.id}</td>

              <td className="px-6 py-4">
                <div className="text-sm font-bold text-gray-800">
                  {trip.route?.from_city}{" "}
                  <span className="text-gray-400">➝</span> {trip.route?.to_city}
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="text-sm text-gray-700 font-medium">
                  {trip.bus?.bus_name}
                </div>
                <div className="text-xs text-gray-500">
                  {trip.bus?.license_plate}
                </div>
              </td>

              <td className="px-6 py-4 text-center text-sm text-blue-600 font-medium">
                {formatDateTime(trip.departure_time)}
              </td>

              <td className="px-6 py-4 text-right font-bold text-orange-600">
                {formatCurrency(trip.ticket_price)}
              </td>

              <td className="px-6 py-4 text-center">
                {getStatusBadge(trip.status)}
              </td>

              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(trip)}
                    className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(trip.id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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

export default TripTable;
