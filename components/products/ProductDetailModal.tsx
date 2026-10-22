"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { 
  X, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Share2, 
  Check, 
  ExternalLink 
} from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const { addToCart, setIsCheckoutOpen, setIsCartOpen } = useCart();
  const { t } = useLanguage();

  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setActiveImage(product.image || product.gallery?.[0] || "");
    }
  }, [product]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const gallery = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [
        product.image || "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=85"
      ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setToastMessage(`Đã thêm ${quantity} bánh "${product.name}" vào giỏ hàng!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    setIsCheckoutOpen(true);
  };

  const handleShare = (platform: string) => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(`${window.location.origin}/products/${product.id}`);
    const title = encodeURIComponent(`${product.name} - Treat Sweet Macaron`);

    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/products/${product.id}`);
      setToastMessage("Đã sao chép liên kết bánh vào bộ nhớ!");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Dark Blurred Backdrop (Lightbox effect) */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Toast Notification inside Modal */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-60 bg-brand-choco text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-brand/30 animate-slideUp">
          <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0">
            <Check size={14} className="text-white" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => {
              setToastMessage(null);
              onClose();
              setIsCartOpen(true);
            }}
            className="ml-2 text-xs font-bold text-brand hover:underline flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl"
          >
            Xem giỏ <ArrowRight size={12} />
          </button>
        </div>
      )}

      {/* Main Lightbox Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-[#FFFDF9] rounded-[2rem] shadow-2xl overflow-hidden border border-brand-vanilla flex flex-col md:flex-row z-10 max-h-[92vh] animate-zoomIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-gray-500 hover:text-brand-choco hover:bg-white shadow-md flex items-center justify-center transition-all cursor-pointer"
          title="Đóng (ESC)"
        >
          <X size={20} />
        </button>

        {/* LEFT COLUMN: Phóng to ảnh toàn màn hình (Lightbox Big Image) */}
        <div className="w-full md:w-1/2 bg-[#FAF5EE] p-6 sm:p-8 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-brand-vanilla/60 relative">
          
          {/* Main Enriched Image */}
          <div className="w-full aspect-square max-h-[380px] sm:max-h-[440px] rounded-3xl overflow-hidden shadow-lg border border-brand-vanilla bg-white relative group">
            <img
              src={activeImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs p-2.5 rounded-full shadow-sm text-brand">
              <Heart size={18} className="fill-brand/20" />
            </div>
          </div>

          {/* Thumbnail Gallery Row */}
          <div className="flex gap-2.5 mt-4 overflow-x-auto max-w-full py-1 justify-center">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  activeImage === img 
                    ? "border-brand shadow-md scale-105" 
                    : "border-gray-200 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Khung thông tin mô tả, số lượng & thanh toán (Cuộn mượt) */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[85vh] space-y-5 text-brand-choco">
          
          {/* Badges */}
          <div className="flex items-center gap-2">
            {product.isPopular !== false && (
              <span className="bg-[#C0392B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                {t("detail.hotBadge")}
              </span>
            )}
            {product.isNew && (
              <span className="bg-[#E5B563] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                {t("detail.newBadge")}
              </span>
            )}
            <span className="bg-brand-vanilla text-brand-choco text-[10px] font-semibold px-2.5 py-0.5 rounded-md">
              {product.category || "Macaron Pháp"}
            </span>
          </div>

          {/* Tên Bánh */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-brand-choco leading-tight">
              {product.name}
            </h3>
          </div>

          {/* Giá Tiền */}
          <div className="flex items-baseline gap-2.5 pb-1 border-b border-gray-100">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#B93826] font-serif">
              {product.price || "35.000đ"}
            </span>
          </div>

          {/* Thành Phần (In Đậm) */}
          {product.ingredients && (
            <div className="text-xs sm:text-sm text-brand-choco leading-relaxed">
              <span className="font-bold">{product.ingredients}</span>
            </div>
          )}

          {/* KHUNG ĐẶT HÀNG & THANH TOÁN (GIỐNG Y HỆT ẢNH MẪU BẠN GỬI) */}
          <div className="bg-[#FFE5B4]/50 border border-[#FAD089] p-4 sm:p-5 rounded-2xl shadow-xs space-y-3">
            
            {/* Dòng 1: Bộ chọn số lượng + Thêm vào giỏ hàng */}
            <div className="flex items-center gap-3">
              {/* Bộ đếm: [-] [ 1 ] [+] */}
              <div className="flex items-center bg-white rounded-xl border border-amber-200 overflow-hidden shadow-xs h-11 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-full flex items-center justify-center text-gray-500 hover:text-brand-choco hover:bg-amber-50 font-bold text-base transition-colors cursor-pointer"
                  title="Giảm 1"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-brand-choco text-base select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-full flex items-center justify-center text-gray-500 hover:text-brand-choco hover:bg-amber-50 font-bold text-base transition-colors cursor-pointer"
                  title="Tăng 1"
                >
                  +
                </button>
              </div>

              {/* Nút Thêm vào giỏ hàng (Navy Dark) */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-11 bg-[#0B213F] hover:bg-[#07162C] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>{t("detail.addToCartBtn")}</span>
                <ShoppingBag size={16} />
              </button>
            </div>

            {/* Dòng 2: Mua ngay + Liên hệ tư vấn (Zalo) */}
            <div className="grid grid-cols-2 gap-3">
              {/* Nút Mua ngay (Warm Red) */}
              <button
                onClick={handleBuyNow}
                className="h-11 bg-[#B93826] hover:bg-[#9E2F20] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>{t("detail.buyNowBtn")}</span>
                <ArrowRight size={16} />
              </button>

              {/* Nút Liên hệ tư vấn (Zalo) */}
              <a
                href="https://zalo.me/0909123456"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 bg-[#FFD180] hover:bg-[#FFC466] text-brand-choco rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-amber-300 transition-all shadow-xs"
              >
                <span>{t("detail.contactZalo")}</span>
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center font-black">
                  Z
                </span>
              </a>
            </div>
          </div>

          {/* KÉO XUỐNG DƯỚI: THÊM THÔNG TIN VỀ BÁNH */}
          <div className="pt-2 space-y-4 border-t border-gray-100">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-1.5">
                Câu Chuyện & Trải Nghiệm Hương Vị
              </h4>
              <p className="text-xs sm:text-sm text-brand-choco/80 leading-relaxed">
                {product.fullDesc || product.desc}
              </p>
            </div>

            {/* Cấu Trúc Bánh Từng Lớp */}
            {product.structure && product.structure.length > 0 && (
              <div className="bg-[#FFFCF7] p-3.5 rounded-2xl border border-brand-vanilla space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-choco/70 flex items-center gap-1.5 mb-1">
                  <Sparkles size={13} className="text-brand" /> {t("detail.structureTitle")}
                </h4>
                {product.structure.map((layer, lIdx) => (
                  <div key={lIdx} className="text-xs text-brand-choco/90 flex items-start gap-1.5">
                    <span className="font-bold text-brand shrink-0">Lớp {lIdx + 1}:</span>
                    <span>{layer.replace(/^Lớp \d+:\s*/i, "")}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Chia sẻ & Link trang riêng */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase">
                  {t("detail.share")}:
                </span>
                <button
                  onClick={() => handleShare("facebook")}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-600 text-[11px] font-bold flex items-center justify-center transition-colors cursor-pointer"
                  title="Facebook"
                >
                  f
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-sky-700 hover:text-white text-gray-600 text-[11px] font-bold flex items-center justify-center transition-colors cursor-pointer"
                  title="LinkedIn"
                >
                  in
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-brand hover:text-white text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                  title="Sao chép liên kết"
                >
                  <Share2 size={12} />
                </button>
              </div>

              <Link
                href={`/products/${product.id}`}
                onClick={onClose}
                className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
              >
                Mở trang riêng <ExternalLink size={12} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
