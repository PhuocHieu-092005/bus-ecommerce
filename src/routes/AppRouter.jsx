// --- THÊM Navigate VÀO DÒNG DƯỚI ĐÂY ---
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MainLayout from "../components/Layout/MainLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import HomePage from "../pages/HomePage";
import SchedulePage from "../pages/SchedulePage";
import BookingPage from "../pages/BookingPage";
import BookingSuccessPage from "../pages/BookingSuccessPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
// ADMIN
import AdminLayout from "../components/Layout/AdminLayout";
import AdminRoute from "../components/common/AdminRoute";
import BusManagerPage from "../pages/Admin/BusManagerPage";
import RouteManagerPage from "../pages/Admin/RouteManagerPage";
import BookingManagerPage from "../pages/Admin/BookingManagerPage";
import TripManagerPage from "../pages/Admin/TripManagerPage";
import UserManagerPage from "../pages/Admin/UserManagerPage";
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

      {/* 2. Trang Lịch trình (Công khai - Có Header) */}
      <Route
        path="/schedule"
        element={
          <MainLayout>
            <SchedulePage />
          </MainLayout>
        }
      />

      {/* 3. Trang Đặt vé (Bảo mật - Có Header + Phải Đăng nhập) */}
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
      {/* Trang thông báo đặt vé thành công */}
      <Route path="/booking-success" element={<BookingSuccessPage />} />

      {/* 4. Các trang Login/Register (Riêng biệt - Không có Header) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* --- ROUTE CHO ADMIN --- */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          {/* Dòng này sẽ chạy được sau khi import Navigate */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="routes" element={<RouteManagerPage />} />
          <Route
            path="dashboard"
            element={<div>Trang Dashboard (Thống kê)</div>}
          />
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
