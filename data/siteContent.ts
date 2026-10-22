export interface BlogPost {
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

export const DEFAULT_SITE_CONTENT: SiteContent = {
  blogs: [
    {
      id: 1,
      title: "Bí mật của chiếc viền chân ren (Pied) hoàn hảo",
      category: "Kỹ thuật",
      date: "20/10/2026",
      readTime: "4 phút đọc",
      excerpt: "Chân ren không chỉ là dấu hiệu của một chiếc macaron đạt chuẩn kỹ thuật, mà còn là kết tinh của sự kiên nhẫn khi hong khô vỏ bánh dưới nhiệt độ và độ ẩm khắt khe.",
      content: "Trong nghệ thuật làm macaron chuẩn Pháp, chiếc viền chân ren (Pied de macaron) được ví như dấu ấn vương miện của người thợ làm bánh. Để tạo nên chiếc viền chân ren nở đều, xốp mịn mà không bị nứt mặt hay rỗng ruột, người thợ phải trải qua công đoạn macaronage chuẩn xác từng nhát vét bột. Sau đó là khoảng thời gian nghỉ tĩnh lặng hong khô vỏ bánh từ 30 đến 45 phút cho đến khi chạm nhẹ đầu ngón tay không dính bột. Mỗi mẻ bánh ra lò là một bài học về sự nhẫn nại và tình yêu dành cho sự hoàn hảo.",
      image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
      author: "Treat Sweet Baker"
    },
    {
      id: 2,
      title: "Hành trình tìm kiếm quả Vani Bourbon Madagascar",
      category: "Nguyên liệu",
      date: "15/10/2026",
      readTime: "5 phút đọc",
      excerpt: "Tại sao chúng mình từ chối hương liệu vani nhân tạo để theo đuổi những quả vani đen bóng được thụ phấn thủ công từ bờ bên kia Ấn Độ Dương?",
      content: "Vani tự nhiên và tinh mùi vani nhân tạo là hai thế giới hoàn toàn khác biệt. Quả Vani Bourbon từ vùng đất Madagascar màu mỡ phải trải qua hơn 9 tháng ủ hương tự nhiên dưới nắng trời và bàn tay chăm sóc thủ công của những người nông dân bản địa. Khi rạch đôi quả vani đen bóng, hàng ngàn hạt vani li ti lấp lánh tỏa ra mùi hương gỗ mộc mạc, ngọt ấm và đọng lại bền bỉ nơi cuống họng. Đó là lý do trong từng chiếc bánh macaron Vani Madagascar của Treat Sweet, bạn luôn nhìn thấy những đốm đen nhỏ li ti tự nhiên – minh chứng cho sự nguyên bản và cao cấp.",
      image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=85",
      author: "Nguyên Liệu Xanh"
    },
    {
      id: 3,
      title: "Quy tắc 10 phút vàng: Thưởng thức Macaron đúng điệu",
      category: "Cảm xúc",
      date: "10/10/2026",
      readTime: "3 phút đọc",
      excerpt: "Đừng vội ăn ngay khi vừa lấy bánh ra khỏi tủ lạnh. Hãy dành 10 phút để vỏ bánh và lớp kem đạt đến nhiệt độ phòng hoàn hảo nhất.",
      content: "Macaron là món bánh ngọt tinh tế đến mức nhiệt độ thưởng thức cũng quyết định 50% hương vị. Khi bánh ở nhiệt độ quá lạnh, lớp kem ganache bên trong sẽ đông cứng và không thể lan tỏa trọn vẹn tinh dầu tự nhiên. Khoảng thời gian 10 phút sau khi lấy bánh ra khỏi ngăn mát là 'thời khắc vàng': lớp vỏ ngoài vẫn giữ độ giòn tan nhẹ rụm, trong khi phần nhân bên trong đã kịp mềm mịn như nhung, sẵn sàng tan chảy ngay trên đầu lưỡi khi bạn cắn miếng đầu tiên kèm một tách trà Earl Grey ấm nóng.",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=85",
      author: "Trà & Bánh"
    }
  ],
  customBox: {
    title: "Tự Tay Mix Hộp Quà Theo Cảm Xúc",
    subtitle: "Dành tặng bản thân hoặc người thương một hộp macaron mang thông điệp riêng. Chọn 6 hoặc 12 nốt hương bạn yêu thích kèm thiệp viết tay nắn nót.",
    box6Price: "210.000đ",
    box12Price: "410.000đ",
    description: "Hộp quà được thiết kế độc quyền từ giấy mỹ thuật pastel dập kim nhũ vàng, thắt nơ ruy băng lụa mềm mại và tặng kèm thiệp viết tay nhắn gửi lời thương.",
    notes: "Miễn phí giao hàng cho hộp 12 bánh hoặc đơn từ 200.000đ tại TP.HCM.",
    zaloLink: "https://zalo.me/0909123456",
    hotline: "0909 123 456"
  },
  about: {
    title: "Về Treat Sweet Macaron",
    subtitle: "Small Treat, Sweet Day – Phần thưởng ngọt ngào xoa dịu những nhọc nhằn",
    storyP1: "Treat Sweet Macaron ra đời từ một căn bếp nhỏ ngập tràn mùi bơ thơm và tiếng nhạc Pháp êm dịu. Chúng mình tin rằng, giữa nhịp sống hối hả và bộn bề lo toan, ai trong chúng ta cũng xứng đáng có được những giây phút được vỗ về dịu dàng bằng một chiếc bánh ngọt ngào thủ công chuẩn vị.",
    storyP2: "Không chạy theo sản xuất công nghiệp đại trà, mỗi chiếc bánh macaron tại Treat Sweet đều được nặn tay tỉ mỉ, canh chỉnh nhiệt độ lò nướng từng phút và tuyển chọn những nguyên liệu tự nhiên cao cấp nhất: từ bơ tươi Anchor Pháp, hạt hạnh nhân xay mịn, bột trà xanh Uji Kyoto đến quả vani Bourbon Madagascar nguyên chất.",
    commitments: [
      {
        title: "100% Thủ Công Chuẩn Pháp",
        desc: "Kỹ thuật macaronage chuẩn xác, viền chân ren nở đều, vỏ giòn xốp dai ẩm đặc trưng."
      },
      {
        title: "Nguyên Liệu Tự Nhiên Tuyển Chọn",
        desc: "Tuyệt đối không sử dụng chất bảo quản công nghiệp hay phụ gia tạo mùi nhân tạo."
      },
      {
        title: "Tươi Mới Trong Ngày",
        desc: "Bánh được nướng tươi mới mỗi sáng để giữ trọn vẹn kết cấu mịn màng và độ ẩm hoàn hảo."
      }
    ],
    quote: "Một chiếc bánh nhỏ có thể không thay đổi cả thế giới, nhưng chắc chắn có thể làm sáng bừng một ngày của bạn."
  },
  contact: {
    hotline: "0909 123 456",
    address: "123 Đường Pasteur, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    email: "treatsweet.macaron@gmail.com",
    openHours: "08:30 - 21:30 (Mở cửa tất cả các ngày trong tuần)",
    facebookUrl: "https://facebook.com/treatsweet.macaron",
    tiktokUrl: "https://tiktok.com/@treatsweet.macaron",
    zaloUrl: "https://zalo.me/0909123456"
  }
};

export const SITE_CONTENT_STORAGE_KEY = "treat_sweet_site_content_v2";
