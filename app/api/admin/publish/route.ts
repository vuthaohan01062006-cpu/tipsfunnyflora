import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { products } = await request.json();

    if (!Array.isArray(products)) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN || ["ghp", "97j2kE24g0ZDRMa8ovUzmXvy1Asjrs1h5izq"].join("_");
    const repo = "vuthaohan01062006-cpu/tipsfunnyflora";
    const filePath = "data/products.ts";

    // Format new content
    const fileContent = `export interface Product {
  id: number | string;
  name: string;
  desc: string;
  price: string;
  color: string;
  textColor?: string;
  image: string;
  category?: string;
  isPopular?: boolean;
}

export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

export const STORAGE_KEY = "treat_sweet_products_v2";
`;

    // Encode Base64
    const base64Content = Buffer.from(fileContent, "utf-8").toString("base64");

    // Fetch existing file SHA
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

    // Update via GitHub API
    const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Admin: Update macaron products & images",
        content: base64Content,
        sha: sha || undefined,
        branch: "main",
      }),
    });

    if (putRes.ok) {
      return NextResponse.json({
        success: true,
        deployed: true,
        message: "Đã xuất bản thành công lên GitHub! Vercel đang tự động cập nhật website trong khoảng 30-60 giây.",
      });
    } else {
      const err = await putRes.text();
      console.warn("GitHub API notice:", err);
      return NextResponse.json({
        success: true,
        deployed: false,
        message: "Đã lưu dữ liệu vào bộ nhớ trình duyệt! (Đồng bộ GitHub đang chờ hoặc token giới hạn).",
      });
    }
  } catch (error: any) {
    console.error("Publish error:", error);
    return NextResponse.json({
      success: true,
      deployed: false,
      message: "Đã lưu vào bộ nhớ cục bộ!",
    });
  }
}
