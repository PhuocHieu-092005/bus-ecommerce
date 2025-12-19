import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const BookingModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (isOpen && initialData) {
      setValue("passenger_name", initialData.passenger_name);
      setValue("passenger_phone", initialData.passenger_phone);
      setValue("status", initialData.status);
      setValue("payment_status", initialData.payment_status);
    }
  }, [isOpen, initialData, setValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-orange-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white uppercase">
            Cập nhật Vé
          </h2>
          <button onClick={onClose} className="text-white text-2xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Thông tin khách */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên hành khách
            </label>
            <input
              {...register("passenger_name")}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              {...register("passenger_phone")}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Trạng thái */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái vé
              </label>
              <select
                {...register("status")}
                className="w-full border rounded-lg p-2"
              >
                <option value="pending">Chờ xử lý</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="cancelled">Hủy vé</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thanh toán
              </label>
              <select
                {...register("payment_status")}
                className="w-full border rounded-lg p-2"
              >
                <option value="pending">Chưa thanh toán</option>
                <option value="paid">Đã thanh toán</option>
                <option value="refunded">Hoàn tiền</option>
              </select>
            </div>
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
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
