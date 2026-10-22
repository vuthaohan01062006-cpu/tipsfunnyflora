"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    formatPrice,
    setIsCheckoutOpen,
  } = useCart();

  const { t } = useLanguage();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slideLeft">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#FFFCF9]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-brand" size={22} />
              <h2 className="text-xl font-bold font-serif text-brand-choco">
                {t("cart.title")} ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-choco hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-brand-vanilla flex items-center justify-center text-brand mb-4">
                  <ShoppingBag size={36} />
                </div>
                <h3 className="text-lg font-bold text-brand-choco mb-2">
                  {t("cart.emptyTitle")}
                </h3>
                <p className="text-sm text-brand-choco/70 max-w-xs mb-6">
                  {t("cart.emptySub")}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-brand text-white font-semibold text-sm hover:bg-brand-dark transition-colors shadow-sm cursor-pointer"
                >
                  {t("cart.exploreBtn")}
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#FFFDF9] border border-orange-100/70 hover:shadow-sm transition-shadow"
                >
                  {/* Item Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-brand-vanilla/40 shrink-0 border border-brand-vanilla">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=400&q=80"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-brand-choco text-sm truncate font-serif">
                      {item.name}
                    </h4>
                    <p className="text-xs text-brand font-semibold mt-0.5">
                      {item.price} {item.priceUnit ? `/ ${item.priceUnit}` : ""}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md bg-white border border-gray-200 text-gray-500 hover:text-brand-choco hover:border-brand flex items-center justify-center transition-colors cursor-pointer"
                        title="Giảm 1"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold text-brand-choco w-6 text-center select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-white border border-gray-200 text-gray-500 hover:text-brand-choco hover:border-brand flex items-center justify-center transition-colors cursor-pointer"
                        title="Tăng 1"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Line Total & Remove */}
                  <div className="text-right flex flex-col justify-between items-end h-16">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1 cursor-pointer"
                      title="Xóa món"
                    >
                      <Trash2 size={16} />
                    </button>
                    <span className="text-xs font-bold text-brand-choco">
                      {formatPrice(item.priceNumber * item.quantity)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-[#FFFCF9] space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>{t("cart.subtotal")} ({totalItems}):</span>
                  <span className="font-semibold text-brand-choco">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t("cart.shipping")}:</span>
                  <span className="text-emerald-600 font-semibold">
                    {totalPrice >= 200000 ? t("cart.shippingFree") : "20.000đ"}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-brand-choco pt-2 border-t border-gray-200">
                  <span>{t("cart.total")}:</span>
                  <span className="text-xl text-brand font-serif">
                    {formatPrice(totalPrice >= 200000 ? totalPrice : totalPrice + 20000)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 px-4 rounded-2xl bg-brand text-white font-bold text-sm hover:bg-brand-dark transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{t("cart.checkoutBtn")}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-xs text-gray-400 hover:text-red-500 transition-colors text-center cursor-pointer"
                >
                  {t("cart.clearAll")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
