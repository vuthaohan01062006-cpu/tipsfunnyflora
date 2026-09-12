import Link from "next/link";
import { Clock, Heart, Camera, Gift } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-tiffany-light/10 py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Hoa Tươi Mới 100% – Đặt Trước 4 Giờ, <span className="text-tiffany">Niềm Vui Nhân Đôi!</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Mỗi bông hoa nhập mới theo từng đơn đặt. Cam kết không hoa tồn kho, trọn vẹn từng khoảnh khắc.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products" className="bg-tiffany text-white px-8 py-3 rounded-full font-semibold hover:bg-tiffany-dark transition-colors">
              Xem Mẫu Bán Chạy
            </Link>
            <Link href="/collection/funny-special" className="bg-white text-tiffany border border-tiffany px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors">
              Khám Phá Bộ Sưu Tập Funny
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badge Bar */}
      <section className="border-y border-gray-100 bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center justify-center p-4">
              <Clock className="text-tiffany mb-3" size={32} />
              <h3 className="font-semibold text-gray-900 mb-1">Pre-order tối thiểu 4H</h3>
              <p className="text-sm text-gray-500">Nhập hoa mới 100% theo đơn, giữ hoa tươi lâu nhất.</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border-t md:border-t-0 md:border-l border-gray-100">
              <Heart className="text-tiffany mb-3" size={32} />
              <h3 className="font-semibold text-gray-900 mb-1">Thiệp viết tay theo yêu cầu</h3>
              <p className="text-sm text-gray-500">Hỗ trợ những câu chúc hài hước, độc lạ.</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border-t md:border-t-0 md:border-l border-gray-100">
              <Camera className="text-tiffany mb-3" size={32} />
              <h3 className="font-semibold text-gray-900 mb-1">Chụp hình xác nhận</h3>
              <p className="text-sm text-gray-500">Khách duyệt mẫu trước khi shipper xuất phát.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Category: Tips Funny Special */}
      <section className="py-20 px-4 bg-[#F9FAF8]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tips Funny Special</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những thiết kế độc bản kết hợp sắc màu Tiffany Blue, mang đến yếu tố bất ngờ và hài hước cho người nhận.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product Card 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="h-64 bg-gray-200 relative flex items-center justify-center">
                <Gift className="text-gray-400" size={48} />
              </div>
              <div className="p-6">
                <div className="text-tiffany text-xs font-bold tracking-wider mb-2 uppercase">Signature</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-tiffany transition-colors">Bó Hoa Ôm Gấu (Huggy Bloom)</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">Bó hoa tone pastel hoặc xanh Tiffany, ở trung tâm là một chú gấu bông mini đang ôm chặt bông hoa chính hoặc bảng thông điệp.</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-900">450.000đ</span>
                  <Link href="/products/huggy-bloom" className="text-tiffany font-medium hover:underline text-sm">Đặt ngay</Link>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="h-64 bg-gray-200 relative flex items-center justify-center">
                <Gift className="text-gray-400" size={48} />
              </div>
              <div className="p-6">
                <div className="text-tiffany text-xs font-bold tracking-wider mb-2 uppercase">Viral Marketing</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-tiffany transition-colors">Hộp Hoa Mù (Blind Box Flower)</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">Hộp hoa bí mật kết hợp một hộp quà mù (Blind box/Art toy) giấu khéo léo bên trong các tầng hoa tươi.</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-900">650.000đ</span>
                  <Link href="/products/blind-box-flower" className="text-tiffany font-medium hover:underline text-sm">Đặt ngay</Link>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="h-64 bg-gray-200 relative flex items-center justify-center">
                <Gift className="text-gray-400" size={48} />
              </div>
              <div className="p-6">
                <div className="text-tiffany text-xs font-bold tracking-wider mb-2 uppercase">Trending</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-tiffany transition-colors">Bó Hoa Tự Chữa Lành</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">Bó hoa nhỏ gọn đính kèm một chiếc lọ thủy tinh chứa 30 lá thư cuộn nhỏ (Mỗi lá thư là một câu quote hài hước / động viên).</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-900">250.000đ</span>
                  <Link href="/products/emergency-smile" className="text-tiffany font-medium hover:underline text-sm">Đặt ngay</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
