import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/category/", {
                    headers: {
                        Authorization: localStorage.getItem("jwt_token")
                    }
                })
                console.log(res.data)

                setCategories(res.data);
            } catch (err) {
                console.error('Lỗi khi tải danh mục:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <p>Đang tải danh mục...</p>;

    return (
        <div className="bg-white py-8 px-4 md:px-10">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Danh mục sản phẩm</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
                {categories.map((cat) => (
                    <Link
                        to={`/category/${cat.categoryId}`} // Gắn link vào mỗi box
                        key={cat.categoryId}
                        className="flex flex-col items-center p-3 border rounded-lg shadow hover:shadow-md transition duration-300 hover:scale-105"
                    >
                        <img
                            src={
                                cat.image
                                    ? cat.image
                                    : '/fallback.png'
                            }
                            alt={cat.categoryName}
                            className="w-20 h-20 object-cover rounded-full border"
                            onError={(e) => (e.target.src = '/fallback.png')}
                        />
                        <span className="mt-3 text-sm text-gray-700 text-center capitalize">
                            {cat.categoryName}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}