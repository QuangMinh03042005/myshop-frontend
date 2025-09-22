import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Thêm useNavigate
import { data } from "autoprefixer";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId")
  const navigate = useNavigate(); // Khởi tạo navigate

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${userId}/cart/items`, {
        headers: {
          Authorization: localStorage.getItem("jwt_token"),
        },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        
        const cartData = data.map((item) => ({
          productId: item.productId,
          cartId: item.cartId,
          name: item.productName,
          image: item.image,
          quantity: item.quantity,
          quantityInStock: item.quantityInStock,
          unitPrice: item.unitPrice,
          totalPrice: item.unitPrice * item.quantity,
          checked: true,
        }));
        setCart(cartData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  

  const handleCheck = (productId) => {
    setCart(
      cart.map((item) =>
        item.productId === productId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleQuantity = (productId, currQuantity, delta) => {
    console.log("delta: ", delta);

    const newQuantity = Math.max(1, currQuantity + delta)

    const res = axios.put(`http://localhost:8080/api/users/${userId}/cart/items`, {

      cartId: localStorage.getItem("cartId"),
      productId: productId,
      quantity: newQuantity

    }, {
      headers: {
        Authorization: localStorage.getItem("jwt_token")
      }
    }).then(() => setCart(
      cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    ))
      .catch((err) => console.log(err.message)
      )

  };

  const handleRemove = (productId) => {
    const res = axios.delete(`http://localhost:8080/api/users/${userId}/cart/items`, {
      data: {
        cartId: localStorage.getItem("cartId"),
        productId: productId
      },
      headers: {
        Authorization: localStorage.getItem("jwt_token")
      }
    },
    ).then(() => setCart(cart.filter((item) => item.productId !== productId)))
      .catch((err) => console.log(err.message))

  };

  const handleBuy = () => {
    const items = cart
      .filter((item) => item.checked === true)
      .map(({ checked, ...item }) => item);

    if (items.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
      return;
    }

    // Chuyển hướng sang trang Checkout và truyền dữ liệu qua state
    navigate("/checkout", { state: { items } });
  };

  const total = cart
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  if (loading)
    return <div className="text-center py-10">Đang tải giỏ hàng...</div>;

  return (
    <div className="max-w-5xl mx-auto my-10 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Giỏ hàng của bạn</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 h-12">
              <th className="w-10"></th>
              <th className="text-left font-medium">Sản phẩm</th>
              <th className="font-medium">Đơn giá</th>
              <th className="font-medium">Số lượng</th>
              <th className="font-medium">Thành tiền</th>
              <th className="w-16"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.productId} className="border-b last:border-b-0">
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheck(item.productId)}
                    className="w-4 h-4"
                  />
                </td>
                <td>
                  <div className="flex items-center gap-3 py-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover border rounded"
                    />
                    <span className="max-w-[220px] truncate">{item.name}</span>
                  </div>
                </td>
                <td className="text-center">{item.totalPrice.toLocaleString()}₫</td>
                <td>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleQuantity(item.productId, item.quantity, -1)}
                      disabled={item.quantity === 1}
                      className={`w-8 h-8 border rounded-l text-lg ${item.quantity === 1
                        ? "text-gray-300 border-gray-200"
                        : "hover:bg-gray-100 border-gray-300"
                        }`}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={item.quantityInStock}
                      value={item.quantity}
                      onChange={e => {
                        const val = Math.max(1, Math.min(item.quantityInStock, Number(e.target.value) || 1));
                        handleQuantity(item.productId, item.quantity, val - item.quantity);
                      }}
                      className="w-14 text-center border rounded h-8 mx-1"
                    />
                    <button
                      onClick={() => handleQuantity(item.productId, item.quantity, 1)}
                      disabled={item.quantity === item.quantityInStock}
                      className={`w-8 h-8 border rounded-r text-lg ${item.quantity === item.quantityInStock
                        ? "text-gray-300 border-gray-200"
                        : "hover:bg-gray-100 border-gray-300"
                        }`}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="font-semibold text-center">
                  {(item.unitPrice * item.quantity).toLocaleString()}₫
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center mt-8 gap-4">
        <span className="text-lg">Tổng thanh toán:</span>
        <span className="text-2xl font-bold">
          {total.toLocaleString()}₫
        </span>
        <button className="ml-6 bg-gray-700 hover:bg-gray-800 text-white px-10 py-3 rounded text-lg font-medium transition" onClick={handleBuy}>
          Mua hàng
        </button>
      </div>
    </div>
  );
}