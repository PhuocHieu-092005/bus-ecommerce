import { useEffect, useState } from "react";
import tripApi from "../api/tripApi";
import TripCard from "../components/Booking/TripCard";
import SearchForm from "../components/Booking/SearchForm";
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
        if (response && response.data && Array.isArray(response.data.data)) {
          setTrips(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDefaultTrips();
  }, []);

  // 2. Khi bấm Tìm kiếm -> Gọi API Search (POST /search-trips)
  // 2. Khi bấm Tìm kiếm -> Gọi API Search
  const handleSearch = async (searchData) => {
    setIsSearched(true);
    setLoading(true);
    try {
      console.log("🚀 Dữ liệu gửi đi:", searchData);

      // Gọi API POST
      const response = await tripApi.searchTrips(searchData);
      console.log("📦 Kết quả tìm kiếm trả về:", response);

      // 🔥 FIX: Lấy dữ liệu từ trường 'depart_trips' theo đúng cấu trúc Postman
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
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-orange-600 h-64 flex flex-col items-center justify-center text-white relative">
        <h1 className="text-3xl font-bold mb-2">
          FUTA BUS LINES - CHẤT LƯỢNG LÀ DANH DỰ
        </h1>
        <p>Hơn 1000 chuyến xe mỗi ngày đi khắp Việt Nam</p>
      </div>

      <div className="container mx-auto px-4">
        {/* Form Tìm Kiếm */}
        <SearchForm onSearch={handleSearch} />

        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-orange-600 pl-3">
            {isSearched ? "Kết quả tìm kiếm" : "Lịch trình phổ biến"}
          </h2>

          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600 mx-auto"></div>
              <p className="mt-3 text-gray-500">Đang tìm kiếm...</p>
            </div>
          ) : trips.length > 0 ? (
            <div className="grid gap-4">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-10 text-center rounded shadow-sm">
              <p className="text-gray-500 text-lg">
                {isSearched
                  ? "Không tìm thấy chuyến xe nào phù hợp."
                  : "Hiện chưa có chuyến xe nào."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
