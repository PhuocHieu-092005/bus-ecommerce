import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import authApi from "../api/authApi";
import { useAuth } from "../contexts/AuthContext";

// Bạn nhớ kiểm tra tên file ảnh trong thư mục assets là .png hay .jpg nhé
import bgImage from "../assets/bus-bg.png";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // State quản lý ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await authApi.login(data);

      // Lấy dữ liệu an toàn
      const userData = res.data?.data?.user || res.data?.user;
      const token = res.data?.data?.access_token || res.data?.access_token;

      if (!token || !userData) {
        throw new Error("Dữ liệu không hợp lệ");
      }

      // 1. Lưu vào Context
      login(token, userData);

      toast.success("Đăng nhập thành công!");

      // 2. Chuyển trang (Sử dụng window.location để đảm bảo Admin nhận quyền ngay)
      if (userData?.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Đăng nhập thất bại!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // --- HÀM XỬ LÝ KHI BẤM QUÊN MẬT KHẨU ---
  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Vì chưa có API gửi mail reset, ta thông báo cho người dùng
    toast.info("Vui lòng liên hệ Hotline 1900 xxxx để được cấp lại mật khẩu!");
  };
  // ---------------------------------------

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Lớp phủ màu đen mờ để chữ dễ đọc hơn */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between h-full max-w-6xl">
        {/* PHẦN CHỮ BÊN TRÁI (Slogan) */}
        <div className="hidden md:block text-white w-1/2 pr-10">
          <h1 className="text-6xl font-serif font-bold leading-tight mb-4 drop-shadow-lg">
            Hành <br /> Trình Việt
          </h1>
          <p className="text-xl text-gray-100 drop-shadow-md font-light">
            Kết nối mọi nẻo đường, an toàn trên từng cây số. <br />
            Đặt vé dễ dàng, hành trình trọn vẹn.
          </p>
        </div>

        {/* PHẦN FORM BÊN PHẢI */}
        <div className="w-full md:w-[420px] bg-[#fdfdf9] rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-gray-200/50 backdrop-blur-sm">
          {/* Header Form */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              {/* Icon Xe Buýt Xanh */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-[#2f5d41]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#2f5d41]">
              Hành Trình Việt
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Chào mừng bạn quay trở lại!
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Input */}
            <div>
              <input
                type="email"
                {...register("email", { required: "Vui lòng nhập Email" })}
                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c05621] focus:border-transparent transition shadow-sm"
                placeholder="Email của bạn"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input (Có nút mắt) */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Vui lòng nhập Mật khẩu",
                })}
                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c05621] focus:border-transparent transition shadow-sm"
                placeholder="Mật khẩu"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400 hover:text-[#c05621] transition"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button Đăng Nhập */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#c05621] text-white font-bold py-3.5 rounded-full hover:bg-[#a0451a] transition-all shadow-lg hover:shadow-xl transform active:scale-95 text-lg ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Đang xử lý..." : "Đăng Nhập"}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 flex justify-between items-center text-sm font-medium">
            {/* --- SỬA CHỖ NÀY: Dùng button để hiện thông báo --- */}
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-gray-500 hover:text-[#c05621] transition focus:outline-none"
            >
              Quên mật khẩu?
            </button>
            {/* ------------------------------------------------ */}

            <Link
              to="/register"
              className="text-[#c05621] hover:text-[#a0451a] hover:underline transition"
            >
              Tạo tài khoản mới
            </Link>
          </div>

          <div className="mt-6 text-center border-t pt-4">
            <Link
              to="/"
              className="text-gray-400 text-sm hover:text-gray-600 flex items-center justify-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
