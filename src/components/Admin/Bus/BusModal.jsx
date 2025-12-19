import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const BusModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Mỗi khi mở modal hoặc đổi dòng dữ liệu (Sửa), reset lại form
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Chế độ Sửa: Điền dữ liệu cũ vào form
        setValue("bus_name", initialData.bus_name);
        setValue("license_plate", initialData.license_plate);
        setValue("bus_type", initialData.bus_type);
        setValue("total_seats", initialData.total_seats);
        setValue("utilities", initialData.utilities);
      } else {
        // Chế độ Thêm: Xóa trắng form
        reset({
          bus_name: "",
          license_plate: "",
          bus_type: "sleeper", // Mặc định
          total_seats: 40,
          utilities: "",
        });
      }
    }
  }, [isOpen, initialData, reset, setValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          {initialData ? "Cập nhật xe" : "Thêm xe mới"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Tên xe */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên xe
            </label>
            <input
              {...register("bus_name", { required: "Tên xe là bắt buộc" })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Ví dụ: Xe Giường Nằm VIP"
            />
            {errors.bus_name && (
              <span className="text-red-500 text-xs">
                {errors.bus_name.message}
              </span>
            )}
          </div>

          {/* Biển số */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Biển số
            </label>
            <input
              {...register("license_plate", {
                required: "Biển số là bắt buộc",
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="51B-123.45"
            />
            {errors.license_plate && (
              <span className="text-red-500 text-xs">
                {errors.license_plate.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Loại xe */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Loại xe
              </label>
              <select
                {...register("bus_type")}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="sleeper">Giường nằm</option>
                <option value="seater">Ghế ngồi</option>
                <option value="limousine">Limousine</option>
              </select>
            </div>

            {/* Số ghế */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số ghế
              </label>
              <input
                type="number"
                {...register("total_seats", { required: true, min: 1 })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          {/* Tiện ích */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tiện ích
            </label>
            <textarea
              {...register("utilities")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Wifi, Nước uống, Chăn..."
              rows="2"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              Lưu lại
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusModal;
