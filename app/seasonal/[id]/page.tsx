"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  INITIAL_SEASONAL_PRODUCTS, 
  SeasonalProduct, 
  SEASONAL_STORAGE_KEY 
} from "@/data/seasonalProducts";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ChevronUp, 
  ChevronDown, 
  ShoppingBag, 
  ArrowRight, 
  Share2, 
  Check, 
  Heart,
  Sparkles
} from "lucide-react";

export default function SeasonalProductDetailPage() {
  const params = useParams();
  const productId = params?.id ? String(params.id) : "seasonal-1";

  // Initialize immediately with matching product
  const initialFound = INITIAL_SEASONAL_PRODUCTS.find(p => String(p.id) === productId) || INITIAL_SEASONAL_PRODUCTS[0];
  const [product, setProduct] = useState<SeasonalProduct>(initialFound);
  const [allProducts, setAllProducts] = useState<SeasonalProduct[]>(INITIAL_SEASONAL_PRODUCTS);
  const [activeImage, setActiveImage] = useState<string>(initialFound.image || initialFound.gallery?.[0] || "");
  const [quantity, setQuantity] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { addToCart, setIsCheckoutOpen, setIsCartOpen } = useCart();
  const { language, t } = useLanguage();

  // Load from localStorage if admin customized
  useEffect(() => {
    let currentList = INITIAL_SEASONAL_PRODUCTS;
    try {
      const saved = localStorage.getItem(SEASONAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          currentList = parsed;
        }
      }
    } catch {
      // fallback
    }

    setAllProducts(currentList);
    const found = currentList.find(p => String(p.id) === productId) || currentList[0];
    if (found) {
      setProduct(found);
      setActiveImage(found.image || found.gallery?.[0] || "");
    }
  }, [productId]);

  // Gallery thumbnails
  const imageGallery = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [
        product.image || "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85"
      ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setToastMessage(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setToastMessage("Đã sao chép liên kết sản phẩm vào bộ nhớ tạm!");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const relatedProducts = allProducts.filter(p => String(p.id) !== String(product.id));

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-20 font-sans">
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
          <Link href="/seasonal" className="hover:text-brand font-medium transition-colors flex items-center gap-1">
            <Sparkles size={12} className="text-amber-600" />
            <span>BST Theo Mùa</span>
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-brand-choco font-bold truncate max-w-[220px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main Product Section */}
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Vertical Thumbnails + Big Crisp Image */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4 items-center sm:items-start">
            
            {/* Vertical Thumbnails */}
            <div className="flex sm:flex-col items-center gap-2.5 shrink-0 justify-center">
              <button 
                onClick={() => {
                  const currentIndex = imageGallery.indexOf(activeImage);
                  const prevIndex = (currentIndex - 1 + imageGallery.length) % imageGallery.length;
                  setActiveImage(imageGallery[prevIndex]);
                }}
                className="hidden sm:flex text-gray-400 hover:text-brand p-1 cursor-pointer transition-colors"
                aria-label="Previous thumbnail"
              >
                <ChevronUp size={22} />
              </button>

              <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                {imageGallery.slice(0, 4).map((img, idx) => {
                  const isSelected = activeImage === img;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        isSelected 
                          ? "border-brand shadow-md scale-105" 
                          : "border-gray-200/80 hover:border-brand/40 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => {
                  const currentIndex = imageGallery.indexOf(activeImage);
                  const nextIndex = (currentIndex + 1) % imageGallery.length;
                  setActiveImage(imageGallery[nextIndex]);
                }}
                className="hidden sm:flex text-gray-400 hover:text-brand p-1 cursor-pointer transition-colors"
                aria-label="Next thumbnail"
              >
                <ChevronDown size={22} />
              </button>
            </div>

            {/* Main Crisp Image */}
            <div className={`relative flex-1 aspect-square w-full max-w-[480px] rounded-3xl overflow-hidden shadow-lg border border-orange-100/80 ${product.color || "bg-amber-50"}`}>
              <img 
                src={activeImage} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className="bg-amber-900/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles size={12} className="text-amber-300" />
                  <span>{product.seasonTag}</span>
                </span>
                {product.isNew && (
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    Mới
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Title, Price, Description & Purchase Card */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            
            {/* Badges & Category */}
            <div className="flex items-center gap-2">
              <span className="bg-red-500 text-white text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-xs">
                HOT
              </span>
              <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                Phiên bản giới hạn
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold ml-1">
                {product.category || "BST Theo Mùa"}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-choco font-serif tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Price with VAT note */}
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="text-2xl sm:text-3xl font-black text-red-600 tracking-tight font-sans">
                {product.price || "42.000đ"}
              </span>
              <span className="text-xs text-gray-500 font-normal">
                {t("detail.vatNote") || "(Giá chưa bao gồm thuế VAT)"}
              </span>
            </div>

            {/* Ingredients Section */}
            {product.ingredients && (
              <div className="bg-brand-vanilla/40 border border-brand/15 rounded-2xl p-4">
                <h4 className="text-xs font-bold text-brand-choco uppercase tracking-wider mb-1.5">
                  Thành phần nguyên liệu tuyển chọn theo mùa:
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {product.ingredients}
                </p>
              </div>
            )}

            {/* Full Story Description */}
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2">
              <p>{product.fullDesc || product.desc}</p>
            </div>

            {/* Macaron Structure */}
            {product.structure && product.structure.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <h4 className="text-xs font-bold text-brand-choco uppercase tracking-wider">
                  Cấu trúc tầng bánh:
                </h4>
                <ul className="text-xs text-gray-600 space-y-1 pl-4 list-disc marker:text-brand">
                  {product.structure.map((item, index) => (
                    <li key={index} className="leading-snug">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Purchase Card with Brand Pastel Palette */}
            <div className="bg-[#FFFFF0] rounded-3xl p-5 sm:p-6 shadow-sm border-2 border-[#fafc97] mt-4 space-y-4">
              
              {/* Row 1: Quantity Selector + Add to Cart */}
              <div className="flex items-center gap-3">
                {/* Quantity Counter */}
                <div className="flex items-center bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs h-12 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-[#404d9b] hover:bg-[#fafc97]/30 font-bold text-lg transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-[#404d9b] text-base bg-[#fafc97]/50 h-full flex items-center justify-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-[#404d9b] hover:bg-[#fafc97]/30 font-bold text-lg transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart (Brand Navy #404d9b) */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-[#404d9b] hover:bg-[#323d80] text-white rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
                >
                  <ShoppingBag size={18} />
                  <span>{t("detail.addToCartBtn") || "Thêm vào giỏ hàng"}</span>
                </button>
              </div>

              {/* Row 2: Buy Now (#f17daa) + Consult Zalo (#23bbb7) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleBuyNow}
                  className="h-12 bg-[#f17daa] hover:bg-[#e06896] text-white rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
                >
                  <span>{t("detail.buyNowBtn") || "Mua ngay"}</span>
                  <ArrowRight size={15} />
                </button>

                <a
                  href="https://zalo.me/0909123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 bg-[#23bbb7] hover:bg-[#1da29e] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>{t("detail.contactZalo") || "Liên hệ tư vấn (Zalo)"}</span>
                  <span className="w-5 h-5 rounded-full bg-white text-[#23bbb7] text-[10px] flex items-center justify-center font-black tracking-tight shadow-xs">
                    Zalo
                  </span>
                </a>
              </div>
            </div>

            {/* Social Share Row */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">{t("detail.share") || "Chia sẻ"}:</span>
                <button 
                  onClick={handleCopyLink}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-brand transition-colors cursor-pointer" 
                  title="Sao chép liên kết"
                >
                  <Share2 size={16} />
                </button>
              </div>

              <Link href="/seasonal" className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
                ← Quay lại danh mục theo mùa
              </Link>
            </div>
          </div>
        </div>

        {/* Related Seasonal Flavors */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-24 pt-12 border-t border-orange-100">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                Phiên bản giới hạn khác
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-brand-choco font-serif mt-2">
                Các Nốt Hương Vị Theo Mùa Khác
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((rel) => (
                <Link
                  key={rel.id}
                  href={`/seasonal/${rel.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-orange-100/80 shadow-xs hover:shadow-lg transition-all p-4 flex gap-4 items-center hover:-translate-y-1"
                >
                  <div className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 ${rel.color || "bg-amber-50"}`}>
                    <img 
                      src={rel.image} 
                      alt={rel.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {rel.seasonTag}
                    </span>
                    <h4 className="text-sm font-bold text-brand-choco font-serif truncate mt-1 group-hover:text-brand transition-colors">
                      {rel.name}
                    </h4>
                    <p className="text-xs font-extrabold text-red-600 mt-1 font-sans">
                      {rel.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
