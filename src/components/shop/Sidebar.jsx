import { Link } from "react-router-dom";
import { LayoutDashboard, Package } from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/shop/dashboard" },
  { name: "Products", icon: Package, path: "/shop/products" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 font-bold text-orange-500 text-xl border-b">MyShop</div>
      <nav className="p-2">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <Link
            key={name}
            to={path}
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-orange-50 text-gray-700"
          >
            <Icon size={20} />
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
