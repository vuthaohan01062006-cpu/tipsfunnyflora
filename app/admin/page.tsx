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
  AlertCircle
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
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
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Editing product state
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editForm, setEditForm] = useState<Product | null>(null);

  // Hidden file input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetId, setUploadTargetId] = useState<string | number | null>(null);

  // Check auth and load products
  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_logged_in");
    if (loggedIn !== "true") {
      router.push("/admin/login");
      return;
    }
    setIsAuth(true);

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
  const saveToLocal = (newProductsList: Product[]) => {
    setProducts(newProductsList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProductsList));
    showNotification("Đã lưu thay đổi vào bộ nhớ! Trang chủ sẽ hiển thị ngay.", "success");
  };

  // Handle Image Upload for existing product
  const triggerImageUpload = (id: string | number) => {
    setUploadTargetId(id);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showNotification("Kích thước file ảnh nên nhỏ hơn 5MB để web tải nhanh!", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      if (!base64Url) return;

      if (uploadTargetId === "new") {
        setNewProduct(prev => ({ ...prev, image: base64Url }));
        showNotification("Đã chọn ảnh cho sản phẩm mới!", "info");
      } else if (uploadTargetId !== null) {
        const updated = products.map(p => 
          p.id === uploadTargetId ? { ...p, image: base64Url } : p
        );
        saveToLocal(updated);
        showNotification("Đã cập nhật ảnh mới thành công!", "success");
      }
    };
    reader.readAsDataURL(file);
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
      image: newProduct.image || "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80",
      category: newProduct.category,
    };

    const updated = [...products, created];
    saveToLocal(updated);
    setNewProduct({
      name: "",
      desc: "",
      price: "35.000đ",
      color: "bg-[#FDF8E1]",
      image: "",
      category: "Bộ sưu tập",
    });
    setShowAddForm(false);
    showNotification(`Đã thêm thành công vị bánh "${created.name}"!`, "success");
  };

  // Delete product
  const handleDeleteProduct = (id: string | number, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa bánh "${name}" không?`)) {
      const updated = products.filter(p => p.id !== id);
      saveToLocal(updated);
      showNotification(`Đã xóa vị bánh "${name}".`, "info");
    }
  };

  // Start Edit
  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  // Save Edit
  const saveEdit = () => {
    if (!editForm) return;
    const updated = products.map(p => p.id === editForm.id ? editForm : p);
    saveToLocal(updated);
    setEditingId(null);
    setEditForm(null);
    showNotification("Đã lưu chỉnh sửa thông tin bánh!", "success");
  };

  // Reset to default
  const handleResetDefault = () => {
    if (confirm("Khôi phục danh sách 7 hương vị Macaron ban đầu?")) {
      saveToLocal(INITIAL_PRODUCTS);
      showNotification("Đã khôi phục dữ liệu ban đầu!", "info");
    }
  };

  // Publish to Vercel & GitHub
  const handlePublishToLive = async () => {
    setIsPublishing(true);
    showNotification("Đang xuất bản dữ liệu lên hệ thống Vercel...", "info");

    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products }),
      });

      const data = await res.json();
      if (data.success) {
        showNotification(data.message || "Xuất bản thành công lên Website!", "success");
      } else {
        showNotification("Có lỗi khi đồng bộ, nhưng dữ liệu đã được lưu trên máy của bạn.", "error");
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
      <header className="bg-white border-b border-brand-vanilla sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-bold text-lg font-serif">
              M
            </span>
            <div>
              <h1 className="text-xl font-bold font-serif leading-tight">Treat Sweet Admin</h1>
              <p className="text-xs text-brand-choco/60">Trang Quản Trị Hình Ảnh & Sản Phẩm</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center text-xs font-semibold px-4 py-2 rounded-xl border border-brand/30 hover:bg-brand-vanilla text-brand-choco transition-colors"
            >
              <ExternalLink size={14} className="mr-1.5 text-brand" /> Xem Website Khách Hàng
            </Link>

            <button
              onClick={handlePublishToLive}
              disabled={isPublishing}
              className="inline-flex items-center text-xs font-bold px-4 py-2 rounded-xl bg-brand hover:bg-brand-dark text-white shadow-sm transition-all disabled:opacity-50"
            >
              <Send size={14} className="mr-1.5" />
              {isPublishing ? "Đang xuất bản..." : "Xuất bản lên Web"}
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center text-xs font-medium px-3 py-2 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
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
        {/* Banner Quick Guide */}
        <div className="bg-gradient-to-r from-brand-vanilla to-[#FFF0F5] p-6 rounded-3xl border border-brand/20 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-brand-choco mb-1 flex items-center gap-2">
              <Sparkles size={18} className="text-brand" /> Hướng dẫn tải ảnh nhanh
            </h2>
            <p className="text-sm text-brand-choco/80 max-w-2xl">
              1. Bấm vào nút <strong>"Tải ảnh từ máy"</strong> trên bất kỳ chiếc bánh nào để chọn ảnh có sẵn trong máy tính hoặc điện thoại.<br />
              2. Bấm <strong>"Xuất bản lên Web"</strong> ở góc trên bên phải để cập nhật ngay cho khách hàng!
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center text-xs font-bold px-4 py-2.5 rounded-xl bg-brand text-white hover:bg-brand-dark transition-colors shadow-sm"
            >
              <Plus size={16} className="mr-1" /> Thêm vị bánh mới
            </button>
            <button
              onClick={handleResetDefault}
              className="inline-flex items-center text-xs font-medium px-3 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
              title="Khôi phục 7 vị bánh ban đầu"
            >
              <RefreshCw size={14} className="mr-1" /> Khôi phục
            </button>
          </div>
        </div>

        {/* Form Add New Product */}
        {showAddForm && (
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand/30 shadow-md mb-8 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-brand-choco flex items-center gap-2">
                <Plus size={20} className="text-brand" /> Thêm Hương Vị / Bánh Macaron Mới
              </h3>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600 text-sm"
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
                  Giá bán
                </label>
                <input
                  type="text"
                  placeholder="35.000đ"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                  Mô tả hương vị / Cảm xúc
                </label>
                <textarea
                  rows={2}
                  placeholder="Vị chua thanh mát mẻ, hậu ngọt dễ chịu..."
                  value={newProduct.desc}
                  onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                  Tải ảnh từ máy tính / điện thoại
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => triggerImageUpload("new")}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl border-2 border-dashed border-brand/40 hover:border-brand bg-brand-vanilla/20 text-brand-choco text-sm font-medium transition-colors"
                  >
                    <Upload size={16} className="mr-2 text-brand" />
                    {newProduct.image ? "Đổi ảnh đã chọn" : "Bấm để chọn file ảnh"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-choco/70 mb-2">
                  Hoặc dán Link URL ảnh online
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                />
              </div>

              {newProduct.image && (
                <div className="md:col-span-2 flex items-center gap-4 p-3 bg-brand-vanilla/30 rounded-2xl">
                  <img
                    src={newProduct.image}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-xl shadow-sm border border-brand/20"
                  />
                  <div className="text-xs text-brand-choco">
                    <strong>Ảnh đã tải:</strong> Xem trước thành công.
                  </div>
                </div>
              )}

              <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand text-white font-bold text-sm hover:bg-brand-dark shadow-sm"
                >
                  Lưu & Thêm bánh
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Grid */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold font-serif text-brand-choco">
              Bộ Sưu Tập Bánh ({products.length})
            </h2>
            <p className="text-xs text-brand-choco/60">
              Danh sách các vị bánh đang hiển thị trên trang chủ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const isEditing = editingId === product.id;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden border border-brand-vanilla shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Product Image Box */}
                <div className="relative aspect-[4/3] bg-brand-vanilla/30 overflow-hidden group">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon size={36} className="mb-2" />
                      <span className="text-xs">Chưa có ảnh</span>
                    </div>
                  )}

                  {/* Overlay buttons to upload image */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                    <button
                      type="button"
                      onClick={() => triggerImageUpload(product.id)}
                      className="bg-white text-brand-choco text-xs font-bold px-3 py-2 rounded-xl shadow-lg hover:bg-brand hover:text-white transition-colors flex items-center"
                    >
                      <Upload size={14} className="mr-1" /> Tải ảnh từ máy
                    </button>
                  </div>

                  {/* Price Tag Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-choco shadow-sm">
                    {product.price || "35.000đ"}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  {isEditing && editForm ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-gray-500">Tên bánh:</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full text-sm font-bold px-2 py-1 rounded-lg border border-brand"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500">Giá:</label>
                        <input
                          type="text"
                          value={editForm.price}
                          onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                          className="w-full text-xs px-2 py-1 rounded-lg border border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500">Mô tả:</label>
                        <textarea
                          rows={2}
                          value={editForm.desc}
                          onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })}
                          className="w-full text-xs px-2 py-1 rounded-lg border border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500">Link ảnh trực tiếp:</label>
                        <input
                          type="text"
                          value={editForm.image}
                          onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                          className="w-full text-xs px-2 py-1 rounded-lg border border-gray-300"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={saveEdit}
                          className="flex-1 bg-brand text-white text-xs font-bold py-1.5 rounded-lg flex items-center justify-center gap-1"
                        >
                          <Check size={14} /> Lưu
                        </button>
                        <button
                          onClick={() => { setEditingId(null); setEditForm(null); }}
                          className="px-3 bg-gray-100 text-gray-600 text-xs py-1.5 rounded-lg"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-base font-bold text-brand-choco mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-brand-choco/70 mb-4 line-clamp-2 leading-relaxed">
                        {product.desc}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => triggerImageUpload(product.id)}
                          className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
                        >
                          <Upload size={13} /> Đổi ảnh
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEdit(product)}
                            className="p-1.5 text-gray-400 hover:text-brand hover:bg-brand-vanilla rounded-lg transition-colors"
                            title="Sửa thông tin"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa bánh"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
