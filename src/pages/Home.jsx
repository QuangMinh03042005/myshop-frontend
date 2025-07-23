import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";

export default function Home() {
    const [user, setUser] = useState({})
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    const handleLoadMore = () => {
        navigate("/daily_discover")
    }


    useEffect(() => {
        axios
            .get("http://localhost:8080/api/cart/252", {
                headers: {
                    Authorization: localStorage.getItem("jwt_token")

                }
            })
            .then((res) => {
                setUser(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log("api error ", error.response.message);

                if (error.response && error.response.status === 401) {
                    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                    localStorage.removeItem("jwt_token");

                    // hoặc tự động chuyển về trang login
                    navigate("/login");
                }
            })
    }, [])

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/product", {
                headers: {
                    Authorization: localStorage.getItem("jwt_token")

                }
            })
            .then((res) => {
                setProducts(res.data.content)
                console.log(res.data);

            })
            .catch((err) => {
                console.log("api error ", error.response.message);

                if (error.response && error.response.status === 401) {
                    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                    localStorage.removeItem("jwt_token");

                    // hoặc tự động chuyển về trang login
                    navigate("/login");
                }
            })

    }, [])


    return (
        <div>
            <CategoryList />
            <ProductList products={products} />

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
}
