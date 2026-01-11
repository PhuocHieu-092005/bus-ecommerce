import { useState, useEffect } from "react";
import tripApi from "../api/tripApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SchedulePage = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [popularRoutes, setPopularRoutes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Load dữ liệu ban đầu
  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      try {
        const response = await tripApi.getPopularRoutes();
        const data = response.data?.data || response.data || [];
        if (Array.isArray(data)) {
          setPopularRoutes(data);
        }
      } catch (error) {
        console.error("Lỗi tải tuyến phổ biến:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  // 2. Xử lý tìm kiếm
  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!keyword.trim()) {
      setIsSearching(false);
      return;
    }

    setLoading(true);
    setIsSearching(true);
    try {
      const response = await tripApi.searchRoutes(keyword);
      const data = response.data?.data || response.data || [];

      if (Array.isArray(data)) {
        setSearchResults(data);
        if (data.length === 0) toast.info("Không tìm thấy tuyến đường nào.");
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Lỗi khi tìm kiếm.");
    } finally {
      setLoading(false);
    }
  };

  const displayRoutes = isSearching ? searchResults : popularRoutes;
  const title = isSearching
    ? searchResults.length > 0
      ? `Kết quả tìm kiếm cho "${keyword}"`
      : ""
    : "Các tuyến đường phổ biến";

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      {/* ------------------------------------------------------- */}
      {/* 1. HERO BANNER (ẢNH BÌA) */}
      {/* ------------------------------------------------------- */}
      <div className="relative w-full h-[400px] overflow-hidden">
        {/* Ảnh nền */}
        <img
          src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop"
          alt="Highway Bus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Lớp phủ tối */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>

        {/* Nội dung Banner */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-10">
          <span className="text-orange-400 font-bold tracking-widest uppercase mb-2 animate-fadeInUp">
            Mạng lưới rộng khắp
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            TRA CỨU LỊCH TRÌNH
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Cập nhật thông tin lộ trình, giá vé và thời gian di chuyển mới nhất.
            <br className="hidden md:block" />
            Hơn 1000 chuyến xe mỗi ngày đi khắp Việt Nam.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------- */}
      {/* 2. SEARCH BAR (THANH TÌM KIẾM NỔI) */}
      {/* ------------------------------------------------------- */}
      <div className="container mx-auto px-4 relative z-20 -mt-8">
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl max-w-4xl mx-auto border border-gray-100">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Bạn muốn đi đâu? (Ví dụ: Đà Lạt, Nha Trang...)"
                className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition text-gray-700 font-medium"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  if (e.target.value === "") setIsSearching(false);
                }}
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:scale-105 transition transform duration-200 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              TÌM KIẾM
            </button>
          </form>
        </div>
      </div>

      {/* ------------------------------------------------------- */}
      {/* 3. DANH SÁCH TUYẾN (ROUTE LIST) */}
      {/* ------------------------------------------------------- */}
      <div className="container mx-auto px-4 mt-16 max-w-6xl">
        {title && (
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1.5 bg-orange-600 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {title}
            </h2>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-600 mb-4"></div>
            <p className="text-gray-500 font-medium">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {displayRoutes.length > 0 ? (
              displayRoutes.map((route) => (
                <div
                  key={route.id}
                  className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    {/* Thông tin chính */}
                    <div className="flex-1">
                      {/* Tiêu đề Tuyến */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                          {route.from_city}
                        </span>
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                        <span className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                          {route.to_city}
                        </span>
                      </div>

                      {/* Chi tiết (Grid 2 cột) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-gray-600">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-orange-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          <span>
                            Quãng đường:{" "}
                            <strong className="text-gray-900">
                              {route.distance} km
                            </strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-orange-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>
                            Thời gian:{" "}
                            <strong className="text-gray-900">
                              {route.duration}
                            </strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-orange-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            />
                          </svg>
                          <span>
                            Loại xe:{" "}
                            <strong className="text-gray-900 capitalize">
                              {route.bus_type || "Giường nằm"}
                            </strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-orange-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span>
                            Tần suất:{" "}
                            <strong className="text-gray-900">
                              {route.trip_count || "Hàng ngày"}
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Giá vé & Nút */}
                    <div className="w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8 mt-2 md:mt-0">
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">
                          Giá vé tham khảo
                        </p>
                        <p className="text-2xl font-extrabold text-orange-600">
                          {parseInt(route.price).toLocaleString("vi-VN")}đ
                        </p>
                      </div>

                      <button
                        onClick={() => navigate("/")}
                        className="bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white border border-orange-200 hover:border-orange-600 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2"
                      >
                        Đặt vé ngay
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Không tìm thấy kết quả
                </h3>
                <p className="text-gray-500 mt-1">
                  {isSearching
                    ? `Rất tiếc, không có tuyến đường nào khớp với "${keyword}".`
                    : "Hiện chưa có dữ liệu tuyến đường phổ biến."}
                </p>
                {isSearching && (
                  <button
                    onClick={() => {
                      setKeyword("");
                      setIsSearching(false);
                    }}
                    className="mt-4 text-orange-600 font-medium hover:underline"
                  >
                    Quay lại danh sách tất cả
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
