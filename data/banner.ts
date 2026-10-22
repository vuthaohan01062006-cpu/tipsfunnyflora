export interface BannerConfig {
  imageUrl: string;
  title: string;
  highlightText: string;
  subtitle: string;
  buttonText1: string;
  buttonLink1: string;
  buttonText2: string;
  buttonLink2: string;
}

export const DEFAULT_BANNER: BannerConfig = {
  "imageUrl": "/hero-macaron.png",
  "title": "Small Treat,",
  "highlightText": "Sweet Day",
  "subtitle": "Phần thưởng ngọt ngào xoa dịu những nhọc nhằn, gói ghém hương vị thủ công chuẩn Pháp trên tay bạn.",
  "buttonText1": "Khám phá 7 nốt hương vị",
  "buttonLink1": "#flavors",
  "buttonText2": "Đặt hộp quà custom",
  "buttonLink2": "#custom"
};

export const BANNER_STORAGE_KEY = "treat_sweet_banner_v2";
