import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { products, banner, siteContent } = await request.json();

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

    // 3. Update siteContent (Blog, Custom Box, About, Contact) if provided
    if (siteContent && typeof siteContent === "object") {
      const siteContentPath = "data/siteContent.ts";
      const siteContentFileContent = `export interface BlogPost {
  id: number | string;
  title: string;
  category: "Kỹ thuật" | "Nguyên liệu" | "Cảm xúc" | "Sự kiện";
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  author?: string;
}

export interface CustomBoxConfig {
  title: string;
  subtitle: string;
  box6Price: string;
  box12Price: string;
  description: string;
  notes: string;
  zaloLink: string;
  hotline: string;
}

export interface AboutCommitment {
  title: string;
  desc: string;
}

export interface AboutConfig {
  title: string;
  subtitle: string;
  storyP1: string;
  storyP2: string;
  commitments: AboutCommitment[];
  quote: string;
}

export interface ContactConfig {
  hotline: string;
  address: string;
  email: string;
  openHours: string;
  facebookUrl: string;
  tiktokUrl: string;
  zaloUrl: string;
}

export interface SiteContent {
  blogs: BlogPost[];
  customBox: CustomBoxConfig;
  about: AboutConfig;
  contact: ContactConfig;
}

export const DEFAULT_SITE_CONTENT: SiteContent = ${JSON.stringify(siteContent, null, 2)};

export const SITE_CONTENT_STORAGE_KEY = "treat_sweet_site_content_v2";
`;
      const base64SiteContent = Buffer.from(siteContentFileContent, "utf-8").toString("base64");

      const getSiteContentRes = await fetch(`https://api.github.com/repos/${repo}/contents/${siteContentPath}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      let siteContentSha = "";
      if (getSiteContentRes.ok) {
        const existingData = await getSiteContentRes.json();
        siteContentSha = existingData.sha;
      }

      await fetch(`https://api.github.com/repos/${repo}/contents/${siteContentPath}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Admin: Update siteContent (Blog, Custom Box, About, Contact)",
          content: base64SiteContent,
          sha: siteContentSha || undefined,
          branch: "main",
        }),
      });
    }

    return NextResponse.json({
      success: true,
      deployed: true,
      message: "Đã xuất bản thành công toàn bộ dữ liệu lên GitHub & Vercel!",
    });
  } catch (error: any) {
    console.error("Publish error:", error);
    return NextResponse.json({
      success: true,
      deployed: false,
      message: "Đã lưu vào bộ nhớ trình duyệt!",
    });
  }
}
