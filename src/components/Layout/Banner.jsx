import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Danh sách ảnh banner (Bạn có thể thay bằng link ảnh thật của bạn)
const banners = [
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop", // Ảnh xe buýt 1
  "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop", // Ảnh xe buýt 2
  "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=2072&auto=format&fit=crop", // Ảnh phong cảnh
];

const Banner = () => {
  const settings = {
    dots: false, // Không hiện chấm tròn dưới đáy
    infinite: true, // Chạy vòng lặp vô tận
    speed: 1000, // Tốc độ chuyển cảnh (1s)
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Tự động chạy
    autoplaySpeed: 4000, // 4 giây đổi ảnh 1 lần
    fade: true, // Hiệu ứng mờ dần (thay vì trượt ngang)
    cssEase: "linear",
  };

  return (
    <div className="w-full h-[500px] relative overflow-hidden">
      <Slider {...settings}>
        {banners.map((img, index) => (
          <div key={index} className="relative h-[500px]">
            {/* Ảnh nền */}
            <img
              src={img}
              alt={`Banner ${index}`}
              className="w-full h-full object-cover"
            />
            {/* Lớp phủ màu đen mờ để chữ nổi bật hơn */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </Slider>

      {/* Nội dung chữ đè lên Banner */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 pb-16">
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase mb-4 drop-shadow-lg">
          BUS LINES - CHẤT LƯỢNG LÀ DANH DỰ
        </h1>
        <p className="text-lg md:text-xl font-light drop-shadow-md">
          Hơn 1000 chuyến xe mỗi ngày đi khắp Việt Nam
        </p>
      </div>
    </div>
  );
};

export default Banner;
