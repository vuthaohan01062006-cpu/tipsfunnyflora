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
  Cookie
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"banner" | "products">("banner");
  
  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  // Banner state
  const [banner, setBanner] = useState<BannerConfig>(DEFAULT_BANNER);

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

  // Editing product state
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editForm, setEditForm] = useState<Product | null>(null);

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

  // Save changes locally
  const saveProductsToLocal = (newProductsList: Product[]) => {
    setProducts(newProductsList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProductsList));
    showNotification("Đã lưu danh sách bánh vào bộ nhớ! Trang chủ sẽ hiển thị ngay.", "success");
  };

  const saveBannerToLocal = (updatedBanner: BannerConfig) => {
    setBanner(updatedBanner);
    localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(updatedBanner));
    showNotification("Đã lưu Banner mới! Trang chủ và trang chi tiết đã được cập nhật.", "success");
  };

  // Handle Image Upload (Product or Banner)
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
        showNotification("Đã tải lên và áp dụng ảnh Banner mới thành công!", "success");
      } else if (uploadTargetId === "new") {
        setNewProduct(prev => ({ ...prev, image: base64Url }));
        showNotification("Đã chọn ảnh cho sản phẩm mới!", "info");
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

  // Banner reset
  const handleResetBanner = () => {
    if (confirm("Bạn có chắc muốn khôi phục ảnh và nội dung Banner mặc định không?")) {
      saveBannerToLocal(DEFAULT_BANNER);
      showNotification("Đã khôi phục Banner ban đầu (/hero-macaron.png)!", "info");
    }
  };

  // Add new product
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

    const updated = [...products, created];
    saveProductsToLocal(updated);
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
    showNotification(`Đã thêm thành công vị bánh "${created.name}"!`, "success");
  };

  // Delete product
  const handleDeleteProduct = (id: string | number, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa bánh "${name}" không?`)) {
      const updated = products.filter(p => p.id !== id);
      saveProductsToLocal(updated);
      showNotification(`Đã xóa vị bánh "${name}".`, "info");
    }
  };

  // Start Edit Product
  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  // Save Edit Product
  const saveEdit = () => {
    if (!editForm) return;
    const updated = products.map(p => p.id === editForm.id ? editForm : p);
    saveProductsToLocal(updated);
    setEditingId(null);
    setEditForm(null);
    showNotification("Đã lưu chỉnh sửa thông tin bánh!", "success");
  };

  // Reset to default products
  const handleResetDefault = () => {
    if (confirm("Khôi phục danh sách 7 hương vị Macaron ban đầu?")) {
      saveProductsToLocal(INITIAL_PRODUCTS);
      showNotification("Đã khôi phục dữ liệu ban đầu!", "info");
    }
  };

  // Publish to Vercel & GitHub (Syncs BOTH banner & products)
  const handlePublishToLive = async () => {
    setIsPublishing(true);
    showNotification("Đang xuất bản Banner & Sản phẩm lên GitHub/Vercel...", "info");

    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products, banner }),
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
          <span>Đang tải thông tin quản trị...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-brand-choco pb-24">
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
              <p className="text-xs text-brand-choco/60">Cổng Quản Trị Banner & Sản Phẩm Tiệm Bánh</p>
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
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveTab("banner")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === "banner"
                ? "bg-brand text-white shadow-md"
                : "bg-white text-brand-choco hover:bg-brand-vanilla border border-gray-200"
            }`}
          >
            <LayoutTemplate size={18} />
            <span>Quản Lý Banner Trang Chủ</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === "products"
                ? "bg-brand text-white shadow-md"
                : "bg-white text-brand-choco hover:bg-brand-vanilla border border-gray-200"
            }`}
          >
            <Cookie size={18} />
            <span>Quản Lý 7 Vị Bánh Macaron</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: BANNER MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === "banner" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Guide Box */}
            <div className="bg-gradient-to-r from-brand-vanilla to-[#FFF0F5] p-6 rounded-3xl border border-brand/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-brand-choco mb-1 flex items-center gap-2">
                  <Sparkles size={18} className="text-brand" /> Quyền Quản Lý Banner Trang Chủ
                </h2>
                <p className="text-sm text-brand-choco/80 max-w-2xl">
                  Bạn có thể tải ảnh Banner mới từ máy tính hoặc thiết kế Canva, chỉnh sửa tiêu đề và câu slogan giới thiệu tiệm bánh. Sau khi chỉnh sửa, bấm <strong>"Lưu Thay Đổi Banner"</strong> để áp dụng ngay ra trang chủ!
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => triggerImageUpload("banner")}
                  className="inline-flex items-center text-xs font-bold px-4 py-2.5 rounded-xl bg-brand text-white hover:bg-brand-dark transition-colors shadow-sm cursor-pointer"
                >
                  <Upload size={15} className="mr-1.5" /> Tải ảnh Banner từ máy
                </button>
                <button
                  onClick={handleResetBanner}
                  className="inline-flex items-center text-xs font-medium px-3 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                  title="Khôi phục banner macaron ban đầu"
                >
                  <RefreshCw size={14} className="mr-1" /> Khôi phục gốc
                </button>
              </div>
            </div>

            {/* Live Banner Preview Box */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand/20 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-base font-bold text-brand-choco flex items-center gap-2">
                  <Eye size={18} className="text-brand" /> Xem Trước Banner Thực Tế (Live Preview)
                </h3>
                <span className="text-xs text-gray-400">Hiển thị giống 100% ngoài trang chủ</span>
              </div>

              {/* Preview Canvas */}
              <div className="bg-[#FFFCF9] p-6 rounded-2xl border border-orange-100/80">
                <div className="w-full mb-6 rounded-2xl overflow-hidden shadow-sm bg-brand-vanilla/40">
                  <img
                    src={banner.imageUrl || "/hero-macaron.png"}
                    alt="Preview Banner"
                    className="w-full h-auto object-cover max-h-[360px]"
                  />
                </div>
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <h2 className="text-3xl md:text-4xl font-bold text-brand-choco font-serif">
                    {banner.title} <span className="text-brand">{banner.highlightText}</span>
                  </h2>
                  <p className="text-sm text-brand-choco/80 leading-relaxed">
                    {banner.subtitle}
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <span className="bg-brand text-white px-5 py-2 rounded-full text-xs font-bold shadow-xs">
                      {banner.buttonText1}
                    </span>
                    <span className="bg-white text-brand-choco border border-brand-choco/20 px-5 py-2 rounded-full text-xs font-bold">
                      {banner.buttonText2}
                    </span>
                  </div>
                </div>
              </div>

              {/* Banner Edit Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                {/* Image URL input */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                    Đường dẫn ảnh Banner (Image URL) hoặc tải trực tiếp:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={banner.imageUrl}
                      onChange={(e) => setBanner({ ...banner, imageUrl: e.target.value })}
                      placeholder="/hero-macaron.png hoặc link ảnh online"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => triggerImageUpload("banner")}
                      className="px-4 py-2.5 rounded-xl bg-brand-vanilla text-brand-choco hover:bg-brand hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Upload size={14} /> Chọn ảnh từ máy
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                    Tiêu đề chính:
                  </label>
                  <input
                    type="text"
                    value={banner.title}
                    onChange={(e) => setBanner({ ...banner, title: e.target.value })}
                    placeholder="Ví dụ: Small Treat,"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                  />
                </div>

                {/* Highlight Text */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                    Chữ điểm nhấn màu hồng:
                  </label>
                  <input
                    type="text"
                    value={banner.highlightText}
                    onChange={(e) => setBanner({ ...banner, highlightText: e.target.value })}
                    placeholder="Ví dụ: Sweet Day"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                  />
                </div>

                {/* Subtitle */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                    Đoạn giới thiệu / Slogan thương hiệu:
                  </label>
                  <textarea
                    rows={3}
                    value={banner.subtitle}
                    onChange={(e) => setBanner({ ...banner, subtitle: e.target.value })}
                    placeholder="Mô tả thông điệp tiệm bánh..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                  />
                </div>

                {/* Button 1 */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                    Nút bấm 1 (Tên hiển thị):
                  </label>
                  <input
                    type="text"
                    value={banner.buttonText1}
                    onChange={(e) => setBanner({ ...banner, buttonText1: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                    Nút bấm 1 (Liên kết):
                  </label>
                  <input
                    type="text"
                    value={banner.buttonLink1}
                    onChange={(e) => setBanner({ ...banner, buttonLink1: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                  />
                </div>

                {/* Button 2 */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                    Nút bấm 2 (Tên hiển thị):
                  </label>
                  <input
                    type="text"
                    value={banner.buttonText2}
                    onChange={(e) => setBanner({ ...banner, buttonText2: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                    Nút bấm 2 (Liên kết):
                  </label>
                  <input
                    type="text"
                    value={banner.buttonLink2}
                    onChange={(e) => setBanner({ ...banner, buttonLink2: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                  />
                </div>
              </div>

              {/* Save Banner Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleResetBanner}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium transition-colors cursor-pointer"
                >
                  Khôi phục gốc
                </button>
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
        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === "products" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Guide Box */}
            <div className="bg-gradient-to-r from-brand-vanilla to-[#FFF0F5] p-6 rounded-3xl border border-brand/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-brand-choco mb-1 flex items-center gap-2">
                  <Sparkles size={18} className="text-brand" /> Quản Lý 7 Vị Bánh & Hình Ảnh
                </h2>
                <p className="text-sm text-brand-choco/80 max-w-2xl">
                  Bấm vào <strong>"Tải ảnh từ máy"</strong> trên từng chiếc bánh để chọn ảnh mới từ máy tính/Canva. Bấm <strong>"Chỉnh sửa"</strong> để sửa giá và mô tả từng vị bánh.
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
                  onClick={handleResetDefault}
                  className="inline-flex items-center text-xs font-medium px-3 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                  title="Khôi phục 7 vị bánh ban đầu"
                >
                  <RefreshCw size={14} className="mr-1" /> Khôi phục 7 vị
                </button>
              </div>
            </div>

            {/* Form Add New Product */}
            {showAddForm && (
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand/30 shadow-md animate-fadeIn">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-brand-choco flex items-center gap-2">
                    <Plus size={20} className="text-brand" /> Thêm Hương Vị / Bánh Macaron Mới
                  </h3>
                  <button 
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-gray-600 text-sm cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>

                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                      Tên vị bánh *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Macaron Phúc Bồn Tử (Raspberry)"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                      Giá niêm yết
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 35.000đ"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                      Mô tả ngắn cảm xúc
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Chua ngọt thanh tao đánh thức mọi giác quan"
                      value={newProduct.desc}
                      onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                      Thành phần nguyên liệu
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Phúc bồn tử tươi, Bơ Pháp, Socola trắng"
                      value={newProduct.ingredients}
                      onChange={(e) => setNewProduct({ ...newProduct, ingredients: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                      Hình ảnh bánh
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Link ảnh hoặc bấm tải từ máy"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => triggerImageUpload("new")}
                        className="px-4 py-2.5 rounded-xl bg-brand-vanilla text-brand-choco hover:bg-brand hover:text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Upload size={14} /> Tải từ máy
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium transition-colors cursor-pointer"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Plus size={16} /> Lưu vị bánh mới
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  {/* Image Display */}
                  <div className="relative aspect-[4/3] bg-[#FAF5EE] overflow-hidden">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                        <ImageIcon size={36} className="mb-2 text-brand/40" />
                        <span className="text-xs">Chưa có ảnh (đang dùng màu mặc định)</span>
                      </div>
                    )}

                    {/* Change Image Button */}
                    <button
                      onClick={() => triggerImageUpload(product.id)}
                      className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-brand-choco hover:bg-brand hover:text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload size={13} /> Tải ảnh mới
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    {editingId === product.id && editForm ? (
                      /* Editing Form */
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-bold"
                          placeholder="Tên bánh"
                        />
                        <input
                          type="text"
                          value={editForm.price || "35.000đ"}
                          onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold"
                          placeholder="Giá tiền"
                        />
                        <textarea
                          rows={2}
                          value={editForm.desc}
                          onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                          placeholder="Mô tả"
                        />
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={saveEdit}
                            className="flex-1 py-1.5 bg-brand text-white rounded-lg text-xs font-bold hover:bg-brand-dark transition-colors flex items-center justify-center gap-1"
                          >
                            <Save size={13} /> Lưu
                          </button>
                          <button
                            onClick={() => { setEditingId(null); setEditForm(null); }}
                            className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs hover:bg-gray-200 transition-colors"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* View Mode */
                      <>
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h4 className="font-bold font-serif text-brand-choco text-lg">
                              {product.name}
                            </h4>
                            <span className="text-xs font-bold text-brand bg-brand-vanilla px-2 py-1 rounded-md shrink-0">
                              {product.price || "35.000đ"}
                            </span>
                          </div>
                          <p className="text-xs text-brand-choco/70 line-clamp-2 leading-relaxed">
                            {product.desc}
                          </p>
                        </div>

                        {/* Card Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <Link
                            href={`/products/${product.id}`}
                            target="_blank"
                            className="text-xs text-brand font-semibold hover:underline flex items-center gap-1"
                          >
                            Xem trang chi tiết <ExternalLink size={12} />
                          </Link>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => startEdit(product)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-brand hover:bg-brand-vanilla/40 transition-colors cursor-pointer"
                              title="Chỉnh sửa thông tin"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id, product.name)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Xóa bánh"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
