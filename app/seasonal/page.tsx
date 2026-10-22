"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ShoppingCart, 
  Eye, 
  Check, 
  Calendar, 
  Clock, 
  Heart, 
  ArrowRight,
  Filter
} from "lucide-react";
import { 
  INITIAL_SEASONAL_PRODUCTS, 
  SeasonalProduct, 
  SEASONAL_STORAGE_KEY 
} from "@/data/seasonalProducts";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function SeasonalPage() {
  const [products, setProducts] = useState<SeasonalProduct[]>(INITIAL_SEASONAL_PRODUCTS);
  const [activeSeason, setActiveSeason] = useState<string>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { addToCart, setIsCartOpen } = useCart();
  const { language, t } = useLanguage();

  useEffect(() => {
    const reloadSeasonal = () => {
      try {
        const saved = localStorage.getItem(SEASONAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Merge with initial products to retain rich details if missing
            const merged = parsed.map((item: any) => {
              const initial = INITIAL_SEASONAL_PRODUCTS.find(p => String(p.id) === String(item.id));
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
    };

    reloadSeasonal();

    window.addEventListener("storage", reloadSeasonal);
    window.addEventListener("focus", reloadSeasonal);
    document.addEventListener("visibilitychange", reloadSeasonal);
    return () => {
      window.removeEventListener("storage", reloadSeasonal);
      window.removeEventListener("focus", reloadSeasonal);
      document.removeEventListener("visibilitychange", reloadSeasonal);
    };
  }, []);

  // Filter seasons
  const seasonsList = ["all", "Mùa Thu", "Giáng Sinh", "Valentine", "Mùa Đông"];

  const filteredProducts = activeSeason === "all"
    ? products
    : products.filter(p => (p.category && p.category.includes(activeSeason)) || (p.seasonTag && p.seasonTag.includes(activeSeason)));

  const handleAddToCart = (flavor: SeasonalProduct, e?: React.MouseEvent) => {
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
    <div className="min-h-screen bg-[#FFFDF9] pb-24">
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
            {t("flavors.viewCartNow") || "Xem giỏ hàng"}
          </button>
        </div>
      )}

      {/* Top Breadcrumb Bar */}
      <div className="bg-[#FFFFF0] border-b border-[#fafc97] py-3.5 px-4 shadow-2xs">
        <div className="container mx-auto flex items-center text-xs text-gray-700 space-x-2">
          <Link href="/" className="hover:text-brand font-medium transition-colors">
            {t("detail.breadcrumbHome") || "Trang chủ"}
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/#flavors" className="hover:text-brand font-medium transition-colors">
            {t("nav.menu") || "Menu / Sản phẩm"}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-brand-choco font-bold flex items-center gap-1">
            <Sparkles size={13} className="text-amber-600" />
            <span>Sản Phẩm Theo Mùa (Seasonal)</span>
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-14 bg-gradient-to-b from-[#FCEAD2]/40 via-[#FFFDF9] to-[#FFFDF9] border-b border-orange-100/60">
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 text-xs font-bold uppercase tracking-wider mb-5 shadow-xs animate-fadeIn">
            <Sparkles size={14} className="text-amber-600 animate-spin" style={{ animationDuration: "8s" }} />
            <span>Seasonal Limited Collection</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-choco font-serif tracking-tight leading-tight">
            Bộ Sưu Tập <span className="text-brand">Theo Mùa</span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Những nốt hương bánh ngọt phiên bản giới hạn, đánh thức xúc cảm trong từng thời khắc chuyển mùa của đất trời. Mỗi mẻ bánh là một câu chuyện riêng được thợ bánh ấp ủ tỉ mỉ.
          </p>

          {/* Quick Notice Pill */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white/90 backdrop-blur-xs px-5 py-2.5 rounded-2xl border border-amber-200/70 shadow-xs text-xs text-brand-choco">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-medium">
              Sản phẩm theo mùa mở bán với số lượng giới hạn mỗi ngày để đảm bảo độ tươi mới tuyệt đối.
            </span>
          </div>
        </div>
      </section>

      {/* Filter Tabs by Season */}
      <section className="container mx-auto px-4 pt-10 pb-6">
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
          {seasonsList.map(season => {
            const isSelected = activeSeason === season;
            const label = season === "all" ? "Tất cả các mùa" : season;
            return (
              <button
                key={season}
                onClick={() => setActiveSeason(season)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected 
                    ? "bg-brand text-white shadow-md scale-105" 
                    : "bg-white text-brand-choco border border-gray-200/80 hover:bg-brand-vanilla hover:border-brand/40"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 max-w-lg mx-auto">
            <Sparkles size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-bold text-gray-700">Chưa có bánh cho mùa này</h3>
            <p className="text-sm text-gray-500 mt-1">Quản trị viên có thể thêm sản phẩm theo mùa mới trong trang Quản trị.</p>
            <Link 
              href="/admin" 
              className="inline-block mt-4 text-xs font-bold text-brand bg-brand-vanilla px-4 py-2 rounded-xl hover:bg-brand hover:text-white transition-all"
            >
              Vào trang quản trị →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 max-w-7xl mx-auto">
            {filteredProducts.map((flavor) => (
              <div 
                key={flavor.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-orange-100 flex flex-col hover:-translate-y-1.5"
              >
                {/* Product Card Top: Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
                  <span className="bg-amber-800/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs shadow-xs flex items-center gap-1">
                    <Sparkles size={11} className="text-amber-300" />
                    <span>{flavor.seasonTag}</span>
                  </span>

                  {flavor.isNew && (
                    <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      Mới
                    </span>
                  )}
                </div>

                {/* Image Wrapper */}
                <div className={`relative aspect-square ${flavor.color || "bg-amber-50"} overflow-hidden`}>
                  <Link 
                    href={`/seasonal/${flavor.id}`}
                    className="block w-full h-full cursor-pointer"
                  >
                    <img 
                      src={flavor.image || "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=85"} 
                      alt={flavor.name}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                  </Link>

                  {/* Nút Xem chi tiết nhanh khi hover */}
                  <Link
                    href={`/seasonal/${flavor.id}`}
                    className="absolute bottom-3.5 left-3.5 bg-white/95 backdrop-blur-xs text-brand-choco text-xs font-bold px-3 py-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:text-brand z-10"
                  >
                    <Eye size={13} /> {t("flavors.viewDetail") || "Xem chi tiết"}
                  </Link>

                  {/* Nút giỏ hàng nổi góc dưới */}
                  <button 
                    className="absolute bottom-3.5 right-3.5 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md text-brand-choco hover:bg-brand hover:text-white flex items-center justify-center transition-all shadow-lg group-hover:scale-110 active:scale-95 cursor-pointer z-10"
                    title="Thêm vào giỏ hàng"
                    onClick={(e) => handleAddToCart(flavor, e)}
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col flex-grow bg-white">
                  <Link href={`/seasonal/${flavor.id}`} className="block group-hover:text-brand transition-colors">
                    <h3 className="font-bold text-lg text-brand-choco font-serif line-clamp-1 leading-snug">
                      {flavor.name}
                    </h3>
                  </Link>

                  <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 leading-relaxed flex-grow">
                    {flavor.desc}
                  </p>

                  {/* Price Row */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black text-red-600 font-sans tracking-tight">
                          {flavor.price || "42.000đ"}
                        </span>
                        {flavor.priceUnit && (
                          <span className="text-[11px] font-bold text-gray-600">
                            / {flavor.priceUnit}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 block -mt-0.5">
                        (Chưa bao gồm VAT)
                      </span>
                    </div>

                    <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                      Theo mùa
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                      href={`/seasonal/${flavor.id}`}
                      className="py-2.5 px-3 rounded-xl border border-brand/30 text-brand text-xs font-bold text-center hover:bg-brand hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye size={13} />
                      <span>Chi tiết</span>
                    </Link>

                    <button
                      onClick={(e) => handleAddToCart(flavor, e)}
                      className="py-2.5 px-3 rounded-xl bg-brand text-white text-xs font-bold text-center hover:bg-brand-dark transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs active:scale-95"
                    >
                      <ShoppingCart size={13} />
                      <span>{t("flavors.addToCart") || "Thêm giỏ"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA / Custom Box Link */}
      <section className="container mx-auto px-4 mt-16 max-w-5xl">
        <div className="bg-gradient-to-r from-[#FCEAD2] via-[#FDF8E1] to-[#FCEAD2] rounded-3xl p-8 md:p-10 border border-orange-200/70 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-white/70 px-3 py-1 rounded-full border border-amber-200">
              Gợi ý hộp quà
            </span>
            <h3 className="text-2xl font-bold text-brand-choco font-serif mt-2">
              Mix Hộp Quà Kết Hợp Cả Vị Theo Mùa & Cổ Điển
            </h3>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed">
              Bạn có thể tùy ý chọn kết hợp các vị đặc biệt theo mùa cùng 7 nốt hương truyền thống trong hộp Custom Box 6 hoặc 12 bánh sang trọng.
            </p>
          </div>
          <Link
            href="/#custom"
            className="shrink-0 bg-brand hover:bg-brand-dark text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center gap-2 hover:scale-105"
          >
            <span>Tự Mix Hộp Quà</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
