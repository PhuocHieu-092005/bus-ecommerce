import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import tripApi from "../../api/tripApi";

const SearchForm = ({ onSearch }) => {
  const [locations, setLocations] = useState([]);

  // 🔥 FIX: Đổi tên state cho giống hệt Postman API của Tâm
  const [searchData, setSearchData] = useState({
    from_city: "", // Cũ là: departure_location
    to_city: "", // Cũ là: arrival_location
    departure_date: "", // Cũ là: departure_time
    return_date: "",
    trip_type: "one_way",
  });

  // Logic lấy địa điểm (Giữ nguyên vì đã chạy tốt)
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await tripApi.getAll();
        let trips = [];
        if (response?.data?.data && Array.isArray(response.data.data)) {
          trips = response.data.data;
        } else if (response?.data && Array.isArray(response.data)) {
          trips = response.data;
        } else if (Array.isArray(response)) {
          trips = response;
        }

        if (trips.length > 0) {
          const uniqueLocs = new Set();
          trips.forEach((trip) => {
            const route = trip.route || {};
            const from = route.from_city;
            const to = route.to_city;
            if (from) uniqueLocs.add(from);
            if (to) uniqueLocs.add(to);
          });
          setLocations([...uniqueLocs]);
        }
      } catch (error) {
        console.error("❌ Lỗi gọi API:", error);
      }
    };
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validate dữ liệu nhập vào
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

    // 2. 🔥 FIX LỖI 422: Làm sạch dữ liệu trước khi gửi
    // Tạo một bản sao để chỉnh sửa
    const payload = { ...searchData };

    // Nếu là 'một chiều' HOẶC ngày về bị rỗng -> Xóa hẳn trường return_date khỏi gói tin
    if (payload.trip_type === "one_way" || !payload.return_date) {
      delete payload.return_date;
    }

    // Log ra kiểm tra xem đã mất return_date chưa
    console.log("Gói tin sạch sẽ gửi đi:", payload);

    // Gửi dữ liệu sạch ra ngoài
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
        {/* Dropdown Điểm đi - name="from_city" */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Điểm đi
          </label>
          <select
            name="from_city" // 🔥 Sửa name
            className="w-full border border-gray-300 p-3 rounded font-medium focus:ring-2 focus:ring-orange-400 outline-none bg-white text-gray-800"
            onChange={handleChange}
            value={searchData.from_city}
          >
            <option value="">-- Chọn nơi đi --</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Điểm đến - name="to_city" */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Điểm đến
          </label>
          <select
            name="to_city" // 🔥 Sửa name
            className="w-full border border-gray-300 p-3 rounded font-medium focus:ring-2 focus:ring-orange-400 outline-none bg-white text-gray-800"
            onChange={handleChange}
            value={searchData.to_city}
          >
            <option value="">-- Chọn nơi đến --</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Ngày đi - name="departure_date" */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Ngày đi
          </label>
          <input
            type="date"
            name="departure_date" // 🔥 Sửa name
            className="w-full border border-gray-300 p-3 rounded font-medium focus:ring-2 focus:ring-orange-400 outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Ngày về */}
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
          <div className="hidden md:block"></div>
        )}
      </form>

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded shadow-md transition"
        >
          TÌM CHUYẾN XE
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
