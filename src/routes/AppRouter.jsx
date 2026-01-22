import { Routes, Route, Navigate } from "react-router-dom";

// PAGES
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import SchedulePage from "../pages/SchedulePage";
import BookingPage from "../pages/BookingPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import ContactPage from "../pages/ContactPage";
import MyTicketPage from "../pages/MyTicketPage";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel";

// ADMIN PAGES
import BusManagerPage from "../pages/Admin/BusManagerPage";
import RouteManagerPage from "../pages/Admin/RouteManagerPage";
import BookingManagerPage from "../pages/Admin/BookingManagerPage";
import TripManagerPage from "../pages/Admin/TripManagerPage";
import UserManagerPage from "../pages/Admin/UserManagerPage";
import DashboardPage from "../pages/Admin/DashboardPage"; // 👈 QUAN TRỌNG: Import file Dashboard vào đây

// LAYOUT & COMPONENTS
import MainLayout from "../components/Layout/MainLayout";
import AdminLayout from "../components/Layout/AdminLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminRoute from "../components/common/AdminRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* 1. Trang chủ (Công khai - Có Header) */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      {/* 2. Trang Lịch trình */}
      <Route
        path="/schedule"
        element={
          <MainLayout>
            <SchedulePage />
          </MainLayout>
        }
      />

      {/* 3. Trang Đặt vé (Bảo mật) */}
      <Route
        path="/booking"
        element={
          <MainLayout>
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/change-password"
        element={
          <MainLayout>
            <ProtectedRoute>
              <ChangePasswordPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/my-ticket"
        element={
          <MainLayout>
            <ProtectedRoute>
              <MyTicketPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout>
            <ContactPage />
          </MainLayout>
        }
      />

      {/* Trang thanh toán */}
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-cancel" element={<PaymentCancel />} />

      {/* 4. Login/Register */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* --- ROUTE CHO ADMIN --- */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          {/* Chuyển hướng mặc định về dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* 👇 SỬA DÒNG NÀY: Gọi Component DashboardPage thay vì div cứng */}
          <Route path="dashboard" element={<DashboardPage />} />

          <Route path="routes" element={<RouteManagerPage />} />
          <Route path="buses" element={<BusManagerPage />} />
          <Route path="trips" element={<TripManagerPage />} />
          <Route path="bookings" element={<BookingManagerPage />} />
          <Route path="users" element={<UserManagerPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
