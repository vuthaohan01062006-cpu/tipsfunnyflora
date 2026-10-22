"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DEFAULT_SITE_CONTENT, AboutConfig, SITE_CONTENT_STORAGE_KEY } from "@/data/siteContent";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, Sparkles, Award, Coffee, Gift, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const [about, setAbout] = useState<AboutConfig>(DEFAULT_SITE_CONTENT.about);
  const { t } = useLanguage();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.about) {
          setAbout(parsed.about);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  return (
    <div className="bg-[#FFFDF9] min-h-screen pb-24 text-brand-choco font-sans">
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#FCEAD2] border-b border-[#F7D8B5] py-3 px-6 md:px-12 mb-8">
        <div className="container mx-auto max-w-6xl flex items-center gap-2 text-xs md:text-sm text-brand-choco/80 font-medium">
          <Link href="/" className="hover:text-brand transition-colors">
            {t("nav.home")}
          </Link>
          <span className="text-brand-choco/40 font-normal">/</span>
          <span className="text-brand-choco font-bold">
            {t("nav.about")}
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-vanilla text-brand text-xs font-bold uppercase tracking-wider">
            <Heart size={14} /> Câu Chuyện Thương Hiệu
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-brand-choco leading-tight">
            {about.title}
          </h1>
          <p className="text-brand font-serif italic text-lg md:text-xl">
            "{about.subtitle}"
          </p>
        </div>

        {/* Story Section with Visual Accent */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-8 md:p-12 rounded-[2.5rem] border border-brand-vanilla shadow-sm">
          <div className="md:col-span-5 rounded-3xl overflow-hidden aspect-square bg-[#FAF5EE]">
            <img
              src="https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85"
              alt="Treat Sweet Story"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-5">
            <h2 className="text-2xl font-bold font-serif text-brand-choco">
              Hương Vị Từ Trái Tim Thợ Bánh
            </h2>
            <p className="text-brand-choco/80 leading-relaxed text-sm md:text-base">
              {about.storyP1}
            </p>
            <p className="text-brand-choco/80 leading-relaxed text-sm md:text-base">
              {about.storyP2}
            </p>
          </div>
        </div>

        {/* 3 Commitments */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-brand-choco mb-2">
              Triết Lý Làm Bánh Của Chúng Mình
            </h2>
            <p className="text-sm text-brand-choco/70 max-w-lg mx-auto">
              Ba cam kết bất biến để mỗi chiếc bánh tới tay bạn luôn là phiên bản trọn vẹn nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.commitments.map((comm, idx) => (
              <div
                key={idx}
                className="bg-[#FFFDF7] p-8 rounded-3xl border border-brand-vanilla hover:shadow-lg transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-lg font-serif">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold font-serif text-brand-choco">
                  {comm.title}
                </h3>
                <p className="text-xs md:text-sm text-brand-choco/75 leading-relaxed">
                  {comm.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Block */}
        <div className="bg-[#FFF0E0] p-8 md:p-10 rounded-3xl text-center border border-[#FFE0C4] space-y-4">
          <Sparkles className="mx-auto text-brand" size={28} />
          <p className="text-lg md:text-xl font-serif text-brand-choco italic max-w-2xl mx-auto leading-relaxed">
            "{about.quote}"
          </p>
          <span className="block text-xs font-bold uppercase tracking-wider text-brand">
            — Treat Sweet Macaron Team —
          </span>
        </div>

        {/* Call To Action */}
        <div className="text-center space-x-4 pt-4">
          <Link
            href="/#flavors"
            className="inline-flex items-center gap-2 bg-brand text-white px-8 py-3.5 rounded-full font-bold hover:bg-brand-dark transition-all shadow-sm"
          >
            Khám phá 7 nốt hương vị <ArrowRight size={16} />
          </Link>
          <Link
            href="/#custom"
            className="inline-flex items-center gap-2 bg-white text-brand-choco border border-brand/30 px-8 py-3.5 rounded-full font-bold hover:bg-brand-vanilla transition-all"
          >
            <Gift size={16} /> Đặt hộp quà custom
          </Link>
        </div>
      </div>
    </div>
  );
}
