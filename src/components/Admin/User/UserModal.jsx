import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const UserModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Chế độ Sửa
        setValue("full_name", initialData.full_name);
        setValue("email", initialData.email);
        setValue("phone", initialData.phone);
        setValue("role", initialData.role);
        setValue("address", initialData.address);
        setValue("password", "");
      } else {
        // Chế độ Thêm
        reset({
          full_name: "",
          email: "",
          phone: "",
          role: "user",
          address: "",
          password: "",
        });
      }
    }
  }, [isOpen, initialData, reset, setValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="bg-orange-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white uppercase">
            {initialData ? "Cập nhật Người dùng" : "Thêm Người dùng mới"}
          </h2>
          <button onClick={onClose} className="text-white text-2xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Họ tên */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              {...register("full_name", { required: "Nhập họ tên" })}
              className="w-full border rounded-lg p-2"
              placeholder="Nguyễn Văn A"
            />
            {errors.full_name && (
              <span className="text-red-500 text-xs">
                {errors.full_name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Nhập email" })}
              className="w-full border rounded-lg p-2"
              placeholder="email@example.com"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu{" "}
              {initialData && (
                <span className="text-gray-400 font-normal">
                  (Để trống nếu không đổi)
                </span>
              )}
            </label>
            <input
              type="password"
              autoComplete="new-password"
              {...register("password", {
                required: !initialData && "Nhập mật khẩu",
                minLength: {
                  value: 8,
                  message: "Mật khẩu phải ít nhất 8 ký tự",
                },
              })}
              className="w-full border rounded-lg p-2"
              placeholder="••••••••"
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* SĐT */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <input
                {...register("phone")}
                className="w-full border rounded-lg p-2"
                placeholder="0909..."
              />
            </div>

            {/* Vai trò */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vai trò
              </label>
              <select
                {...register("role")}
                className="w-full border rounded-lg p-2"
                // Nếu đang sửa Admin thì khóa luôn không cho đổi xuống User
                disabled={initialData && initialData.role === "admin"}
              >
                <option value="user">Khách hàng (User)</option>

                {/* 👇 CHỈ HIỆN ADMIN NẾU ĐANG SỬA ADMIN CÓ SẴN */}
                {initialData && initialData.role === "admin" && (
                  <option value="admin">Quản trị viên (Admin)</option>
                )}
              </select>

              {initialData && initialData.role === "admin" && (
                <p className="text-xs text-red-500 mt-1 italic">
                  * Không thể thay đổi quyền của Admin
                </p>
              )}
            </div>
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ
            </label>
            <input
              {...register("address")}
              className="w-full border rounded-lg p-2"
              placeholder="Nhập địa chỉ..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-bold"
            >
              Lưu lại
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
