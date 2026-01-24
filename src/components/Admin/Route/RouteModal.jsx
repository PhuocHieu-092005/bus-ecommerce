import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const RouteModal = ({ isOpen, onClose, onSubmit, initialData }) => {
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
        setValue("from_city", initialData.from_city);
        setValue("to_city", initialData.to_city);
        setValue("distance", initialData.distance);
        setValue("duration", initialData.duration);
        setValue("price", initialData.price);
      } else {
        reset({
          from_city: "",
          to_city: "",
          distance: "",
          duration: "",
          price: "",
        });
      }
    }
  }, [isOpen, initialData, reset, setValue]);

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("from_city", data.from_city);
    formData.append("to_city", data.to_city);

    const formattedDistance = data.distance
      ? data.distance.toString().replace(",", ".")
      : "0";
    const formattedPrice = data.price
      ? data.price.toString().replace(",", ".")
      : "0";

    formData.append("distance", formattedDistance);
    formData.append("price", formattedPrice);
    formData.append("duration", data.duration || "");

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    onSubmit(formData);
  };
  // -----------------------------------------------------

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all scale-100">
        {/* Header Modal */}
        <div className="bg-orange-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">
            {initialData ? "Cập nhật Tuyến đường" : "Thêm Tuyến mới"}
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Body Form */}
        {/* LƯU Ý: Ở đây gọi handleFormSubmit thay vì onSubmit trực tiếp */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-5"
        >
          {/* Hàng 1: Điểm đi - Điểm đến */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Điểm đi
              </label>
              <input
                {...register("from_city", { required: "Nhập điểm đi" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                placeholder="TP HCM"
              />
              {errors.from_city && (
                <span className="text-red-500 text-xs">
                  {errors.from_city.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Điểm đến
              </label>
              <input
                {...register("to_city", { required: "Nhập điểm đến" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                placeholder="Đà Lạt"
              />
              {errors.to_city && (
                <span className="text-red-500 text-xs">
                  {errors.to_city.message}
                </span>
              )}
            </div>
          </div>

          {/* Hàng 2: Khoảng cách - Thời gian */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Khoảng cách (km)
              </label>
              {/* step="any" cho phép nhập số thập phân */}
              <input
                type="text"
                {...register("distance")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="300.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thời gian chạy
              </label>
              <input
                {...register("duration")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="6 giờ 30 phút"
              />
            </div>
          </div>

          {/* Hàng 3: Giá vé */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá vé chuẩn (VNĐ)
            </label>
            <div className="relative">
              <input
                type="number"
                {...register("price", { required: "Nhập giá vé" })}
                className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-2 focus:ring-2 focus:ring-orange-500 outline-none font-bold text-gray-700"
                placeholder="250000"
              />
              <span className="absolute right-4 top-2 text-gray-400 font-bold">
                đ
              </span>
            </div>
            {errors.price && (
              <span className="text-red-500 text-xs">
                {errors.price.message}
              </span>
            )}
          </div>
          {/* Thêm vào sau phần Giá vé */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hình ảnh tuyến đường
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
          </div>
          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-orange-600 text-white font-bold shadow-lg hover:bg-orange-700 hover:shadow-orange-500/30 transition transform active:scale-95"
            >
              {initialData ? "Lưu thay đổi" : "Tạo mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RouteModal;
