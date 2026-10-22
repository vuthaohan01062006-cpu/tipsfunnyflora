export interface BlogPost {
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

export const DEFAULT_SITE_CONTENT: SiteContent = {
  "blogs": [
    {
      "id": 1,
      "title": "Khi ngôn từ ngập ngừng, hãy để hộp Macaron thay bạn nói lời thương",
      "category": "Quà tặng",
      "date": "22/10/2026",
      "readTime": "4 phút đọc",
      "excerpt": "Có những ngày ta muốn nói với người thương rằng 'Hôm nay vất vả rồi nhé', nhưng lời nói lại ngại ngùng nơi khóe môi. Một chiếc hộp bánh macaron thắt nơ lụa nắn nót chính là cách dịu dàng nhất để bạn gửi trao sự nâng niu mà không cần phô trương.",
      "content": "Đã bao giờ bạn đứng trước người mình yêu thương – sau một ngày dài họ trở về với đôi mắt mỏi mệt và tiếng thở dài khe khẽ – mà nhận ra mọi lời an ủi bỗng trở nên vụng về?\n\nNgôn từ đôi khi quá ồn ào cho những cảm xúc cần sự lắng đọng. Nhưng sự hiện diện của một chiếc hộp quà nhỏ xinh, được bọc trong lớp giấy mỹ thuật pastel dập kim nhũ vàng, thắt nơ lụa mềm mại thì khác. Nó không đòi hỏi đối phương phải đối đáp hay giải thích bất kỳ điều gì.\n\nKhi mở nắp hộp, hương thơm thanh khiết của hạnh nhân và bơ tươi Pháp nhẹ nhàng lan tỏa. Mỗi chiếc bánh macaron với màu sắc ngọt ngào tựa một nốt nhạc êm dịu xoa dịu những âu lo:\n• Một chiếc Dâu Tây Rượu Champagne đượm vị lãng mạn, như muốn nói: \"Em/Anh luôn là điều rực rỡ nhất trong mắt anh/em.\"\n• Một chiếc Vani Bourbon Madagascar ngọt ấm vỗ về: \"Mọi chuyện rồi sẽ ổn thôi, hãy tự thưởng cho mình một chút bình yên.\"\n• Một chiếc Socola Đen 70% nồng nàn sâu lắng: \"Anh/Em luôn ở đây, đồng hành cùng bạn qua mọi thăng trầm.\"\n\nKhông cần đợi đến ngày Valentine, lễ kỷ niệm tròn năm hay một dịp trọng đại nào đó. Tình yêu đích thực thường nảy mầm từ những bất ngờ rất đỗi dịu dàng vào một buổi chiều thứ Tư bình thường: một tin nhắn \"Tan sở ghé nhà nhé, có món quà nhỏ chờ bạn\", và chiếc thiệp viết tay nắn nót gài bên cạnh hộp bánh.\n\nHãy để vị ngọt thanh tao của Treat Sweet Macaron chạm vào trái tim người bạn thương, thay cho nghìn lời muốn nói.",
      "image": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=85",
      "author": "Treat Sweet Storyteller"
    },
    {
      "id": 2,
      "title": "Quà tặng chữa lành: Tại sao Macaron là món quà dịu dàng nhất cho người bạn yêu?",
      "category": "Quà tặng",
      "date": "21/10/2026",
      "readTime": "5 phút đọc",
      "excerpt": "Tặng quà không nằm ở giá trị vật chất xa hoa, mà là tặng một khoảng lặng ngọt ngào. Macaron tựa như một nụ hôn nước Pháp – vỏ giòn tan e ấp, lớp kem mịn mượt vỗ về từng giác quan mệt mỏi.",
      "content": "Giữa muôn vàn lựa chọn quà tặng – từ hoa tươi chóng tàn đến những món đồ xa xỉ đắt tiền – chiếc bánh macaron thủ công luôn giữ một vị thế đặc biệt trong lòng những người yêu chuộng sự tinh tế.\n\nTại sao macaron lại mang sức mạnh chữa lành kỳ diệu đến vậy?\n\n1. Kích thước vừa vặn trong lòng bàn tay:\nMột chiếc macaron nhỏ bé không tạo cảm giác nặng nề hay ngấy ngán. Nó là một \"viên kẹo hạnh phúc\" đúng nghĩa: cắn nhẹ là lớp vỏ meringue giòn tan rụm, kế tiếp là lớp ruột dẻo ẩm và dòng nhân ganache mềm mượt như nhung ôm trọn lấy đầu lưỡi.\n\n2. Trải nghiệm đa giác quan:\nTừ thị giác với những gam màu pastel thơ mộng, khứu giác đượm hương hoa quả tự nhiên, đến thính giác với tiếng vỡ giòn tan tinh tế của lớp vỏ chân ren. Tặng macaron chính là tặng một trải nghiệm thưởng thức mang tính nghệ thuật.\n\n3. Thông điệp của sự nâng niu:\nLàm được một mẻ macaron hoàn hảo đòi hỏi sự nhẫn nại phi thường và kỹ thuật chuẩn xác từng gram của người thợ. Khi bạn chọn tặng ai đó một hộp macaron, bạn đang ngầm trao gửi thông điệp: \"Bạn xứng đáng với những điều được chăm chút tỉ mỉ và tinh tuyển nhất.\"\n\nGửi tặng hộp bánh nhỏ đến bàn làm việc của người yêu vào lúc 3 giờ chiều khi deadline đang căng thẳng, hoặc mang về nhà sau giờ làm kèm một ly trà hoa cúc ấm nóng. Bạn sẽ thấy một nụ cười rạng rỡ bất ngờ xuất hiện trên gương mặt người thương – và đó là khoảnh khắc vô giá mà không món quà nào khác có thể thay thế.",
      "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=1200&q=85",
      "author": "Hương Vị Yêu Thương"
    },
    {
      "id": 3,
      "title": "Học cách yêu lấy chính mình (Self-love) và sẻ chia cùng người đồng hành",
      "category": "Cảm xúc",
      "date": "19/10/2026",
      "readTime": "4 phút đọc",
      "excerpt": "Trước khi trao đi tình yêu cho ai đó, bạn đã từng tự thưởng cho chính mình một chiếc bánh ngọt chưa? 'Small Treat, Sweet Day' – hãy mua cho mình một hộp quà nhỏ, và chia đôi chiếc bánh ấy cùng người bạn trân quý nhất.",
      "content": "Chúng ta thường rất hào phóng khi mua quà cho người khác, nhưng lại thường khắt khe với chính mình. Sau những ngày chạy đua với công việc, với trách nhiệm gia đình và những lo toan cuộc sống, đã bao lâu rồi bạn chưa tự thưởng cho bản thân một buổi chiều thảnh thơi thực sự?\n\nTại Treat Sweet, triết lý \"Small Treat, Sweet Day\" bắt đầu từ việc học cách vỗ về chính mình. \nTự mua cho mình một hộp macaron không phải là sự nuông chiều xa xỉ, mà là một lời công nhận: \"Bạn đã làm rất tốt rồi, hãy nghỉ ngơi và tận hưởng chút ngọt ngào này đi.\"\n\nVà điều kỳ diệu là, khi tâm hồn bạn được lấp đầy bởi sự ngọt ngào và an yên, tình yêu bạn trao đi sẽ trở nên tròn đầy và chân thành nhất. \n\nHãy mở hộp bánh ấy ra, đặt lên đĩa sứ nhỏ, pha hai tách trà Earl Grey và cùng người đồng hành của bạn ngồi lại bên ban công lộng gió. Bẻ đôi một chiếc bánh vỏ giòn, chia nhau từng nốt hương vị, cùng đoán xem vị chua dịu của Chanh Leo hay vị bùi béo của Hạt Dẻ Nướng đang lan tỏa. \n\nHạnh phúc đôi khi giản đơn chỉ là: một món quà mua cho chính mình, nhưng lại nhân đôi niềm vui khi được sẻ chia cùng người thương.",
      "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=85",
      "author": "Small Treat, Sweet Day"
    },
    {
      "id": 4,
      "title": "Cẩm nang mix hộp Custom Box: Đọc vị tính cách người thương qua từng nốt hương",
      "category": "Quà tặng",
      "date": "16/10/2026",
      "readTime": "6 phút đọc",
      "excerpt": "Người bạn thương là cô gái mộng mơ, chàng trai nội tâm sâu sắc, hay người mẹ thích sự thanh tao mộc mạc? Khám phá nghệ thuật chọn vị macaron chuẩn gu để hộp quà trở thành kỷ vật độc bản.",
      "content": "Một món quà chạm đến trái tim là món quà cho thấy người tặng đã thấu hiểu người nhận sâu sắc đến nhường nào. Đừng chỉ chọn đại một hộp bánh ngẫu nhiên, hãy biến hộp Custom Box 6 hoặc 12 chiếc của Treat Sweet thành một \"bản giao hưởng hương vị\" dành riêng cho người ấy:\n\n1. Dành cho cô nàng ngọt ngào, mộng mơ:\n• Dâu Tây Rượu Champagne: Vị ngọt thanh của dâu tây Pháp quyện chút men say nồng nàn.\n• Vani Bourbon Madagascar: Hương thơm ấm áp, dịu êm như cái ôm buổi sớm.\n• Mâm Xôi Hoa Hồng: Từng cánh hoa hồng bung nở trong khoang miệng.\n\n2. Dành cho chàng trai điềm đạm, sâu sắc:\n• Socola Đen Ganache 70%: Đắng nhẹ đầu lưỡi, ngọt hậu bền bỉ, mạnh mẽ và nam tính.\n• Cà Phê Muối Biển Caramel: Chút mặn mà xua tan mệt mỏi, tràn đầy năng lượng tỉnh táo.\n\n3. Dành cho Mẹ và những người trân quý sự thanh tao:\n• Trà Xanh Matcha Uji Kyoto: Vị chát thanh thoát chuẩn trà đạo Nhật Bản, thanh lọc tâm hồn.\n• Hạnh Nhân Rang Bơ Pháp: Thơm bùi nguyên bản, vị ngọt ít thanh nhã.\n\n4. Dành cho dịp lễ hội & Kỷ niệm đặc biệt:\n• BST Theo Mùa (Seasonal Specials): Bí ngô quế gừng ấm cúng mùa thu, hay kẹo bạc hà tuyết giáng sinh rộn ràng.\n\nMỗi hộp quà Custom Box tại Treat Sweet đều được dập kim nhũ vàng sang trọng, thắt nơ ruy băng lụa mềm và kèm theo thiệp viết tay nhắn gửi lời yêu thương. Hãy nhắn tin cho chúng mình để cùng tạo nên chiếc hộp quà đong đầy cảm xúc nhất nhé!",
      "image": "https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=1200&q=85",
      "author": "Bếp Bánh Treat Sweet"
    },
    {
      "id": 5,
      "title": "Bí mật của chiếc viền chân ren (Pied) hoàn hảo",
      "category": "Kỹ thuật",
      "date": "12/10/2026",
      "readTime": "4 phút đọc",
      "excerpt": "Chân ren không chỉ là dấu hiệu của một chiếc macaron đạt chuẩn kỹ thuật, mà còn là kết tinh của sự kiên nhẫn khi hong khô vỏ bánh dưới nhiệt độ và độ ẩm khắt khe.",
      "content": "Trong nghệ thuật làm macaron chuẩn Pháp, chiếc viền chân ren (Pied de macaron) được ví như dấu ấn vương miện của người thợ làm bánh. Để tạo nên chiếc viền chân ren nở đều, xốp mịn mà không bị nứt mặt hay rỗng ruột, người thợ phải trải qua công đoạn macaronage chuẩn xác từng nhát vét bột. Sau đó là khoảng thời gian nghỉ tĩnh lặng hong khô vỏ bánh từ 30 đến 45 phút cho đến khi chạm nhẹ đầu ngón tay không dính bột. Mỗi mẻ bánh ra lò là một bài học về sự nhẫn nại và tình yêu dành cho sự hoàn hảo.",
      "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
      "author": "Treat Sweet Baker"
    },
    {
      "id": 6,
      "title": "Hành trình tìm kiếm quả Vani Bourbon Madagascar",
      "category": "Nguyên liệu",
      "date": "08/10/2026",
      "readTime": "5 phút đọc",
      "excerpt": "Tại sao chúng mình từ chối hương liệu vani nhân tạo để theo đuổi những quả vani đen bóng được thụ phấn thủ công từ bờ bên kia Ấn Độ Dương?",
      "content": "Vani tự nhiên và tinh mùi vani nhân tạo là hai thế giới hoàn toàn khác biệt. Quả Vani Bourbon từ vùng đất Madagascar màu mỡ phải trải qua hơn 9 tháng ủ hương tự nhiên dưới nắng trời và bàn tay chăm sóc thủ công của những người nông dân bản địa. Khi rạch đôi quả vani đen bóng, hàng ngàn hạt vani li ti lấp lánh tỏa ra mùi hương gỗ mộc mạc, ngọt ấm và đọng lại bền bỉ nơi cuống họng. Đó là lý do trong từng chiếc bánh macaron Vani Madagascar của Treat Sweet, bạn luôn nhìn thấy những đốm đen nhỏ li ti tự nhiên – minh chứng cho sự nguyên bản và cao cấp.",
      "image": "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=85",
      "author": "Nguyên Liệu Xanh"
    }
  ],
  "customBox": {
    "title": "Tự Tay Mix Hộp Quà Theo Cảm Xúc",
    "subtitle": "Dành tặng bản thân hoặc người thương một hộp macaron mang thông điệp riêng. Chọn 6 hoặc 12 nốt hương bạn yêu thích kèm thiệp viết tay nắn nót.",
    "image": "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=85",
    "box6Price": "210.000đ",
    "box12Price": "410.000đ",
    "description": "Hộp quà được thiết kế độc quyền từ giấy mỹ thuật pastel dập kim nhũ vàng, thắt nơ ruy băng lụa mềm mại và tặng kèm thiệp viết tay nhắn gửi lời thương.",
    "notes": "Miễn phí giao hàng cho hộp 12 bánh hoặc đơn từ 200.000đ tại TP.HCM.",
    "zaloLink": "https://zalo.me/0909123456",
    "hotline": "0909 123 456"
  },
  "about": {
    "title": "Về Treat Sweet Macaron",
    "subtitle": "Small Treat, Sweet Day – Phần thưởng ngọt ngào xoa dịu những nhọc nhằn",
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85",
    "storyP1": "Treat Sweet Macaron ra đời từ một căn bếp nhỏ ngập tràn mùi bơ thơm và tiếng nhạc Pháp êm dịu. Chúng mình tin rằng, giữa nhịp sống hối hả và bộn bề lo toan, ai trong chúng ta cũng xứng đáng có được những giây phút được vỗ về dịu dàng bằng một chiếc bánh ngọt ngào thủ công chuẩn vị.",
    "storyP2": "Không chạy theo sản xuất công nghiệp đại trà, mỗi chiếc bánh macaron tại Treat Sweet đều được nặn tay tỉ mỉ, canh chỉnh nhiệt độ lò nướng từng phút và tuyển chọn những nguyên liệu tự nhiên cao cấp nhất: từ bơ tươi Anchor Pháp, hạt hạnh nhân xay mịn, bột trà xanh Uji Kyoto đến quả vani Bourbon Madagascar nguyên chất.",
    "commitments": [
      {
        "title": "100% Thủ Công Chuẩn Pháp",
        "desc": "Kỹ thuật macaronage chuẩn xác, viền chân ren nở đều, vỏ giòn xốp dai ẩm đặc trưng."
      },
      {
        "title": "Nguyên Liệu Tự Nhiên Tuyển Chọn",
        "desc": "Tuyệt đối không sử dụng chất bảo quản công nghiệp hay phụ gia tạo mùi nhân tạo."
      },
      {
        "title": "Tươi Mới Trong Ngày",
        "desc": "Bánh được nướng tươi mới mỗi sáng để giữ trọn vẹn kết cấu mịn màng và độ ẩm hoàn hảo."
      }
    ],
    "quote": "Một chiếc bánh nhỏ có thể không thay đổi cả thế giới, nhưng chắc chắn có thể làm sáng bừng một ngày của bạn."
  },
  "contact": {
    "hotline": "0909 123 456",
    "address": "123 Đường Pasteur, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    "email": "treatsweet.macaron@gmail.com",
    "openHours": "08:30 - 21:30 (Mở cửa tất cả các ngày trong tuần)",
    "facebookUrl": "https://facebook.com/treatsweet.macaron",
    "tiktokUrl": "https://tiktok.com/@treatsweet.macaron",
    "zaloUrl": "https://zalo.me/0909123456"
  }
};

export const SITE_CONTENT_STORAGE_KEY = "treat_sweet_site_content_v3";
