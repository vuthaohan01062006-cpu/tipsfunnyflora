export interface SeasonalProduct {
  id: number | string;
  name: string;
  desc: string;
  price: string;
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

export const INITIAL_SEASONAL_PRODUCTS: SeasonalProduct[] = [
  {
    id: "seasonal-1",
    name: "Bí Ngô Quế Gừng (Autumn Pumpkin Spice)",
    desc: "Hương bí đỏ nghiền béo bùi thoảng nốt quế gừng ấm cúng xua tan se lạnh",
    price: "42.000đ",
    color: "bg-[#FBE8D3]",
    textColor: "text-[#8A4A1C]",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=85",
    category: "Mùa Thu",
    seasonTag: "Mùa Thu 🍂",
    isPopular: true,
    isNew: true,
    ingredients: "Bí ngô đỏ nghiền nhuyễn, Bột quế Ceylon hữu cơ, Gừng tươi già, Socola trắng Pháp Valrhona, Hạnh nhân xay mịn, Bơ Pháp",
    fullDesc: "Lấy cảm hứng từ những chiều thu Paris lá vàng rơi nhẹ trên đại lộ Champs-Élysées, chiếc macaron Bí Ngô Quế Gừng là bản giao hưởng ấm áp kết hợp giữa vị ngọt bùi tự nhiên của bí ngô nướng mật và nốt cay nhẹ tinh tế của bột quế Ceylon. Thưởng thức cùng một ly latte ấm là cách hoàn hảo để đón mùa mới.",
    structure: [
      "Vỏ bánh: Vàng mơ ấm áp, viền chân ren nở cao xốp nhẹ rụm phủ nhẹ bột quế thơm lừng",
      "Nhân kem: Ganache bí ngô bơ Pháp kết hợp tinh dầu gừng già ủ lạnh 24h",
      "Hậu vị: Vị ngọt bùi béo ngậy đọng lại cùng nốt cay nhẹ làm ấm cơ thể"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85"
    ]
  },
  {
    id: "seasonal-2",
    name: "Kẹo Bạc Hà Tuyết (Holiday Peppermint)",
    desc: "Sảng khoái the mát từ bạc hà tuyết hòa quyện socola đen đậm đà đêm giáng sinh",
    price: "42.000đ",
    color: "bg-[#E6F4F1]",
    textColor: "text-[#1C5D52]",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85",
    category: "Giáng Sinh",
    seasonTag: "Giáng Sinh 🎄",
    isPopular: true,
    isNew: true,
    ingredients: "Tinh dầu bạc hà tự nhiên Pháp, Socola đen Callebaut 70%, Vụn kẹo gậy cane giòn rụm, Bơ tươi Anchor, Hạnh nhân",
    fullDesc: "Chiếc bánh mang không khí rộn ràng của mùa lễ hội cuối năm. Vị the mát sảng khoái của bạc hà nguyên chất đối lập hoàn hảo với vị đắng ngọt quyến rũ của dòng socola đen Callebaut Bỉ. Điểm xuyết trên mặt bánh là lớp vụn kẹo gậy đường giòn tan tạo cảm giác thích thú trong từng miếng cắn.",
    structure: [
      "Vỏ bánh: Vỏ bánh hai tông màu trắng tuyết xoáy đỏ lễ hội rực rỡ, viền chân ren sắc nét",
      "Nhân kem: Ganache socola đen đậm đặc bọc lớp kem peppermint the lạnh sảng khoái",
      "Hậu vị: Cảm giác sảng khoái thanh thoát như làn gió tuyết mùa đông"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85"
    ]
  },
  {
    id: "seasonal-3",
    name: "Dâu Tây Rượu Champagne (Valentine Strawberry Rosé)",
    desc: "Vị chua ngọt thanh nhã của dâu tây kết hợp men say tinh tế của vang hồng nổ",
    price: "45.000đ",
    color: "bg-[#FCE7F3]",
    textColor: "text-[#9D174D]",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=85",
    category: "Valentine",
    seasonTag: "Valentine 💖",
    isPopular: true,
    isNew: false,
    ingredients: "Dâu tây Đà Lạt tươi mọng, Rượu vang nổ Sparkling Rosé cao cấp, Bột hạnh nhân cao cấp, Kem whipping Pháp, Bụi vàng thực phẩm",
    fullDesc: "Được mệnh danh là biểu tượng tình yêu của Treat Sweet, chiếc macaron hồng phấn phủ bụi vàng thực phẩm lấp lánh mang lại cảm giác lãng mạn vô tận. Phần nhân là sự hòa quyện nhịp nhàng giữa mứt dâu tây nấu chậm và sốt ganache rượu vang nổ thoang thoảng nốt men say quyến rũ.",
    structure: [
      "Vỏ bánh: Màu hồng pastel dịu dàng phủ bụi vàng ngọc trai, nướng nở chân ren đều tăm tắp",
      "Nhân bánh: Lõi mứt dâu tây tươi sánh mịn bọc quanh lớp ganache Champagne Rosé",
      "Hậu vị: Nốt hương men rượu vang nổ và quả mọng bung tỏa ngây ngất"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85"
    ]
  },
  {
    id: "seasonal-4",
    name: "Hạt Dẻ Nướng Mật Ong Rừng (Winter Roasted Chestnut)",
    desc: "Hạt dẻ Trùng Khánh nướng củi thơm nức, quyện mật ong rừng nguyên chất bùi béo",
    price: "42.000đ",
    color: "bg-[#F5EBE1]",
    textColor: "text-[#633917]",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85",
    category: "Mùa Đông",
    seasonTag: "Mùa Đông ❄️",
    isPopular: false,
    isNew: true,
    ingredients: "Hạt dẻ Trùng Khánh nướng chín, Mật ong hoa rừng tự nhiên, Bơ tươi Pháp, Vani Bourbon, Hạnh nhân lát nướng",
    fullDesc: "Gợi nhớ đến những bếp than hồng ấm cúng giữa trời đông giá lạnh. Từng hạt dẻ được tách vỏ thủ công, hấp chín mềm rồi xay mịn cùng mật ong hoa rừng sánh dẻo. Kem hạt dẻ có độ sánh đặc mịn màng, vị bùi béo tự nhiên mà không hề ngấy.",
    structure: [
      "Vỏ bánh: Nâu hạt dẻ mộc mạc, rắc mảnh hạnh nhân lát nướng giòn rụm",
      "Nhân bánh: Mousse hạt dẻ đậm đặc nấu cùng mật ong hoa dại và bơ sữa Pháp",
      "Hậu vị: Vị ngọt thanh của mật ong quyện cùng hương bùi béo ấm áp sâu lắng"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=85"
    ]
  }
];

export const SEASONAL_STORAGE_KEY = "treat_sweet_seasonal_v1";
