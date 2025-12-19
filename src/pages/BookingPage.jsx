import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import tripApi from "../api/tripApi";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

// Import các Component con
import SeatSelector from "../components/Booking/SeatSelector";
import BookingForm from "../components/Booking/BookingForm";
import BookingSummary from "../components/Booking/BookingSummary";

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get("tripId");
  const navigate = useNavigate();
  const { user } = useAuth();

  // --- 1. STATE QUẢN LÝ DỮ LIỆU ---
  const [trip, setTrip] = useState(null);
  const [seats, setSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [pickupPoints, setPickupPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 2. STATE QUẢN LÝ LỰA CHỌN CỦA KHÁCH ---
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedPickup, setSelectedPickup] = useState("");
  const [passengerInfo, setPassengerInfo] = useState({
    name: user?.full_name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    payment_method: "cash", // Mặc định là tiền mặt
  });

  // Hàm helper: Lấy dữ liệu an toàn từ API (tránh lỗi null/undefined)
  const safeGet = (res, key) => {
    const dataLevel1 = res?.data;
    const dataLevel2 = res?.data?.data;
    if (dataLevel2 && dataLevel2[key]) return dataLevel2[key];
    if (dataLevel2 && Array.isArray(dataLevel2) && !key) return dataLevel2;
    if (dataLevel1 && dataLevel1[key]) return dataLevel1[key];
    if (dataLevel1 && Array.isArray(dataLevel1) && !key) return dataLevel1;
    return [];
  };

  // --- 3. GỌI API LẤY DỮ LIỆU BAN ĐẦU ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!tripId) return;
        setLoading(true);

        // Lấy thông tin chuyến xe
        const tripRes = await tripApi.get(tripId);
        const tripData = tripRes.data?.data || tripRes.data;
        setTrip(tripData);

        // Lấy sơ đồ ghế
        try {
          const seatsRes = await tripApi.getSeats(tripId);
          const allSeats = safeGet(seatsRes, "all_seats");
          const booked = safeGet(seatsRes, "booked_seats");
          setSeats(
            allSeats.length > 0 ? allSeats : seatsRes.data?.all_seats || []
          );
          setBookedSeats(booked);
        } catch (err) {
          console.error("Lỗi lấy ghế:", err);
        }

        // Lấy điểm đón
        if (tripData?.route_id) {
          try {
            const pickupRes = await tripApi.getPickupPoints(tripData.route_id);
            const points = safeGet(pickupRes, "pickup_points");
            setPickupPoints(
              points.length > 0 ? points : pickupRes.data?.pickup_points || []
            );
          } catch (err) {
            console.error("Lỗi lấy điểm đón:", err);
          }
        }
      } catch (error) {
        toast.error("Không tải được dữ liệu chuyến xe.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tripId, user]);

  // --- 4. XỬ LÝ CHỌN GHẾ ---
  const handleSelectSeat = (seatNum) => {
    if (selectedSeats.includes(seatNum)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNum));
    } else {
      if (selectedSeats.length >= 5)
        return toast.warning("Chỉ được chọn tối đa 5 ghế!");
      setSelectedSeats([...selectedSeats, seatNum]);
    }
  };

  // Tính tổng tiền
  const price = trip ? Number(trip.ticket_price) : 0;
  const totalPrice = selectedSeats.length * price;

  // --- 5. XỬ LÝ ĐẶT VÉ (QUAN TRỌNG NHẤT) ---
  const handleSubmit = async () => {
    try {
      // Chuẩn bị dữ liệu gửi lên Server
      const bookingData = {
        trip_id: tripId,
        pickup_point_id: selectedPickup,
        seat_numbers: selectedSeats.join(","),
        passenger_name: passengerInfo.name,
        passenger_phone: passengerInfo.phone,
        payment_method: passengerInfo.payment_method,
      };

      // Gọi API tạo booking
      const res = await tripApi.createBooking(bookingData);

      // Lấy dữ liệu vé trả về từ API
      const apiBooking = res.data?.data?.booking || res.data?.data || {};

      // Kết hợp dữ liệu để hiển thị bên trang in vé (đảm bảo không bị thiếu)
      const finalBookingData = {
        ...bookingData, // Dữ liệu khách nhập
        ...apiBooking, // Dữ liệu server trả về (ưu tiên)
        total_amount: totalPrice, // Đảm bảo có tổng tiền
        booking_code: apiBooking.booking_code || "ĐANG XỬ LÝ",
      };

      // Tìm thông tin điểm đón đầy đủ (tên, địa chỉ) để hiển thị
      const selectedPickupObj = pickupPoints.find(
        (p) => p.id == selectedPickup
      );

      toast.success("Đặt vé thành công!");

      // Chuyển hướng sang trang In Vé và gửi kèm dữ liệu
      navigate("/booking-success", {
        state: {
          booking: finalBookingData,
          tripInfo: trip,
          pickupPoint: selectedPickupObj,
        },
      });
    } catch (error) {
      console.error(error);
      const mess = error.response?.data?.message || "Đặt vé thất bại.";
      toast.error(mess);
    }
  };

  // Validate form: Kiểm tra xem khách đã nhập đủ chưa
  const isValid =
    selectedSeats.length > 0 &&
    selectedPickup &&
    passengerInfo.name &&
    passengerInfo.phone;

  if (loading)
    return <div className="text-center py-20">Đang tải dữ liệu...</div>;
  if (!trip)
    return <div className="text-center py-20">Không tìm thấy chuyến xe.</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-2xl font-bold text-orange-700 mb-6 uppercase">
          Đặt vé: {trip.route?.from_city} ➝ {trip.route?.to_city}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái: Component Chọn ghế */}
          <div className="lg:col-span-2">
            <SeatSelector
              seats={seats}
              bookedSeats={bookedSeats}
              selectedSeats={selectedSeats}
              onSelect={handleSelectSeat}
            />
          </div>

          {/* Cột phải: Component Form & Tổng tiền */}
          <div className="space-y-4">
            <BookingForm
              pickupPoints={pickupPoints}
              selectedPickup={selectedPickup}
              onPickupChange={setSelectedPickup}
              passengerInfo={passengerInfo}
              onInfoChange={setPassengerInfo}
            />

            <BookingSummary
              selectedSeats={selectedSeats}
              totalPrice={totalPrice}
              isValid={isValid}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
