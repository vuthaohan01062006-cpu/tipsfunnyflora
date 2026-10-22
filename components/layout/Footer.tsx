"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DEFAULT_SITE_CONTENT, ContactConfig, SITE_CONTENT_STORAGE_KEY } from "@/data/siteContent";

export default function Footer() {
  const [contact, setContact] = useState<ContactConfig>(DEFAULT_SITE_CONTENT.contact);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.contact) {
          setContact(parsed.contact);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  return (
    <footer className="bg-brand-choco text-white py-14">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-brand-vanilla mb-4 font-serif">Treat Sweet Macaron</h3>
          <p className="text-gray-200 text-sm italic">"Small Treat, Sweet Day"</p>
          <p className="text-gray-300 text-sm mt-2 leading-relaxed">
            Gói ghém hương vị thủ công chuẩn Pháp trên tay bạn.
          </p>
          <p className="text-gray-400 text-xs mt-3">
            📍 {contact.address}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-brand-vanilla">Khám Phá</h4>
          <ul className="text-gray-300 text-sm space-y-2.5">
            <li><Link href="/#flavors" className="hover:text-brand-vanilla transition-colors">Bộ Sưu Tập 7 Vị</Link></li>
            <li><Link href="/seasonal" className="hover:text-brand-vanilla transition-colors text-amber-200 font-medium">✨ BST Theo Mùa (Seasonal)</Link></li>
            <li><Link href="/blog" className="hover:text-brand-vanilla transition-colors">Sau Lớp Vỏ (Blog)</Link></li>
            <li><Link href="/#custom" className="hover:text-brand-vanilla transition-colors">Custom Box (Hộp Quà)</Link></li>
            <li><Link href="/about" className="hover:text-brand-vanilla transition-colors">Về Chúng Mình</Link></li>
            <li><Link href="/contact" className="hover:text-brand-vanilla transition-colors">Liên Hệ Đặt Bánh</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-brand-vanilla">Chính Sách & Giờ Mở</h4>
          <ul className="text-gray-300 text-sm space-y-2.5">
            <li>Cam kết thủ công 100%</li>
            <li>Bảo quản 10 phút vàng</li>
            <li>Giao hàng & Đóng gói quà</li>
            <li className="text-brand-vanilla/90 font-medium">🕒 {contact.openHours}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-brand-vanilla">Kết Nối</h4>
          <ul className="text-gray-300 text-sm space-y-2.5">
            <li>
              <a href={contact.tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-vanilla transition-colors">
                TikTok: @treatsweet.macaron
              </a>
            </li>
            <li>
              <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-vanilla transition-colors">
                Fanpage: Treat Sweet Macaron
              </a>
            </li>
            <li>
              <a href={`tel:${contact.hotline.replace(/\s/g, "")}`} className="hover:text-brand-vanilla font-bold font-mono text-brand transition-colors">
                Hotline: {contact.hotline}
              </a>
            </li>
            <li className="pt-2">
              <Link 
                href="/admin" 
                className="inline-flex items-center text-xs text-brand-vanilla/70 hover:text-brand transition-colors bg-white/10 px-3 py-1 rounded-lg"
              >
                🔒 Trang Quản Trị (Admin Portal)
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-400 text-xs mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center container mx-auto px-4">
        <span>© 2026 Treat Sweet Macaron. All rights reserved.</span>
        <Link href="/admin" className="text-gray-400 hover:text-brand text-xs mt-2 sm:mt-0 transition-colors">
          Cổng Đăng Nhập Quản Trị Viên
        </Link>
      </div>
    </footer>
  );
}
