import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Hàm xử lý khi bấm Gửi
  const onSubmit = (data) => {
    console.log("Dữ liệu liên hệ:", data);
    // Giả lập gửi API
    setTimeout(() => {
      toast.success("Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất.");
      reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ------------------------------------------------------- */}
      {/* 1. HERO BANNER SECTION (PHẦN ẢNH BÌA "ĐỈNH") */}
      {/* ------------------------------------------------------- */}
      <div className="relative w-full h-[450px] overflow-hidden">
        {/* Ảnh nền */}
        <img
          src="https://res.cloudinary.com/dbemi1ljd/image/upload/v1768045498/contact_ehmder.png"
          alt="Bus Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Lớp phủ màu tối */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Nội dung chữ trên Banner */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <span className="text-orange-400 font-bold tracking-widest uppercase mb-3 animate-bounce">
            Hỗ trợ khách hàng 24/7
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl">
            LIÊN HỆ VỚI CHÚNG TÔI
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Mọi thắc mắc hoặc đóng góp ý kiến, quý khách vui lòng gửi tin nhắn.
            <br className="hidden md:block" />
            Đội ngũ Bus VIP luôn sẵn sàng lắng nghe bạn trên mọi nẻo đường.
          </p>
          <div className="w-24 h-1.5 bg-orange-500 mt-8 rounded-full shadow-lg"></div>
        </div>
      </div>

      {/* ------------------------------------------------------- */}
      {/* 2. MAIN CONTENT (SPLIT CARD DESIGN) */}
      {/* ------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 mb-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* CỘT TRÁI: THÔNG TIN (Nền Gradient Cam) */}
          <div className="md:w-5/12 bg-gradient-to-br from-orange-500 to-red-600 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Họa tiết trang trí nền */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-400 opacity-10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Thông tin liên hệ</h2>
              <p className="text-orange-100 mb-8">
                Hãy đến trực tiếp văn phòng hoặc gọi điện để được hỗ trợ nhanh
                nhất.
              </p>

              <div className="space-y-8">
                {/* Địa chỉ */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Địa chỉ trụ sở</h3>
                    <p className="text-orange-100 text-sm leading-relaxed">
                      123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                {/* Hotline */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Tổng đài đặt vé</h3>
                    <p className="text-white font-bold text-xl">1900 1234</p>
                    <p className="text-orange-200 text-xs">Hoạt động 24/7</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email hỗ trợ</h3>
                    <p className="text-orange-100 text-sm">hotro@busvip.vn</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="relative z-10 mt-12">
              <p className="mb-4 font-medium opacity-90">Theo dõi chúng tôi:</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-2 bg-white/20 rounded-full hover:bg-white hover:text-orange-600 transition duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="p-2 bg-white/20 rounded-full hover:bg-white hover:text-orange-600 transition duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: FORM (Nền Trắng) */}
          <div className="md:w-7/12 p-10 md:p-14 bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-orange-500 pl-3">
              Gửi thắc mắc cho chúng tôi
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Họ tên */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    {...register("name", { required: "Vui lòng nhập họ tên" })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition outline-none"
                    placeholder="Nguyễn Văn A"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Vui lòng nhập email",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email không hợp lệ",
                      },
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition outline-none"
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* SĐT */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    {...register("phone", { required: "Vui lòng nhập SĐT" })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition outline-none"
                    placeholder="0909..."
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                {/* Tiêu đề */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề
                  </label>
                  <input
                    {...register("subject", {
                      required: "Vui lòng nhập tiêu đề",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition outline-none"
                    placeholder="Vấn đề cần hỗ trợ"
                  />
                  {errors.subject && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.subject.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Nội dung */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung tin nhắn
                </label>
                <textarea
                  {...register("message", {
                    required: "Vui lòng nhập nội dung",
                  })}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition outline-none resize-none"
                  placeholder="Nhập nội dung bạn cần hỗ trợ..."
                ></textarea>
                {errors.message && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white font-bold py-4 rounded-lg hover:bg-orange-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                GỬI TIN NHẮN
              </button>
            </form>
          </div>
        </div>

        {/* ------------------------------------------------------- */}
        {/* 3. MAP SECTION */}
        {/* ------------------------------------------------------- */}
        <div className="mt-12 rounded-3xl overflow-hidden shadow-lg h-96 border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3546.2613216332493!2d106.77247247451781!3d10.830715058191062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701a34a5d5f%3A0x30056b2fdf668565!2zQ2FvIMSQ4bqzbmcgQ8O0bmcgVGjGsMahbmcgVFAuSENN!5e1!3m2!1svi!2s!4v1766710646143!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
