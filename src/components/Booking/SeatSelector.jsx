import React, { useState, useMemo } from "react";

const SeatSelector = ({ seats, bookedSeats, selectedSeats, onSelect }) => {
  const [activeFloor, setActiveFloor] = useState(1); // 1: Tầng dưới, 2: Tầng trên

  // Chia tầng (giữ nguyên logic cũ của bạn)
  const { lowerFloorSeats, upperFloorSeats } = useMemo(() => {
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

    const mid = Math.ceil(seats.length / 2);
    return {
      lowerFloorSeats: seats.slice(0, mid),
      upperFloorSeats: seats.slice(mid),
    };
  }, [seats]);

  const currentSeats = activeFloor === 1 ? lowerFloorSeats : upperFloorSeats;

  /**
   * ==========================
   * CHỈ SỬA LAYOUT Ở ĐÂY
   * Group ghế theo hàng A, B, C...
   * ==========================
   */
  const seatRows = useMemo(() => {
    const rows = {};

    currentSeats.forEach((seat) => {
      const seatNum = seat.seat_number || seat; // hỗ trợ cả object & string
      const rowKey = seatNum.charAt(0); // A, B, C

      if (!rows[rowKey]) rows[rowKey] = [];
      rows[rowKey].push(seat);
    });

    // Sort ghế trong từng hàng: A1 A2 A3 A4
    Object.keys(rows).forEach((row) => {
      rows[row].sort((a, b) => {
        const aNum = parseInt((a.seat_number || a).slice(1));
        const bNum = parseInt((b.seat_number || b).slice(1));
        return aNum - bNum;
      });
    });

    return rows;
  }, [currentSeats]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2 flex justify-between">
        <span>Chọn ghế</span>
        <span className="text-sm font-normal text-gray-500">
          ({selectedSeats.length} ghế đang chọn)
        </span>
      </h3>

      {/* Tabs chuyển tầng */}
      <div className="flex justify-center mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveFloor(1)}
          className={`flex-1 py-2 text-sm font-bold rounded-md ${
            activeFloor === 1
              ? "bg-white text-orange-600 shadow"
              : "text-gray-500"
          }`}
        >
          Tầng dưới
        </button>
        <button
          onClick={() => setActiveFloor(2)}
          className={`flex-1 py-2 text-sm font-bold rounded-md ${
            activeFloor === 2
              ? "bg-white text-orange-600 shadow"
              : "text-gray-500"
          }`}
        >
          Tầng trên
        </button>
      </div>

      {/* ===== SƠ ĐỒ GHẾ (LAYOUT ĐÃ FIX) ===== */}
      {Object.keys(seatRows).length > 0 ? (
        <div className="flex flex-col gap-4 items-center">
          {Object.entries(seatRows).map(([row, seatsInRow]) => (
            <div key={row} className="flex gap-4">
              {seatsInRow.map((seat) => {
                const seatNum = seat.seat_number || seat;
                const isBooked =
                  bookedSeats.includes(seatNum) || seat.is_available === false;
                const isSelected = selectedSeats.includes(seatNum);

                return (
                  <button
                    key={seatNum}
                    disabled={isBooked}
                    onClick={() => onSelect(seatNum)}
                    className={`
                      w-16 h-16 rounded-lg border-2 font-bold text-sm flex flex-col items-center justify-center
                      ${
                        isBooked
                          ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                          : isSelected
                          ? "bg-orange-600 border-orange-600 text-white shadow-lg"
                          : "bg-white border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500"
                      }
                    `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-6 h-6 mb-1 ${
                        isSelected
                          ? "fill-white"
                          : isBooked
                          ? "fill-gray-400"
                          : "fill-gray-400"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z" />
                    </svg>
                    {seatNum}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          Không có ghế ở tầng này
        </div>
      )}
    </div>
  );
};

export default SeatSelector;
