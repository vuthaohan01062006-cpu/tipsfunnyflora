"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#FFFCF9] sticky top-0 z-50 shadow-sm border-b border-orange-50/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold text-brand-choco tracking-wide">
            TREAT SWEET <span className="text-brand">MACARON</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-brand-choco hover:text-brand font-medium transition-colors text-sm uppercase">Trang Chủ</Link>
            <Link href="/#flavors" className="text-brand-choco hover:text-brand font-medium transition-colors text-sm uppercase">Menu / Sản Phẩm</Link>
            <Link href="/blog" className="text-brand-choco hover:text-brand font-medium transition-colors text-sm uppercase">Sau Lớp Vỏ</Link>
            <Link href="/#custom" className="text-brand-choco hover:text-brand font-medium transition-colors text-sm uppercase">Custom Box</Link>
            <Link href="/about" className="text-brand-choco hover:text-brand font-medium transition-colors text-sm uppercase">Về Chúng Mình</Link>
            <Link href="/contact" className="text-brand-choco hover:text-brand font-medium transition-colors text-sm uppercase">Liên Hệ</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-brand-choco hover:text-brand" title="Tìm kiếm"><Search size={20} /></button>
            <button className="text-brand-choco hover:text-brand" title="Giỏ hàng"><ShoppingCart size={20} /></button>
            <Link href="/admin" className="text-brand-choco hover:text-brand p-1 rounded-full hover:bg-brand-vanilla transition-colors" title="Quản trị viên (Admin)">
              <User size={20} />
            </Link>
            <button className="lg:hidden text-brand-choco" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="lg:hidden py-4 flex flex-col space-y-4">
            <Link href="/" className="text-brand-choco font-medium">Trang Chủ</Link>
            <Link href="/#flavors" className="text-brand-choco font-medium">Menu / Sản Phẩm</Link>
            <Link href="/blog" className="text-brand-choco font-medium">Sau Lớp Vỏ</Link>
            <Link href="/#custom" className="text-brand-choco font-medium">Custom Box</Link>
            <Link href="/about" className="text-brand-choco font-medium">Về Chúng Mình</Link>
            <Link href="/admin" className="text-brand font-medium flex items-center">
              <User size={16} className="mr-2" /> Đăng nhập Quản trị viên
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
