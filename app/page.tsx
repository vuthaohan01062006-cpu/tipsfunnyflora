"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Coffee, Heart, Gift, BookOpen, Send, ShoppingCart, Check, ArrowRight, Eye } from "lucide-react";
import { INITIAL_PRODUCTS, Product, STORAGE_KEY } from "@/data/products";
import { DEFAULT_BANNER, BannerConfig, BANNER_STORAGE_KEY } from "@/data/banner";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [banner, setBanner] = useState<BannerConfig>(DEFAULT_BANNER);

  const { addToCart, setIsCartOpen } = useCart();
  const { language, t } = useLanguage();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load products with fallback merge
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = parsed.map((item: any) => {
            const initial = INITIAL_PRODUCTS.find(p => String(p.id) === String(item.id));
            return {
              ...initial,
              ...item,
              image: item.image || initial?.image || "",
              gallery: item.gallery || initial?.gallery || [],
              ingredients: item.ingredients || initial?.ingredients || "",
              structure: item.structure || initial?.structure || [],
              fullDesc: item.fullDesc || initial?.fullDesc || item.desc || initial?.desc || "",
            };
          });
          setProducts(merged);
        }
      }
    } catch {
      // fallback
    }

    // Load banner
    try {
      const savedBanner = localStorage.getItem(BANNER_STORAGE_KEY);
      if (savedBanner) {
        setBanner(JSON.parse(savedBanner));
      }
    } catch {
      // fallback
    }
  }, []);

  const handleAddToCart = (flavor: Product, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addToCart(flavor, 1);
    setToastMessage(`Đã thêm "${flavor.name}" vào giỏ hàng!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-choco text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-brand/30 animate-slideUp">
          <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center shrink-0">
            <Check size={16} className="text-white" />
          </div>
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="ml-2 text-xs font-bold text-brand hover:underline flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl hover:bg-white/20 transition-colors"
          >
            {t("flavors.viewCartNow")} <ArrowRight size={13} />
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-8 pb-16 px-4 bg-[#FFFCF9]">
        <div className="container mx-auto max-w-6xl">
          {/* Macaron Banner Image */}
          <div className="w-full mb-16 rounded-[2rem] overflow-hidden shadow-sm bg-brand-vanilla/30">
            <img 
              src={banner.imageUrl || "/hero-macaron.png"} 
              alt="Treat Sweet Macaron Banner" 
              className="w-full h-auto object-cover max-h-[500px]" 
            />
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-choco mb-6 leading-tight font-serif">
              {banner.title || t("hero.title")}{" "}
              <span className="text-brand text-6xl">
                {banner.highlightText || t("hero.highlight")}
              </span>
            </h1>
            <p className="text-lg text-brand-choco/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              {banner.subtitle || t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href={banner.buttonLink1 || "#flavors"} 
                className="bg-brand text-white px-8 py-3.5 rounded-full font-bold hover:bg-brand-dark transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                {banner.buttonText1 || t("hero.btnFlavors")}
              </Link>
              <Link 
                href={banner.buttonLink2 || "#custom"} 
                className="bg-white text-brand-choco border border-brand-choco/20 px-8 py-3.5 rounded-full font-bold hover:bg-brand-choco hover:text-white transition-all cursor-pointer"
              >
                {banner.buttonText2 || t("hero.btnCustom")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bộ Sưu Tập 7 Vị Bánh */}
      <section id="flavors" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-choco mb-4 font-serif">
              {t("flavors.sectionTitle")}
            </h2>
            <p className="text-brand-choco/70 max-w-xl mx-auto">
              {t("flavors.sectionSubtitle")}
            </p>
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
                    /* Khi có ảnh: Bấm vào ảnh chuyển thẳng đến trang Chi Tiết Sản Phẩm chuẩn theo ảnh mẫu */
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-white">
                      <Link 
                        href={`/products/${flavor.id}`}
                        className="block w-full h-full cursor-pointer"
                      >
                        <img 
                          src={flavor.image} 
                          alt={flavor.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </Link>

                      {/* Nút Xem chi tiết nhanh khi hover */}
                      <Link
                        href={`/products/${flavor.id}`}
                        className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-brand-choco text-xs font-bold px-3 py-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:text-brand"
                      >
                        <Eye size={13} /> {t("flavors.viewDetail")}
                      </Link>

                      {/* Nút giỏ hàng nổi góc dưới */}
                      <button 
                        className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md text-brand-choco hover:bg-brand hover:text-white flex items-center justify-center transition-all shadow-lg group-hover:scale-110 active:scale-95 cursor-pointer z-10"
                        title="Thêm vào giỏ hàng"
                        onClick={(e) => handleAddToCart(flavor, e)}
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  ) : (
                    /* Khi chưa có ảnh: Thẻ màu pastel */
                    <div className="p-8 flex flex-col justify-between h-64">
                      <Link href={`/products/${flavor.id}`} className="group-hover:opacity-90 transition-opacity cursor-pointer">
                        <h3 className={`text-xl font-bold ${flavor.textColor || 'text-brand-choco'} mb-3 font-serif`}>
                          {flavor.name}
                        </h3>
                        <p className={`${flavor.textColor ? 'text-white/80' : 'text-brand-choco/70'} text-sm leading-relaxed line-clamp-3`}>
                          {flavor.desc}
                        </p>
                      </Link>
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-brand-choco">
                          {flavor.price || "35.000đ"}
                        </span>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/products/${flavor.id}`}
                            className="text-xs font-semibold underline text-brand-choco/70 hover:text-brand cursor-pointer"
                          >
                            {t("flavors.viewDetail")}
                          </Link>
                          <button 
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              flavor.textColor ? 'bg-white/20 text-white' : 'bg-white/50 text-brand-choco'
                            } group-hover:scale-110 transition-transform active:scale-95 shadow-sm cursor-pointer z-10`}
                            title="Thêm vào giỏ hàng"
                            onClick={(e) => handleAddToCart(flavor, e)}
                          >
                            <ShoppingCart size={18} />
                          </button>
                        </div>
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
              Xem tất cả bài viết &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs font-bold text-brand uppercase tracking-wider">Kỹ thuật & Cảm xúc</span>
              <h3 className="text-xl font-bold text-brand-choco mt-2 mb-3 font-serif">Bí mật của chiếc viền chân ren (Pied) hoàn hảo</h3>
              <p className="text-brand-choco/70 text-sm leading-relaxed mb-6">
                Chân ren không chỉ là dấu hiệu của một chiếc macaron đạt chuẩn kỹ thuật, mà còn là kết tinh của sự kiên nhẫn khi hong khô vỏ bánh dưới nhiệt độ và độ ẩm khắt khe.
              </p>
              <Link href="/blog" className="text-sm font-semibold text-brand-choco hover:text-brand">Đọc tiếp &rarr;</Link>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs font-bold text-brand uppercase tracking-wider">Nguyên liệu</span>
              <h3 className="text-xl font-bold text-brand-choco mt-2 mb-3 font-serif">Hành trình tìm kiếm quả Vani Bourbon Madagascar</h3>
              <p className="text-brand-choco/70 text-sm leading-relaxed mb-6">
                Tại sao chúng mình từ chối hương liệu vani nhân tạo để theo đuổi những quả vani đen bóng được thụ phấn thủ công từ bờ bên kia Ấn Độ Dương?
              </p>
              <Link href="/blog" className="text-sm font-semibold text-brand-choco hover:text-brand">Đọc tiếp &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Gift Box */}
      <section id="custom" className="py-20 px-4 bg-[#FFFCF9]">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block p-4 rounded-full bg-brand-vanilla mb-6">
            <Gift className="text-brand" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-choco mb-6 font-serif">Tự Tay Mix Hộp Quà Theo Cảm Xúc</h2>
          <p className="text-brand-choco/80 text-lg mb-8 max-w-2xl mx-auto">
            Dành tặng bản thân hoặc người thương một hộp macaron mang thông điệp riêng. Chọn 6 hoặc 12 nốt hương bạn yêu thích kèm thiệp viết tay nắn nót.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-brand text-white px-8 py-3.5 rounded-full font-bold hover:bg-brand-dark transition-colors shadow-sm cursor-pointer"
            >
              Mở giỏ hàng & Mix vị bánh
            </button>
            <a 
              href="https://zalo.me/0909123456" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-brand-choco border border-brand-choco/20 px-8 py-3.5 rounded-full font-bold hover:bg-brand-choco hover:text-white transition-colors"
            >
              Nhắn tin đặt hộp thiết kế riêng
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
