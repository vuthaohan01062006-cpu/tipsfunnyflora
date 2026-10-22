"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Coffee, Heart, Gift, BookOpen, Send, ShoppingCart, Check, ArrowRight, Eye, Sparkles } from "lucide-react";
import { INITIAL_PRODUCTS, Product, STORAGE_KEY } from "@/data/products";
import { DEFAULT_BANNER, BannerConfig, BANNER_STORAGE_KEY } from "@/data/banner";
import { DEFAULT_SITE_CONTENT, SiteContent, SITE_CONTENT_STORAGE_KEY } from "@/data/siteContent";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [banner, setBanner] = useState<BannerConfig>(DEFAULT_BANNER);
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);

  const { addToCart, setIsCartOpen } = useCart();
  const { language, t } = useLanguage();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const reloadFromStorage = () => {
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
                gallery: item.gallery && item.gallery.length > 0 ? item.gallery : (initial?.gallery || []),
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

      // Load site content (Blog, Custom Box, About, Contact)
      try {
        const savedContent = localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
        if (savedContent) {
          const parsed = JSON.parse(savedContent);
          setSiteContent({
            blogs: parsed.blogs || DEFAULT_SITE_CONTENT.blogs,
            customBox: parsed.customBox || DEFAULT_SITE_CONTENT.customBox,
            about: parsed.about || DEFAULT_SITE_CONTENT.about,
            contact: parsed.contact || DEFAULT_SITE_CONTENT.contact,
          });
        }
      } catch {
        // fallback
      }
    };

    reloadFromStorage();

    // Instant real-time sync across tabs: When Admin updates in Tab A, Tab B updates immediately!
    window.addEventListener("storage", reloadFromStorage);
    return () => window.removeEventListener("storage", reloadFromStorage);
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
                          {flavor.price || "35.000đ"} {flavor.priceUnit ? `/ ${flavor.priceUnit}` : ""}
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

      {/* Banner Bộ Sưu Tập Theo Mùa - Seasonal Specials */}
      <section className="py-14 px-4 bg-gradient-to-r from-[#FCEAD2] via-[#FFF8F0] to-[#FCEAD2] border-y border-amber-200/50">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} className="text-amber-600" />
              <span>Seasonal Limited Edition</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-brand-choco font-serif leading-tight">
              Sản Phẩm Theo Mùa (Seasonal)
            </h2>
            <p className="text-sm md:text-base text-gray-700 mt-3 leading-relaxed">
              Những nốt hương bánh ngọt giới hạn theo từng khoảnh khắc giao mùa: Bí Ngô Quế Gừng mùa thu, Bạc Hà Tuyết giáng sinh, Dâu Tây Champagne và Hạt Dẻ Nướng mật ong.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                href="/seasonal"
                className="bg-brand hover:bg-brand-dark text-white font-bold text-xs md:text-sm px-6 py-3 rounded-full shadow-md transition-all flex items-center gap-2 hover:scale-105 cursor-pointer"
              >
                <span>Khám Phá BST Theo Mùa</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Quick mini grid of seasonal previews */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md w-full">
            <Link href="/seasonal/seasonal-1" className="bg-white/95 p-3 rounded-2xl border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-3 group">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-amber-100 shrink-0">
                <img src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80" alt="Mùa Thu" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Mùa Thu 🍂</span>
                <h4 className="text-xs font-bold text-brand-choco font-serif truncate mt-1">Bí Ngô Quế Gừng</h4>
                <span className="text-xs font-black text-red-600 font-sans">42.000đ</span>
              </div>
            </Link>

            <Link href="/seasonal/seasonal-2" className="bg-white/95 p-3 rounded-2xl border border-teal-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-3 group">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-teal-100 shrink-0">
                <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80" alt="Giáng Sinh" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">Giáng Sinh 🎄</span>
                <h4 className="text-xs font-bold text-brand-choco font-serif truncate mt-1">Bạc Hà Tuyết</h4>
                <span className="text-xs font-black text-red-600 font-sans">42.000đ</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Sau Lớp Vỏ (Blog Snippets) - Dynamic from SiteContent */}
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
            {siteContent.blogs.slice(0, 2).map((b) => (
              <div key={b.id} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <span className="text-xs font-bold text-brand uppercase tracking-wider">{b.category}</span>
                  <h3 className="text-xl font-bold text-brand-choco mt-2 mb-3 font-serif group-hover:text-brand transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-brand-choco/70 text-sm leading-relaxed mb-6 line-clamp-3">
                    {b.excerpt}
                  </p>
                </div>
                <Link href="/blog" className="text-sm font-semibold text-brand-choco hover:text-brand flex items-center gap-1">
                  Đọc tiếp &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Gift Box - Dynamic from SiteContent */}
      <section id="custom" className="py-20 px-4 bg-[#FFFCF9]">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block p-4 rounded-full bg-brand-vanilla mb-6">
            <Gift className="text-brand" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-choco mb-4 font-serif">
            {siteContent.customBox.title}
          </h2>
          <p className="text-brand-choco/80 text-base md:text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            {siteContent.customBox.subtitle}
          </p>
          
          {/* Price Badges for 6 & 12 box */}
          <div className="flex justify-center gap-4 mb-8">
            <span className="bg-white border border-brand/20 px-4 py-2 rounded-2xl text-xs md:text-sm font-bold text-brand-choco shadow-xs">
              Hộp 6 vị: <span className="text-brand">{siteContent.customBox.box6Price}</span>
            </span>
            <span className="bg-white border border-brand/20 px-4 py-2 rounded-2xl text-xs md:text-sm font-bold text-brand-choco shadow-xs">
              Hộp 12 vị: <span className="text-brand">{siteContent.customBox.box12Price}</span> (Freeship)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-brand text-white px-8 py-3.5 rounded-full font-bold hover:bg-brand-dark transition-colors shadow-sm cursor-pointer"
            >
              Mở giỏ hàng & Chọn vị bánh
            </button>
            <a 
              href={siteContent.customBox.zaloLink || "https://zalo.me/0909123456"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-brand-choco border border-brand-choco/20 px-8 py-3.5 rounded-full font-bold hover:bg-brand-choco hover:text-white transition-colors cursor-pointer"
            >
              Nhắn Zalo đặt hộp quà riêng
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
