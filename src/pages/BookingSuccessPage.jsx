import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hàm format ngày giờ cho đẹp (VD: 07:00 20/12/2025)
  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Lấy dữ liệu thật từ trang Booking chuyển sang
  const state = location.state || {};

  // Nếu không có dữ liệu thật (do F5), dùng dữ liệu giả để không bị trắng trang
  const MOCK_DATA = {
    booking: {
      booking_code: "DEMO-123456",
      passenger_name: "Khách Hàng Demo",
      passenger_phone: "0909123456",
      seat_numbers: "A1, A2",
      total_amount: 0,
      payment_method: "cash",
      payment_status: "pending",
    },
    tripInfo: {
      departure_time: new Date().toISOString(),
      route: { from_city: "Điểm đi", to_city: "Điểm đến" },
      bus: { bus_name: "Xe Demo", license_plate: "51B-XXXXX" },
    },
    pickupPoint: { name: "Bến xe Demo", address: "Địa chỉ demo" },
  };

  const booking = state.booking || MOCK_DATA.booking;
  const tripInfo = state.tripInfo || MOCK_DATA.tripInfo;
  const pickupPoint = state.pickupPoint || MOCK_DATA.pickupPoint;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-orange-600 flex items-center gap-2"
        >
          ← Về trang chủ
        </button>
        <button
          onClick={() => window.print()}
          className="bg-orange-600 text-white px-6 py-2 rounded shadow hover:bg-orange-700 font-bold flex items-center gap-2"
        >
          🖨️ IN VÉ / LƯU PDF
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl border-t-8 border-orange-600 print:shadow-none print:border-2 print:w-full">
        {/* Header */}
        <div className="text-center border-b pb-6 mb-6">
          <h1 className="text-3xl font-black text-orange-600 uppercase mb-2">
            VÉ XE KHÁCH BUS VIP
          </h1>
          <p className="text-green-600 font-bold text-lg">
            ✅ ĐẶT VÉ THÀNH CÔNG
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Mã vé:{" "}
            <span className="font-mono font-bold text-black text-xl">
              {booking.booking_code}
            </span>
          </p>
        </div>

        {/* Thông tin hành trình */}
        <div className="bg-orange-50 p-6 rounded-lg mb-6 border border-orange-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm uppercase">Tuyến đường</p>
              <p className="font-bold text-xl text-gray-800">
                {tripInfo?.route?.from_city} ➝ {tripInfo?.route?.to_city}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm uppercase">
                Thời gian khởi hành
              </p>
              <p className="font-bold text-xl text-blue-600">
                {formatDateTime(tripInfo?.departure_time)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm uppercase">Điểm đón</p>
              <p className="font-medium text-gray-800">{pickupPoint?.name}</p>
              <p className="text-xs text-gray-500">{pickupPoint?.address}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm uppercase">Xe / Biển số</p>
              <p className="font-medium text-gray-800">
                {tripInfo?.bus?.bus_name} ({tripInfo?.bus?.license_plate})
              </p>
            </div>
          </div>
        </div>

        {/* Thông tin khách & Ghế */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-gray-500 text-sm">Họ tên hành khách</p>
            <p className="font-bold text-lg">{booking.passenger_name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Số điện thoại</p>
            <p className="font-bold text-lg">{booking.passenger_phone}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Số ghế</p>
            <p className="font-black text-2xl text-orange-600">
              {booking.seat_numbers}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Phương thức thanh toán</p>
            <p className="font-bold uppercase text-orange-700">
              {booking.payment_method === "cash" ? "Tiền mặt" : "Chuyển khoản"}
            </p>
          </div>
        </div>

        {/* Tổng tiền */}
        <div className="border-t-2 border-dashed pt-6 flex justify-between items-center">
          <span className="text-gray-600 font-bold">TỔNG CỘNG</span>
          <span className="text-3xl font-black text-red-600">
            {Number(booking.total_amount).toLocaleString()} đ
          </span>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          <p>Cảm ơn quý khách đã sử dụng dịch vụ.</p>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print\\:hidden { display: none !important; }
          .max-w-3xl, .max-w-3xl * { visibility: visible; }
          .max-w-3xl { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; border: none; box-shadow: none; }
          .bg-gray-100 { background: white; }
        }
      `}</style>
    </div>
  );
};

export default BookingSuccessPage;
