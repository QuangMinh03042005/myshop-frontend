import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import axios from "axios";

export default function ProductList() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  const userId = localStorage.getItem("userId");
  const jwt = localStorage.getItem("jwt_token");


  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories", {
        headers: {
          Authorization: jwt
        }
      })
      .then((res) => {
        console.log(res.data);
        setCategories(res.data)
      })
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${userId}/shop/products`, {
        headers: {
          Authorization: jwt
        }
      })
      .then((res) => {
        setProducts(res.data.content)
        console.log(res.data.content)
      })
      .catch(() => setProducts([]));
  }, []);


  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.productId !== id));
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditProduct(null);
  };

  return (
    <div className="p-6 flex-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Sản phẩm</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          + Thêm sản phẩm
        </button>
      </div>

      {/* Bảng sản phẩm */}
      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-2">Tên sản phẩm</th>
              <th className="px-2 py-2">Mô tả</th>
              <th className="px-2 py-2">Giá</th>
              <th className="px-2 py-2">Số lượng</th>
              <th className="px-2 py-2">Danh mục</th>
              <th className="px-2 py-2">Vị trí</th>
              <th className="px-2 py-2">Hình ảnh</th>
              <th className="px-2 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.productId} className="border-b">
                <td className="px-2 py-2">{p.productName}</td>
                <td className="px-2 py-2 max-w-xs truncate" title={p.description}>
                  {p.description}
                </td>
                <td className="px-2 py-2">{p.price}</td>
                <td className="px-2 py-2">{p.quantityInStock}</td>
                <td className="px-2 py-2">{p.categoryId}</td>
                <td className="px-2 py-2">{p.storageLocation}</td>
                <td className="px-2 py-2">
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.productName}
                      className="h-12 w-12 object-contain border rounded"
                    />
                  )}
                </td>
                <td className="px-2 py-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(p.productId)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-gray-500 mt-4">Chưa có sản phẩm nào.</p>
        )}
      </div>

      {/* Form thêm/sửa sản phẩm */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={handleFormClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <ProductForm
              categories={categories}
              onClose={handleFormClose}
              product={editProduct}
              onSave={(newProduct) => {
                if (editProduct) {
                  setProducts((prev) =>
                    prev.map((p) => (p.productId === newProduct.id ? newProduct : p))
                  );
                } else {
                  setProducts((prev) => [
                    ...prev,
                    { ...newProduct, productId: Date.now() },
                  ]);
                }
                handleFormClose();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
