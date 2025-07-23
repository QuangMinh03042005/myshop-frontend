import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(localStorage.getItem("username") || null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("username");
    setUser(null);
    setIsHovered(false);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Link
            to="/home"
            className="text-gray-700 hover:text-blue-500 font-medium"
          >
            MyShop
          </Link>
        </div>

        {/* Tìm kiếm */}
        <div className="flex-1 mx-6">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 px-4 py-2 outline-none bg-transparent text-sm"
            />
            <button className="bg-gray-200 px-4 py-2 hover:bg-gray-300 transition">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Phần bên phải */}
        <div className="flex items-center gap-6 text-sm relative">
          {/* Kênh người bán */}
          <Link
            to="/seller"
            className="text-gray-700 hover:text-blue-500 font-medium"
          >
            Kênh Người Bán
          </Link>

          {/* Nếu đã đăng nhập thì hiển thị tên và menu */}
          {user && (
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <button className="text-gray-700 hover:text-blue-500 font-medium">
                {user}
              </button>

              {/* Dropdown */}
              {isHovered && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đơn mua
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Giỏ hàng */}
          <Link to="/cart" className="text-gray-700 hover:text-blue-500 text-xl">
            <FaShoppingCart />
          </Link>
        </div>
      </div>
    </header>
  );
}
