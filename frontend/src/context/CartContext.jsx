import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"
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

      const res = await axios.get("/api/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })

      const items = res.data?.items || []

      // ✅ store full cart
      setCart(res.data)

      // ✅ calculate count
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
    await axios.post(
      "/api/cart",
      {
        productId: product._id,
        size: product.sizes?.[0]?.size,
        quantity: 1
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    )

    await fetchCart()

    toast.custom((t) => (
      <div
        className="
          bg-black text-white
          px-4 py-3
          rounded-lg
          shadow-xl
          border border-gray-700
          flex items-center
          animate-slide-in
        "
      >
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

    await axios.delete("/api/cart", {
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: { productId, size }
    })

    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter(
        (item) =>
          !(item.product._id === productId && item.size === size)
      )
    }))

    fetchCart() // updates global cart count

  } catch (err) {
    console.error(err)
  }
}
 

  useEffect(() => {
    fetchCart()
  }, [user])

  return (
    <CartContext.Provider value={{ cart, cartCount, fetchCart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}