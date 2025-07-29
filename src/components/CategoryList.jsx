import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 20; // 10 cột * 2 hàng
  const COLUMNS = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/category/", {
          headers: {
            Authorization: localStorage.getItem("jwt_token")
          }
        });
        setCategories(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh mục:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  if (loading) return <p>Đang tải danh mục...</p>;

  // Cắt danh sách danh mục thành slide hiện tại
  const currentItems = categories.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="relative bg-white py-6 px-4 md:px-10 border border-gray-200 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Danh mục nổi bật
      </h2>

      {/* Nút chuyển trái */}
      {currentPage > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>
      )}

      {/* Nút chuyển phải */}
      {currentPage < totalPages - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      )}

      {/* Khối danh mục hiện tại */}
      <div className="grid grid-cols-10 grid-rows-2 gap-0">
        {currentItems.map((cat) => (
          <Link
            to={`/category/${cat.categoryId}`}
            key={cat.categoryId}
  className="flex flex-col items-center border border-gray-300 p-2 hover:shadow-md hover:border-orange-500 transition"

          >
            <img
              src={cat.image || "/fallback.png"}
              alt={cat.categoryName}
              className="w-16 h-16 object-cover rounded-full border border-gray-300 mb-2"
              onError={(e) => (e.target.src = "/fallback.png")}
            />
            <span className="text-sm text-center leading-tight break-words max-w-[80px]">
              {cat.categoryName}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
