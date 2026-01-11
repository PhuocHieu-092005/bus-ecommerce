import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Hàm tạo danh sách các trang cần hiển thị
  const getPageNumbers = () => {
    const pages = [];
    const maxVisibleButtons = 5; // Số lượng nút trang hiển thị tối đa

    // Tính toán start và end để luôn hiển thị 5 nút (trừ khi tổng trang < 5)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    // Điều chỉnh lại startPage nếu endPage chạm trần
    if (endPage - startPage < maxVisibleButtons - 1) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Nút Về đầu (First) - Chỉ hiện khi không ở trang đầu */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-colors ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
            : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border-gray-300"
        }`}
        title="Trang đầu"
      >
        &laquo;
      </button>

      {/* Nút Trước (Prev) */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-colors ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
            : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border-gray-300"
        }`}
      >
        &lt;
      </button>

      {/* Danh sách số trang */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-9 h-9 flex items-center justify-center rounded-lg border font-medium transition-all ${
            currentPage === number
              ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-105" // Active style
              : "bg-white text-gray-600 border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
          }`}
        >
          {number}
        </button>
      ))}

      {/* Nút Sau (Next) */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-colors ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
            : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border-gray-300"
        }`}
      >
        &gt;
      </button>

      {/* Nút Về cuối (Last) - Chỉ hiện khi không ở trang cuối */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-colors ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
            : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border-gray-300"
        }`}
        title="Trang cuối"
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
