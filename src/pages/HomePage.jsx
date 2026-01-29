import React, { useEffect, useState } from "react";
import tripApi from "../api/tripApi";
import TripCard from "../components/Booking/TripCard";
import SearchForm from "../components/Booking/SearchForm";
import Banner from "../components/Layout/Banner";
import WhyChooseUs from "../components/Layout/WhyChooseUs";
import { toast } from "react-toastify";
import FilterSection from "./FilterSection";

const HomePage = () => {
  const [trips, setTrips] = useState([]); // mảng data chuyến đi
  const [loading, setLoading] = useState(false); //loading
  const [isSearched, setIsSearched] = useState(false); //đã thực hiện tìm kiếm hay chưa

  // request gửi đi (chưa kèm filter)
  const [currentSearchParams, setCurrentSearchParams] = useState({
    from_city: "",
    to_city: "",
    departure_date: "",
    return_date: "",
    trip_type: "one_way", //mặc định là 1 chiều
  });

  //gọi danh sách chuyến đi
  useEffect(() => {
    const fetchDefaultTrips = async () => {
      setLoading(true);
      try {
        const response = await tripApi.getAll();
        setTrips(response.data.data);
      } catch (error) {
        console.error("Lỗi tải chuyến xe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDefaultTrips();
  }, []);

  // Hàm tìm kiếm
  const handleSearch = async (searchData) => {
    setIsSearched(true); // tìm kiếm
    setLoading(true);

    try {
      console.log("Gửi API search:", searchData);
      //set dữ liệu để gửi đi
      setCurrentSearchParams(searchData);
      // gửi request
      const response = await tripApi.searchTrips(searchData);
      // kiểm tra mảng trả về có rỗng k
      if (response.data.depart_trips.length > 0) {
        setTrips(response.data.depart_trips);
        toast.success(
          `Tìm thấy ${response.data.depart_trips.length} chuyến xe!`,
        );
      } else {
        setTrips([]);
        toast.info("Không tìm thấy chuyến xe nào.");
      }
    } catch (error) {
      toast.error("Có lỗi khi tìm kiếm");
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };
  // Hàm xử lý khi người dùng chọn filter
  const handleFilter = async (filterData) => {
    // filterData = { bus_type: "sleeper", departure_time_range: "morning" }
    setLoading(true);
    try {
      // Tạo payload mới = thông tin search cũ + filter mới
      const payload = {
        ...currentSearchParams, // Giữ nguyên từ, đến, ngày đi,...
        ...filterData, // Thêm filter mới
      };
      console.log("Gửi API với filter:", payload);
      // Gọi API lại với filter
      const response = await tripApi.searchTrips(payload);
      setTrips(response.data.depart_trips);
      toast.success(
        `Còn ${response.data.depart_trips.length} chuyến xe phù hợp!`,
      );
    } catch (error) {
      console.error("Lỗi filter:", error);
      toast.error("Có lỗi khi lọc");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-0">
      {/* BANNER & SEARCH */}
      <div className="relative mb-24">
        <Banner />
        <div className="container mx-auto px-4 relative z-20 -mt-24">
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>
      {/* KẾT QUẢ TÌM KIẾM + FILTER */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-5xl mx-auto">
          {/* TIÊU ĐỀ */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-orange-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
              {isSearched ? "Kết quả tìm kiếm" : "Lịch trình phổ biến"}
            </h2>
          </div>

          {/* ----Hiển thị filter khi đã tìm chuyến đi */}
          {isSearched && <FilterSection onFilter={handleFilter} />}

          {/* DANH SÁCH CHUYẾN XE */}
          {loading ? (
            <div className="text-center py-20">Đang tải...</div>
          ) : trips.length > 0 ? (
            <div className="flex flex-col gap-6">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-16 text-center">
              <div className="text-6xl mb-4">🚌</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {isSearched ? "Không tìm thấy chuyến xe" : "Chưa có lịch trình"}
              </h3>
            </div>
          )}
        </div>
      </div>
      <WhyChooseUs />
    </div>
  );
};
export default HomePage;
