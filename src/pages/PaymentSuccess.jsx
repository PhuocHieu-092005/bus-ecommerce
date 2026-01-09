import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Lấy các thông tin PayOS trả về trên URL
  const orderCode = searchParams.get("orderCode");

  useEffect(() => {
    toast.success("Thanh toán thành công! Chúc bạn có chuyến đi vui vẻ.");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 mt-[50px]">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        {/* Icon thành công */}
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Thanh toán thành công!
        </h1>
        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi. <br />
          Mã đơn hàng của bạn là:{" "}
          <span className="font-bold text-orange-600">#{orderCode}</span>
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
