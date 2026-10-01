export default function Footer() {
  return (
    <footer className="bg-brand-choco text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-brand-vanilla mb-4">Treat Sweet Macaron</h3>
          <p className="text-gray-200 text-sm italic">"Small Treat, Sweet Day"</p>
          <p className="text-gray-300 text-sm mt-2">Gói ghém hương vị thủ công chuẩn Pháp trên tay bạn.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-brand-vanilla">Khám Phá</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>Bộ Sưu Tập 7 Vị</li>
            <li>Sau Lớp Vỏ (Blog)</li>
            <li>Custom Box</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-brand-vanilla">Chính Sách</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>Cam kết thủ công</li>
            <li>Bảo quản 10 phút vàng</li>
            <li>Giao hàng & Đóng gói</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-brand-vanilla">Kết Nối</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>TikTok: @treatsweet.macaron</li>
            <li>Fanpage: Treat Sweet Macaron</li>
            <li>Hotline: 0909 123 456</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm mt-12 border-t border-white/10 pt-6">
        © 2026 Treat Sweet Macaron. All rights reserved.
      </div>
    </footer>
  );
}
