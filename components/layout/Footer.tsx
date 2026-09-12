export default function Footer() {
  return (
    <footer className="bg-[#2D3748] text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-tiffany mb-4">Tips Funny Flora</h3>
          <p className="text-gray-300 text-sm">Hoa Tươi Mới 100% – Đặt Trước 4 Giờ, Niềm Vui Nhân Đôi!</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Danh Mục</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>Bán Chạy Nhất</li>
            <li>Hộp Hoa</li>
            <li>Bó Hoa</li>
            <li>Hoa Theo Tone Màu</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Chính Sách</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>Chính Sách Pre-order 4H</li>
            <li>Hướng Dẫn Mua Hàng</li>
            <li>Bảo Mật Thông Tin</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Liên Hệ</h4>
          <p className="text-gray-300 text-sm">Hotline: 0123 456 789</p>
          <p className="text-gray-300 text-sm mt-2">Email: hello@tipsfunnyflora.com</p>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm mt-12 border-t border-gray-600 pt-6">
        © 2026 Tips Funny Flora. All rights reserved.
      </div>
    </footer>
  );
}
