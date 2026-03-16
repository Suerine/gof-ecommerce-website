import { createContext, useState, useEffect, useContext } from "react"
import API from "../api/axios" 
import { AuthContext } from "./AuthContext"
import toast from "react-hot-toast"
import CartToast from "../components/ui/CartToast"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [cart, setCart] = useState(null)
  const [cartCount, setCartCount] = useState(0)

  const fetchCart = async () => {
    if (!user) {
      setCart(null)
      setCartCount(0)
      return
    }

    try {
      const res = await API.get("/api/cart") 

      const items = res.data?.items || []
      setCart(res.data)

      const totalItems = items.reduce(
        (total, item) => total + item.quantity,
        0
      )
      setCartCount(totalItems)

    } catch (err) {
      console.error(err)
    }
  }

  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please login first")
      return
    }

    try {
      await API.post("/api/cart", { // ✅ No need for auth header
        productId: product._id,
        size: product.sizes?.[0]?.size,
        quantity: 1
      })

      await fetchCart()

      toast.custom((t) => (
        <div className="bg-black text-white px-4 py-3 rounded-lg shadow-xl border border-gray-700 flex items-center animate-slide-in">
          <CartToast product={product} />
        </div>
      ))
    } catch (err) {
      console.error(err)
      toast.error("Failed to add product")
    }
  }

  const removeItem = async (productId, size) => {
    try {
      await API.delete("/api/cart", { // ✅ No need for auth header
        data: { productId, size }
      })

      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter(
          (item) => !(item.product._id === productId && item.size === size)
        )
      }))

      fetchCart()

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [user])

  return (
    <CartContext.Provider value={{ cart, cartCount, fetchCart, addToCart, removeItem }}> {/* ✅ Added removeItem to context */}
      {children}
    </CartContext.Provider>
  )
}