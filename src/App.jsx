import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import RequireAuth from './auth/RequireAuth.jsx';
import MainLayout from './layout/MainLayout.jsx';
import Home from "./pages/Home.jsx"
import NotFound from './pages/NotFound.jsx'
import Register from './pages/Register.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import DailyDiscover from './pages/DailyDiscover.jsx';
import ShopDetail from './pages/ShopDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import ProductList from './components/shop/ProductList.jsx';
import Shop from './pages/Shop.jsx';
import Dashboard from './components/shop/Dashboard.jsx';

export default function App() {
  return (
    <Routes>
      {/* Trang login riêng, không có layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Các route còn lại nằm trong layout chính */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >

        <Route path="/home" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />

        <Route path="/daily_discover" element={
          <RequireAuth>
            <DailyDiscover/>
          </RequireAuth>
        } />

        <Route path="/shop" element={
          <RequireAuth>
            <Shop/>
          </RequireAuth>
        } >
          <Route path='products' element={<ProductList/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
        </Route>

        <Route path="/cart" element={
          <RequireAuth>
            <Cart/>
          </RequireAuth>
        } />

        <Route path="/product/shop-detail/:shopId" element={
          <RequireAuth>
            <ShopDetail/>
          </RequireAuth>
        } />

        <Route path="/product/:productId" element={
          <RequireAuth>
            <ProductDetail/>
          </RequireAuth>
        } />

        <Route path="/checkout" element={
          <RequireAuth>
            <Checkout/>
          </RequireAuth>
        } />

        <Route path='*' element={<NotFound />} />
        {/* Thêm các route khác tại đây nếu cần */}
      </Route>
    </Routes>
  );
}
