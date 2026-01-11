import React, { useState } from "react";

export default function FilterSection({ onFilter }) {
  const [filters, setFilters] = useState({
    bus_type: "",
    departure_time_range: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };

    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      bus_type: "",
      departure_time_range: "",
    });
    onFilter({});
  };

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-700">🔎 Bộ lọc nâng cao</h3>
        {(filters.bus_type || filters.departure_time_range) && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            ✕ Xóa bộ lọc
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Loại xe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loại xe
          </label>
          <select
            name="bus_type"
            value={filters.bus_type}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Tất cả loại xe</option>
            <option value="sleeper">Giường nằm</option>
            <option value="standard">Tiêu chuẩn</option>
            <option value="premium">Cao cấp</option>
          </select>
        </div>

        {/* Khung giờ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Khung giờ khởi hành
          </label>
          <select
            name="departure_time_range"
            value={filters.departure_time_range}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Tất cả khung giờ</option>
            <option value="morning">Sáng (6:00 - 12:00)</option>
            <option value="afternoon">Chiều (13:00 - 18:00)</option>
            <option value="evening">Tối (19:00 - 21:00)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
