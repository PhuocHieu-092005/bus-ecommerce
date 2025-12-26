import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // Nếu chỉ có 1 trang thì ẩn đi

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Nút Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded border ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
        }`}
      >
        &lt; Trước
      </button>

      {/* Hiển thị số trang (Ví dụ: Trang 1 / 5) */}
      <span className="text-sm font-medium text-gray-600">
        Trang <span className="text-orange-600 font-bold">{currentPage}</span> /{" "}
        {totalPages}
      </span>

      {/* Nút Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded border ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
        }`}
      >
        Sau &gt;
      </button>
    </div>
  );
};

export default Pagination;
