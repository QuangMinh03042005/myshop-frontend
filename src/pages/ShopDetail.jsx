import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ShopDetail() {
    const { shopId } = useParams()
    const [shop, setShop] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // ✅ chống leak khi component unmount

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/shops/${shopId}`, {
                    headers: {
                        Authorization: localStorage.getItem("jwt_token")
                    }
                });

                if (isMounted) {
                    setShop(res.data);
                    setLoading(false)
                }

            } catch (err) {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }

            }
        }
        fetchData()

        return () => {
            isMounted = false; // ✅ cleanup

        };
    }, [shopId])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="mx-auto my-10 p-6 border border-gray-200 rounded-lg shadow">
            <div className="flex items-center mb-6">
                <img
                    src={shop.logo}
                    alt={shop.shopName}
                    className="w-20 h-20 rounded-full object-cover mr-6 border border-gray-300"
                />
                <div>
                    <h2 className="m-0 text-2xl font-semibold">{shop.shopName}</h2>
                    <p className="text-gray-500 mt-2">ID: {shop.shopId}</p>
                    <p className="text-gray-500 mt-2">Vị trí: {shop.address}</p>
                </div>
            </div>
            <div className="mb-4">
                <strong>Giới thiệu:</strong>
                <div className="mt-1 text-gray-700">
                    {shop.introduce || <span className="text-gray-400">Chưa có giới thiệu</span>}
                </div>
            </div>
            <div>
                <strong>Ngày tạo:</strong>{" "}
                {new Date(shop.created_at).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                })}
            </div>
        </div>
    );
}