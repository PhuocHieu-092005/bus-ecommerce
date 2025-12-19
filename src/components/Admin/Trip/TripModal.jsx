import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const TripModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  routes,
  buses,
}) => {
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
        setValue("route_id", initialData.route_id);
        setValue("bus_id", initialData.bus_id);

        // Format ngày giờ để hiển thị lên input (YYYY-MM-DDTHH:mm)
        const date = new Date(initialData.departure_time);
        // Lưu ý: Cần chỉnh lại múi giờ địa phương nếu bị lệch
        const localIsoString = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16);
        setValue("departure_time", localIsoString);

        setValue("ticket_price", initialData.ticket_price);
        setValue("available_seats", initialData.available_seats);
        setValue("status", initialData.status);
      } else {
        reset({
          route_id: "",
          bus_id: "",
          departure_time: "",
          ticket_price: "",
          available_seats: 40,
          status: "scheduled",
        });
      }
    }
  }, [isOpen, initialData, reset, setValue]);

  const handleFormSubmit = (data) => {
    // --- XỬ LÝ DỮ LIỆU TRƯỚC KHI GỬI ---
    const formattedData = {
      ...data,
      // 1. Đổi giá vé sang số
      ticket_price: parseFloat(data.ticket_price.toString().replace(",", ".")),

      // 2. Đổi số ghế sang số nguyên
      available_seats: parseInt(data.available_seats),

      // 3. FORMAT NGÀY GIỜ (Quan trọng): Thay chữ 'T' bằng khoảng trắng và thêm giây
      // Từ: "2025-12-18T09:30" -> Thành: "2025-12-18 09:30:00"
      departure_time: data.departure_time.replace("T", " ") + ":00",
    };

    onSubmit(formattedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="bg-orange-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white uppercase">
            {initialData ? "Cập nhật Chuyến xe" : "Tạo Chuyến mới"}
          </h2>
          <button onClick={onClose} className="text-white text-2xl">
            &times;
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-4"
        >
          {/* Chọn Tuyến đường */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tuyến đường
            </label>
            <select
              {...register("route_id", { required: true })}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-orange-500"
            >
              <option value="">-- Chọn tuyến --</option>
              {routes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.from_city} ➝ {r.to_city}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn Xe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Xe khách
            </label>
            <select
              {...register("bus_id", { required: true })}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-orange-500"
            >
              <option value="">-- Chọn xe --</option>
              {buses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.bus_name} - {b.license_plate} ({b.total_seats} chỗ)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Thời gian khởi hành */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giờ khởi hành
              </label>
              <input
                type="datetime-local"
                {...register("departure_time", { required: true })}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* Giá vé */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá vé
              </label>
              <input
                type="number"
                {...register("ticket_price", { required: true })}
                className="w-full border rounded-lg p-2"
                placeholder="200000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Số ghế trống */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ghế trống
              </label>
              <input
                type="number"
                {...register("available_seats")}
                className="w-full border rounded-lg p-2"
              />
            </div>

            {/* Trạng thái */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                {...register("status")}
                className="w-full border rounded-lg p-2"
              >
                <option value="scheduled">Sắp chạy</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
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

export default TripModal;
