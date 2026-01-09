import React from "react";
import { useNavigate } from "react-router-dom";
const cityImages = {
  "TP HCM":
    "https://res.cloudinary.com/dbemi1ljd/image/upload/v1766659240/bus_tphcm_priwlr.png",
  "Đà Lạt":
    "https://res.cloudinary.com/dbemi1ljd/image/upload/v1766659238/bus_dalat_mfruox.png",
  "Cần Thơ":
    "https://res.cloudinary.com/dbemi1ljd/image/upload/v1766659239/bus_cantho_n4ryh7.png",
  "Vũng Tàu":
    "https://res.cloudinary.com/dbemi1ljd/image/upload/v1766659240/bus_vungtau_kqc8k9.png",
  "Đà Nẵng":
    "https://res.cloudinary.com/dbemi1ljd/image/upload/v1766659238/bus_danang_trgyvg.png",
  "Hà Nội":
    "https://res.cloudinary.com/dbemi1ljd/image/upload/v1766658878/bus_hn_iug1ss.png",
  "Cà Mau":
    "https://res.cloudinary.com/dbemi1ljd/image/upload/v1766659238/bus_camau_fcwdj8.png",
  "Bến Tre":
    "https://res.cloudinary.com/dbemi1ljd/image/upload/v1766659238/bus_bentre_uxjkmm.png",
  "Vĩnh Long":
    "https://res.cloudinary.com/dbemi1ljd/image/upload/v1766659239/bus_vinhlong_bpay0y.png",
  "Sóc Trăng":
    "https://res.cloudinary.com/dbemi1ljd/image/upload/v1766659239/bus_soctrang_mkgof2.png",
  "An Giang":
    "https://res.cloudinary.com/dbemi1ljd/image/upload/v1766659238/bus_angiang_g2xes9.png",
  "Kiên Giang":
    "https://res.cloudinary.com/dbemi1ljd/image/upload/v1766659239/bus_kiengiang_we6gf9.png",
  "Long An":
    "https://res.cloudinary.com/dbemi1ljd/image/upload/v1766659239/bus_longan_bgowa1.png",

  // Ảnh mặc định (Xe buýt FUTA)
  default:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/FUTA_Bus_Lines.jpg/800px-FUTA_Bus_Lines.jpg",
};

const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  // --- XỬ LÝ LOGIC ---
  const handleSelectTrip = () => {
    navigate(`/booking?tripId=${trip.id}`);
  };

  // Hàm lấy ảnh thông minh dựa trên điểm đến
  const getTripImage = () => {
    const toCity = trip.route?.to_city;
    if (!toCity) return cityImages["default"];
    const key = Object.keys(cityImages).find((k) => toCity.includes(k));
    return key ? cityImages[key] : cityImages["default"];
  };

  // Format tiền tệ
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  // Tách giờ và ngày cho đẹp
  const formatTime = (dateString) => {
    if (!dateString) return "--:--";
    return new Date(dateString).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "--/--/----";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Xác định loại xe
  const busType = trip.bus?.bus_type === "sleeper" ? "Giường nằm" : "Ghế ngồi";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col md:flex-row group h-full md:h-48 mb-4">
      {/* 1. CỘT TRÁI: ẢNH MINH HỌA (Chiếm 35%) */}
      <div className="md:w-[35%] h-48 md:h-full relative overflow-hidden">
        <img
          src={getTripImage()}
          alt={trip.route?.to_city}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        {/* Badge Loại xe */}
        <div className="absolute top-3 left-3 bg-orange-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide">
          {busType}
        </div>
      </div>

      {/* 2. CỘT PHẢI: THÔNG TIN CHI TIẾT (Chiếm 65%) */}
      <div className="md:w-[65%] p-5 flex flex-col justify-between">
        {/* Header: Tuyến đường & Giá */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 group-hover:text-orange-600 transition-colors">
              {trip.route?.from_city}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              {trip.route?.to_city}
            </h3>

            {/* Thời gian khởi hành */}
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
              <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
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
                <span className="font-bold">
                  {formatTime(trip.departure_time)}
                </span>
              </div>
              <span className="text-xs font-medium">
                {formatDate(trip.departure_time)}
              </span>
            </div>
          </div>

          {/* Giá tiền */}
          <div className="text-right">
            <div className="text-xl font-bold text-orange-600">
              {formatCurrency(trip.ticket_price)}
            </div>
            {/* Giá ảo gạch ngang cho cảm giác rẻ hơn */}
            <div className="text-[10px] text-gray-400 line-through">
              {formatCurrency(trip.ticket_price * 1.1)}
            </div>
          </div>
        </div>

        {/* Thông tin xe & Tiện ích */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded border border-gray-200 font-medium">
              {trip.bus?.bus_name}
            </span>
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">
              {trip.bus?.license_plate}
            </span>
          </div>

          {/* Icon tiện ích (Trang trí) */}
          <div className="flex gap-2 text-gray-400">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              title="Wifi"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
              />
            </svg>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              title="Nước"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
        </div>

        {/* Footer Card: Ghế trống & Nút đặt */}
        <div className="flex justify-between items-end mt-auto pt-3 border-t border-gray-100 border-dashed">
          <div className="text-xs">
            <span className="text-gray-500">Còn </span>
            <span className="font-bold text-green-600 text-sm">
              {trip.available_seats}
            </span>
            <span className="text-gray-500"> chỗ trống</span>
          </div>

          <button
            onClick={handleSelectTrip}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-orange-700 transition shadow-md hover:shadow-orange-500/30 transform active:scale-95"
          >
            Chọn chuyến
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
