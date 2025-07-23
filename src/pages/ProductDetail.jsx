import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

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

  return (
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

        <button className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
