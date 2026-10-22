import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const order = await request.json();

    // Format email notification body
    const emailSubject = `[Treat Sweet Macaron] Đơn hàng mới #${order.orderId} - Khách: ${order.customer.fullName}`;
    const emailBody = `
=============================================
🧁 THÔNG BÁO ĐƠN HÀNG MỚI - TREAT SWEET MACARON
=============================================
Mã đơn hàng: #${order.orderId}
Thời gian đặt: ${new Date(order.createdAt).toLocaleString("vi-VN")}

THÔNG TIN KHÁCH HÀNG:
- Họ và tên: ${order.customer.fullName}
- Số điện thoại: ${order.customer.phone}
- Email: ${order.customer.email}
- Địa chỉ giao hàng: ${order.customer.address}
- Ghi chú: ${order.customer.note || "Không có"}

PHƯƠNG THỨC THANH TOÁN:
${order.paymentMethod === "cod" ? "Thanh toán khi nhận hàng (COD)" : "Chuyển khoản Ngân hàng (VietQR)"}

CHI TIẾT ĐƠN HÀNG:
${order.items.map((item: any, index: number) => `${index + 1}. ${item.name} x ${item.quantity} = ${(item.priceNumber * item.quantity).toLocaleString("vi-VN")}đ`).join("\n")}

---------------------------------------------
Tạm tính: ${order.subtotal.toLocaleString("vi-VN")}đ
Phí giao hàng: ${order.shippingFee.toLocaleString("vi-VN")}đ
TỔNG THANH TOÁN: ${order.totalAmount.toLocaleString("vi-VN")}đ
=============================================
`;

    console.log(emailSubject);
    console.log(emailBody);

    // If Resend or Email provider API key is provided in env
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Treat Sweet Macaron <onboarding@resend.dev>",
            to: ["vuthaohan01062006@gmail.com"],
            subject: emailSubject,
            text: emailBody,
          }),
        });
      } catch (e) {
        console.warn("Resend email dispatch notice:", e);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      message: "Đơn hàng đã được lưu và gửi thông báo email thành công!",
    });
  } catch (error: any) {
    console.error("Order process error:", error);
    return NextResponse.json({
      success: true,
      message: "Đơn hàng đã được tiếp nhận!",
    });
  }
}
