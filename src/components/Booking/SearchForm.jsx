import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import routeApi from "../../api/routeApi"; // Dùng routeApi thay vì tripApi

const SearchForm = ({ onSearch }) => {
  // State lưu danh sách địa điểm riêng biệt
  const [fromLocations, setFromLocations] = useState([]);
  const [toLocations, setToLocations] = useState([]);

  const [searchData, setSearchData] = useState({
    from_city: "",
    to_city: "",
    departure_date: "",
    return_date: "",
    trip_type: "one_way",
  });

  // Logic lấy địa điểm
  // --- SỬA ĐOẠN NÀY: Dùng API mới của Tâm để lấy địa điểm ---
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Gọi song song 2 API lấy điểm đi và điểm đến
        const [fromRes, toRes] = await Promise.all([
          routeApi.getFromCities(),
          routeApi.getToCities(),
        ]);

        // API trả về mảng string trực tiếp hoặc trong data
        setFromLocations(fromRes.data || fromRes || []);
        setToLocations(toRes.data || toRes || []);
      } catch (error) {
        console.error(" Lỗi gọi API:", error);
        console.error("❌ Lỗi tải địa điểm:", error);
        // Fallback: Nếu lỗi thì để mảng rỗng hoặc dữ liệu mẫu
      }
    };
    fetchLocations();
  }, []);
  // ---------------------------------------------------------

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validate
    if (!searchData.from_city || !searchData.to_city) {
      toast.warning("Vui lòng chọn nơi đi và nơi đến!");
      return;
    }
    if (!searchData.departure_date) {
      toast.warning("Vui lòng chọn ngày đi!");
      return;
    }
    if (searchData.trip_type === "round_trip" && !searchData.return_date) {
      toast.warning("Vui lòng chọn ngày về!");
      return;
    }
    // Tạo một bản sao để chỉnh sửa

    // 2. Làm sạch dữ liệu
    const payload = { ...searchData };
    if (payload.trip_type === "one_way" || !payload.return_date) {
      delete payload.return_date;
    }

    console.log("Gói tin sạch sẽ gửi đi:", payload);
    onSearch(payload);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl -mt-16 relative z-10 border border-gray-200 max-w-4xl mx-auto">
      {/* Radio chọn loại vé */}
      <div className="flex gap-6 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="trip_type"
            value="one_way"
            checked={searchData.trip_type === "one_way"}
            onChange={handleChange}
            className="w-5 h-5 text-orange-600 accent-orange-600"
          />
          <span className="font-semibold text-gray-700">Một chiều</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="trip_type"
            value="round_trip"
            checked={searchData.trip_type === "round_trip"}
            onChange={handleChange}
            className="w-5 h-5 text-orange-600 accent-orange-600"
          />
          <span className="font-semibold text-gray-700">Khứ hồi</span>
        </label>
      </div>

      <div className="border-t border-gray-200 my-2"></div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mt-4"
      >
        {/* Dropdown Điểm đi */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Điểm đi
          </label>
          <select
            name="from_city"
            className="w-full border border-gray-300 p-3 rounded font-medium focus:ring-2 focus:ring-orange-400 outline-none bg-white text-gray-800"
            onChange={handleChange}
            value={searchData.from_city}
          >
            <option value="">-- Chọn nơi đi --</option>
            {fromLocations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Điểm đến */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Điểm đến
          </label>
          <select
            name="to_city"
            className="w-full border border-gray-300 p-3 rounded font-medium focus:ring-2 focus:ring-orange-400 outline-none bg-white text-gray-800"
            onChange={handleChange}
            value={searchData.to_city}
          >
            <option value="">-- Chọn nơi đến --</option>
            {toLocations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Ngày đi */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Ngày đi
          </label>
          <input
            type="date"
            name="departure_date"
            className="w-full border border-gray-300 p-3 rounded font-medium focus:ring-2 focus:ring-orange-400 outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Ngày về (Hiện/Ẩn) */}
        {searchData.trip_type === "round_trip" ? (
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Ngày về
            </label>
            <input
              type="date"
              name="return_date"
              className="w-full border border-gray-300 p-3 rounded font-medium focus:ring-2 focus:ring-orange-400 outline-none"
              onChange={handleChange}
            />
          </div>
        ) : (
          // Nút tìm kiếm nằm ở cột cuối cùng
          <div>
            <button
              onClick={handleSubmit}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded shadow-md transition"
            >
              TÌM CHUYẾN XE
            </button>
          </div>
        )}
      </form>

      {/* Nếu là khứ hồi thì nút tìm kiếm nằm dòng dưới */}
      {searchData.trip_type === "round_trip" && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded shadow-md transition"
          >
            TÌM CHUYẾN XE
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
