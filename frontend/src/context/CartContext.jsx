import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "./AuthContext"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

  const { user } = useContext(AuthContext)
  const [cartCount, setCartCount] = useState(0)

  const fetchCart = async () => {
    if (!user) {
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

      const totalItems = items.reduce(
        (total, item) => total + item.quantity,
        0
      )

      setCartCount(totalItems)

      // 🔥 expose to browser console
      window.cartDebug = {
        response: res.data,
        items,
        totalItems
      }

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [user])

  return (
    <CartContext.Provider value={{ cartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}