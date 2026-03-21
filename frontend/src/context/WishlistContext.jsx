import { createContext, useState, useEffect, useContext } from "react"
import API from "../api/axios"
import { AuthContext } from "./AuthContext"

export const WishlistContext = createContext()

const GUEST_WISHLIST_KEY = "guest_wishlist"
const getGuestWishlist = () => JSON.parse(localStorage.getItem(GUEST_WISHLIST_KEY) || "[]")
const saveGuestWishlist = (items) => localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(items))
const clearGuestWishlist = () => localStorage.removeItem(GUEST_WISHLIST_KEY)

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false)

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

  const addToWishlist = async (product) => {
    // Guest flow
    if (!user) {
      const guest = getGuestWishlist()
      const exists = guest.find((p) => p._id === product._id)
      if (!exists) {
        const updated = [...guest, product]
        saveGuestWishlist(updated)
        setWishlist(updated)
      }
      return
    }

    // Logged-in flow — optimistic
    setWishlist((prev) => {
      const exists = prev.find((p) => p._id === product._id)
      if (exists) return prev
      return [...prev, product]
    })

    try {
      await API.post("/api/wishlist", { productId: product._id })
    } catch (err) {
      console.error(err)
      fetchWishlist()
    }
  }

  const removeFromWishlist = async (productId) => {
    // Guest flow
    if (!user) {
      const updated = getGuestWishlist().filter((p) => p._id !== productId)
      saveGuestWishlist(updated)
      setWishlist(updated)
      return
    }

    // Logged-in flow — optimistic
    setWishlist((prev) => prev.filter((p) => p._id !== productId))

    try {
      await API.delete(`/api/wishlist/${productId}`)
    } catch (err) {
      console.error(err)
      fetchWishlist()
    }
  }

  // Called by AuthContext after login
  const mergeGuestWishlist = async () => {
    const guestItems = getGuestWishlist()
    if (!guestItems.length) return

    try {
      const productIds = guestItems.map((p) => p._id)
      await API.post("/api/wishlist/merge", { productIds })
      clearGuestWishlist()
      await fetchWishlist()
    } catch (err) {
      console.error("Failed to merge guest wishlist", err)
    }
  }

  useEffect(() => {
    if (user) {
      const guestItems = getGuestWishlist()
      if (!guestItems.length) {
        // No guest items — safe to just fetch DB wishlist
        fetchWishlist()
      }
      // If there ARE guest items, mergeGuestWishlist() will
      // handle fetching after merge — don't fetch here
    } else {
      setWishlist(getGuestWishlist())
    }
  }, [user])

  return (
    <WishlistContext.Provider value={{ wishlist, loading, addToWishlist, removeFromWishlist, mergeGuestWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}