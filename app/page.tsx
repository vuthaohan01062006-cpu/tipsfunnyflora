"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Coffee, Heart, Gift, BookOpen, Send, ShoppingCart, Sparkles } from "lucide-react";
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
      // fallback to initial
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-vanilla py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-brand-taro rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-1.5 rounded-full text-xs font-bold text-brand mb-6 shadow-sm">
            <Sparkles size={14} /> Tiệm bánh Macaron chuẩn vị Pháp thủ công
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-choco mb-6 leading-tight font-serif">
            Small Treat, <span className="text-brand text-6xl">Sweet Day</span>
          </h1>
          <p className="text-lg text-brand-choco/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Phần thưởng ngọt ngào xoa dịu những nhọc nhằn, gói ghém hương vị thủ công chuẩn Pháp trên tay bạn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#flavors" className="bg-brand text-white px-8 py-3 rounded-full font-medium hover:bg-brand-dark transition-colors shadow-sm">
              Khám phá hương vị bánh
            </Link>
            <Link href="#custom" className="bg-white text-brand-choco border border-brand-choco/20 px-8 py-3 rounded-full font-medium hover:bg-brand-choco hover:text-white transition-colors">
              Đặt hộp quà custom
            </Link>
          </div>
        </div>
      </section>

      {/* Bộ Sưu Tập Hương Vị (Hình ảnh & Sản phẩm thật) */}
      <section id="flavors" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-choco mb-4 font-serif">Bộ Sưu Tập Hương Vị</h2>
            <p className="text-brand-choco/60 max-w-xl mx-auto">
              Mỗi vị bánh là một lời nhắn nhủ, một cảm xúc được nâng niu. Hãy chọn cho mình một nốt hương đồng điệu.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((flavor) => (
              <div 
                key={flavor.id} 
                className="bg-white rounded-3xl overflow-hidden border border-brand-vanilla shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Hình ảnh bánh Macaron */}
                <div className="relative aspect-square overflow-hidden bg-brand-vanilla/40">
                  <img 
                    src={flavor.image || "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"} 
                    alt={flavor.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {flavor.price && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-choco shadow-sm">
                      {flavor.price}
                    </div>
                  )}
                  {flavor.category && (
                    <div className="absolute bottom-3 left-3 bg-brand-choco/80 text-white backdrop-blur-sm px-2.5 py-0.5 rounded-md text-[11px] font-medium">
                      {flavor.category}
                    </div>
                  )}
                </div>

                {/* Thông tin hương vị */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-brand-choco mb-2 group-hover:text-brand transition-colors">
                      {flavor.name}
                    </h3>
                    <p className="text-brand-choco/70 text-xs leading-relaxed line-clamp-2">
                      {flavor.desc}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-brand-vanilla flex items-center justify-between">
                    <span className="text-xs text-brand font-semibold">100% Thủ công</span>
                    <button 
                      className="w-9 h-9 rounded-full bg-brand-vanilla text-brand-choco hover:bg-brand hover:text-white flex items-center justify-center transition-colors shadow-sm"
                      title="Chọn mua"
                      onClick={() => alert(`Đã thêm "${flavor.name}" vào giỏ hàng!`)}
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Họ và tên" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand" placeholder="090..." />
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
