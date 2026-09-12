"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Search } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-tiffany">
            Tips Funny
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-tiffany font-medium transition-colors">TRANG CHỦ</Link>
            
            <div className="group relative">
              <button className="text-gray-700 hover:text-tiffany font-medium transition-colors flex items-center">
                SẢN PHẨM
              </button>
              {/* Mega Menu */}
              <div className="absolute top-full left-0 w-[600px] bg-white shadow-xl rounded-b-lg border border-gray-100 p-6 hidden group-hover:grid grid-cols-2 gap-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div>
                  <h3 className="text-tiffany font-bold mb-3 border-b pb-2">Theo Danh Mục</h3>
                  <ul className="space-y-2">
                    <li><Link href="/category/best-seller" className="text-gray-600 hover:text-tiffany text-sm">Bán Chạy Nhất (Hot Picks)</Link></li>
                    <li><Link href="/category/flower-box" className="text-gray-600 hover:text-tiffany text-sm">Hộp Hoa (Flower Box)</Link></li>
                    <li><Link href="/category/bouquet" className="text-gray-600 hover:text-tiffany text-sm">Bó Hoa (Bouquet)</Link></li>
                    <li><Link href="/category/wedding" className="text-gray-600 hover:text-tiffany text-sm">Hoa Cưới (Wedding Flowers)</Link></li>
                    <li><Link href="/category/basket-pot" className="text-gray-600 hover:text-tiffany text-sm">Chậu & Giỏ Hoa (Basket & Pot)</Link></li>
                    <li><Link href="/category/mini" className="text-gray-600 hover:text-tiffany text-sm">Hoa Nhỏ Xinh (150k – 300k)</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-tiffany font-bold mb-3 border-b pb-2">Theo Tone Màu</h3>
                  <ul className="space-y-2 grid grid-cols-2 gap-2">
                    <li><Link href="/color/blue" className="text-gray-600 hover:text-tiffany text-sm">Xanh Yên Bình</Link></li>
                    <li><Link href="/color/green" className="text-gray-600 hover:text-tiffany text-sm">Xanh Tươi Mát</Link></li>
                    <li><Link href="/color/red" className="text-gray-600 hover:text-tiffany text-sm">Đỏ Nồng Nàn</Link></li>
                    <li><Link href="/color/pink" className="text-gray-600 hover:text-tiffany text-sm">Hồng Ngọt Ngào</Link></li>
                    <li><Link href="/color/pastel" className="text-gray-600 hover:text-tiffany text-sm">Kẹo Ngọt Pastel</Link></li>
                    <li><Link href="/color/white" className="text-gray-600 hover:text-tiffany text-sm">Trắng Tinh Khôi</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <Link href="/collection/for-him" className="text-gray-700 hover:text-tiffany font-medium transition-colors">FOR HIM</Link>
            <Link href="/collection/for-her" className="text-gray-700 hover:text-tiffany font-medium transition-colors">FOR HER</Link>
            <Link href="/collection/funny-special" className="text-tiffany font-bold hover:text-tiffany-dark transition-colors">TIPS FUNNY SPECIAL</Link>
            <Link href="/policy/pre-order-4h" className="text-gray-700 hover:text-tiffany font-medium transition-colors">CHÍNH SÁCH 4H</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-tiffany"><Search size={20} /></button>
            <button className="text-gray-600 hover:text-tiffany"><ShoppingCart size={20} /></button>
            <button className="lg:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-100 flex flex-col space-y-4">
            <Link href="/" className="text-gray-700 font-medium">TRANG CHỦ</Link>
            <Link href="/products" className="text-gray-700 font-medium">SẢN PHẨM</Link>
            <Link href="/collection/funny-special" className="text-tiffany font-bold">TIPS FUNNY SPECIAL</Link>
            <Link href="/policy/pre-order-4h" className="text-gray-700 font-medium">CHÍNH SÁCH 4H</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
