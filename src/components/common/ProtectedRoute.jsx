import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Nếu đang tải thông tin user
  if (loading) {
    return <div className="text-center mt-20">Đang tải...</div>;
  }

  // 2. Nếu chưa đăng nhập -> Đá về Login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Nếu đã đăng nhập -> Cho phép vào
  return children;
};

export default ProtectedRoute;
