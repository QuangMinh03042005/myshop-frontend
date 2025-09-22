import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductForm({ onClose, categories, product }) {
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    quantityInStock: "",
    categoryId: "",
    image: "",
    storageLocation: "",
  });
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);

  const userId = localStorage.getItem("userId");
  const shopId = localStorage.getItem("shopId");

  // Cập nhật form khi product thay đổi (khi sửa)
  useEffect(() => {
    if (product) {
      setForm({
        productName: product.productName || "",
        description: product.description || "",
        price: product.price || "",
        quantityInStock: product.quantityInStock || "",
        categoryId: product.categoryId || "",
        image: product.image || "",
        storageLocation: product.storageLocation || "",
      });
    } else {
      setForm({
        productName: "",
        description: "",
        price: "",
        quantityInStock: "",
        categoryId: "",
        image: "",
        storageLocation: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (cat) => {
    setForm((prev) => ({
      ...prev,
      categoryId: cat.categoryId,
    }));
    setShowCategoryPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      shopId: shopId,
      productName: form.productName,
      description: form.description,
      price: form.price,
      quantityInStock: form.quantityInStock,
      categoryId: form.categoryId,
      image: form.image,
      storageLocation: form.storageLocation,
    };

    console.log("data: ", data);

    try {
      if ((product && product.productId) == true) {
        // PUT: cập nhật sản phẩm
        await axios.put(
          `http://localhost:8080/api/users/${userId}/shop/products/${product.productId}`,
          data,
          {
            headers: {
              Authorization: localStorage.getItem("jwt_token")
            }
          }
        );
      } else {
        // POST: thêm mới sản phẩm
        await axios.post(`http://localhost:8080/api/users/${userId}/shop/products`, data, {
          headers: {
            Authorization: localStorage.getItem("jwt_token")
          }
        });
        alert("Thêm sản phẩm thành công!");
      }
      onClose();
    } catch (err) {
      alert("Có lỗi xảy ra!");
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Thêm sản phẩm mới</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
        <input
          type="text"
          name="productName"
          value={form.productName}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mô tả</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
          rows="3"
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Giá</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Số lượng</label>
          <input
            type="number"
            name="quantityInStock"
            value={form.quantityInStock}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Danh mục</label>
          <button
            type="button"
            className="border rounded w-full px-3 py-2 text-left"
            onClick={() => setShowCategoryPopup(true)}
          >
            {form.categoryId || "Chọn danh mục"}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Vị trí lưu kho</label>
        <input
          type="text"
          name="storageLocation"
          value={form.storageLocation}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Hình ảnh</label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
        />
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="mt-2 h-24 object-contain border rounded"
          />
        )}
      </div>

      {showCategoryPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-80">
            <h3 className="font-semibold mb-4">Chọn danh mục</h3>
            <ul className="max-h-80 overflow-y-auto">
              {categories.map((cat) => (
                <li key={cat.categoryId}>
                  <button
                    type="button"
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => handleCategorySelect(cat)}
                  >
                    {`${cat.categoryName} (${cat.categoryId})`}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-4 px-3 py-1 border rounded"
              onClick={() => setShowCategoryPopup(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Lưu
        </button>
      </div>
    </form>
  );
}
