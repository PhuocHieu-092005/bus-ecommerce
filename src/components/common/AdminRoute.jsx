import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminRoute = () => {
  const { user, isAuthenticated } = useAuth();

  // Nếu chưa đăng nhập -> Login
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Nếu đăng nhập rồi mà không phải admin -> Về trang chủ hoặc trang 403
  // Lưu ý: Kiểm tra trường role trong user object của bạn (có thể là user.role hoặc user.user.role)
  if (user?.role !== "admin") {
    return (
      <div className="text-center mt-20 text-red-500 font-bold">
        BẠN KHÔNG CÓ QUYỀN TRUY CẬP TRANG NÀY
      </div>
    );
  }

  return <Outlet />;
};

export default AdminRoute;
