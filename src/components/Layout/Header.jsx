import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // State để kiểm tra xem người dùng đã cuộn trang chưa
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Bắt sự kiện cuộn chuột
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Class động dựa trên trạng thái cuộn
  // Nếu ở đầu trang (chưa cuộn) và đang ở trang chủ: Nền trong suốt, chữ trắng
  // Nếu đã cuộn hoặc không phải trang chủ: Nền trắng, chữ đen, có bóng đổ
  const isHomePage = location.pathname === "/";

  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
    isScrolled || !isHomePage
      ? "bg-white/95 backdrop-blur-md shadow-md py-2 text-gray-800"
      : "bg-transparent py-4 text-white"
  }`;

  const logoTextClass =
    isScrolled || !isHomePage ? "text-orange-600" : "text-white";
  const navLinkClass =
    isScrolled || !isHomePage
      ? "text-gray-600 hover:text-orange-600"
      : "text-white/90 hover:text-white hover:bg-white/10";

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* --- LOGO --- */}
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-lg transition-transform group-hover:scale-110 ${
              isScrolled || !isHomePage
                ? "bg-orange-600 text-white"
                : "bg-white text-orange-600"
            }`}
          >
            V
          </div>
          <div className="flex flex-col">
            <span
              className={`font-extrabold text-xl tracking-tighter uppercase leading-none ${logoTextClass}`}
            >
              BUS VIP
            </span>
            <span
              className={`text-[10px] font-medium tracking-widest ${
                isScrolled || !isHomePage ? "text-gray-500" : "text-white/80"
              }`}
            >
              LINES
            </span>
          </div>
        </Link>

        {/* --- MENU GIỮA --- */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { path: "/", label: "Trang chủ", icon: "🏠" },
            { path: "/schedule", label: "Lịch trình", icon: "📅" },
            { path: "/contact", label: "Liên hệ", icon: "📞" },
            { path: "/my-ticket", label: "Vé của tôi", icon: "🎟️" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${navLinkClass} ${
                location.pathname === link.path
                  ? "bg-orange-600 !text-white shadow-orange-500/50 shadow-lg"
                  : ""
              }`}
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* --- USER / LOGIN --- */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center gap-2 font-bold px-4 py-2 rounded-full border transition-all ${
                  isScrolled || !isHomePage
                    ? "border-gray-200 hover:bg-gray-50 text-gray-700"
                    : "border-white/30 bg-black/20 text-white hover:bg-black/30"
                }`}
              >
                <span>👤 {user.full_name || user.name || "Khách hàng"}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 animate-fade-in-up origin-top-right text-gray-800">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Đăng nhập với</p>
                    <p className="font-bold truncate">{user.email}</p>
                  </div>

                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition"
                    >
                      ⚡ Trang quản trị
                    </Link>
                  )}

                  <Link
                    to="/change-password"
                    class="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition"
                  >
                    🔒 Đổi mật khẩu
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition font-medium"
                  >
                    🚪 Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`px-6 py-2.5 rounded-full font-bold text-sm shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ${
                isScrolled || !isHomePage
                  ? "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-500/30"
                  : "bg-white text-orange-600 hover:bg-gray-100"
              }`}
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
