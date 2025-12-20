import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import authApi from "../api/authApi";

// Dùng chung hình nền cho đẹp
import bgImage from "../assets/bus-bg.png";

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Theo dõi giá trị mật khẩu mới để kiểm tra khớp lệnh
  const newPassword = watch("new_password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Gọi API đổi mật khẩu
      await authApi.changePassword({
        current_password: data.current_password,
        new_password: data.new_password,
      });

      toast.success("Đổi mật khẩu thành công!");
      reset(); // Xóa trắng form
      navigate("/"); // Về trang chủ hoặc trang profile
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        "Đổi mật khẩu thất bại! Kiểm tra lại mật khẩu cũ.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative py-10"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between h-full max-w-6xl">
        {/* PHẦN CHỮ BÊN TRÁI */}
        <div className="hidden md:block text-white w-1/2 pr-10">
          <h1 className="text-6xl font-serif font-bold leading-tight mb-4 drop-shadow-lg">
            An Toàn <br /> Bảo Mật
          </h1>
          <p className="text-xl text-gray-100 drop-shadow-md font-light">
            Thay đổi mật khẩu thường xuyên để bảo vệ tài khoản của bạn tốt hơn.
          </p>
        </div>

        {/* PHẦN FORM BÊN PHẢI */}
        <div className="w-full md:w-[450px] bg-[#fdfdf9] rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-gray-200/50 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#2f5d41]">Đổi Mật Khẩu</h2>
            <p className="text-gray-500 text-sm mt-1">
              Nhập mật khẩu hiện tại và mật khẩu mới
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Mật khẩu cũ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                Mật khẩu hiện tại
              </label>
              <input
                type={showPass ? "text" : "password"}
                {...register("current_password", {
                  required: "Nhập mật khẩu hiện tại",
                })}
                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c05621] transition"
                placeholder="••••••"
              />
              {errors.current_password && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.current_password.message}
                </p>
              )}
            </div>

            {/* Mật khẩu mới */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                Mật khẩu mới
              </label>
              <input
                type={showPass ? "text" : "password"}
                {...register("new_password", {
                  required: "Nhập mật khẩu mới",
                  minLength: { value: 6, message: "Tối thiểu 6 ký tự" },
                })}
                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c05621] transition"
                placeholder="••••••"
              />
              {errors.new_password && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.new_password.message}
                </p>
              )}
            </div>

            {/* Xác nhận mật khẩu mới */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                Xác nhận mật khẩu mới
              </label>
              <input
                type={showPass ? "text" : "password"}
                {...register("confirm_password", {
                  required: "Vui lòng xác nhận mật khẩu",
                  validate: (val) =>
                    val === newPassword || "Mật khẩu không khớp",
                })}
                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c05621] transition"
                placeholder="••••••"
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            {/* Checkbox hiện mật khẩu */}
            <div className="flex items-center ml-1">
              <input
                type="checkbox"
                id="showPass"
                className="w-4 h-4 text-[#c05621] focus:ring-[#c05621] border-gray-300 rounded"
                onChange={() => setShowPass(!showPass)}
              />
              <label
                htmlFor="showPass"
                className="ml-2 text-sm text-gray-600 cursor-pointer"
              >
                Hiển thị mật khẩu
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#c05621] text-white font-bold py-3.5 rounded-full hover:bg-[#a0451a] transition-all shadow-lg transform active:scale-95 text-lg mt-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Đang xử lý..." : "Xác Nhận Đổi"}
            </button>
          </form>

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
              Quay về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
