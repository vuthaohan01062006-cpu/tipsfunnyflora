"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("macaron2026");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate validation
    setTimeout(() => {
      if (username.trim() === "admin" && password === "macaron2026") {
        localStorage.setItem("admin_logged_in", "true");
        localStorage.setItem("admin_login_time", Date.now().toString());
        document.cookie = "admin_auth=true; path=/; max-age=86400";
        router.push("/admin");
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại!");
        setIsLoading(false);
      }
    }, 400);
  };

  const handleQuickFill = () => {
    setUsername("admin");
    setPassword("macaron2026");
    setError("");
  };

  const handleQuickLogin = () => {
    localStorage.setItem("admin_logged_in", "true");
    localStorage.setItem("admin_login_time", Date.now().toString());
    document.cookie = "admin_auth=true; path=/; max-age=86400";
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center text-sm text-brand-choco/70 hover:text-brand mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Quay về trang chủ
        </Link>
        <h1 className="text-3xl font-extrabold text-brand-choco font-serif tracking-tight">
          Treat Sweet <span className="text-brand">Admin</span>
        </h1>
        <p className="mt-2 text-sm text-brand-choco/70">
          Cổng quản trị toàn diện: Banner, 7 Vị Bánh, Sản phẩm theo mùa, Blog, Custom Box, Về chúng mình, Liên hệ
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl sm:px-10 border border-brand-vanilla space-y-6">
          
          {/* 1-Click Fast Login Button */}
          <div className="p-4 bg-gradient-to-r from-brand-vanilla via-[#FFF0F5] to-brand-vanilla rounded-2xl border border-brand/30 text-center">
            <p className="text-xs font-bold text-brand-choco mb-2">Quyền Quản Trị Viên Đầy Đủ Đã Sẵn Sàng</p>
            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full py-3 px-4 rounded-xl shadow-md text-sm font-black text-white bg-brand hover:bg-brand-dark transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>⚡ ĐĂNG NHẬP NHANH QUẢN TRỊ (1-CLICK)</span>
            </button>
            <span className="text-[11px] text-brand-choco/70 block mt-2">Bấm nút trên để vào thẳng trang quản trị mà không cần gõ mật khẩu!</span>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-3 text-xs text-gray-400 uppercase font-semibold">hoặc đăng nhập thủ công</span>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                <AlertCircle size={18} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-brand-choco mb-1">
                Tài khoản (Username)
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-brand-choco sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-choco mb-1">
                Mật khẩu (Password)
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-brand-choco sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all disabled:opacity-50"
              >
                {isLoading ? "Đang xác thực..." : "Đăng Nhập"}
              </button>
            </div>
          </form>

          {/* Quick info box for the user */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="bg-brand-vanilla/60 rounded-2xl p-4 text-xs text-brand-choco/80 space-y-2">
              <div className="flex items-center font-bold text-brand-choco">
                <CheckCircle2 size={16} className="text-brand mr-1.5" />
                Thông tin đăng nhập mặc định:
              </div>
              <div className="flex justify-between items-center bg-white/80 p-2 rounded-lg border border-brand/20">
                <span>User: <strong>admin</strong> | Pass: <strong>macaron2026</strong></span>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="text-brand hover:underline font-bold text-xs"
                >
                  Điền nhanh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
