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

  // Hàm xử lý khi bấm Gửi (Giả lập)
  const onSubmit = (data) => {
    console.log("Dữ liệu liên hệ:", data);
    // Vì chưa có API liên hệ, ta giả vờ gửi thành công sau 1 giây
    setTimeout(() => {
      toast.success("Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất.");
      reset(); // Xóa trắng form
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header Trang */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 uppercase mb-3">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Mọi thắc mắc hoặc đóng góp ý kiến, quý khách vui lòng liên hệ theo
            thông tin dưới đây. Chúng tôi luôn sẵn sàng hỗ trợ 24/7.
          </p>
          <div className="w-24 h-1 bg-orange-600 mx-auto mt-6 rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* CỘT TRÁI: THÔNG TIN LIÊN HỆ */}
          <div className="lg:col-span-1 space-y-6">
            {/* Card 1: Địa chỉ */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-orange-600">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
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
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    Địa chỉ trụ sở
                  </h3>
                  <p className="text-gray-600 text-sm">
                    123 Đường Lê Lợi, Quận 1,
                    <br />
                    TP. Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Hotline */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-orange-600">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
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
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    Tổng đài đặt vé
                  </h3>
                  <p className="text-orange-600 font-bold text-xl">1900 1234</p>
                  <p className="text-gray-500 text-xs">Hỗ trợ 24/7</p>
                </div>
              </div>
            </div>

            {/* Card 3: Email */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-orange-600">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
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
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    Email hỗ trợ
                  </h3>
                  <p className="text-gray-600 text-sm">hotro@busvip.vn</p>
                  <p className="text-gray-600 text-sm">cskh@busvip.vn</p>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: FORM LIÊN HỆ */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition"
                    placeholder="Nguyễn Văn A"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">
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
                    type="email"
                    {...register("email", { required: "Vui lòng nhập email" })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition"
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Số điện thoại */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    {...register("phone", {
                      required: "Vui lòng nhập số điện thoại",
                    })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition"
                    placeholder="0909..."
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs">
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition"
                    placeholder="Vấn đề cần hỗ trợ"
                  />
                  {errors.subject && (
                    <span className="text-red-500 text-xs">
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
                  rows="4"
                  {...register("message", {
                    required: "Vui lòng nhập nội dung",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition"
                  placeholder="Nhập nội dung bạn cần hỗ trợ..."
                ></textarea>
                {errors.message && (
                  <span className="text-red-500 text-xs">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Button Gửi */}
              <button
                type="submit"
                className="w-full bg-orange-600 text-white font-bold py-4 rounded-lg hover:bg-orange-700 transition shadow-lg transform active:scale-95"
              >
                GỬI TIN NHẮN
              </button>
            </form>
          </div>
        </div>

        {/* MAP SECTION */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-orange-600 pl-3">
            Bản đồ chỉ đường
          </h2>
          <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
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
    </div>
  );
};

export default ContactPage;
