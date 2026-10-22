export interface Product {
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

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": 1,
    "name": "Vani Madagascar",
    "desc": "thơm béo ngọt ngào cho ngày dịu êm",
    "price": "35.000đ",
    "color": "bg-[#FDF8E1]",
    "textColor": "text-brand-choco",
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
    "category": "Cổ điển",
    "isPopular": true,
    "isNew": true,
    "ingredients": "Quả Vani Bourbon Madagascar tự nhiên, Bơ tươi Pháp Anchor, Hạnh nhân xay mịn, Lòng trắng trứng chuẩn nhiệt độ phòng",
    "fullDesc": "Được mệnh danh là linh hồn của thế giới bánh ngọt Pháp, chiếc macaron Vani Madagascar mang đến sự êm dịu tuyệt đối với những đốm hạt vani tự nhiên li ti đan quyện trong lớp kem ganache mềm mịn. Hương thơm quý phái, béo nhẹ và không gắt là sự vỗ về dịu dàng nhất cho những ngày nhiều trăn trở.",
    "structure": [
      "Vỏ bánh: Hạnh nhân nướng giòn rụm bên ngoài, dai ẩm xốp nhẹ bên trong",
      "Lớp kem lót: Ganache sô cô la trắng hòa quyện tinh chất vani Bourbon nguyên chất",
      "Hậu vị: Thoảng nốt bơ sữa thơm ngậy và vị ngọt thanh tao đọng lại dài lâu"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=85"
    ]
  },
  {
    "id": 2,
    "name": "Uji Matcha",
    "desc": "thanh nhẹ thoảng đắng chạm nhẹ nốt bình yên",
    "price": "35.000đ",
    "color": "bg-[#D0E3C5]",
    "textColor": "text-brand-choco",
    "image": "https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=800&q=85",
    "category": "Thanh mát",
    "isPopular": true,
    "isNew": false,
    "ingredients": "Bột trà xanh Uji Kyoto thượng hạng vụ xuân, Socola trắng nguyên chất, Kem sữa tươi nguyên kem",
    "fullDesc": "Tuyển chọn từ những đọt trà non tươi nhất tại vùng Uji (Kyoto, Nhật Bản), chiếc macaron matcha sở hữu sắc xanh mướt tự nhiên cùng hương vị trà xanh mộc mạc. Vị đắng thanh nhẹ ban đầu nhanh chóng nhường chỗ cho vị ngọt hậu umami dịu dàng, mang lại cảm giác an yên như một buổi sớm thanh tịnh.",
    "structure": [
      "Vỏ bánh: Vỏ xanh ngọc bích từ bột Uji matcha hữu cơ nướng chuẩn viền chân ren (pied)",
      "Nhân bánh: Kem matcha ganache đậm đặc, cân bằng vị chát nhẹ và độ ngọt kem béo",
      "Hậu vị: Nốt hương thảo mộc trà xanh lan tỏa bền bỉ và thư thái"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1570476922354-81227cdbb76c?auto=format&fit=crop&w=800&q=85"
    ]
  },
  {
    "id": 3,
    "name": "Lemonade",
    "desc": "chua dịu tươi mát đánh thức tâm trạng",
    "price": "35.000đ",
    "color": "bg-[#FFFACD]",
    "textColor": "text-brand-choco",
    "image": "https://images.unsplash.com/photo-1570476922354-81227cdbb76c?auto=format&fit=crop&w=800&q=85",
    "category": "Trái cây",
    "isPopular": false,
    "isNew": true,
    "ingredients": "Nước cốt chanh vàng Meyer tươi ép trong ngày, Vỏ chanh bào tinh dầu, Bơ lạt New Zealand",
    "fullDesc": "Một luồng gió tươi mới đánh thức mọi giác quan. Lemonade Macaron là sự kết hợp táo bạo giữa vị chua thanh sảng khoái của nước cốt chanh vàng Meyer và lớp bơ mềm béo ngậy. Chiếc bánh màu vàng nắng ấm áp sẽ lập tức xua tan mọi mỏi mệt trong ngày dài.",
    "structure": [
      "Vỏ bánh: Màu vàng pastel sáng trong điểm xuyết tinh dầu chanh thơm ngát",
      "Nhân bánh: Lớp kem chanh (Lemon Curd) nấu chậm mượt mà với độ chua tươi mới",
      "Hậu vị: Dư vị chua ngọt đan xen kích thích vị giác và bừng tỉnh năng lượng"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1570476922354-81227cdbb76c?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85"
    ]
  },
  {
    "id": 4,
    "name": "Bạc Hà / Mint",
    "desc": "Mát lành, dịu êm, xua tan căng thẳng.",
    "price": "35.000đ",
    "color": "bg-[#C1E1C1]",
    "textColor": "text-brand-choco",
    "image": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85",
    "category": "Thanh mát",
    "isPopular": false,
    "isNew": false,
    "ingredients": "Chiết xuất lá bạc hà tươi hữu cơ, Socola đen 65% nghiền hạt vụn, Bơ tươi động vật",
    "fullDesc": "Mang hơi thở the mát dịu êm của những nhánh bạc hà vườn nhà, chiếc bánh là nốt nhạc tươi vui giải nhiệt cho tâm hồn. Sự mát lạnh len lỏi ngay khi chạm môi, hòa cùng chút socola đen giòn tan khiến bạn thư thái tức thì.",
    "structure": [
      "Vỏ bánh: Xanh ngọc pastel dịu mắt, giòn vỏ xốp ruột",
      "Nhân bánh: Kem mint ganache the mát sảng khoái, không hề nồng gắt",
      "Hậu vị: Luồng khí mát lành lưu lại nơi cuống họng, nhẹ tênh và sảng khoái"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85"
    ]
  },
  {
    "id": 5,
    "name": "Socola Ganache",
    "desc": "ngọt đắng đan xen trọn vị ấm áp",
    "price": "38.000đ",
    "color": "bg-[#8B5A2B]",
    "textColor": "text-white",
    "image": "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=85",
    "category": "Đặc biệt",
    "isPopular": true,
    "isNew": false,
    "ingredients": "Socola Bỉ Callebaut 70% nguyên chất, Bột ca cao hạt rang thủ công, Kem béo động vật Elle & Vire",
    "fullDesc": "Dành riêng cho những tín đồ say đắm hương cacao đậm đà. Socola Ganache Macaron là bản hòa tấu sâu lắng giữa vị đắng thanh lịch và vị béo quyến rũ của socola Bỉ trứ danh. Mỗi miếng bánh như một cái ôm ấm áp vỗ về cảm xúc trong buổi chiều mưa.",
    "structure": [
      "Vỏ bánh: Vỏ bánh nâu socola đậm đà đẫm bột ca cao nguyên chất hảo hạng",
      "Nhân bánh: Ganache socola Bỉ nấu sệt sánh mịn, đắng êm dịu mà quyến rũ",
      "Hậu vị: Nốt hương khói cacao trầm ấm lưu lại lâu dài và đầy mê hoặc"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85"
    ]
  },
  {
    "id": 6,
    "name": "Dâu Tây",
    "desc": "Ngọt chua nhẹ tênh, năng lượng tươi vui, rạng rỡ.",
    "price": "35.000đ",
    "color": "bg-[#FFD1DC]",
    "textColor": "text-brand-choco",
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=85",
    "category": "Trái cây",
    "isPopular": true,
    "isNew": true,
    "ingredients": "Quả dâu tây Đà Lạt chín mọng, Mứt dâu nấu chậm thủ công, Kem phô mai tươi",
    "fullDesc": "Sắc hồng phấn ngọt ngào tựa như nụ cười đầu tiên của mùa xuân. Vị chua thanh tự nhiên từ những quả dâu tây tuyển chọn hòa quyện cùng vị ngọt dịu dàng, mang lại nguồn năng lượng tích cực, tươi vui và đầy thơ mộng.",
    "structure": [
      "Vỏ bánh: Hồng phấn pastel mộng mơ làm từ nước cốt củ dền và dâu tự nhiên",
      "Nhân bánh: Lớp mứt dâu tây rim sệt kết hợp ganache dâu tươi thơm lừng",
      "Hậu vị: Chua ngọt cân bằng, nhẹ nhõm như bước đi giữa khu vườn hoa quả"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1570476922354-81227cdbb76c?auto=format&fit=crop&w=800&q=85"
    ]
  },
  {
    "id": 7,
    "name": "Blueberry Mascarpone",
    "desc": "Chua thanh béo mịn ngọt ngào chạm cảm xúc",
    "price": "38.000đ",
    "color": "bg-[#E1D5E7]",
    "textColor": "text-brand-choco",
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
    "category": "Đặc biệt",
    "isPopular": true,
    "isNew": true,
    "ingredients": "Việt quất tươi nhập khẩu, Phô mai Mascarpone Ý mềm mượt, Chanh vàng, Bơ Pháp",
    "fullDesc": "Tuyệt phẩm hòa quyện giữa sự béo ngậy nhung mượt của phô mai Mascarpone trứ danh vùng Lombardy (Ý) và vị chua sâu lắng của mứt việt quất tím thẫm. Một trải nghiệm ẩm thực tinh tế, chạm sâu đến từng ngóc ngách của cảm xúc người thưởng thức.",
    "structure": [
      "Vỏ bánh: Tím taro mộng mơ sang trọng, nướng chuẩn viền cao đều đặn",
      "Nhân bánh: Lõi mứt việt quất chua đượm bọc ngoài bởi lớp phô mai Mascarpone béo mịn",
      "Hậu vị: Nốt béo ngậy của kem sữa hòa quyện vị thanh thoát quyến rũ của quả mọng"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=85"
    ]
  }
];

export const STORAGE_KEY = "treat_sweet_products_v4";
