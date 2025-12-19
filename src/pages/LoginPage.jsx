import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Dùng useNavigate thay vì window.location
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import authApi from "../api/authApi";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

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

      // 1. Lưu vào Context (Gọi đúng thứ tự: Token trước, User sau như đã sửa ở Bước 1)
      login(token, userData);

      toast.success("Đăng nhập thành công!");

      // 2. Chuyển trang (Dùng navigate là được rồi vì Context đã sửa)
      if (userData?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Đăng nhập thất bại!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          ĐĂNG NHẬP
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Vui lòng nhập Email" })}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Mật khẩu</label>
            <input
              type="password"
              {...register("password", { required: "Vui lòng nhập Mật khẩu" })}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white font-bold py-2 rounded hover:bg-orange-700 disabled:bg-gray-400"
          >
            {loading ? "Đang xử lý..." : "ĐĂNG NHẬP"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link to="/" className="text-gray-500 hover:underline">
            ← Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
