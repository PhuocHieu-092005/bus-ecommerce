import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Lấy user và hàm logout từ Context
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Gọi hàm logout từ context
    navigate("/login");
  };

  const navLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `font-bold text-sm uppercase px-4 py-4 transition-all border-b-2 ${
      isActive
        ? "text-red-600 border-red-600"
        : "text-gray-600 border-transparent hover:text-red-600"
    }`;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:bg-orange-700 transition">
            TH
          </div>
          <span className="text-orange-600 font-extrabold text-xl tracking-tighter uppercase group-hover:text-orange-700 transition">
            BUS VIP
          </span>
        </Link>

        {/* MENU */}
        <nav className="hidden md:flex items-center gap-2">
          <Link to="/" className={navLinkClass("/")}>
            Trang chủ
          </Link>
          <Link to="/schedule" className={navLinkClass("/schedule")}>
            Lịch trình
          </Link>
          <Link to="/contact" className={navLinkClass("/contact")}>
            Liên hệ
          </Link>
          <Link to="/my-ticket" className={navLinkClass("/my-ticket")}>
            Vé của tôi
          </Link>
        </nav>

        {/* USER BUTTONS - TỰ ĐỘNG CẬP NHẬT */}
        <div className="flex items-center gap-3">
          {user ? ( // 🔥 Kiểm tra biến user từ context
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700 hidden lg:block">
                Chào, {user.name || "Khách"}!
              </span>
              <button
                onClick={handleLogout}
                className="border border-red-500 text-red-600 px-4 py-1.5 rounded-full font-bold text-xs hover:bg-red-50 transition"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-orange-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-orange-700 transition shadow-sm"
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
