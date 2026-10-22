import Link from "next/link";

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
            <li><Link href="/#flavors" className="hover:text-brand-vanilla">Bộ Sưu Tập 7 Vị</Link></li>
            <li><Link href="/blog" className="hover:text-brand-vanilla">Sau Lớp Vỏ (Blog)</Link></li>
            <li><Link href="/#custom" className="hover:text-brand-vanilla">Custom Box</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-brand-vanilla">Chính Sách</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>Cam kết thủ công 100%</li>
            <li>Bảo quản 10 phút vàng</li>
            <li>Giao hàng & Đóng gói quà</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-brand-vanilla">Kết Nối</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>TikTok: @treatsweet.macaron</li>
            <li>Fanpage: Treat Sweet Macaron</li>
            <li>Hotline: 0909 123 456</li>
            <li className="pt-2">
              <Link 
                href="/admin" 
                className="inline-flex items-center text-xs text-brand-vanilla/60 hover:text-brand transition-colors"
              >
                🔒 Trang Quản Trị (Admin)
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-400 text-xs mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center container mx-auto px-4">
        <span>© 2026 Treat Sweet Macaron. All rights reserved.</span>
        <Link href="/admin" className="text-gray-500 hover:text-brand text-xs mt-2 sm:mt-0 transition-colors">
          Cổng Đăng Nhập Quản Trị Viên
        </Link>
      </div>
    </footer>
  );
}
