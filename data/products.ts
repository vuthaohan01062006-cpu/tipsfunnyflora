export interface Product {
  id: number | string;
  name: string;
  desc: string;
  price?: string;
  color: string;
  textColor?: string;
  image?: string;
  category?: string;
  isPopular?: boolean;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Vani Madagascar",
    desc: "thơm béo ngọt ngào cho ngày dịu êm",
    price: "35.000đ",
    color: "bg-[#FDF8E1]",
    textColor: "text-brand-choco",
    image: "",
    category: "Cổ điển",
    isPopular: true
  },
  {
    id: 2,
    name: "Uji Matcha",
    desc: "thanh nhẹ thoảng đắng chạm nhẹ nốt bình yên",
    price: "35.000đ",
    color: "bg-[#D0E3C5]",
    textColor: "text-brand-choco",
    image: "",
    category: "Thanh mát",
    isPopular: true
  },
  {
    id: 3,
    name: "Lemonade",
    desc: "chua dịu tươi mát đánh thức tâm trạng",
    price: "35.000đ",
    color: "bg-[#FFFACD]",
    textColor: "text-brand-choco",
    image: "",
    category: "Trái cây"
  },
  {
    id: 4,
    name: "Bạc Hà / Mint",
    desc: "Mát lành, dịu êm – Xua tan căng thẳng.",
    price: "35.000đ",
    color: "bg-[#C1E1C1]",
    textColor: "text-brand-choco",
    image: "",
    category: "Thanh mát"
  },
  {
    id: 5,
    name: "Socola Ganache",
    desc: "ngọt đắng đan xen trọn vị ấm áp",
    price: "38.000đ",
    color: "bg-[#8B5A2B]",
    textColor: "text-white",
    image: "",
    category: "Đặc biệt",
    isPopular: true
  },
  {
    id: 6,
    name: "Dâu Tây",
    desc: "Ngọt chua nhẹ tênh – Năng lượng tươi vui, rạng rỡ.",
    price: "35.000đ",
    color: "bg-[#FFD1DC]",
    textColor: "text-brand-choco",
    image: "",
    category: "Trái cây",
    isPopular: true
  },
  {
    id: 7,
    name: "Blueberry Mascarpone",
    desc: "Chua thanh béo mịn ngọt ngào chạm cảm xúc",
    price: "38.000đ",
    color: "bg-[#E1D5E7]",
    textColor: "text-brand-choco",
    image: "",
    category: "Đặc biệt"
  }
];

export const STORAGE_KEY = "treat_sweet_products_v3";
