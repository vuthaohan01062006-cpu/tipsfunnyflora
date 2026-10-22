export type Language = "vi" | "en";

export interface Translations {
  [key: string]: {
    vi: string;
    en: string;
  };
}

export const DICTIONARY: Translations = {
  // Navigation
  "nav.brand": { vi: "TREAT SWEET", en: "TREAT SWEET" },
  "nav.brandSub": { vi: "MACARON", en: "MACARON" },
  "nav.home": { vi: "Trang Chủ", en: "Home" },
  "nav.menu": { vi: "Menu / Sản Phẩm", en: "Menu / Products" },
  "nav.blog": { vi: "Sau Lớp Vỏ", en: "Behind The Shell" },
  "nav.custom": { vi: "Custom Box", en: "Custom Box" },
  "nav.about": { vi: "Về Chúng Mình", en: "About Us" },
  "nav.contact": { vi: "Liên Hệ", en: "Contact" },
  "nav.admin": { vi: "Quản trị viên", en: "Admin Portal" },
  "nav.search": { vi: "Tìm kiếm", en: "Search" },
  "nav.cart": { vi: "Giỏ hàng", en: "Shopping Cart" },

  // Hero Banner
  "hero.title": { vi: "Small Treat,", en: "Small Treat," },
  "hero.highlight": { vi: "Sweet Day", en: "Sweet Day" },
  "hero.subtitle": { 
    vi: "Phần thưởng ngọt ngào xoa dịu những nhọc nhằn, gói ghém hương vị thủ công chuẩn Pháp trên tay bạn.", 
    en: "A sweet artisanal reward soothing daily fatigue, wrapping authentic French craftsmanship in your hands." 
  },
  "hero.btnFlavors": { vi: "Khám phá 7 nốt hương vị", en: "Explore 7 Flavors" },
  "hero.btnCustom": { vi: "Đặt hộp quà custom", en: "Order Custom Gift Box" },

  // Flavors Section
  "flavors.sectionTitle": { vi: "Bộ Sưu Tập Hương Vị", en: "Flavor Collection" },
  "flavors.sectionSubtitle": { 
    vi: "Mỗi vị bánh là một lời nhắn nhủ, một cảm xúc được nâng niu. Hãy chọn cho mình một nốt hương đồng điệu.", 
    en: "Each macaron carries a gentle note, an emotion to cherish. Find the melody that resonates with you." 
  },
  "flavors.addToCart": { vi: "Thêm vào giỏ", en: "Add to cart" },
  "flavors.viewDetail": { vi: "Xem chi tiết", en: "View details" },
  "flavors.toastAdded": { vi: "Đã thêm vào giỏ hàng!", en: "Added to cart!" },
  "flavors.viewCartNow": { vi: "Xem giỏ hàng", en: "View cart" },

  // Product Detail Page
  "detail.breadcrumbHome": { vi: "Trang chủ", en: "Home" },
  "detail.breadcrumbProducts": { vi: "Sản phẩm", en: "Products" },
  "detail.hotBadge": { vi: "Hot", en: "Hot" },
  "detail.newBadge": { vi: "Mới", en: "New" },
  "detail.vatNote": { vi: "(Giá chưa bao gồm thuế VAT)", en: "(Price excludes VAT)" },
  "detail.ingredientsTitle": { vi: "Thành phần nguyên liệu tuyển chọn:", en: "Selected Premium Ingredients:" },
  "detail.structureTitle": { vi: "Cấu trúc bánh:", en: "Macaron Structure:" },
  "detail.quantity": { vi: "Số lượng:", en: "Quantity:" },
  "detail.addToCartBtn": { vi: "Thêm vào giỏ hàng", en: "Add to Cart" },
  "detail.buyNowBtn": { vi: "Mua ngay", en: "Buy Now" },
  "detail.contactZalo": { vi: "Liên hệ tư vấn (Zalo)", en: "Consult via Zalo" },
  "detail.share": { vi: "Chia sẻ", en: "Share" },
  "detail.relatedTitle": { vi: "Các Nốt Hương Vị Khác Bạn Sẽ Thích", en: "Other Flavors You Might Love" },
  "detail.backToHome": { vi: "Quay về trang chủ", en: "Back to Home" },

  // Cart Drawer
  "cart.title": { vi: "Giỏ Hàng", en: "Shopping Cart" },
  "cart.emptyTitle": { vi: "Giỏ hàng của bạn đang trống", en: "Your cart is empty" },
  "cart.emptySub": { vi: "Hãy chọn những chiếc Macaron ngọt ngào bạn yêu thích nhé!", en: "Discover our sweet delicate macarons and add them to your cart!" },
  "cart.exploreBtn": { vi: "Khám phá menu ngay", en: "Explore Menu" },
  "cart.clearAll": { vi: "Xóa tất cả", en: "Clear all" },
  "cart.subtotal": { vi: "Tạm tính", en: "Subtotal" },
  "cart.shipping": { vi: "Phí giao hàng", en: "Shipping fee" },
  "cart.shippingFree": { vi: "Miễn phí", en: "Free" },
  "cart.freeShipNote": { vi: "Miễn phí giao hàng cho đơn từ 200.000đ", en: "Free shipping for orders over 200,000 VND" },
  "cart.total": { vi: "Tổng thanh toán", en: "Total" },
  "cart.checkoutBtn": { vi: "Tiến Hành Đặt Hàng", en: "Proceed to Checkout" },
  "cart.continueShopping": { vi: "Tiếp tục mua hàng", en: "Continue Shopping" },

  // Checkout Modal
  "checkout.title": { vi: "Thông Tin Đặt Hàng & Thanh Toán", en: "Checkout & Payment Information" },
  "checkout.name": { vi: "Họ và tên của bạn *", en: "Full Name *" },
  "checkout.namePlaceholder": { vi: "Nguyễn Văn A", en: "Jane Doe" },
  "checkout.phone": { vi: "Số điện thoại nhận bánh *", en: "Phone Number *" },
  "checkout.phonePlaceholder": { vi: "0909 123 456", en: "0909 123 456" },
  "checkout.address": { vi: "Địa chỉ giao hàng chi tiết *", en: "Shipping Address *" },
  "checkout.addressPlaceholder": { vi: "Số nhà, tên đường, phường, quận/huyện, tỉnh/TP", en: "Street address, ward, district, city" },
  "checkout.email": { vi: "Email nhận hóa đơn xác nhận", en: "Confirmation Email" },
  "checkout.notes": { vi: "Ghi chú cho tiệm bánh (nếu có)", en: "Order notes (optional)" },
  "checkout.paymentMethod": { vi: "Phương thức thanh toán", en: "Payment Method" },
  "checkout.cod": { vi: "Thanh toán khi nhận hàng (COD)", en: "Cash On Delivery (COD)" },
  "checkout.codSub": { vi: "Kiểm tra bánh tươi và thanh toán trực tiếp cho shipper", en: "Inspect fresh macarons and pay directly to courier" },
  "checkout.bank": { vi: "Chuyển khoản Ngân hàng (VietQR)", en: "Bank Transfer (VietQR)" },
  "checkout.bankSub": { vi: "Tự động sinh mã VietQR theo đúng số tiền, quét mã 3 giây", en: "Instant dynamic VietQR code, scan in 3 seconds" },
  "checkout.qrInstruction": { vi: "Mở ứng dụng Ngân hàng bất kỳ để quét mã QR thanh toán nhanh:", en: "Open any banking app to scan and pay instantly:" },
  "checkout.accountName": { vi: "Chủ TK: VŨ THẢO HÂN", en: "Account: VU THAO HAN" },
  "checkout.bankName": { vi: "Ngân hàng: MB Bank (Quân Đội)", en: "Bank: MB Bank" },
  "checkout.accountNo": { vi: "STK: 0909123456", en: "Acc No: 0909123456" },
  "checkout.submitBtn": { vi: "Xác Nhận Đặt Hàng", en: "Confirm Order" },
  "checkout.submitting": { vi: "Đang xử lý đơn hàng...", en: "Processing order..." },

  // Success
  "success.title": { vi: "Đặt Hàng Thành Công!", en: "Order Placed Successfully!" },
  "success.sub": { 
    vi: "Cảm ơn bạn đã lựa chọn Treat Sweet Macaron. Tiệm đã tiếp nhận đơn và sẽ chuẩn bị những chiếc bánh thơm lành nhất cho bạn.", 
    en: "Thank you for choosing Treat Sweet Macaron. We have received your order and are preparing fresh treats for you." 
  },
  "success.orderId": { vi: "Mã đơn hàng của bạn:", en: "Your order ID:" },
  "success.continue": { vi: "Tiếp tục dạo tiệm", en: "Continue browsing" }
};
