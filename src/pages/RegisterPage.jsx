import { useState } from "react";
import authApi from "../api/authApi"; // Gọi trực tiếp API đăng ký
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
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
    try {
      // Gọi API đăng ký
      await authApi.register(formData);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login"); // Chuyển sang trang login
    } catch (error) {
      console.error(error);
      // Hiển thị lỗi từ Server trả về (nếu có)
      const message = error.response?.data?.message || "Đăng ký thất bại!";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Đăng Ký Tài Khoản
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="full_name"
            placeholder="Họ và tên"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="phone"
            placeholder="Số điện thoại"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="address"
            placeholder="Địa chỉ"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-4"
          >
            Đăng Ký
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-orange-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
