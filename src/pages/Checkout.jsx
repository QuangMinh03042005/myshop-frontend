import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = location.state?.items || [];
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Mặc định là thanh toán khi nhận hàng (COD)
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const handleOrder = () => {
    if (!address) {
      alert("Vui lòng nhập địa chỉ nhận hàng.");
      return;
    }

    // Gửi thông tin đơn hàng lên server
    const orderData = {
      items,
      address,
      paymentMethod,
      total,
    };

    console.log("Order Data:", orderData);
    alert("Đặt hàng thành công!");
    navigate("/"); // Chuyển về trang chủ hoặc trang xác nhận
  };

  if (items.length === 0) {
    return <div className="text-center py-10">Không có sản phẩm để thanh toán.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Thanh toán đơn hàng</h2>
      <div className="mb-6">
        <h3 className="font-medium mb-2">Sản phẩm</h3>
        <ul>
          {items.map(item => (
            <li key={item.productId} className="flex items-center gap-4 py-2 border-b last:border-b-0">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover border rounded" />
              <span className="flex-1">{item.name}</span>
              <span>x{item.quantity}</span>
              <span className="font-semibold">{(item.unitPrice * item.quantity).toLocaleString()}₫</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <label className="block font-medium mb-2">Địa chỉ nhận hàng</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Nhập địa chỉ nhận hàng..."
        />
      </div>
      <div className="mb-6">
        <h3 className="font-medium mb-2">Phương thức thanh toán</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="CASH" // Giá trị khớp với ENUM trong SQL
              checked={paymentMethod === "CASH"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Thanh toán khi nhận hàng (COD)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="CREDIT_CARD" // Giá trị khớp với ENUM trong SQL
              checked={paymentMethod === "CREDIT_CARD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Thanh toán bằng thẻ tín dụng
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="BANK_TRANSFER" // Giá trị khớp với ENUM trong SQL
              checked={paymentMethod === "BANK_TRANSFER"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Chuyển khoản ngân hàng
          </label>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg">Tổng thanh toán:</span>
        <span className="text-2xl font-bold">{total.toLocaleString()}₫</span>
      </div>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg font-medium transition"
        onClick={handleOrder}
        disabled={!address}
      >
        Xác nhận đặt hàng
      </button>
    </div>
  );
}