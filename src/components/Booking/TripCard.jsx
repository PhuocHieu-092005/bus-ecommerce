import React from "react";
import { useNavigate } from "react-router-dom";

const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  // Xử lý khi bấm chọn
  const handleSelectTrip = () => {
    navigate(`/booking?tripId=${trip.id}`);
  };

  // 1. Lấy thông tin Tuyến đường (Route)
  // Fix: Lấy từ from_city / to_city như log bạn gửi
  const from = trip.route?.from_city || "Nơi đi";
  const to = trip.route?.to_city || "Nơi đến";

  // 2. Lấy thông tin Xe (Bus)
  const busType =
    trip.bus?.bus_type === "sleeper"
      ? "Giường nằm"
      : trip.bus?.bus_type || "Ghế ngồi";

  // 3. Format tiền (180000.00 -> 180.000đ)
  const price = parseInt(trip.ticket_price).toLocaleString("vi-VN");

  // 4. Format giờ (2025-12-06T06:00:00 -> 06:00 06/12/2025)
  const timeString = new Date(trip.departure_time).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200 hover:shadow-lg transition cursor-pointer flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Cột trái: Thông tin hành trình */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2">
          {from} <span className="text-gray-400 text-sm">➝</span> {to}
        </h3>

        <div className="mt-3 text-gray-600 space-y-1">
          <p className="flex items-center gap-2">
            🕒 <span className="font-semibold text-black">{timeString}</span>
          </p>
          <p className="flex items-center gap-2">
            🚌 <span>{busType}</span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">
              {trip.bus?.license_plate}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            ⏱ Thời gian dự kiến: {trip.route?.duration || "---"}
          </p>
        </div>
      </div>

      {/* Cột phải: Giá và Nút đặt */}
      <div className="text-right flex flex-col items-end">
        <p className="text-2xl font-bold text-orange-600 mb-1">{price} đ</p>
        <p className="text-sm text-green-600 mb-3 font-medium">
          Còn {trip.available_seats} ghế trống
        </p>

        <button
          onClick={handleSelectTrip}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-full font-bold shadow-sm transition hover:scale-105 active:scale-95"
        >
          Chọn chuyến
        </button>
      </div>
    </div>
  );
};

export default TripCard;
