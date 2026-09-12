"use client";
import { useState } from "react";
import { Calendar, Clock, Gift, MessageSquare } from "lucide-react";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [accessories, setAccessories] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const handleAccessoryChange = (acc: string) => {
    if (accessories.includes(acc)) {
      setAccessories(accessories.filter(a => a !== acc));
    } else {
      setAccessories([...accessories, acc]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Placeholder */}
        <div className="bg-gray-100 rounded-3xl aspect-square flex items-center justify-center">
          <span className="text-gray-400">Hình ảnh sản phẩm (Product Image)</span>
        </div>

        {/* Product Info */}
        <div>
          <span className="text-tiffany font-bold tracking-wider text-sm uppercase mb-2 block">Tips Funny Special</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Bó Hoa Tự Chữa Lành (Emergency Smile)</h1>
          <p className="text-2xl font-bold text-gray-900 mb-6">250.000đ</p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Bó hoa nhỏ gọn đính kèm một chiếc lọ thủy tinh chứa 30 lá thư cuộn nhỏ. 
            Mỗi lá thư là một câu quote hài hước / động viên mỗi ngày. Thiết kế độc bản, 
            phù hợp làm quà tặng sinh nhật, an ủi bạn bè hoặc dịp tốt nghiệp.
          </p>

          <form className="space-y-8 border-t border-gray-100 pt-8" onSubmit={e => e.preventDefault()}>
            
            {/* Date & Time Slot Picker */}
            <div className="bg-tiffany-light/10 p-6 rounded-2xl border border-tiffany/20">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="text-tiffany mr-2" size={20} />
                Thời Gian Nhận Hoa (Pre-order 4H)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Vì hoa tươi nhập mới 100% theo đơn, vui lòng chọn thời gian nhận sau ít nhất 4 tiếng tính từ hiện tại.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ngày nhận</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tiffany/50 focus:border-tiffany"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Khung giờ</label>
                  <select 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tiffany/50 focus:border-tiffany"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                  >
                    <option value="">Chọn khung giờ</option>
                    <option value="09:00-11:00">09:00 - 11:00</option>
                    <option value="11:00-13:00">11:00 - 13:00</option>
                    <option value="13:00-15:00">13:00 - 15:00</option>
                    <option value="15:00-17:00">15:00 - 17:00</option>
                    <option value="17:00-19:00">17:00 - 19:00</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Accessories */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Gift className="text-tiffany mr-2" size={20} />
                Phụ kiện tặng kèm
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'bag', label: 'Túi xách giấy Tiffany cao cấp (+30.000đ)' },
                  { id: 'bear', label: 'Gấu bông mini (+50.000đ)' },
                  { id: 'choco', label: 'Socola thủ công (+80.000đ)' }
                ].map(item => (
                  <label key={item.id} className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-tiffany focus:ring-tiffany"
                      checked={accessories.includes(item.id)}
                      onChange={() => handleAccessoryChange(item.id)}
                    />
                    <span className="text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Card Message */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="text-tiffany mr-2" size={20} />
                Lời nhắn thiệp (Miễn phí)
              </h3>
              <textarea 
                rows={4}
                placeholder="Gợi ý: 'Hoa này không ăn được, nhưng nhìn em thì có thể 😉'"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tiffany/50 focus:border-tiffany resize-none"
                value={message}
                onChange={e => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-tiffany text-white font-bold text-lg py-4 rounded-xl hover:bg-tiffany-dark transition-colors shadow-lg shadow-tiffany/30">
              Đặt Hàng Ngay
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              Chúng tôi sẽ gửi ảnh xác nhận trước khi giao hàng qua Zalo.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
