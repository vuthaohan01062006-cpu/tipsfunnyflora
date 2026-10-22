"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DEFAULT_SITE_CONTENT, BlogPost, SITE_CONTENT_STORAGE_KEY } from "@/data/siteContent";
import { useLanguage } from "@/context/LanguageContext";
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  X, 
  Share2, 
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(DEFAULT_SITE_CONTENT.blogs);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const { language, t } = useLanguage();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.blogs && Array.isArray(parsed.blogs) && parsed.blogs.length > 0) {
          setBlogs(parsed.blogs);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  const categories = ["Tất cả", "Kỹ thuật", "Nguyên liệu", "Cảm xúc", "Sự kiện"];

  const filteredBlogs = selectedCategory === "Tất cả" 
    ? blogs 
    : blogs.filter(b => b.category === selectedCategory);

  const featuredPost = blogs[0];

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
            {t("nav.blog")} (Blog)
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-vanilla text-brand text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen size={14} /> Blog & Nhật Ký Làm Bánh
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-brand-choco mb-4">
            Sau Lớp Vỏ
          </h1>
          <p className="text-brand-choco/75 text-base md:text-lg leading-relaxed">
            Những câu chuyện mộc mạc phía sau kỹ thuật làm bánh thủ công chuẩn Pháp, hành trình tìm kiếm nguyên liệu và nghệ thuật nâng niu từng xúc cảm.
          </p>
        </div>

        {/* Featured Article */}
        {featuredPost && (
          <div className="bg-white rounded-[2rem] border border-brand-vanilla/80 shadow-md overflow-hidden mb-16 grid grid-cols-1 lg:grid-cols-12 group hover:shadow-xl transition-all">
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-brand-vanilla/40">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="bg-brand text-white font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-400 flex items-center gap-1">
                    <Calendar size={13} /> {featuredPost.date}
                  </span>
                  <span className="text-gray-400 flex items-center gap-1">
                    <Clock size={13} /> {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-brand-choco leading-tight group-hover:text-brand transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-brand-choco/75 text-sm md:text-base leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                  <User size={13} /> {featuredPost.author || "Treat Sweet"}
                </span>
                <button
                  onClick={() => setActivePost(featuredPost)}
                  className="bg-brand text-white px-5 py-2.5 rounded-full font-bold text-xs hover:bg-brand-dark transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  Đọc câu chuyện <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-brand text-white shadow-sm"
                  : "bg-white border border-gray-200 text-brand-choco/70 hover:bg-brand-vanilla"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-brand-vanilla/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-vanilla/30">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-brand-choco text-[11px] font-bold px-3 py-1 rounded-full shadow-xs uppercase">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>
                  <h3 className="font-bold font-serif text-brand-choco text-lg mb-2.5 group-hover:text-brand transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs md:text-sm text-brand-choco/75 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {post.author || "Thợ bánh Treat Sweet"}
                </span>
                <button
                  onClick={() => setActivePost(post)}
                  className="text-xs font-bold text-brand hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Đọc tiếp <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Article Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setActivePost(null)}
          />
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-gray-500 hover:text-brand-choco shadow-md flex items-center justify-center cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="overflow-y-auto p-6 md:p-10 space-y-6">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-500 border-b border-gray-100 pb-4">
                <span className="bg-brand text-white font-bold px-2.5 py-0.5 rounded-md">
                  {activePost.category}
                </span>
                <span>{activePost.date}</span>
                <span>•</span>
                <span>{activePost.readTime}</span>
                <span>•</span>
                <span>Tác giả: {activePost.author || "Treat Sweet"}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold font-serif text-brand-choco leading-tight">
                {activePost.title}
              </h2>

              <p className="text-sm md:text-base font-semibold text-brand-choco/90 italic leading-relaxed bg-[#FFFBF0] p-4 rounded-xl border border-brand-vanilla">
                "{activePost.excerpt}"
              </p>

              <div className="text-sm md:text-base text-brand-choco/85 leading-relaxed space-y-4 pt-2 whitespace-pre-line">
                <p>{activePost.content}</p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">© Treat Sweet Macaron</span>
                <button
                  onClick={() => setActivePost(null)}
                  className="px-5 py-2 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-dark transition-colors cursor-pointer"
                >
                  Đóng bài viết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
