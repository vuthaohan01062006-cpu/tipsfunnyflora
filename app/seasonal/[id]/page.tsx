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

  // Load from localStorage if admin customized with instant real-time tab sync
  useEffect(() => {
    const reloadSeasonal = () => {
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
    };

    reloadSeasonal();

    window.addEventListener("storage", reloadSeasonal);
    return () => window.removeEventListener("storage", reloadSeasonal);
  }, [productId]);

  // Gallery thumbnails: Always puts product.image first, followed by remaining gallery images
  const imageGallery = [
    product.image,
    ...(product.gallery || []).filter(g => Boolean(g) && g !== product.image)
  ].filter(Boolean) as string[];

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

  const handleShare = (platform: string) => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(`${product.name} - Treat Sweet Macaron`);

    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    } else if (platform === "pinterest") {
      window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${title}`, "_blank");
    } else {
      navigator.clipboard.writeText(window.location.href);
      setToastMessage("Đã sao chép liên kết bánh vào bộ nhớ!");
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
      <div className="bg-[#FCEAD2] border-b border-[#F7D8B5] py-3 px-6 md:px-12 mb-8">
        <div className="container mx-auto max-w-6xl flex items-center gap-2 text-xs md:text-sm text-brand-choco/80 font-medium">
          <Link href="/" className="hover:text-brand transition-colors">
            {t("detail.breadcrumbHome") || "Trang chủ"}
          </Link>
          <span className="text-brand-choco/40 font-normal">/</span>
          <Link href="/seasonal" className="hover:text-brand transition-colors">
            {t("nav.seasonal") || "BST Theo Mùa"}
          </Link>
          <span className="text-brand-choco/40 font-normal">/</span>
          <span className="text-brand-choco font-bold">
            {product.name}
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* Main Product Layout (Gallery on left, details on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-20">
          
          {/* LEFT COLUMN: Gallery with Vertical Thumbnails & Big Main Image */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4 items-center sm:items-start">
            
            {/* Vertical Thumbnail Column with Up/Down Chevrons */}
            <div className="flex sm:flex-col gap-2.5 justify-center items-center w-full sm:w-20 shrink-0 overflow-x-auto sm:overflow-visible py-1">
              <button 
                onClick={() => {
                  const currentIndex = imageGallery.indexOf(activeImage);
                  const prevIndex = (currentIndex - 1 + imageGallery.length) % imageGallery.length;
                  setActiveImage(imageGallery[prevIndex]);
                }}
                className="hidden sm:flex w-full items-center justify-center text-gray-500 hover:text-brand py-1 transition-colors cursor-pointer"
                title="Ảnh trước"
              >
                <ChevronUp size={22} />
              </button>

              {imageGallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImage === img 
                      ? "border-brand shadow-md scale-105" 
                      : "border-gray-200 hover:border-brand/40 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}

              <button 
                onClick={() => {
                  const currentIndex = imageGallery.indexOf(activeImage);
                  const nextIndex = (currentIndex + 1) % imageGallery.length;
                  setActiveImage(imageGallery[nextIndex]);
                }}
                className="hidden sm:flex w-full items-center justify-center text-gray-500 hover:text-brand py-1 transition-colors cursor-pointer"
                title="Ảnh tiếp"
              >
                <ChevronDown size={22} />
              </button>
            </div>

            {/* Big Main Image (Crisp, High Quality, Rounded Corners) */}
            <div className="flex-1 w-full bg-[#FAF5EE] rounded-3xl overflow-hidden shadow-lg border border-brand-vanilla/60 aspect-square sm:aspect-[4/4.2] relative group">
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs p-2.5 rounded-full shadow-sm text-brand hover:scale-110 transition-transform cursor-pointer">
                <Heart size={20} className="fill-brand/20" />
              </div>
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className="bg-amber-900/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles size={12} className="text-amber-300" />
                  <span>{product.seasonTag || "Theo Mùa"}</span>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Badges, Name, Price, Ingredients, Description, Structure, Purchase Box, Share */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            
            {/* Badges: Hot & Mới & Season Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#BA3826] text-white text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-xs">
                {t("detail.hotBadge") || "HOT"}
              </span>
              <span className="bg-[#E8B15D] text-white text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-xs">
                {t("detail.newBadge") || "MỚI"}
              </span>
              <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-3 py-1 rounded-md border border-amber-300">
                {product.seasonTag || "BST Theo Mùa 🍂"}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#0B192C] mb-2 leading-tight">
              {product.name}
            </h1>

            {/* Price (Large Red Font) */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-3xl md:text-4xl font-extrabold text-[#BA3826] font-serif">
                  {product.price ? product.price.replace("đ", "VND") : "42,000VND"}
                </span>
                {product.priceUnit && (
                  <span className="text-base sm:text-lg font-bold text-brand-choco/80 font-sans">
                    / {product.priceUnit}
                  </span>
                )}
              </div>
            </div>

            {/* Ingredients Line (Bold, No Header, Just Like Reference Image) */}
            {product.ingredients && (
              <div className="mb-4 text-sm md:text-base font-bold text-brand-choco leading-relaxed">
                {product.ingredients}
              </div>
            )}

            {/* Detailed Description Paragraph */}
            <div className="mb-6 text-sm md:text-base text-brand-choco/85 leading-relaxed">
              <p>{product.fullDesc || product.desc}</p>
            </div>

            {/* Structure Layers (Cấu trúc bánh) */}
            {product.structure && product.structure.length > 0 && (
              <div className="mb-6 text-sm text-brand-choco/90 space-y-1.5 leading-relaxed">
                <div className="font-bold text-brand-choco mb-2">
                  {t("detail.structureTitle") || "Cấu trúc bánh:"}
                </div>
                {product.structure.map((layer, lIdx) => (
                  <div key={lIdx}>
                    Lớp {lIdx + 1}: {layer.replace(/^Lớp \d+:\s*/i, "")}
                  </div>
                ))}
              </div>
            )}

            {/* Subtle Divider Line */}
            <div className="border-t border-gray-200/80 my-4" />

            {/* PURCHASE ACTION BOX WITH BRAND PASTEL PALETTE */}
            <div className="bg-[#FFFFF0] border-2 border-[#fafc97] p-4 md:p-5 rounded-2xl shadow-sm mb-6 space-y-3.5">
              
              {/* Row 1: Quantity selector + Add To Cart Button */}
              <div className="flex items-center gap-3">
                {/* Quantity Counter: [-] [ 1 ] [+] */}
                <div className="flex items-center bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs h-12 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-[#404d9b] hover:bg-[#fafc97]/30 font-bold text-lg transition-colors cursor-pointer"
                    title="Giảm 1"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-[#404d9b] text-base bg-[#fafc97]/50 h-full flex items-center justify-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-[#404d9b] hover:bg-[#fafc97]/30 font-bold text-lg transition-colors cursor-pointer"
                    title="Tăng 1"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button (Brand Navy #404d9b) */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-[#404d9b] hover:bg-[#323d80] text-white rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
                >
                  <span>{t("detail.addToCartBtn") || "Thêm vào giỏ hàng"}</span>
                  <ShoppingBag size={18} />
                </button>
              </div>

              {/* Row 2: Buy Now (Brand Pink #f17daa) + Consult Zalo (Brand Teal #23bbb7) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Buy Now Button (Pastel Pink #f17daa) */}
                <button
                  onClick={handleBuyNow}
                  className="h-12 bg-[#f17daa] hover:bg-[#e06896] text-white rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
                >
                  <span>{t("detail.buyNowBtn") || "Mua ngay"}</span>
                  <span className="text-base font-bold">→</span>
                </button>

                {/* Consult via Zalo (Pastel Teal #23bbb7) */}
                <a
                  href="https://zalo.me/0909123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 bg-[#23bbb7] hover:bg-[#1da29e] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>{t("detail.contactZalo") || "Tư vấn qua Zalo"}</span>
                  <span className="w-5 h-5 rounded-full bg-white text-[#23bbb7] text-[10px] flex items-center justify-center font-black tracking-tight shadow-xs">
                    Zalo
                  </span>
                </a>
              </div>
            </div>

            {/* Social Share Row (Exactly as in reference image) */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-bold text-brand-choco/80">
                {t("detail.share") || "Chia sẻ:"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare("facebook")}
                  className="w-8 h-8 rounded-md bg-white border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  title="Chia sẻ lên Facebook"
                >
                  f
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="w-8 h-8 rounded-md bg-white border border-gray-200 hover:border-sky-700 hover:text-sky-700 text-gray-700 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  title="Chia sẻ lên LinkedIn"
                >
                  in
                </button>
                <button
                  onClick={() => handleShare("pinterest")}
                  className="w-8 h-8 rounded-md bg-white border border-gray-200 hover:border-red-600 hover:text-red-600 text-gray-700 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  title="Chia sẻ lên Pinterest"
                >
                  P
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="w-8 h-8 rounded-md bg-white border border-gray-200 hover:border-brand hover:text-brand text-gray-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  title="Sao chép liên kết"
                >
                  <Share2 size={13} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section: Related Seasonal Flavors */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-brand-vanilla/60 pt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold font-serif text-brand-choco">
                Phiên Bản Giới Hạn Khác
              </h2>
              <Link href="/seasonal" className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
                Xem toàn bộ BST <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map(rel => (
                <Link
                  key={rel.id}
                  href={`/seasonal/${rel.id}`}
                  className="bg-white rounded-3xl p-4 border border-brand-vanilla hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-brand-vanilla/40 mb-4">
                    <img
                      src={rel.image || rel.gallery?.[0]}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 inline-block mb-1">
                      {rel.seasonTag || "Theo Mùa"}
                    </span>
                    <h3 className="font-bold font-serif text-brand-choco group-hover:text-brand transition-colors text-base mb-1">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-brand-choco/70 line-clamp-2 mb-3">
                      {rel.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <span className="font-bold text-brand text-sm">
                      {rel.price || "42.000đ"}
                    </span>
                    <span className="text-xs font-semibold text-brand-choco/60 group-hover:text-brand">
                      Xem chi tiết →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
