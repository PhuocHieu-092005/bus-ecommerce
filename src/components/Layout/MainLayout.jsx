import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* 
         Nếu Header là fixed, ta không cần padding-top ở đây nếu muốn Banner tràn lên.
         Nhưng với các trang con không có Banner, ta có thể cần xử lý riêng.
         Tạm thời cứ để flex-grow là ổn.
      */}
      <main className="flex-grow bg-gray-50">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
