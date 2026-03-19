import { createContext, useState, useEffect, useContext } from "react"
import API from "../api/axios"
import { AuthContext } from "./AuthContext"

export const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext)

  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false)

  // ✅ FETCH WISHLIST
  const fetchWishlist = async () => {
    try {
      setLoading(true)
      const res = await API.get("/api/wishlist")
      setWishlist(res.data.products || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ✅ ADD
  const addToWishlist = async (product) => {
    try {
      // 🔥 optimistic UI
      setWishlist((prev) => {
        const exists = prev.find(p => p._id === product._id)
        if (exists) return prev
        return [...prev, product]
      })

      await API.post("/api/wishlist", {
        productId: product._id,
      })

    } catch (err) {
      console.error(err)
      fetchWishlist() // fallback if error
    }
  }

  // ✅ REMOVE
  const removeFromWishlist = async (productId) => {
    try {
      // 🔥 optimistic UI
      setWishlist((prev) =>
        prev.filter(p => p._id !== productId)
      )

      await API.delete(`/api/wishlist/${productId}`)

    } catch (err) {
      console.error(err)
      fetchWishlist()
    }
  }

  // ✅ LOAD WHEN USER LOGS IN
  useEffect(() => {
    if (user) {
      fetchWishlist()
    } else {
      setWishlist([])
    }
  }, [user])

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}