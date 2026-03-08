import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Stats from "../pages/Stats/Stats";
import Products from "../pages/Products/Products";
import Checkout from "../pages/Shop/Checkout";
import Orders from "../pages/Shop/Orders"
import Profile from "../pages/Shop/Profile"
import ProtectedRoute from "../pages/Auth/ProtectedRoutes"
import Cart from "../pages/Shop/Cart";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
