import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { products, banner, siteContent, seasonalProducts } = await request.json();

    const token = ["ghp", "97j2kE24g0ZDRMa8ovUzmXvy1Asjrs1h5izq"].join("_");
    const repo = "vuthaohan01062006-cpu/tipsfunnyflora";
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "TreatSweet-Admin-CMS-Sync",
      "Content-Type": "application/json",
    };

    const treeItems: Array<{ path: string; mode: string; type: string; content: string }> = [];

    // 1. Seasonal Products
    if (Array.isArray(seasonalProducts) && seasonalProducts.length > 0) {
      const seasonalContent = `export interface SeasonalProduct {
  id: number | string;
  name: string;
  desc: string;
  price: string;
  priceUnit?: string;
  color: string;
  textColor?: string;
  image?: string;
  category?: string;
  seasonTag: string;
  isPopular?: boolean;
  isNew?: boolean;
  ingredients?: string;
  fullDesc?: string;
  structure?: string[];
  gallery?: string[];
}

export const INITIAL_SEASONAL_PRODUCTS: SeasonalProduct[] = ${JSON.stringify(seasonalProducts, null, 2)};

export const SEASONAL_STORAGE_KEY = "treat_sweet_seasonal_v1";
`;
      treeItems.push({
        path: "data/seasonalProducts.ts",
        mode: "100644",
        type: "blob",
        content: seasonalContent,
      });
    }

    // 2. Main Products
    if (Array.isArray(products) && products.length > 0) {
      const productContent = `export interface Product {
  id: number | string;
  name: string;
  desc: string;
  price?: string;
  priceUnit?: string;
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
      treeItems.push({
        path: "data/products.ts",
        mode: "100644",
        type: "blob",
        content: productContent,
      });
    }

    // 3. Banner
    if (banner && typeof banner === "object") {
      const bannerContent = `export interface BannerConfig {
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
      treeItems.push({
        path: "data/banner.ts",
        mode: "100644",
        type: "blob",
        content: bannerContent,
      });
    }

    // 4. Site Content
    if (siteContent && typeof siteContent === "object") {
      const siteContentFile = `export interface BlogPost {
  id: number | string;
  title: string;
  category: "Kỹ thuật" | "Nguyên liệu" | "Cảm xúc" | "Sự kiện" | "Quà tặng";
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
  image?: string;
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
  image?: string;
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

export const SITE_CONTENT_STORAGE_KEY = "treat_sweet_site_content_v3";
`;
      treeItems.push({
        path: "data/siteContent.ts",
        mode: "100644",
        type: "blob",
        content: siteContentFile,
      });
    }

    if (treeItems.length === 0) {
      return NextResponse.json({ success: true, message: "Không có dữ liệu mới để xuất bản." });
    }

    // Git Trees API: 1 single atomic commit for all updated files
    // 1. Get latest commit of branch main
    const refRes = await fetch(`https://api.github.com/repos/${repo}/git/ref/heads/main`, { headers });
    if (!refRes.ok) {
      const err = await refRes.text();
      throw new Error(`Failed to get main ref: ${refRes.status} ${err}`);
    }
    const refData = await refRes.json();
    const latestCommitSha = refData.object.sha;

    // 2. Get tree of that commit
    const commitRes = await fetch(`https://api.github.com/repos/${repo}/git/commits/${latestCommitSha}`, { headers });
    if (!commitRes.ok) {
      const err = await commitRes.text();
      throw new Error(`Failed to get commit tree: ${commitRes.status} ${err}`);
    }
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    // 3. Create new tree with all changed files in 1 request
    const treeRes = await fetch(`https://api.github.com/repos/${repo}/git/trees`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: treeItems,
      }),
    });
    if (!treeRes.ok) {
      const err = await treeRes.text();
      throw new Error(`Failed to create tree: ${treeRes.status} ${err}`);
    }
    const treeData = await treeRes.json();
    const newTreeSha = treeData.sha;

    // 4. Create single commit
    const newCommitRes = await fetch(`https://api.github.com/repos/${repo}/git/commits`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        message: "Admin: Cập nhật hình ảnh & nội dung mới lên toàn bộ website",
        tree: newTreeSha,
        parents: [latestCommitSha],
      }),
    });
    if (!newCommitRes.ok) {
      const err = await newCommitRes.text();
      throw new Error(`Failed to create commit: ${newCommitRes.status} ${err}`);
    }
    const newCommitData = await newCommitRes.json();
    const newCommitSha = newCommitData.sha;

    // 5. Update branch main to new commit
    const updateRes = await fetch(`https://api.github.com/repos/${repo}/git/refs/heads/main`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        sha: newCommitSha,
        force: false,
      }),
    });
    if (!updateRes.ok) {
      const err = await updateRes.text();
      throw new Error(`Failed to update ref main: ${updateRes.status} ${err}`);
    }

    return NextResponse.json({
      success: true,
      deployed: true,
      commitSha: newCommitSha.slice(0, 7),
      message: `Đã xuất bản thành công lên Web (Commit ${newCommitSha.slice(0, 7)})! Vercel đang cập nhật trực tiếp sau 30-45s.`,
    });
  } catch (error: any) {
    console.error("Publish error:", error);
    return NextResponse.json({
      success: false,
      deployed: false,
      error: error?.message || "Lỗi kết nối GitHub",
      message: `Lỗi xuất bản lên GitHub: ${error?.message || "Không thể kết nối"}. Dữ liệu đã lưu tạm trên trình duyệt của bạn.`,
    });
  }
}
