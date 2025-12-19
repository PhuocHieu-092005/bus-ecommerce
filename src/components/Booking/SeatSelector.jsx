import React, { useState, useMemo } from "react";

const SeatSelector = ({ seats, bookedSeats, selectedSeats, onSelect }) => {
  const [activeFloor, setActiveFloor] = useState(1); // 1: Tầng dưới, 2: Tầng trên

  // Xử lý phân chia tầng (Logic giả định: Nếu API không trả về tầng, ta chia đôi danh sách)
  const { lowerFloorSeats, upperFloorSeats } = useMemo(() => {
    // Cách 1: Nếu API có trả về field 'floor' (lower/upper)
    const hasFloorInfo = seats.some((s) => s.floor);
    if (hasFloorInfo) {
      return {
        lowerFloorSeats: seats.filter(
          (s) => s.floor === "lower" || s.floor === 1
        ),
        upperFloorSeats: seats.filter(
          (s) => s.floor === "upper" || s.floor === 2
        ),
      };
    }

    // Cách 2: Nếu API chỉ trả về list phẳng (A1...H4), ta chia đôi danh sách
    // Giả sử nửa đầu là tầng dưới, nửa sau là tầng trên
    const midPoint = Math.ceil(seats.length / 2);
    return {
      lowerFloorSeats: seats.slice(0, midPoint),
      upperFloorSeats: seats.slice(midPoint),
    };
  }, [seats]);

  const currentSeats = activeFloor === 1 ? lowerFloorSeats : upperFloorSeats;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2 flex justify-between items-center">
        <span>Chọn ghế</span>
        <span className="text-sm font-normal text-gray-500">
          ({selectedSeats.length} ghế đang chọn)
        </span>
      </h3>

      {/* Tabs chuyển tầng */}
      <div className="flex justify-center mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveFloor(1)}
          className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
            activeFloor === 1
              ? "bg-white text-orange-600 shadow"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Tầng dưới
        </button>
        <button
          onClick={() => setActiveFloor(2)}
          className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
            activeFloor === 2
              ? "bg-white text-orange-600 shadow"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Tầng trên
        </button>
      </div>

      {/* Sơ đồ ghế */}
      {currentSeats.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 max-w-[300px] mx-auto">
          {currentSeats.map((seat, index) => {
            // Lấy số ghế (xử lý cả trường hợp seat là object hoặc string)
            const seatNum = seat.seat_number || seat;

            // Kiểm tra ghế đã bán
            const isBooked =
              bookedSeats.includes(seatNum) || seat.is_available === false;
            const isSelected = selectedSeats.includes(seatNum);

            return (
              <div key={index} className="relative group">
                <button
                  disabled={isBooked}
                  onClick={() => onSelect(seatNum)}
                  className={`
                    w-full h-16 rounded-lg border-2 font-bold text-sm flex flex-col items-center justify-center transition-all relative
                    ${
                      isBooked
                        ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed opacity-70" // Style ghế đã bán
                        : isSelected
                        ? "bg-orange-600 border-orange-600 text-white shadow-lg scale-105" // Style đang chọn
                        : "bg-white border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500 hover:shadow-md" // Style ghế trống
                    }
                  `}
                >
                  {/* Icon ghế (SVG đơn giản) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-6 h-6 mb-1 ${
                      isSelected
                        ? "fill-white"
                        : isBooked
                        ? "fill-gray-400"
                        : "fill-gray-400 group-hover:fill-orange-400"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z" />
                  </svg>
                  {seatNum}

                  {/* Dấu X nếu đã bán */}
                  {isBooked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-600 text-2xl font-bold opacity-50">
                        ✕
                      </span>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400 bg-gray-50 rounded">
          <p>Không có ghế ở tầng này</p>
        </div>
      )}

      {/* Chú thích */}
      <div className="mt-8 flex justify-center gap-6 text-xs font-medium text-gray-600 border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded border-2 border-gray-200 bg-white"></div>
          Trống
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-orange-600 border-orange-600"></div>
          Đang chọn
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gray-300 border-gray-300 flex items-center justify-center text-gray-500">
            ✕
          </div>
          Đã bán
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
