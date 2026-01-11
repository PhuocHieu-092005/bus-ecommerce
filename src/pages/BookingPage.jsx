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
  const [searchParams] = useSearchParams(); //lấy ?tripId=id
  const tripId = searchParams.get("tripId"); //value của id chuyến xe dc lấy từ ?tripId
  const navigate = useNavigate(); //điều hướng bằng Link với event click
  const { user } = useAuth(); //Custom Hook

  // --- 1. STATE QUẢN LÝ DỮ LIỆU từ server gửi về ---
  const [trip, setTrip] = useState(null); //id chuyến đi
  const [seats, setSeats] = useState([]); //mảng danh sách ghế
  const [bookedSeats, setBookedSeats] = useState([]); // danh sách ghế đã được đặt -> dùng để vô hiệu hóa ghế
  const [pickupPoints, setPickupPoints] = useState([]); // danh sách cac điểm đón
  const [loading, setLoading] = useState(true); // UI/UX

  // --- 2. STATE QUẢN LÝ LỰA CHỌN CỦA KHÁCH ---
  const [selectedSeats, setSelectedSeats] = useState([]); // danh sách ghế user đang chọn ['A1', 'A2']).
  const [selectedPickup, setSelectedPickup] = useState(""); // id điểm đón từ  pickupPoints
  const [passengerInfo, setPassengerInfo] = useState({
    name: user?.full_name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    payment_method: "banking", // Mặc định là tiền mặt
  });

  // --- 3. GỌI API LẤY DỮ LIỆU BAN ĐẦU ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!tripId) return;
        setLoading(true);

        // Lấy thông tin chuyến xe
        const tripRes = await tripApi.get(tripId);
        const tripData = tripRes.data;
        console.log(tripData);
        setTrip(tripData);
        // Lấy sơ đồ ghế
        try {
          const seatsRes = await tripApi.getSeats(tripId);
          const allSeats = seatsRes?.data.all_seats;
          const booked = seatsRes?.data.booked_seats;
          setSeats(allSeats.length > 0 ? allSeats : []);
          setBookedSeats(booked);
        } catch (err) {
          console.error("Lỗi lấy ghế:", err);
        }
        // Lấy điểm đón
        if (tripData?.route.id) {
          try {
            const pickupRes = await tripApi.getPickupPoints(tripData.route.id);
            const points = pickupRes.data.pickup_points; // mảng điểm đón
            setPickupPoints(points.length > 0 ? points : []);
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
  console.log("Dữ liệu chuyến đi hiện tại:", trip); //xem data chuyến đi

  // --- 4. XỬ LÝ CHỌN GHẾ ---
  const handleSelectSeat = (seatNum) => {
    if (selectedSeats.includes(seatNum)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNum)); //"bỏ chọn" nếu có
    } else {
      if (selectedSeats.length >= 5)
        return toast.warning("Chỉ được chọn tối đa 5 ghế!");
      setSelectedSeats([...selectedSeats, seatNum]);
    }
  };
  // Tính tổng tiền
  const price = trip ? Number(trip.ticket_price) : 0;
  const totalPrice = selectedSeats.length * price;
  const handleSubmit = async () => {
    try {
      // Chuẩn bị dữ liệu gửi lên Server
      const bookingData = {
        trip_id: tripId,
        pickup_point_id: selectedPickup, //int pickup_point_id = 1
        seat_numbers: selectedSeats.join(","), //"A1, A2"
        passenger_name: passengerInfo.name,
        passenger_phone: passengerInfo.phone,
        payment_method: passengerInfo.payment_method, //cash | bank
      };
      // Gọi API tạo booking
      const res = await tripApi.createBooking(bookingData);
      const checkoutUrl = res.data?.checkoutUrl;
      if (checkoutUrl) {
        toast.info("Đang chuyển đến trang thanh toán...");
        // Chuyển hướng trình duyệt sang trang thanh toán của PayOS
        window.location.href = checkoutUrl;
      }
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
    <div className="min-h-screen bg-gray-100 py-8 mt-[50px]">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-2xl font-bold text-orange-700 mb-6 uppercase">
          Đặt vé: {trip.route.from_city} ➝ {trip.route.to_city}
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
            {/* xác nhận */}
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
