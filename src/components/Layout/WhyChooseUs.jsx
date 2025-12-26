import React from "react";

const features = [
  {
    id: 1,
    title: "Hơn 1000 chuyến xe",
    description:
      "Mạng lưới phủ khắp Việt Nam, đa dạng khung giờ cho bạn lựa chọn.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Chắc chắn có vé",
    description:
      "Cam kết giữ chỗ 100% ngay sau khi thanh toán. Hoàn tiền nếu có sự cố.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Thanh toán đa dạng",
    description:
      "Hỗ trợ thanh toán an toàn qua Momo, VNPay, Thẻ ATM và Visa/Mastercard.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Hỗ trợ 24/7",
    description:
      "Đội ngũ nhân viên chuyên nghiệp luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Tiêu đề Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 uppercase mb-3">
            Tại sao chọn <span className="text-orange-600">BUS VIP?</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến chất lượng dịch vụ tốt nhất, an toàn nhất
            và tiện lợi nhất cho mọi hành trình của bạn.
          </p>
          <div className="w-20 h-1 bg-orange-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Grid 4 cột */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="group bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                <div className="text-orange-600 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
