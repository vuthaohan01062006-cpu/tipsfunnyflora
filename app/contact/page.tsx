"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DEFAULT_SITE_CONTENT, ContactConfig, SITE_CONTENT_STORAGE_KEY } from "@/data/siteContent";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  Check, 
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function ContactPage() {
  const [contact, setContact] = useState<ContactConfig>(DEFAULT_SITE_CONTENT.contact);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { t } = useLanguage();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      alert("Vui lòng nhập đầy đủ họ tên, số điện thoại và nội dung lời nhắn!");
      return;
    }
    setToastMessage("Cảm ơn bạn đã nhắn tin! Tiệm sẽ phản hồi cho bạn trong ít phút nhé.");
    setName("");
    setPhone("");
    setMessage("");
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="bg-[#FFFDF9] min-h-screen pb-24 text-brand-choco font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-choco text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-brand/30 animate-slideUp">
          <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center shrink-0">
            <Check size={16} className="text-white" />
          </div>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb Bar */}
      <div className="bg-[#FCEAD2] border-b border-[#F7D8B5] py-3 px-6 md:px-12 mb-8">
        <div className="container mx-auto max-w-6xl flex items-center gap-2 text-xs md:text-sm text-brand-choco/80 font-medium">
          <Link href="/" className="hover:text-brand transition-colors">
            {t("nav.home")}
          </Link>
          <span className="text-brand-choco/40 font-normal">/</span>
          <span className="text-brand-choco font-bold">
            {t("nav.contact")}
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-vanilla text-brand text-xs font-bold uppercase tracking-wider">
            <Phone size={14} /> Hỗ Trợ & Đặt Bánh Nhanh
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-brand-choco">
            Liên Hệ Với Chúng Mình
          </h1>
          <p className="text-brand-choco/75 text-sm md:text-base leading-relaxed">
            Bạn cần đặt bánh số lượng lớn cho sự kiện, mix hộp quà theo sở thích riêng hay chỉ đơn giản muốn ghé thăm tiệm? Đừng ngần ngại nhắn tin cho chúng mình nhé!
          </p>
        </div>

        {/* 2 Columns Grid: Details vs Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-brand-vanilla shadow-sm space-y-6">
              <h2 className="text-xl font-bold font-serif text-brand-choco pb-3 border-b border-gray-100 flex items-center gap-2">
                <Sparkles size={18} className="text-brand" /> Thông Tin Tiệm Bánh
              </h2>

              {/* Hotline */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-vanilla text-brand flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                    Hotline / Đặt Bánh Giao Nhanh:
                  </span>
                  <a href={`tel:${contact.hotline.replace(/\s/g, "")}`} className="text-lg font-bold text-brand hover:underline font-mono">
                    {contact.hotline}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-vanilla text-brand flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                    Địa chỉ tiệm bánh:
                  </span>
                  <p className="text-sm text-brand-choco/90 leading-relaxed font-medium">
                    {contact.address}
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-vanilla text-brand flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                    Thời gian mở cửa:
                  </span>
                  <p className="text-sm text-brand-choco/90 font-medium">
                    {contact.openHours}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-vanilla text-brand flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                    Email hỗ trợ:
                  </span>
                  <a href={`mailto:${contact.email}`} className="text-sm text-brand-choco/90 hover:text-brand font-medium">
                    {contact.email}
                  </a>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
                <a
                  href={contact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl bg-[#FFD180] hover:bg-[#FFC466] text-brand-choco font-bold text-xs flex items-center justify-center gap-2 border border-amber-300 transition-all shadow-xs"
                >
                  <span>Chat Zalo</span>
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center font-black">
                    Z
                  </span>
                </a>
                <a
                  href={`tel:${contact.hotline.replace(/\s/g, "")}`}
                  className="py-3 px-4 rounded-2xl bg-brand hover:bg-brand-dark text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <Phone size={14} /> Gọi Ngay
                </a>
              </div>
            </div>

            {/* Social Links Banner */}
            <div className="bg-[#FFFDF7] p-6 rounded-3xl border border-brand-vanilla flex items-center justify-between">
              <span className="text-xs font-bold text-brand-choco/80">Theo dõi kênh của tiệm:</span>
              <div className="flex items-center gap-3">
                <a
                  href={contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-gray-200 hover:border-blue-600 hover:text-blue-600 flex items-center justify-center text-xs font-bold transition-colors shadow-xs"
                >
                  FB
                </a>
                <a
                  href={contact.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-gray-200 hover:border-black hover:text-black flex items-center justify-center text-xs font-bold transition-colors shadow-xs"
                >
                  TT
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[2.5rem] border border-brand-vanilla shadow-sm">
            <h2 className="text-2xl font-bold font-serif text-brand-choco mb-2">
              Gửi Tin Nhắn Cho Tiệm
            </h2>
            <p className="text-xs text-brand-choco/70 mb-8">
              Để lại thông tin và yêu cầu của bạn, chúng mình sẽ phản hồi ngay qua Zalo hoặc số điện thoại trong vòng 15 phút!
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                  Họ và tên của bạn *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Thảo Hân"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                  Số điện thoại nhận tư vấn *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0909 123 456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                  Lời nhắn gửi hoặc yêu cầu đặt bánh *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ví dụ: Mình muốn đặt 3 hộp 12 vị để tặng sinh nhật bạn vào ngày mai..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-brand hover:bg-brand-dark text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={16} /> Gửi Tin Nhắn Cho Tiệm Bánh
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
