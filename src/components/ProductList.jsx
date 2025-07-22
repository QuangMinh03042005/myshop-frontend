import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
    return (
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
    );
};

export default ProductList;
