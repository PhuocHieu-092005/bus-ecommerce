import React from "react";

const BookingSummary = ({ selectedSeats, totalPrice, onSubmit, isValid }) => {
  return (
    <div className="bg-white p-6 rounded shadow border-t-4 border-orange-600">
      <div className="flex justify-between items-center mb-4 border-b pb-4 border-dashed">
        <span className="font-bold text-gray-600">Ghế đã chọn:</span>
        <span className="font-bold text-green-600 text-lg">
          {selectedSeats.length > 0 ? selectedSeats.join(", ") : "Chưa chọn"}
        </span>
      </div>

      <div className="flex justify-between text-xl font-bold text-red-600 mb-4">
        <span>Tổng tiền:</span>
        <span>{totalPrice.toLocaleString()} đ</span>
      </div>

      <button
        onClick={onSubmit}
        className={`w-full text-white font-bold py-3 rounded transition-colors uppercase 
          ${
            !isValid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700 shadow-lg transform active:scale-95"
          }`}
        disabled={!isValid}
      >
        XÁC NHẬN ĐẶT VÉ
      </button>
    </div>
  );
};

export default BookingSummary;
