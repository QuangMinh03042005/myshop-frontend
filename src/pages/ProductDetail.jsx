import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ShopInfo from "../components/ShopInfo";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/product/${productId}`, {
      headers: {
        Authorization: localStorage.getItem("jwt_token")
      }
    })
      .then(res => setProduct(res.data))
      .catch(err => console.error("Lỗi khi lấy sản phẩm:", err));
  }, [productId]);

  if (!product) return <div className="text-center mt-10">Đang tải sản phẩm...</div>;

  const handleDecrease = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity(prev => (prev < product.quantityInStock ? prev + 1 : prev));
  };


  return (
    <>
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.productName}
          className="w-full rounded-xl shadow-md object-cover"
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.productName}</h1>
          <p className="text-gray-600">Cửa hàng: <span className="font-medium">{product.shopName}</span></p>
          <p className="text-red-500 text-2xl font-semibold">{product.price.toLocaleString()} ₫</p>
          <p className="text-gray-700">Kho: <span className="font-medium">{product.quantityInStock}</span></p>
          <p className="text-sm text-gray-500">Cập nhật: {new Date(product.updatedAt).toLocaleDateString()}</p>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >-</button>
            <span className="px-4">{quantity}</span>
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleIncrease}
              disabled={quantity >= product.quantityInStock}
            >+</button>
          </div>

          <button className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            Thêm vào giỏ hàng
          </button>
        </div>

      </div>

      <ShopInfo productId={product.productId} />

      {/* Mô tả sản phẩm */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Mô tả sản phẩm</h2>
        <div className="w-full mx-auto mt-1 bg-white p-6 rounded-xl shadow">

          {product.description?.split("\n").map((e, i) => (
            <p key={i} className="text-gray-700">{e}</p>
          ))}


        </div>
      </div>
    </>
  );
}