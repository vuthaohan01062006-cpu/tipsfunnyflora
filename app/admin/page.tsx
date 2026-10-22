"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  INITIAL_PRODUCTS, 
  Product, 
  STORAGE_KEY 
} from "@/data/products";
import { 
  DEFAULT_BANNER, 
  BannerConfig, 
  BANNER_STORAGE_KEY 
} from "@/data/banner";
import { 
  DEFAULT_SITE_CONTENT, 
  SiteContent, 
  BlogPost, 
  SITE_CONTENT_STORAGE_KEY 
} from "@/data/siteContent";
import { 
  Upload, 
  Trash2, 
  Plus, 
  Edit3, 
  Check, 
  ExternalLink, 
  LogOut, 
  RefreshCw, 
  Save, 
  Send, 
  Image as ImageIcon,
  Sparkles,
  AlertCircle,
  Eye,
  LayoutTemplate,
  Cookie,
  BookOpen,
  Gift,
  Heart,
  Phone,
  Clock,
  MapPin,
  Mail,
  Share2
} from "lucide-react";

type TabType = "banner" | "products" | "blogs" | "customBox" | "about" | "contact";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("banner");
  
  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [banner, setBanner] = useState<BannerConfig>(DEFAULT_BANNER);
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);

  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  // Form state for adding new flavor/product
  const [newProduct, setNewProduct] = useState({
    name: "",
    desc: "",
    price: "35.000đ",
    color: "bg-[#FDF8E1]",
    image: "",
    category: "Bộ sưu tập",
    ingredients: "",
    fullDesc: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editForm, setEditForm] = useState<Product | null>(null);

  // Form state for adding new blog post
  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
    title: "",
    category: "Kỹ thuật",
    excerpt: "",
    content: "",
    image: "",
    readTime: "4 phút đọc",
    author: "Thợ bánh Treat Sweet",
  });
  const [showAddBlogForm, setShowAddBlogForm] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | number | null>(null);
  const [editBlogForm, setEditBlogForm] = useState<BlogPost | null>(null);

  // Hidden file input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetId, setUploadTargetId] = useState<string | number | null>(null);

  // Check auth and load data
  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_logged_in");
    if (loggedIn !== "true") {
      router.push("/admin/login");
      return;
    }
    setIsAuth(true);

    // Load products
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProducts(JSON.parse(saved));
      } else {
        setProducts(INITIAL_PRODUCTS);
      }
    } catch {
      setProducts(INITIAL_PRODUCTS);
    }

    // Load banner
    try {
      const savedBanner = localStorage.getItem(BANNER_STORAGE_KEY);
      if (savedBanner) {
        setBanner(JSON.parse(savedBanner));
      } else {
        setBanner(DEFAULT_BANNER);
      }
    } catch {
      setBanner(DEFAULT_BANNER);
    }

    // Load site content
    try {
      const savedContent = localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        setSiteContent({
          blogs: parsed.blogs || DEFAULT_SITE_CONTENT.blogs,
          customBox: parsed.customBox || DEFAULT_SITE_CONTENT.customBox,
          about: parsed.about || DEFAULT_SITE_CONTENT.about,
          contact: parsed.contact || DEFAULT_SITE_CONTENT.contact,
        });
      } else {
        setSiteContent(DEFAULT_SITE_CONTENT);
      }
    } catch {
      setSiteContent(DEFAULT_SITE_CONTENT);
    }

    setLoading(false);
  }, [router]);

  const showNotification = (text: string, type: "success" | "error" | "info" = "success") => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    document.cookie = "admin_auth=; path=/; max-age=0";
    router.push("/admin/login");
  };

  // Save functions
  const saveProductsToLocal = (newProductsList: Product[]) => {
    setProducts(newProductsList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProductsList));
    showNotification("Đã lưu danh sách bánh! Website đã cập nhật ngay.", "success");
  };

  const saveBannerToLocal = (updatedBanner: BannerConfig) => {
    setBanner(updatedBanner);
    localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(updatedBanner));
    showNotification("Đã lưu Banner mới! Trang chủ đã được cập nhật.", "success");
  };

  const saveSiteContentToLocal = (updatedContent: SiteContent, sectionName: string) => {
    setSiteContent(updatedContent);
    localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(updatedContent));
    showNotification(`Đã lưu thay đổi mục "${sectionName}" thành công!`, "success");
  };

  // Image Upload Trigger & Handler
  const triggerImageUpload = (targetId: string | number) => {
    setUploadTargetId(targetId);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      showNotification("Kích thước file ảnh nên nhỏ hơn 8MB để web tải nhanh!", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      if (!base64Url) return;

      if (uploadTargetId === "banner") {
        const updated = { ...banner, imageUrl: base64Url };
        saveBannerToLocal(updated);
        showNotification("Đã áp dụng ảnh Banner mới thành công!", "success");
      } else if (uploadTargetId === "new_product") {
        setNewProduct(prev => ({ ...prev, image: base64Url }));
        showNotification("Đã chọn ảnh cho sản phẩm mới!", "info");
      } else if (uploadTargetId === "new_blog") {
        setNewBlog(prev => ({ ...prev, image: base64Url }));
        showNotification("Đã chọn ảnh bìa cho bài viết Blog mới!", "info");
      } else if (typeof uploadTargetId === "string" && uploadTargetId.startsWith("blog_")) {
        const bId = uploadTargetId.replace("blog_", "");
        const updatedBlogs = siteContent.blogs.map(b => 
          String(b.id) === bId ? { ...b, image: base64Url } : b
        );
        saveSiteContentToLocal({ ...siteContent, blogs: updatedBlogs }, "Sau Lớp Vỏ");
      } else if (uploadTargetId !== null) {
        const updated = products.map(p => 
          p.id === uploadTargetId ? { ...p, image: base64Url } : p
        );
        saveProductsToLocal(updated);
        showNotification("Đã cập nhật ảnh bánh thành công!", "success");
      }
    };
    reader.readAsDataURL(file);
  };

  // ==================== BLOG ACTIONS ====================
  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title?.trim() || !newBlog.excerpt?.trim()) {
      showNotification("Vui lòng nhập tiêu đề và tóm tắt bài viết!", "error");
      return;
    }

    const created: BlogPost = {
      id: Date.now(),
      title: newBlog.title.trim(),
      category: (newBlog.category as any) || "Kỹ thuật",
      date: new Date().toLocaleDateString("vi-VN"),
      readTime: newBlog.readTime?.trim() || "4 phút đọc",
      excerpt: newBlog.excerpt.trim(),
      content: newBlog.content?.trim() || newBlog.excerpt.trim(),
      image: newBlog.image || "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
      author: newBlog.author?.trim() || "Treat Sweet",
    };

    const updatedBlogs = [created, ...siteContent.blogs];
    saveSiteContentToLocal({ ...siteContent, blogs: updatedBlogs }, "Sau Lớp Vỏ (Blog)");
    setNewBlog({
      title: "",
      category: "Kỹ thuật",
      excerpt: "",
      content: "",
      image: "",
      readTime: "4 phút đọc",
      author: "Thợ bánh Treat Sweet",
    });
    setShowAddBlogForm(false);
  };

  const handleDeleteBlog = (id: string | number, title: string) => {
    if (confirm(`Bạn có chắc muốn xóa bài viết "${title}" không?`)) {
      const updatedBlogs = siteContent.blogs.filter(b => b.id !== id);
      saveSiteContentToLocal({ ...siteContent, blogs: updatedBlogs }, "Sau Lớp Vỏ");
    }
  };

  const saveEditBlog = () => {
    if (!editBlogForm) return;
    const updatedBlogs = siteContent.blogs.map(b => b.id === editBlogForm.id ? editBlogForm : b);
    saveSiteContentToLocal({ ...siteContent, blogs: updatedBlogs }, "Sau Lớp Vỏ");
    setEditingBlogId(null);
    setEditBlogForm(null);
  };

  // ==================== PRODUCT ACTIONS ====================
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim()) {
      showNotification("Vui lòng nhập tên vị bánh!", "error");
      return;
    }

    const created: Product = {
      id: Date.now(),
      name: newProduct.name.trim(),
      desc: newProduct.desc.trim() || "Hương vị thủ công đặc biệt.",
      price: newProduct.price.trim() || "35.000đ",
      color: newProduct.color,
      textColor: "text-brand-choco",
      image: newProduct.image || "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
      category: newProduct.category,
      ingredients: newProduct.ingredients || "Hạnh nhân, Bơ Pháp, Vani tự nhiên",
      fullDesc: newProduct.fullDesc || newProduct.desc,
      structure: [
        "Vỏ bánh: Giòn nhẹ ngoài rìa, xốp dẻo bên trong",
        "Nhân kem: Mềm mượt đẫm vị",
        "Hậu vị: Ngọt ngào thanh tao"
      ]
    };

    saveProductsToLocal([...products, created]);
    setNewProduct({
      name: "",
      desc: "",
      price: "35.000đ",
      color: "bg-[#FDF8E1]",
      image: "",
      category: "Bộ sưu tập",
      ingredients: "",
      fullDesc: "",
    });
    setShowAddForm(false);
  };

  const handleDeleteProduct = (id: string | number, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa bánh "${name}" không?`)) {
      saveProductsToLocal(products.filter(p => p.id !== id));
    }
  };

  const saveEditProduct = () => {
    if (!editForm) return;
    saveProductsToLocal(products.map(p => p.id === editForm.id ? editForm : p));
    setEditingId(null);
    setEditForm(null);
  };

  // Publish All Data (Products, Banner, SiteContent) to GitHub & Vercel
  const handlePublishToLive = async () => {
    setIsPublishing(true);
    showNotification("Đang xuất bản toàn bộ nội dung lên GitHub & Vercel...", "info");

    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products, banner, siteContent }),
      });

      const data = await res.json();
      if (data.success) {
        showNotification(data.message || "Xuất bản thành công lên Website!", "success");
      } else {
        showNotification("Dữ liệu đã được lưu trên máy của bạn thành công.", "info");
      }
    } catch {
      showNotification("Đã lưu trên máy của bạn thành công!", "info");
    } finally {
      setIsPublishing(false);
    }
  };

  if (!isAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9] text-brand-choco">
        <div className="flex items-center gap-3">
          <RefreshCw className="animate-spin text-brand" size={24} />
          <span>Đang tải cổng quản trị Treat Sweet...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-brand-choco pb-24 font-sans">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Top Navbar */}
      <header className="bg-white border-b border-brand-vanilla sticky top-0 z-40 shadow-xs">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-lg font-serif">
              M
            </span>
            <div>
              <h1 className="text-xl font-bold font-serif leading-tight">Treat Sweet Admin</h1>
              <p className="text-xs text-brand-choco/60">Cổng Quản Trị Toàn Diện Website Tiệm Bánh</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center text-xs font-semibold px-4 py-2 rounded-xl border border-brand/30 hover:bg-brand-vanilla text-brand-choco transition-colors"
            >
              <ExternalLink size={14} className="mr-1.5 text-brand" /> Xem Website
            </Link>

            <button
              onClick={handlePublishToLive}
              disabled={isPublishing}
              className="inline-flex items-center text-xs font-bold px-4 py-2 rounded-xl bg-brand hover:bg-brand-dark text-white shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              <Send size={14} className="mr-1.5" />
              {isPublishing ? "Đang xuất bản..." : "Xuất bản lên Web"}
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center text-xs font-medium px-3 py-2 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              title="Đăng xuất"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {statusMessage && (
        <div className="container mx-auto px-4 mt-4">
          <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium shadow-sm transition-all ${
            statusMessage.type === "success" 
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
              : statusMessage.type === "error"
              ? "bg-red-50 text-red-800 border border-red-200"
              : "bg-blue-50 text-blue-800 border border-blue-200"
          }`}>
            <Sparkles size={18} className="shrink-0" />
            <div className="flex-1">{statusMessage.text}</div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-8 max-w-6xl">
        
        {/* Navigation Tabs (Full CMS Menu) */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-gray-200 pb-4 mb-8">
          <button
            onClick={() => setActiveTab("banner")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all shrink-0 cursor-pointer ${
              activeTab === "banner"
                ? "bg-brand text-white shadow-md"
                : "bg-white text-brand-choco hover:bg-brand-vanilla border border-gray-200"
            }`}
          >
            <LayoutTemplate size={16} />
            <span>Banner Trang Chủ</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all shrink-0 cursor-pointer ${
              activeTab === "products"
                ? "bg-brand text-white shadow-md"
                : "bg-white text-brand-choco hover:bg-brand-vanilla border border-gray-200"
            }`}
          >
            <Cookie size={16} />
            <span>7 Vị Bánh Macaron</span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all shrink-0 cursor-pointer ${
              activeTab === "blogs"
                ? "bg-brand text-white shadow-md"
                : "bg-white text-brand-choco hover:bg-brand-vanilla border border-gray-200"
            }`}
          >
            <BookOpen size={16} />
            <span>Sau Lớp Vỏ (Blog)</span>
          </button>

          <button
            onClick={() => setActiveTab("customBox")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all shrink-0 cursor-pointer ${
              activeTab === "customBox"
                ? "bg-brand text-white shadow-md"
                : "bg-white text-brand-choco hover:bg-brand-vanilla border border-gray-200"
            }`}
          >
            <Gift size={16} />
            <span>Custom Box (Hộp Quà)</span>
          </button>

          <button
            onClick={() => setActiveTab("about")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all shrink-0 cursor-pointer ${
              activeTab === "about"
                ? "bg-brand text-white shadow-md"
                : "bg-white text-brand-choco hover:bg-brand-vanilla border border-gray-200"
            }`}
          >
            <Heart size={16} />
            <span>Về Chúng Mình</span>
          </button>

          <button
            onClick={() => setActiveTab("contact")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all shrink-0 cursor-pointer ${
              activeTab === "contact"
                ? "bg-brand text-white shadow-md"
                : "bg-white text-brand-choco hover:bg-brand-vanilla border border-gray-200"
            }`}
          >
            <Phone size={16} />
            <span>Thông Tin Liên Hệ</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: BANNER TRANG CHỦ */}
        {/* ========================================================= */}
        {activeTab === "banner" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-brand-vanilla to-[#FFF0F5] p-6 rounded-3xl border border-brand/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-brand-choco mb-1 flex items-center gap-2">
                  <Sparkles size={18} className="text-brand" /> Quản Lý Banner Trang Chủ
                </h2>
                <p className="text-sm text-brand-choco/80 max-w-2xl">
                  Tải ảnh Banner mới từ máy tính hoặc Canva, chỉnh sửa tiêu đề và câu slogan giới thiệu tiệm bánh. Bấm <strong>"Lưu Thay Đổi Banner"</strong> để áp dụng ngay!
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => triggerImageUpload("banner")}
                  className="inline-flex items-center text-xs font-bold px-4 py-2.5 rounded-xl bg-brand text-white hover:bg-brand-dark transition-colors shadow-sm cursor-pointer"
                >
                  <Upload size={15} className="mr-1.5" /> Tải ảnh từ máy
                </button>
                <button
                  onClick={() => {
                    saveBannerToLocal(DEFAULT_BANNER);
                    showNotification("Đã khôi phục Banner ban đầu (/hero-macaron.png)!", "info");
                  }}
                  className="inline-flex items-center text-xs font-medium px-3 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                >
                  <RefreshCw size={14} className="mr-1" /> Khôi phục gốc
                </button>
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand/20 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-brand-choco flex items-center gap-2 border-b border-gray-100 pb-4">
                <Eye size={18} className="text-brand" /> Xem Trước Banner Thực Tế (Live Preview)
              </h3>
              <div className="bg-[#FFFCF9] p-6 rounded-2xl border border-orange-100/80">
                <div className="w-full mb-6 rounded-2xl overflow-hidden shadow-sm bg-brand-vanilla/40">
                  <img src={banner.imageUrl || "/hero-macaron.png"} alt="Preview Banner" className="w-full h-auto object-cover max-h-[360px]" />
                </div>
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <h2 className="text-3xl md:text-4xl font-bold text-brand-choco font-serif">
                    {banner.title} <span className="text-brand">{banner.highlightText}</span>
                  </h2>
                  <p className="text-sm text-brand-choco/80 leading-relaxed">{banner.subtitle}</p>
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Đường dẫn ảnh Banner hoặc bấm tải:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={banner.imageUrl}
                      onChange={(e) => setBanner({ ...banner, imageUrl: e.target.value })}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => triggerImageUpload("banner")}
                      className="px-4 py-2.5 rounded-xl bg-brand-vanilla text-brand-choco hover:bg-brand hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Upload size={14} /> Chọn ảnh từ máy
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Tiêu đề chính:</label>
                  <input
                    type="text"
                    value={banner.title}
                    onChange={(e) => setBanner({ ...banner, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Chữ điểm nhấn màu hồng:</label>
                  <input
                    type="text"
                    value={banner.highlightText}
                    onChange={(e) => setBanner({ ...banner, highlightText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Slogan tiệm bánh:</label>
                  <textarea
                    rows={3}
                    value={banner.subtitle}
                    onChange={(e) => setBanner({ ...banner, subtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => saveBannerToLocal(banner)}
                  className="px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save size={16} /> Lưu Thay Đổi Banner
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: 7 VỊ BÁNH MACARON */}
        {/* ========================================================= */}
        {activeTab === "products" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-brand-vanilla to-[#FFF0F5] p-6 rounded-3xl border border-brand/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-brand-choco mb-1 flex items-center gap-2">
                  <Sparkles size={18} className="text-brand" /> Quản Lý 7 Vị Bánh Macaron
                </h2>
                <p className="text-sm text-brand-choco/80 max-w-2xl">
                  Bấm <strong>"Tải ảnh mới"</strong> trên từng chiếc bánh để thay ảnh từ máy/Canva, hoặc bấm biểu tượng bút để sửa giá và mô tả.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="inline-flex items-center text-xs font-bold px-4 py-2.5 rounded-xl bg-brand text-white hover:bg-brand-dark transition-colors shadow-sm cursor-pointer"
                >
                  <Plus size={16} className="mr-1" /> Thêm vị bánh mới
                </button>
                <button
                  onClick={() => {
                    if (confirm("Khôi phục danh sách 7 vị bánh ban đầu?")) {
                      saveProductsToLocal(INITIAL_PRODUCTS);
                    }
                  }}
                  className="inline-flex items-center text-xs font-medium px-3 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                >
                  <RefreshCw size={14} className="mr-1" /> Khôi phục 7 vị
                </button>
              </div>
            </div>

            {/* Add New Product Form */}
            {showAddForm && (
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand/30 shadow-md animate-fadeIn">
                <h3 className="text-lg font-bold text-brand-choco mb-4 flex items-center gap-2">
                  <Plus size={18} className="text-brand" /> Thêm Hương Vị Mới
                </h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Tên vị bánh *"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Giá niêm yết (VD: 35.000đ)"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Mô tả cảm xúc ngắn"
                    value={newProduct.desc}
                    onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                    className="md:col-span-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Thành phần nguyên liệu"
                    value={newProduct.ingredients}
                    onChange={(e) => setNewProduct({ ...newProduct, ingredients: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Link ảnh hoặc tải từ máy"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => triggerImageUpload("new_product")}
                      className="px-3 py-2 bg-brand-vanilla text-brand-choco rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Tải ảnh
                    </button>
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-xs">Hủy</button>
                    <button type="submit" className="px-5 py-2 bg-brand text-white rounded-xl text-xs font-bold">Lưu Bánh Mới</button>
                  </div>
                </form>
              </div>
            )}

            {/* Grid 7 Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between group">
                  <div className="relative aspect-[4/3] bg-[#FAF5EE]">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => triggerImageUpload(p.id)}
                      className="absolute bottom-3 right-3 bg-white/95 text-brand-choco hover:bg-brand hover:text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Upload size={13} /> Tải ảnh mới
                    </button>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold font-serif text-brand-choco text-lg">{p.name}</h4>
                        <span className="text-xs font-bold text-brand bg-brand-vanilla px-2 py-1 rounded-md">{p.price || "35.000đ"}</span>
                      </div>
                      <p className="text-xs text-brand-choco/70 line-clamp-2 mt-1">{p.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <Link href={`/products/${p.id}`} target="_blank" className="text-xs text-brand font-bold hover:underline flex items-center gap-1">
                        Xem trang chi tiết <ExternalLink size={12} />
                      </Link>
                      <button onClick={() => handleDeleteProduct(p.id, p.name)} className="p-1 text-gray-400 hover:text-red-500 cursor-pointer">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: SAU LỚP VỎ (BLOG) */}
        {/* ========================================================= */}
        {activeTab === "blogs" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-brand-vanilla to-[#FFF0F5] p-6 rounded-3xl border border-brand/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-brand-choco mb-1 flex items-center gap-2">
                  <BookOpen size={18} className="text-brand" /> Quản Lý Bài Viết Sau Lớp Vỏ (Blog)
                </h2>
                <p className="text-sm text-brand-choco/80 max-w-2xl">
                  Thêm câu chuyện làm bánh, bài viết chia sẻ về kỹ thuật và nguyên liệu. Toàn bộ bài viết sẽ xuất hiện tại trang <strong>/blog</strong> và mục Sau Lớp Vỏ ngoài trang chủ!
                </p>
              </div>
              <button
                onClick={() => setShowAddBlogForm(!showAddBlogForm)}
                className="inline-flex items-center text-xs font-bold px-4 py-2.5 rounded-xl bg-brand text-white hover:bg-brand-dark transition-colors shadow-sm cursor-pointer shrink-0"
              >
                <Plus size={16} className="mr-1" /> + Thêm bài viết mới
              </button>
            </div>

            {/* Form Add Blog */}
            {showAddBlogForm && (
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand/30 shadow-md animate-fadeIn">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-brand-choco flex items-center gap-2">
                    <Plus size={18} className="text-brand" /> Viết Bài Blog Mới
                  </h3>
                  <button onClick={() => setShowAddBlogForm(false)} className="text-gray-400 text-sm">Đóng</button>
                </div>
                <form onSubmit={handleAddBlog} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Tiêu đề bài viết *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nghệ thuật kiểm soát độ ẩm khi nướng Macaron"
                      value={newBlog.title}
                      onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Chuyên mục</label>
                    <select
                      value={newBlog.category}
                      onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                    >
                      <option value="Kỹ thuật">Kỹ thuật</option>
                      <option value="Nguyên liệu">Nguyên liệu</option>
                      <option value="Cảm xúc">Cảm xúc</option>
                      <option value="Sự kiện">Sự kiện</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Thời gian đọc (VD: 4 phút đọc)</label>
                    <input
                      type="text"
                      value={newBlog.readTime}
                      onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Ảnh bìa bài viết</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Dán link ảnh hoặc bấm nút tải từ máy"
                        value={newBlog.image}
                        onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => triggerImageUpload("new_blog")}
                        className="px-4 py-2.5 rounded-xl bg-brand-vanilla text-brand-choco hover:bg-brand hover:text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <Upload size={14} /> Tải từ máy
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Tóm tắt ngắn (Excerpt) *</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Mô tả ngắn gọn nội dung bài viết thu hút người đọc..."
                      value={newBlog.excerpt}
                      onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Nội dung chi tiết bài viết *</label>
                    <textarea
                      rows={6}
                      required
                      placeholder="Nhập toàn bộ nội dung bài viết..."
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm leading-relaxed"
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button type="button" onClick={() => setShowAddBlogForm(false)} className="px-4 py-2 text-xs">Hủy</button>
                    <button type="submit" className="px-6 py-2.5 bg-brand text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">
                      Lưu & Đăng Bài Viết
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List Blog Posts */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase px-2">
                <span>Danh sách ({siteContent.blogs.length} bài viết)</span>
                <Link href="/blog" target="_blank" className="text-brand hover:underline flex items-center gap-1">
                  Xem trang /blog <ExternalLink size={12} />
                </Link>
              </div>

              {siteContent.blogs.map((b) => (
                <div key={b.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-16 rounded-xl overflow-hidden bg-brand-vanilla/40 shrink-0 border border-brand-vanilla">
                      <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold bg-brand-vanilla text-brand px-2 py-0.5 rounded-md uppercase">
                          {b.category}
                        </span>
                        <span className="text-xs text-gray-400">{b.date} • {b.readTime}</span>
                      </div>
                      <h4 className="font-bold font-serif text-brand-choco text-base">{b.title}</h4>
                      <p className="text-xs text-brand-choco/70 line-clamp-1 mt-0.5">{b.excerpt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => triggerImageUpload(`blog_${b.id}`)}
                      className="p-2 rounded-xl text-gray-400 hover:text-brand hover:bg-brand-vanilla/30 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title="Đổi ảnh"
                    >
                      <Upload size={14} /> Đổi ảnh
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(b.id, b.title)}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                      title="Xóa bài viết"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: CUSTOM BOX (HỘP QUÀ) */}
        {/* ========================================================= */}
        {activeTab === "customBox" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-brand-vanilla to-[#FFF0F5] p-6 rounded-3xl border border-brand/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-brand-choco mb-1 flex items-center gap-2">
                  <Gift size={18} className="text-brand" /> Cấu Hình Hộp Quà Custom Box
                </h2>
                <p className="text-sm text-brand-choco/80 max-w-2xl">
                  Chỉnh sửa giá hộp 6 bánh & hộp 12 bánh, tiêu đề và ghi chú hướng dẫn mix vị bánh theo cảm xúc ngoài trang chủ.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand/20 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Tiêu đề mục Custom Box:</label>
                  <input
                    type="text"
                    value={siteContent.customBox.title}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      customBox: { ...siteContent.customBox, title: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Mô tả thông điệp hộp quà:</label>
                  <textarea
                    rows={2}
                    value={siteContent.customBox.subtitle}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      customBox: { ...siteContent.customBox, subtitle: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Giá niêm yết Hộp 6 Bánh:</label>
                  <input
                    type="text"
                    value={siteContent.customBox.box6Price}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      customBox: { ...siteContent.customBox, box6Price: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Giá niêm yết Hộp 12 Bánh:</label>
                  <input
                    type="text"
                    value={siteContent.customBox.box12Price}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      customBox: { ...siteContent.customBox, box12Price: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Mô tả đóng gói & ruy băng:</label>
                  <textarea
                    rows={2}
                    value={siteContent.customBox.description}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      customBox: { ...siteContent.customBox, description: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Đường link Zalo nhận đặt hộp riêng:</label>
                  <input
                    type="text"
                    value={siteContent.customBox.zaloLink}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      customBox: { ...siteContent.customBox, zaloLink: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => saveSiteContentToLocal(siteContent, "Custom Box")}
                  className="px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save size={16} /> Lưu Thay Đổi Custom Box
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: VỀ CHÚNG MÌNH (ABOUT US) */}
        {/* ========================================================= */}
        {activeTab === "about" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-brand-vanilla to-[#FFF0F5] p-6 rounded-3xl border border-brand/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-brand-choco mb-1 flex items-center gap-2">
                  <Heart size={18} className="text-brand" /> Quản Lý Trang Về Chúng Mình
                </h2>
                <p className="text-sm text-brand-choco/80 max-w-2xl">
                  Chỉnh sửa câu chuyện thương hiệu, triết lý làm bánh thủ công và lời nhắn gửi tại trang <strong>/about</strong>.
                </p>
              </div>
              <Link href="/about" target="_blank" className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
                Xem trang /about <ExternalLink size={12} />
              </Link>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand/20 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Tiêu đề trang:</label>
                  <input
                    type="text"
                    value={siteContent.about.title}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      about: { ...siteContent.about, title: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Slogan / Câu châm ngôn:</label>
                  <input
                    type="text"
                    value={siteContent.about.subtitle}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      about: { ...siteContent.about, subtitle: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Đoạn 1 - Câu chuyện khởi nguồn:</label>
                  <textarea
                    rows={3}
                    value={siteContent.about.storyP1}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      about: { ...siteContent.about, storyP1: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Đoạn 2 - Kỹ thuật & Nguyên liệu:</label>
                  <textarea
                    rows={3}
                    value={siteContent.about.storyP2}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      about: { ...siteContent.about, storyP2: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Lời trích dẫn (Quote):</label>
                  <input
                    type="text"
                    value={siteContent.about.quote}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      about: { ...siteContent.about, quote: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => saveSiteContentToLocal(siteContent, "Về Chúng Mình")}
                  className="px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save size={16} /> Lưu Thay Đổi Về Chúng Mình
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: THÔNG TIN LIÊN HỆ (CONTACT) */}
        {/* ========================================================= */}
        {activeTab === "contact" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-brand-vanilla to-[#FFF0F5] p-6 rounded-3xl border border-brand/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-brand-choco mb-1 flex items-center gap-2">
                  <Phone size={18} className="text-brand" /> Quản Lý Thông Tin Liên Hệ
                </h2>
                <p className="text-sm text-brand-choco/80 max-w-2xl">
                  Cập nhật số Hotline, địa chỉ tiệm bánh, giờ mở cửa và các đường link mạng xã hội (Facebook, TikTok, Zalo). Tự động đồng bộ ra Footer và trang <strong>/contact</strong>!
                </p>
              </div>
              <Link href="/contact" target="_blank" className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
                Xem trang /contact <ExternalLink size={12} />
              </Link>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand/20 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Số điện thoại Hotline *</label>
                  <input
                    type="text"
                    value={siteContent.contact.hotline}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, hotline: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Email tiệm bánh:</label>
                  <input
                    type="email"
                    value={siteContent.contact.email}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, email: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Địa chỉ cửa hàng *</label>
                  <input
                    type="text"
                    value={siteContent.contact.address}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, address: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Thời gian mở cửa đón khách:</label>
                  <input
                    type="text"
                    value={siteContent.contact.openHours}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, openHours: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Link Fanpage Facebook:</label>
                  <input
                    type="text"
                    value={siteContent.contact.facebookUrl}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, facebookUrl: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Link TikTok:</label>
                  <input
                    type="text"
                    value={siteContent.contact.tiktokUrl}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, tiktokUrl: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">Link chat Zalo Official:</label>
                  <input
                    type="text"
                    value={siteContent.contact.zaloUrl}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, zaloUrl: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => saveSiteContentToLocal(siteContent, "Thông Tin Liên Hệ")}
                  className="px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save size={16} /> Lưu Thay Đổi Liên Hệ
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
