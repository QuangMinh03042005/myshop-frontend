import { Link, useNavigate } from "react-router-dom";

const ProductList = ({ products }) => {
    const navigate = useNavigate()
    const handleLoadMore = () => {
        navigate("/daily_discover")
    }
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {products.map((product) => (
                    <Link
                        to={`/product/${product.productId}`}
                        key={product.productId}
                        className="block border rounded-xl shadow-md p-4 hover:shadow-lg hover:-translate-y-1 transition"
                    >
                        <img
                            src={product.image ? product.image : "/fallback.png"}
                            alt={product.productName}
                            onError={(e) => (e.target.src = '/fallback.png')}
                            className="w-full aspect-square object-contain bg-white rounded-md"
                        />
                        <h3 className="mt-2 text-base font-medium line-clamp-2">{product.productName}</h3>
                        <p className="text-red-500 font-bold">{product.price.toLocaleString()}₫</p>
                    </Link>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Xem thêm
                </button>
            </div>
        </div>
    );
};

export default ProductList;
