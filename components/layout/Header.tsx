"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Search, User, Globe } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-[#FFFCF9] sticky top-0 z-40 shadow-sm border-b border-orange-50/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold text-brand-choco tracking-wide flex items-center gap-1.5">
            <span>{t("nav.brand")}</span> <span className="text-brand">{t("nav.brandSub")}</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-7">
            <Link href="/" className="text-brand-choco hover:text-brand font-medium transition-colors text-xs tracking-wider uppercase">
              {t("nav.home")}
            </Link>
            <Link href="/#flavors" className="text-brand-choco hover:text-brand font-medium transition-colors text-xs tracking-wider uppercase">
              {t("nav.menu")}
            </Link>
            <Link href="/blog" className="text-brand-choco hover:text-brand font-medium transition-colors text-xs tracking-wider uppercase">
              {t("nav.blog")}
            </Link>
            <Link href="/#custom" className="text-brand-choco hover:text-brand font-medium transition-colors text-xs tracking-wider uppercase">
              {t("nav.custom")}
            </Link>
            <Link href="/about" className="text-brand-choco hover:text-brand font-medium transition-colors text-xs tracking-wider uppercase">
              {t("nav.about")}
            </Link>
            <Link href="/contact" className="text-brand-choco hover:text-brand font-medium transition-colors text-xs tracking-wider uppercase">
              {t("nav.contact")}
            </Link>
          </nav>

          <div className="flex items-center space-x-3.5">
            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand/25 bg-white hover:bg-brand-vanilla text-brand-choco transition-all shadow-xs text-xs font-bold cursor-pointer group"
              title={language === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
            >
              <span className="text-sm select-none">{language === "vi" ? "🇻🇳" : "🇬🇧"}</span>
              <span className="uppercase text-[11px] tracking-wider text-brand font-bold group-hover:text-brand-dark">
                {language === "vi" ? "VI" : "EN"}
              </span>
            </button>

            <button className="text-brand-choco hover:text-brand p-1 cursor-pointer" title={t("nav.search")}>
              <Search size={19} />
            </button>
            
            {/* Shopping Cart Button with Dynamic Badge */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-brand-choco hover:text-brand relative p-1 transition-colors cursor-pointer" 
              title={t("nav.cart")}
            >
              <ShoppingCart size={19} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            <Link href="/admin" className="text-brand-choco hover:text-brand p-1 rounded-full hover:bg-brand-vanilla transition-colors" title={t("nav.admin")}>
              <User size={19} />
            </Link>

            <button className="lg:hidden text-brand-choco p-1" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="lg:hidden py-4 border-t border-brand-vanilla flex flex-col space-y-3.5 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ngôn ngữ / Language:</span>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand/30 bg-white text-xs font-bold text-brand"
              >
                <span>{language === "vi" ? "🇻🇳 Tiếng Việt" : "🇬🇧 English"}</span>
              </button>
            </div>
            <Link href="/" onClick={() => setIsOpen(false)} className="text-brand-choco font-medium hover:text-brand">
              {t("nav.home")}
            </Link>
            <Link href="/#flavors" onClick={() => setIsOpen(false)} className="text-brand-choco font-medium hover:text-brand">
              {t("nav.menu")}
            </Link>
            <button 
              onClick={() => { setIsOpen(false); setIsCartOpen(true); }}
              className="text-left text-brand font-medium flex items-center justify-between"
            >
              <span>{t("nav.cart")}</span>
              {totalItems > 0 && (
                <span className="bg-brand text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="text-brand-choco font-medium hover:text-brand">
              {t("nav.blog")}
            </Link>
            <Link href="/#custom" onClick={() => setIsOpen(false)} className="text-brand-choco font-medium hover:text-brand">
              {t("nav.custom")}
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-brand-choco font-medium hover:text-brand">
              {t("nav.about")}
            </Link>
            <Link href="/admin" onClick={() => setIsOpen(false)} className="text-brand font-medium flex items-center pt-2 border-t border-gray-100">
              <User size={16} className="mr-2" /> {t("nav.admin")}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
