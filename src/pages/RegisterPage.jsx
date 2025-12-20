import { useState } from "react";
import authApi from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

// Sử dụng chung hình nền với trang Login cho đồng bộ
import bgImage from "../assets/bus-bg.png";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu loading
    try {
      await authApi.register(formData);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Đăng ký thất bại!";
      toast.error(message);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative py-10"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Lớp phủ màu đen mờ */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between h-full max-w-6xl">
        {/* PHẦN CHỮ BÊN TRÁI (Slogan - Giống trang Login) */}
        <div className="hidden md:block text-white w-1/2 pr-10">
          <h1 className="text-6xl font-serif font-bold leading-tight mb-4 drop-shadow-lg">
            Hành <br /> Trình Việt
          </h1>
          <p className="text-xl text-gray-100 drop-shadow-md font-light">
            Đăng ký thành viên ngay hôm nay để nhận nhiều ưu đãi hấp dẫn và quản
            lý chuyến đi dễ dàng hơn.
          </p>
        </div>

        {/* PHẦN FORM BÊN PHẢI */}
        <div className="w-full md:w-[450px] bg-[#fdfdf9] rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-gray-200/50 backdrop-blur-sm">
          {/* Header Form */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#2f5d41]">Tạo Tài Khoản</h2>
            <p className="text-gray-500 text-sm mt-1">
              Tham gia cùng cộng đồng Bus VIP
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Họ tên */}
            <div>
              <input
                name="full_name"
                placeholder="Họ và tên"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c05621] focus:border-transparent transition shadow-sm"
              />
            </div>

            {/* Email */}
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c05621] focus:border-transparent transition shadow-sm"
              />
            </div>

            {/* Mật khẩu (Có nút mắt) */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c05621] focus:border-transparent transition shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-[#c05621] transition"
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
            </div>

            {/* Số điện thoại */}
            <div>
              <input
                name="phone"
                placeholder="Số điện thoại"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c05621] focus:border-transparent transition shadow-sm"
              />
            </div>

            {/* Địa chỉ */}
            <div>
              <input
                name="address"
                placeholder="Địa chỉ (Tùy chọn)"
                onChange={handleChange}
                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c05621] focus:border-transparent transition shadow-sm"
              />
            </div>

            {/* Button Đăng Ký */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#c05621] text-white font-bold py-3.5 rounded-full hover:bg-[#a0451a] transition-all shadow-lg hover:shadow-xl transform active:scale-95 text-lg mt-4 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Đang xử lý..." : "Đăng Ký Ngay"}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-gray-600 font-medium">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-[#c05621] hover:underline font-bold"
            >
              Đăng nhập tại đây
            </Link>
          </div>

          <div className="mt-4 text-center border-t pt-4">
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

export default RegisterPage;
