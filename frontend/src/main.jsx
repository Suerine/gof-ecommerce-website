import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast"
import { WishlistProvider } from "./context/WishlistContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <WishlistProvider>
      <CartProvider>
        <App />

        <Toaster
          position="top-right"
          containerStyle={{ zIndex: 9999 }}
          toastOptions={{
            style: {
              background: "#111",
              color: "#fff"
            }
          }}
        />

      </CartProvider>
    </WishlistProvider>
    </AuthProvider>
  </React.StrictMode>
);