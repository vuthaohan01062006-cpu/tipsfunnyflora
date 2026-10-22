"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Coffee, Heart, Gift, BookOpen, Send, ShoppingCart } from "lucide-react";
import { INITIAL_PRODUCTS, Product, STORAGE_KEY } from "@/data/products";

export default function Home() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-8 pb-16 px-4 bg-[#FFFCF9]">
        <div className="container mx-auto max-w-6xl">
          {/* Macaron Banner Image */}
          <div className="w-full mb-16 rounded-[2rem] overflow-hidden shadow-sm">
            <img src="/hero-macaron.png" alt="Treat Sweet Macaron Banner" className="w-full h-auto object-cover" />
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-choco mb-6 leading-tight font-serif">
              Small Treat, <span className="text-brand text-6xl">Sweet Day</span>
            </h1>
            <p className="text-lg text-brand-choco/80 mb-10 max-w-2xl mx-auto">
              Phần thưởng ngọt ngào xoa dịu những nhọc nhằn, gói ghém hương vị thủ công chuẩn Pháp trên tay bạn.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#flavors" className="bg-brand text-white px-8 py-3 rounded-full font-medium hover:bg-brand-dark transition-colors shadow-sm">
                Khám phá 7 nốt hương vị
              </Link>
              <Link href="#custom" className="bg-white text-brand-choco border border-brand-choco/20 px-8 py-3 rounded-full font-medium hover:bg-brand-choco hover:text-white transition-colors">
                Đặt hộp quà custom
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bộ Sưu Tập 7 Vị Bánh (Hiển thị ảnh Canva sắc nét 100%) */}
      <section id="flavors" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-choco mb-4 font-serif">Bộ Sưu Tập Hương Vị</h2>
            <p className="text-brand-choco/60 max-w-xl mx-auto">Mỗi vị bánh là một lời nhắn nhủ, một cảm xúc được nâng niu. Hãy chọn cho mình một nốt hương đồng điệu.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((flavor) => {
              const hasImage = Boolean(flavor.image);

              return (
                <div 
                  key={flavor.id} 
                  className={`${flavor.color} rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group relative flex flex-col justify-between`}
                >
                  {hasImage ? (
                    /* Khi có ảnh Canva: Hiển thị 100% sắc nét, chuẩn tỉ lệ, không bị mờ đục hay đè chữ */
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-white">
                      <img 
                        src={flavor.image} 
                        alt={flavor.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      {/* Nút giỏ hàng nổi góc dưới */}
                      <button 
                        className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-brand-choco hover:bg-brand hover:text-white flex items-center justify-center transition-all shadow-md group-hover:scale-110"
                        title="Thêm vào giỏ hàng"
                        onClick={() => alert(`Đã thêm "${flavor.name}" vào giỏ hàng!`)}
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  ) : (
                    /* Khi chưa tải ảnh: Thẻ màu pastel thanh lịch */
                    <div className="p-8 flex flex-col justify-between h-64">
                      <div>
                        <h3 className={`text-xl font-bold ${flavor.textColor || 'text-brand-choco'} mb-3`}>
                          {flavor.name}
                        </h3>
                        <p className={`${flavor.textColor ? 'text-white/80' : 'text-brand-choco/70'} text-sm leading-relaxed`}>
                          {flavor.desc}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <button 
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            flavor.textColor ? 'bg-white/20 text-white' : 'bg-white/50 text-brand-choco'
                          } group-hover:scale-110 transition-transform`}
                          title="Thêm vào giỏ hàng"
                          onClick={() => alert(`Đã thêm "${flavor.name}" vào giỏ hàng!`)}
                        >
                          <ShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sau Lớp Vỏ (Blog Snippets) */}
      <section className="py-20 px-4 bg-brand-taro/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-brand-choco mb-4 font-serif">Sau Lớp Vỏ</h2>
              <p className="text-brand-choco/60">Những câu chuyện mộc mạc phía sau kỹ thuật làm bánh thủ công chuẩn Pháp.</p>
            </div>
            <Link href="/blog" className="text-brand font-medium hover:underline mt-4 md:mt-0 flex items-center">
              Xem tất cả bài viết <BookOpen size={16} className="ml-2"/>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6">
              <span className="text-brand text-xs font-bold tracking-wider mb-2 block uppercase">Sự thật / Kỹ thuật</span>
              <h3 className="text-lg font-bold text-brand-choco mb-3">Vì sao macaron có giá thành tương đương một ly cà phê đặc sản?</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-3">Cùng giải mã việc sử dụng 100% bột hạnh nhân nguyên chất thay vì pha trộn, và kỹ thuật tạo chân bánh (pied) đỏng đảnh của nghệ nhân...</p>
              <Link href="#" className="text-brand-choco text-sm font-medium hover:text-brand">Đọc tiếp &rarr;</Link>
            </article>
            <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6">
              <span className="text-brand text-xs font-bold tracking-wider mb-2 block uppercase">Hương vị</span>
              <h3 className="text-lg font-bold text-brand-choco mb-3">Phá bỏ hiểu lầm bánh ngọt gắt: Bí quyết cân bằng vị với ganache</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-3">Macaron không hề gắt nếu phần nhân được làm từ ganache mộc bản thay vì kem bơ béo ngậy. Sự cân bằng độ chua - đắng - ngọt...</p>
              <Link href="#" className="text-brand-choco text-sm font-medium hover:text-brand">Đọc tiếp &rarr;</Link>
            </article>
            <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6">
              <span className="text-brand text-xs font-bold tracking-wider mb-2 block uppercase">Trải nghiệm</span>
              <h3 className="text-lg font-bold text-brand-choco mb-3">Quy tắc 10 phút vàng: Cách bảo quản và thưởng thức macaron trọn vị</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-3">Để vỏ bánh giòn tan và nhân lạnh tan chảy hoàn hảo trên đầu lưỡi, hãy để bánh nghỉ 10 phút sau khi lấy khỏi tủ lạnh...</p>
              <Link href="#" className="text-brand-choco text-sm font-medium hover:text-brand">Đọc tiếp &rarr;</Link>
            </article>
          </div>
        </div>
      </section>

      {/* Custom & Gift Box (Campaign Together) */}
      <section id="custom" className="py-20 px-4 bg-brand-choco text-brand-vanilla">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 font-serif">Custom & Gift Box</h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                Biến những chiếc bánh thành món quà thay lời muốn nói. Chúng tôi cung cấp dịch vụ vẽ hình hoạt hình, ghi thông điệp lên vỏ bánh, hoặc thiết kế set quà tặng thiết kế riêng cho những dịp đặc biệt.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Heart className="text-brand shrink-0 mr-3 mt-1" size={20} />
                  <span><strong>Hộp quà tỏ tình "Be Your Mind":</strong> Thiết kế mix màu theo tone lãng mạn.</span>
                </li>
                <li className="flex items-start">
                  <Gift className="text-brand shrink-0 mr-3 mt-1" size={20} />
                  <span><strong>Macaron vẽ hình:</strong> Vẽ nhân vật hoạt hình hoặc chibi bằng tay.</span>
                </li>
                <li className="flex items-start">
                  <Coffee className="text-brand shrink-0 mr-3 mt-1" size={20} />
                  <span><strong>Combo Tea & Macaron:</strong> Gói ghém cùng trà Anh cao cấp cho cuối tuần thư giãn.</span>
                </li>
              </ul>
            </div>
            
            {/* Form */}
            <div className="bg-white p-8 rounded-3xl shadow-xl text-brand-choco">
              <h3 className="text-2xl font-bold mb-6 text-center">Gửi Yêu Cầu Đặt Quà</h3>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert("Cảm ơn bạn! Tiệm sẽ liên hệ tư vấn trong ít phút."); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tên của bạn</label>
                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Chọn gói quà</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand">
                    <option>Hộp quà tỏ tình "Be Your Mind"</option>
                    <option>Hộp 6 bánh Macaron vẽ hình custom</option>
                    <option>Combo Tea & Macaron cao cấp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Lời nhắn đính kèm thiệp</label>
                  <textarea rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand resize-none" placeholder="Những lời yêu thương..."></textarea>
                </div>
                <button type="submit" className="w-full bg-brand text-white font-bold py-3 rounded-xl hover:bg-brand-dark transition-colors flex justify-center items-center">
                  Gửi yêu cầu tư vấn <Send size={18} className="ml-2" />
                </button>
                <p className="text-xs text-center text-gray-500 mt-2">Hoặc inbox trực tiếp qua Fanpage để được hỗ trợ nhanh nhất.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
