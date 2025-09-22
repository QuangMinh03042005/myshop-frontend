import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";

export default function DailyDiscover() {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`http://localhost:8080/api/products?pageNumber=${pageNumber}&pageSize=48`, {
                    headers: {
                        Authorization: localStorage.getItem("jwt_token")
                    }
                });
                setProducts(res.data.content);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [pageNumber]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Đã xảy ra lỗi: {error.message}</p>;

    return (
        <div>
            <ProductList products={products} />
            <Pagination
                page={pageNumber}
                totalPages={totalPages}
                onPageChange={(newPage) => setPageNumber(newPage)}
            />
        </div>
    );
}
