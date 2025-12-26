import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t-4 border-orange-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Cột 1: Thông tin nhà xe */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                TH
              </div>
              <span className="text-white font-extrabold text-2xl tracking-tighter uppercase">
                BUS VIP
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Hệ thống đặt vé xe khách chất lượng cao hàng đầu Việt Nam. Chúng
              tôi cam kết mang đến những chuyến đi an toàn, tiện lợi và đúng giờ
              cho mọi hành khách.
            </p>
            <div className="flex gap-4">
              {/* Social Icons (Dùng SVG cho nhẹ) */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Cột 2: Về chúng tôi */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wide">
              Về chúng tôi
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-500 transition-colors"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/schedule"
                  className="hover:text-orange-500 transition-colors"
                >
                  Lịch trình
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-orange-500 transition-colors"
                >
                  Về nhà xe
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="hover:text-orange-500 transition-colors"
                >
                  Tin tức & Sự kiện
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-orange-500 transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wide">
              Hỗ trợ khách hàng
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/guide"
                  className="hover:text-orange-500 transition-colors"
                >
                  Hướng dẫn đặt vé
                </Link>
              </li>
              <li>
                <Link
                  to="/policy"
                  className="hover:text-orange-500 transition-colors"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-orange-500 transition-colors"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-orange-500 transition-colors"
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  to="/complain"
                  className="hover:text-orange-500 transition-colors"
                >
                  Góp ý - Khiếu nại
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wide">
              Thông tin liên hệ
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-orange-600 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-lg font-bold text-white">1900 1234</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>hotro@busvip.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Dòng bản quyền dưới cùng */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 TH BUS VIP. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
