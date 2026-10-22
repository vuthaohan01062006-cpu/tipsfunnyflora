export interface Product {
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

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Vani Madagascar",
    desc: "Thơm béo ngọt ngào cho ngày dịu êm.",
    price: "35.000đ",
    color: "bg-[#FDF8E1]",
    textColor: "text-brand-choco",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80",
    category: "Cổ điển",
    isPopular: true
  },
  {
    id: 2,
    name: "Uji Matcha",
    desc: "Thanh nhẹ thoảng đắng chạm nhẹ nốt bình yên.",
    price: "35.000đ",
    color: "bg-[#D0E3C5]",
    textColor: "text-brand-choco",
    image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=600&q=80",
    category: "Thanh mát",
    isPopular: true
  },
  {
    id: 3,
    name: "Lemonade",
    desc: "Chua dịu tươi mát đánh thức tâm trạng.",
    price: "35.000đ",
    color: "bg-[#FFFACD]",
    textColor: "text-brand-choco",
    image: "https://images.unsplash.com/photo-1570476922354-81227cdbb76c?auto=format&fit=crop&w=600&q=80",
    category: "Trái cây"
  },
  {
    id: 4,
    name: "Bạc Hà / Mint",
    desc: "Mát lành, dịu êm – Xua tan căng thẳng.",
    price: "35.000đ",
    color: "bg-[#C1E1C1]",
    textColor: "text-brand-choco",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80",
    category: "Thanh mát"
  },
  {
    id: 5,
    name: "Socola Ganache",
    desc: "Ngọt đắng đan xen trọn vị ấm áp.",
    price: "38.000đ",
    color: "bg-[#8B5A2B]",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
    category: "Trái cây",
    isPopular: true
  },
  {
    id: 7,
    name: "Blueberry Mascarpone",
    desc: "Chua thanh béo mịn ngọt ngào chạm cảm xúc.",
    price: "38.000đ",
    color: "bg-[#E1D5E7]",
    textColor: "text-brand-choco",
    image: "https://images.unsplash.com/photo-1558024920-b41e1887dc32?auto=format&fit=crop&w=600&q=80",
    category: "Đặc biệt"
  }
];

export const STORAGE_KEY = "treat_sweet_products_v2";
