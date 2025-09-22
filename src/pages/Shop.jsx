import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/shop/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import ShopForm from "../components/shop/ShopForm";

export default function Shop() {

  const [roles, setRoles] = useState([])
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/users/${userId}/roles`, {
          headers: {
            Authorization: localStorage.getItem("jwt_token")
          }
        })

        console.log(res.data)
        setRoles(res.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [])

  if (!roles.find(role => role.name == 'ROLE_STOREKEEPER')) {
    return (
      <ShopForm/>
    )
  }
  axios.get(`http://localhost:8080/api/users/${userId}/shop`, { headers: { Authorization: localStorage.getItem("jwt_token") } }).then((res) => {

    localStorage.setItem("shopId", res.data.shopId);
    console.log(res.data);
  }, []).catch((err) => console.log(err.message)
  )


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Route con sẽ render ở đây */}
        <Outlet />
      </div>
    </div>
  );
}
