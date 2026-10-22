"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
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

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slideLeft">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#FFFCF9]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-brand" size={22} />
              <h2 className="text-xl font-bold font-serif text-brand-choco">
                Giỏ Hàng ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-choco hover:bg-gray-100 transition-colors"
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
                  Giỏ hàng đang trống
                </h3>
                <p className="text-sm text-brand-choco/70 max-w-xs mb-6">
                  Bạn chưa chọn chiếc bánh Macaron ngọt ngào nào. Hãy khám phá bộ sưu tập 7 vị bánh của chúng mình nhé!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-brand text-white font-semibold text-sm hover:bg-brand-dark transition-colors shadow-sm"
                >
                  Khám phá hương vị bánh
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-gray-100 bg-[#FFFDF9] flex gap-4 items-center justify-between hover:shadow-sm transition-shadow"
                >
                  {/* Thumbnail */}
                  <div className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 ${item.color || "bg-brand-vanilla"} flex items-center justify-center border border-brand/20`}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-brand-choco">
                        {item.name.substring(0, 2)}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-brand-choco truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs font-semibold text-brand mt-0.5">
                      {item.price}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand hover:text-brand transition-colors bg-white"
                        title="Giảm số lượng"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-xs font-bold text-brand-choco w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand hover:text-brand transition-colors bg-white"
                        title="Tăng số lượng"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Line Total & Remove */}
                  <div className="text-right flex flex-col justify-between items-end h-16">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1"
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
                  <span>Tạm tính ({totalItems} bánh):</span>
                  <span className="font-semibold text-brand-choco">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí giao hàng:</span>
                  <span className="text-emerald-600 font-semibold">
                    {totalPrice >= 200000 ? "Miễn phí" : "20.000đ"}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-brand-choco pt-2 border-t border-gray-200">
                  <span>Tổng thanh toán:</span>
                  <span className="text-xl text-brand font-serif">
                    {formatPrice(totalPrice >= 200000 ? totalPrice : totalPrice + 20000)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 px-4 rounded-2xl bg-brand text-white font-bold text-sm hover:bg-brand-dark transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Tiến Hành Đặt Hàng & Thanh Toán</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-xs text-gray-400 hover:text-red-500 transition-colors text-center"
                >
                  Xóa tất cả sản phẩm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
