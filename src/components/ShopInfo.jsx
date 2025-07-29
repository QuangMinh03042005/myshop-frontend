import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShopInfo({ productId }) {
    const [shop, setShop] = useState(null);
    const navigae = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8080/api/seller/getShopFromProduct", {
            params: { productId },
            headers: {
                Authorization: localStorage.getItem("jwt_token")
            }
        })
            .then(res => setShop(res.data))
            .catch(() => setShop(null));
    }, [productId]);

    if (!shop) return null;

    const handleShowShop = () => {
        navigae(`/shop/${shop.shopId}`)
    }

    return (
        <div className="flex items-center gap-6 bg-white rounded-xl shadow p-4 mb-6">
            <img
                src={shop.logo || "/default-shop.png"}
                alt={shop.shopName}
                className="w-16 h-16 rounded-full border object-cover bg-gray-100"
            />
            <div className="flex flex-col gap-1">
                <span className="text-lg font-bold">{shop.shopName}</span>
                <div className="flex gap-4 text-sm text-gray-600">
                    <span>ID shop: <span className="font-semibold">{shop.shopId}</span></span>
                    <span>Ngày tạo: <span className="font-semibold">{shop.created_at ? new Date(shop.created_at).toLocaleDateString() : "Chưa rõ"}</span></span>
                </div>
            </div>
            <button className="ml-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleShowShop}>
                Xem Shop
            </button>
        </div>
    );
}