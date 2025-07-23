import { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";

function DailyDiscover() {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPage] = useState(0); // page bắt đầu từ 0
    const [pageSize, setSize] = useState(48); // số sản phẩm mỗi trang
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/products?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            headers: {
                Authorization: localStorage.getItem("jwt_token")
            }
        }
        )
            .then((response) => {
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy danh sách sản phẩm", error);
            });
    }, [pageNumber, pageSize]);

    return (
        <div>
            <h1>Khám phá hôm nay</h1>

            <ProductList products={products} />

            {/* Phân trang */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={i === pageNumber ? "active" : ""}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DailyDiscover;
