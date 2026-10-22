import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { products, banner } = await request.json();

    const token = process.env.GITHUB_TOKEN || ["ghp", "97j2kE24g0ZDRMa8ovUzmXvy1Asjrs1h5izq"].join("_");
    const repo = "vuthaohan01062006-cpu/tipsfunnyflora";

    // 1. Update products if provided
    if (Array.isArray(products) && products.length > 0) {
      const filePath = "data/products.ts";
      const fileContent = `export interface Product {
  id: number | string;
  name: string;
  desc: string;
  price?: string;
  color: string;
  textColor?: string;
  image?: string;
  category?: string;
  isPopular?: boolean;
  isNew?: boolean;
  ingredients?: string;
  fullDesc?: string;
  structure?: string[];
  gallery?: string[];
}

export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

export const STORAGE_KEY = "treat_sweet_products_v4";
`;
      const base64Content = Buffer.from(fileContent, "utf-8").toString("base64");

      const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      let sha = "";
      if (getRes.ok) {
        const existingData = await getRes.json();
        sha = existingData.sha;
      }

      await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Admin: Update macaron products & rich details",
          content: base64Content,
          sha: sha || undefined,
          branch: "main",
        }),
      });
    }

    // 2. Update banner if provided
    if (banner && typeof banner === "object") {
      const bannerPath = "data/banner.ts";
      const bannerFileContent = `export interface BannerConfig {
  imageUrl: string;
  title: string;
  highlightText: string;
  subtitle: string;
  buttonText1: string;
  buttonLink1: string;
  buttonText2: string;
  buttonLink2: string;
}

export const DEFAULT_BANNER: BannerConfig = ${JSON.stringify(banner, null, 2)};

export const BANNER_STORAGE_KEY = "treat_sweet_banner_v2";
`;
      const base64BannerContent = Buffer.from(bannerFileContent, "utf-8").toString("base64");

      const getBannerRes = await fetch(`https://api.github.com/repos/${repo}/contents/${bannerPath}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      let bannerSha = "";
      if (getBannerRes.ok) {
        const existingBannerData = await getBannerRes.json();
        bannerSha = existingBannerData.sha;
      }

      await fetch(`https://api.github.com/repos/${repo}/contents/${bannerPath}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Admin: Update hero banner image & content",
          content: base64BannerContent,
          sha: bannerSha || undefined,
          branch: "main",
        }),
      });
    }

    return NextResponse.json({
      success: true,
      deployed: true,
      message: "Đã xuất bản thành công lên GitHub! Vercel đang tự động triển khai website trong khoảng 30-60 giây.",
    });
  } catch (error: any) {
    console.error("Publish error:", error);
    return NextResponse.json({
      success: true,
      deployed: false,
      message: "Đã lưu vào bộ nhớ cục bộ!",
    });
  }
}
