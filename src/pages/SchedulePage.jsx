import { useState, useEffect } from "react";
import tripApi from "../api/tripApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SchedulePage = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Kết quả tìm kiếm
  const [popularRoutes, setPopularRoutes] = useState([]); // Tuyến phổ biến
  const [isSearching, setIsSearching] = useState(false); // Trạng thái đang xem kết quả tìm kiếm
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Mới vào trang: Tải danh sách tuyến phổ biến ngay
  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      try {
        const response = await tripApi.getPopularRoutes();
        console.log("🔥 Tuyến phổ biến:", response);

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

  // 2. Hàm xử lý tìm kiếm
  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!keyword.trim()) {
      setIsSearching(false); // Nếu ô tìm kiếm rỗng thì quay lại hiện tuyến phổ biến
      return;
    }

    setLoading(true);
    setIsSearching(true); // Chuyển sang chế độ hiển thị kết quả tìm kiếm
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

  // Xác định danh sách cần hiển thị (Tìm kiếm hay Phổ biến?)
  const displayRoutes = isSearching ? searchResults : popularRoutes;
  const title = isSearching
    ? searchResults.length > 0
      ? "Kết quả tìm kiếm"
      : ""
    : "Các tuyến đường phổ biến";

  return (
    <div className="min-h-screen bg-gray-50 pb-20 mt-[50px]">
      {/* Banner */}
      <div className="bg-orange-600 py-10 text-white text-center">
        <h1 className="text-3xl font-bold uppercase">Tra cứu lịch trình</h1>
        <p className="mt-2 opacity-90">
          Xem lộ trình, quãng đường và giá vé niêm yết
        </p>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Thanh tìm kiếm */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto border border-gray-200">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4"
          >
            <input
              type="text"
              placeholder="Nhập địa điểm (Ví dụ: Kiên Giang, Đà Lạt...)"
              className="flex-1 border border-gray-300 p-3 rounded font-medium focus:ring-2 focus:ring-orange-400 outline-none"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                if (e.target.value === "") setIsSearching(false); // Xóa trắng thì hiện lại phổ biến
              }}
            />
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded transition"
            >
              TÌM KIẾM
            </button>
          </form>
        </div>

        {/* Danh sách kết quả */}
        <div className="mt-10 max-w-5xl mx-auto">
          {title && (
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-orange-600 pl-3">
              {title}
            </h2>
          )}

          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600 mx-auto"></div>
              <p className="mt-3 text-gray-500">Đang tải dữ liệu...</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {displayRoutes.length > 0 ? (
                displayRoutes.map((route) => (
                  <div
                    key={route.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-center hover:shadow-md transition"
                  >
                    {/* Thông tin tuyến */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2">
                        {route.from_city}{" "}
                        <span className="text-gray-400">➝</span> {route.to_city}
                      </h3>
                      <div className="mt-3 text-gray-600 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                        <p>
                          🛣 Quãng đường:{" "}
                          <span className="font-semibold text-black">
                            {route.distance} km
                          </span>
                        </p>
                        <p>
                          ⏱ Thời gian:{" "}
                          <span className="font-semibold text-black">
                            {route.duration}
                          </span>
                        </p>
                        <p>
                          🚌 Loại xe:{" "}
                          <span className="font-semibold text-black capitalize">
                            {route.bus_type || "Giường nằm"}
                          </span>
                        </p>
                        <p>
                          🔢 Số chuyến:{" "}
                          <span className="font-semibold text-black">
                            {route.trip_count || "Hàng ngày"}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Giá vé & Nút */}
                    <div className="mt-4 md:mt-0 md:text-right flex flex-col items-end gap-2">
                      <p className="text-2xl font-bold text-orange-600">
                        {parseInt(route.price).toLocaleString("vi-VN")} đ
                      </p>
                      <button
                        onClick={() => navigate("/")}
                        className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-6 py-2 rounded-full font-bold text-sm transition"
                      >
                        Tìm chuyến xe
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 italic py-10">
                  {isSearching
                    ? "Không tìm thấy tuyến đường nào phù hợp."
                    : "Đang cập nhật các tuyến phổ biến..."}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
