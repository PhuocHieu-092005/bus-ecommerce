import Header from "./Header"; // Import Header vừa sửa

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header luôn nằm trên cùng */}
      <Header />

      {/* Nội dung thay đổi của từng trang sẽ nằm ở đây */}
      <main className="flex-grow bg-gray-50">{children}</main>

      {/* Bạn có thể thêm Footer ở đây sau này */}
      <footer className="bg-gray-800 text-white py-6 text-center mt-auto">
        <p>© 2025 FUTA Bus Lines. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
