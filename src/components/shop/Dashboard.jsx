import axios from "axios";
import StatCard from "./StatCard";
import TablePlaceholder from "./TablePlaceHolder";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const userId = localStorage.getItem("userId");
  const jwt = localStorage.getItem("jwt_token");
  const [stat, setStat] = useState({});
  useEffect(() => {
    // Dữ liệu mẫu cho thống kê
    axios.get(`http://localhost:8080/api/users/${userId}/shop/statistic`, {
      headers: {
        Authorization: jwt
      }
    }).then(res =>{ 
      console.log(res.data);
      setStat(res.data)})
      .catch(err => console.log(err.message));
  }, [])

  const stats = [
    { title: "Doanh thu", value: stat.totalRevenue },
    { title: "Đơn hàng", value: stat.totalOrders },
    { title: "Sản phẩm", value: stat.totalProductsSold },
  ];

  // Dữ liệu mẫu cho bảng
  const orders = [
    { id: 1, customer: "Nguyễn Văn A", total: "1,200,000₫", status: "Đã giao" },
    { id: 2, customer: "Trần Thị B", total: "850,000₫", status: "Đang xử lý" },
    { id: 3, customer: "Lê Văn C", total: "2,000,000₫", status: "Đã hủy" },
  ];

  return (
    <main className="p-6 space-y-6 flex-1">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-2">Mã đơn</th>
              <th className="px-2 py-2">Khách hàng</th>
              <th className="px-2 py-2">Tổng tiền</th>
              <th className="px-2 py-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-2 py-2">{order.id}</td>
                <td className="px-2 py-2">{order.customer}</td>
                <td className="px-2 py-2">{order.total}</td>
                <td className="px-2 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
