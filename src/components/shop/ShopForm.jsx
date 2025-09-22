import { useState } from "react";
import axios from "axios";

export default function ShopForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    shopName: initialData.shopName || "",
    logo: initialData.logo || "",
    introduce: initialData.introduce || "",
    address: initialData.address || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const jwt = localStorage.getItem("jwt_token");
      const res = await axios.post(
        `http://localhost:8080/api/users/${userId}/shop`,
        form,
        {
          headers: {
            Authorization: jwt,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Tạo shop thành công!");
      onSubmit && onSubmit(res.data);
    } catch (err) {
      alert("Có lỗi xảy ra khi tạo shop!");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Thông tin Shop</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Tên shop</label>
        <input
          type="text"
          name="shopName"
          value={form.shopName}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Logo (URL)</label>
        <input
          type="text"
          name="logo"
          value={form.logo}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
        />
        {form.logo && (
          <img src={form.logo} alt="Logo preview" className="h-16 mt-2" />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Giới thiệu</label>
        <textarea
          name="introduce"
          value={form.introduce}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Địa chỉ</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
        />
      </div>
      <div className="flex gap-3 justify-end mt-4">
        <button
          type="button"
          onClick={onCancel}
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