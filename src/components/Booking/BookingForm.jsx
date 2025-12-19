import React from "react";

const BookingForm = ({
  pickupPoints,
  selectedPickup,
  onPickupChange,
  passengerInfo,
  onInfoChange,
}) => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="font-bold mb-4 text-orange-600">Thông tin khách hàng</h3>

      {/* Chọn điểm đón */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Điểm đón <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none"
          value={selectedPickup}
          onChange={(e) => onPickupChange(e.target.value)}
        >
          <option value="">-- Chọn điểm đón --</option>
          {pickupPoints.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - {p.address}
            </option>
          ))}
        </select>
      </div>

      {/* Nhập tên */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Họ tên <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded focus:ring-orange-500"
          value={passengerInfo.name}
          onChange={(e) =>
            onInfoChange({ ...passengerInfo, name: e.target.value })
          }
          placeholder="Nhập họ tên hành khách"
        />
      </div>

      {/* Nhập SĐT */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          SĐT <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded focus:ring-orange-500"
          value={passengerInfo.phone}
          onChange={(e) =>
            onInfoChange({ ...passengerInfo, phone: e.target.value })
          }
          placeholder="Nhập số điện thoại"
        />
      </div>

      {/* --- PHẦN MỚI THÊM: CHỌN PHƯƠNG THỨC THANH TOÁN --- */}
      <div className="mt-6 pt-4 border-t border-dashed">
        <label className="block text-sm font-bold mb-2 text-gray-700">
          Phương thức thanh toán <span className="text-red-500">*</span>
        </label>

        <div className="space-y-3">
          {/* Tiền mặt */}
          <label
            className={`flex items-center p-3 border rounded cursor-pointer transition-all ${
              passengerInfo.payment_method === "cash"
                ? "border-orange-500 bg-orange-50"
                : "hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={passengerInfo.payment_method === "cash"}
              onChange={(e) =>
                onInfoChange({
                  ...passengerInfo,
                  payment_method: e.target.value,
                })
              }
              className="w-4 h-4 text-orange-600 focus:ring-orange-500 accent-orange-600"
            />
            <div className="ml-3">
              <span className="block font-medium text-gray-800">
                Thanh toán tại nhà xe
              </span>
              <span className="block text-xs text-gray-500">
                Thanh toán tiền mặt khi lên xe
              </span>
            </div>
          </label>

          {/* Chuyển khoản */}
          <label
            className={`flex items-center p-3 border rounded cursor-pointer transition-all ${
              passengerInfo.payment_method === "banking"
                ? "border-orange-500 bg-orange-50"
                : "hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="banking"
              checked={passengerInfo.payment_method === "banking"}
              onChange={(e) =>
                onInfoChange({
                  ...passengerInfo,
                  payment_method: e.target.value,
                })
              }
              className="w-4 h-4 text-orange-600 focus:ring-orange-500 accent-orange-600"
            />
            <div className="ml-3">
              <span className="block font-medium text-gray-800">
                Chuyển khoản ngân hàng
              </span>
              <span className="block text-xs text-gray-500">
                Quét mã QR hoặc chuyển khoản 24/7
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
