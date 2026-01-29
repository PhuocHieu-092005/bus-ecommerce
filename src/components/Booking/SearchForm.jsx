import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import routeApi from "../../api/routeApi";

const SearchForm = ({ onSearch }) => {
  const [fromLocations, setFromLocations] = useState([]);
  const [toLocations, setToLocations] = useState([]);

  const [searchData, setSearchData] = useState({
    from_city: "",
    to_city: "",
    departure_date: "",
    return_date: "",
    trip_type: "one_way",
  });

  // Lấy ngày hôm nay (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const [fromRes, toRes] = await Promise.all([
          routeApi.getFromCities(),
          routeApi.getToCities(),
        ]);
        setFromLocations(fromRes.data);
        setToLocations(toRes.data);
      } catch (error) {
        console.error("Lỗi tải địa điểm:", error);
      }
    };
    fetchLocations();
  }, []);

  // 👇 LOGIC XỬ LÝ KHI NHẬP LIỆU (QUAN TRỌNG)
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Nếu người dùng thay đổi "Ngày đi"
    if (name === "departure_date") {
      // Kiểm tra: Nếu Ngày về đang có giá trị VÀ Ngày về < Ngày đi mới chọn
      // -> Thì xóa trắng Ngày về (bắt khách chọn lại)
      if (searchData.return_date && value > searchData.return_date) {
        setSearchData({
          ...searchData,
          [name]: value,
          return_date: "", // Reset ngày về
        });
        toast.info("Vui lòng chọn lại ngày về phù hợp với ngày đi mới.");
        return;
      }
    }

    setSearchData({ ...searchData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate cơ bản
    if (!searchData.from_city || !searchData.to_city) {
      toast.warning("Vui lòng chọn nơi đi và nơi đến!");
      return;
    }
    if (!searchData.departure_date) {
      toast.warning("Vui lòng chọn ngày đi!");
      return;
    }

    // Validate Khứ hồi
    if (searchData.trip_type === "round_trip") {
      if (!searchData.return_date) {
        toast.warning("Vui lòng chọn ngày về!");
        return;
      }
      // Kiểm tra kỹ lần cuối trước khi gửi
      if (searchData.return_date < searchData.departure_date) {
        toast.error("Ngày về không thể trước ngày đi!");
        return;
      }
    }

    // Làm sạch dữ liệu
    const payload = { ...searchData };
    if (payload.trip_type === "one_way") {
      delete payload.return_date;
    }

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
        {/* Điểm đi */}
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
            {fromLocations.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Điểm đến */}
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
            {toLocations.map((city, index) => (
              <option key={index} value={city}>
                {city}
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
            min={today} // Khóa ngày quá khứ
            className="w-full border border-gray-300 p-3 rounded font-medium focus:ring-2 focus:ring-orange-400 outline-none"
            onChange={handleChange}
            value={searchData.departure_date}
          />
        </div>

        {/* Ngày về (Logic hiển thị) */}
        {searchData.trip_type === "round_trip" ? (
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Ngày về
            </label>
            <input
              type="date"
              name="return_date"
              // 👇 LOGIC KHÓA: Ngày về tối thiểu phải bằng Ngày đi (nếu đã chọn ngày đi)
              min={searchData.departure_date || today}
              className="w-full border border-gray-300 p-3 rounded font-medium focus:ring-2 focus:ring-orange-400 outline-none"
              onChange={handleChange}
              value={searchData.return_date}
            />
          </div>
        ) : (
          // Nút tìm kiếm (Một chiều)
          <div>
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded shadow-md transition"
            >
              TÌM CHUYẾN XE
            </button>
          </div>
        )}
      </form>

      {/* Nút tìm kiếm (Khứ hồi - nằm dòng dưới) */}
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
