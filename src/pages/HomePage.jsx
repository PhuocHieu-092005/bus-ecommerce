import React, { useEffect, useState } from "react";
import tripApi from "../api/tripApi";
import TripCard from "../components/Booking/TripCard";
import SearchForm from "../components/Booking/SearchForm";
import Banner from "../components/Layout/Banner";
import WhyChooseUs from "../components/Layout/WhyChooseUs"; // Import đúng đường dẫn
import { toast } from "react-toastify";

const HomePage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  // 1. Mới vào trang -> Lấy danh sách mặc định (GET /trips)
  useEffect(() => {
    const fetchDefaultTrips = async () => {
      setLoading(true);
      try {
        const response = await tripApi.getAll();
        // Kiểm tra kỹ cấu trúc trả về từ API
        if (response && response.data && Array.isArray(response.data.data)) {
          setTrips(response.data.data);
        } else if (response && Array.isArray(response.data)) {
          setTrips(response.data);
        }
      } catch (error) {
        console.error("Lỗi tải chuyến xe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDefaultTrips();
  }, []);

  // 2. Khi bấm Tìm kiếm -> Gọi API Search
  const handleSearch = async (searchData) => {
    setIsSearched(true);
    setLoading(true);
    try {
      console.log("🚀 Dữ liệu gửi đi:", searchData);

      // Gọi API POST
      const response = await tripApi.searchTrips(searchData);
      console.log("📦 Kết quả tìm kiếm trả về:", response);

      // Lấy dữ liệu từ trường 'depart_trips' theo đúng cấu trúc Postman
      if (
        response &&
        response.data &&
        Array.isArray(response.data.depart_trips)
      ) {
        setTrips(response.data.depart_trips);
        toast.success(
          `Tìm thấy ${response.data.depart_trips.length} chuyến xe!`
        );
      } else {
        setTrips([]);
        toast.info("Không tìm thấy chuyến xe nào phù hợp.");
      }
    } catch (error) {
      console.error("❌ Lỗi tìm kiếm:", error);
      toast.error("Có lỗi khi tìm chuyến xe (Kiểm tra Console)");
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-0">
      {/* --- PHẦN 1: BANNER & TÌM KIẾM --- */}
      <div className="relative mb-24">
        {" "}
        {/* Thêm margin-bottom lớn để đẩy nội dung xuống */}
        <Banner />
        <div className="container mx-auto px-4 relative z-20 -mt-24">
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>

      {/* --- PHẦN 2: DANH SÁCH CHUYẾN XE --- */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-5xl mx-auto">
          {/* Tiêu đề section */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-orange-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
              {isSearched ? "Kết quả tìm kiếm" : "Lịch trình phổ biến"}
            </h2>
          </div>

          {/* Danh sách chuyến xe */}
          {loading ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium animate-pulse">
                Đang tìm chuyến xe tốt nhất cho bạn...
              </p>
            </div>
          ) : trips.length > 0 ? (
            <div className="flex flex-col gap-6">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-16 text-center rounded-xl shadow-sm border border-gray-100">
              <div className="text-6xl mb-4 opacity-50">🚌</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Chưa tìm thấy chuyến xe nào
              </h3>
              <p className="text-gray-500 text-lg font-medium mb-6">
                {isSearched
                  ? "Rất tiếc, không có chuyến xe nào phù hợp với tiêu chí tìm kiếm của bạn."
                  : "Hiện tại hệ thống chưa có lịch trình nào được công bố."}
              </p>
              {isSearched && (
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full hover:bg-orange-100 hover:text-orange-600 transition font-medium"
                >
                  ↺ Tải lại trang
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* --- PHẦN 3: TẠI SAO CHỌN CHÚNG TÔI --- */}
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
