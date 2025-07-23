import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";

export default function DailyDiscover() {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/product?pageNumber=${pageNumber}&pageSize=48`, {
            headers: {
                Authorization: localStorage.getItem("jwt_token")
            }
        })
            .then((res) => {
                setProducts(res.data.content);
                setTotalPages(res.data.totalPages);
            });
    }, [pageNumber]);

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
