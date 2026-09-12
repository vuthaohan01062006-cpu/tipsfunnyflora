import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Tips Funny Flora | Hoa Tươi Mới 100% – Đặt Trước 4 Giờ",
  description: "Tiệm hoa Tips Funny - Chuyên các dòng hoa thiết kế, hoa pre-order 4 tiếng. Cam kết hoa tươi mới 100%.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
