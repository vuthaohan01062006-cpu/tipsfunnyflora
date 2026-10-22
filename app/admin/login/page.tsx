'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Kiểm tra thông tin đăng nhập mẫu (hỗ trợ cả admin123 và macaron2026)
    if (username.trim() === 'admin' && (password === 'admin123' || password === 'macaron2026')) {
      // Đăng nhập thành công, lưu session xác thực
      localStorage.setItem('admin_logged_in', 'true');
      localStorage.setItem('admin_login_time', Date.now().toString());
      document.cookie = 'admin_auth=true; path=/; max-age=86400';
      // Chuyển hướng đến trang quản trị
      router.push('/admin');
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không chính xác!');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Đăng nhập Quản trị</h2>
          <p className="mt-2 text-sm text-gray-600">
            Vui lòng nhập thông tin tài khoản để tiếp tục
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Nhập username (admin)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Nhập mật khẩu (admin123)"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Đăng nhập
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-gray-400">
          Tài khoản mẫu: <strong>admin</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
}
