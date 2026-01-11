import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../api/axiosClient";
export default function PaymentCancel() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const bookingCode = searchParams.get("orderCode");

    if (!bookingCode) return;

    axios.post(`/cancelPayment/${bookingCode}`);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Thanh toán đã bị hủy
        </h1>
        <p className="text-gray-600 mb-6">
          Bạn đã hủy giao dịch. Vui lòng thử lại nếu có nhu cầu.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition"
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
}
