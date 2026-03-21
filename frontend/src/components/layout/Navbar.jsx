import API from "../../api/axios"
import { useState, useContext, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import GOF_Logo from "../../assets/images/GOFlogo.png"
import LoginCard from "../ui/LoginCard"
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch, FiHeart } from "react-icons/fi"
import { CartContext } from "../../context/CartContext"
import { AuthContext } from "../../context/AuthContext"
import { WishlistContext } from "../../context/WishlistContext"
import CartCard from "../ui/CartCard"
import CurvedLoop from "../ui/CurvedLoop"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const { user, logout } = useContext(AuthContext)
  const { cartCount } = useContext(CartContext)
  const { wishlist } = useContext(WishlistContext)

  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)

  const [showMiniCart, setShowMiniCart] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0) 

  useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY
    setVisible(currentScrollY < lastScrollY.current || currentScrollY < 10)
    lastScrollY.current = currentScrollY
  }

   window.addEventListener("scroll", handleScroll, { passive: true })
   return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Refs for outside-click detection
  const miniCartRef = useRef(null)
  const searchRef = useRef(null)

  const navigate = useNavigate()

  // Close mini cart on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (miniCartRef.current && !miniCartRef.current.contains(e.target)) {
        setShowMiniCart(false)
      }
    }
    if (showMiniCart) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showMiniCart])

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLoginClick = () => {
    setIsLoginOpen((prev) => !prev)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/products?search=${encodeURIComponent(query)}`)
    setShowDropdown(false)
    setQuery("")
  }

  const fetchResults = async () => {
    try {
      setLoading(true)
      const res = await API.get(
        `/api/products/search?search=${encodeURIComponent(query)}`
      )
      setResults(res.data.products?.slice(0, 5) || [])
      setShowDropdown(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!query) {
      setResults([])
      setShowDropdown(false)
      return
    }
    const debounce = setTimeout(() => {
      fetchResults()
    }, 300)
    return () => clearTimeout(debounce)
  }, [query])

  return (
   <div
      className={`sticky top-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="bg-primary text-black px-4 sm:px-6 lg:px-10 py-3 md:py-4 relative">

        {/* Top Row */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <img
              className="w-12 sm:w-14 md:w-16 object-contain"
              src={GOF_Logo}
              alt="GOF Logo"
            />
          </div>

          {/* Nav Links */}
          <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-6 lg:gap-8 text-base lg:text-lg font-medium">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/products" className="hover:text-yellow-400">Products</Link></li>
            <li><Link to="/stats" className="hover:text-yellow-400">Stats</Link></li>
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-4 sm:gap-5 md:gap-6 ml-auto">

            {/* Search */}
            <div className="relative hidden md:block" ref={searchRef}>
             <form
               onSubmit={handleSubmit}
               className="flex items-center bg-gray-800 border border-white/20 hover:border-white/40 focus-within:border-yellow-400/60 focus-within:bg-gray-600 rounded-full px-3 py-1.5 md:w-28 lg:w-40 xl:w-48 transition-all duration-200"
             >
               <FiSearch className="text-white/40 text-sm shrink-0" />
               <input
                 type="text"
                 placeholder="Search"
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 className="ml-2 outline-none text-xs lg:text-sm bg-transparent w-full text-white placeholder-white/30"
               />
             </form>

             {/* Dropdown */}
             {showDropdown && (
               <div className="absolute top-11 left-0 w-64 bg-white border border-gray-300 rounded-2xl shadow-2xl z-50 overflow-hidden">

                 {loading && (
                   <div className="flex items-center gap-2 p-4">
                     <div className="w-3 h-3 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
                     <p className="text-xs text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>Searching...</p>
                   </div>
                 )}

                 {!loading && results.length === 0 && (
                   <div className="p-4 text-center">
                     <p className="text-xs text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>No products found</p>
                   </div>
                 )}

                 {!loading && results.map((product, i) => (
                   <Link
                     key={product._id}
                     to={`/products/${product._id}`}
                     className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors duration-150 ${
                       i !== results.length - 1 ? "border-b border-white/5" : ""
                     }`}
                     onClick={() => { setShowDropdown(false); setQuery("") }}
                   >
                     <img
                       src={product.images[0]}
                       alt={product.name}
                       className="w-10 h-10 object-cover rounded-lg shrink-0"
                     />
                     <div className="flex-1 min-w-0">
                       <p className="text-black text-xs font-medium truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                         {product.name}
                       </p>
                       <p className="text-yellow-400 text-xs mt-0.5" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                         KSh {product.price}
                       </p>
                     </div>
                     <FiSearch className="text-black/20 text-xs shrink-0" />
                   </Link>
                 ))}
               </div>
             )}
           </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative hover:text-amber-300">
              <FiHeart className="text-lg sm:text-xl" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <div className="relative" ref={miniCartRef}>
              <button
                onClick={() => setShowMiniCart((prev) => !prev)}
                className="flex items-center relative hover:text-amber-300"
              >
                <FiShoppingCart className="text-lg sm:text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {showMiniCart && <CartCard onClose={() => setShowMiniCart(false)} />}
            </div>

            {/* User — works on both mobile and desktop */}
            <button
              onClick={handleLoginClick}
              className="flex items-center hover:text-amber-300"
            >
              <FiUser className="text-xl" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl md:hidden"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Login Modal */}
        <LoginCard isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 md:hidden flex flex-col items-center gap-5 text-base font-medium">
            {/* Mobile Search */}
            <form
              onSubmit={(e) => {
                handleSubmit(e)
                setIsOpen(false)
              }}
              className="flex items-center bg-gray-200 rounded-full px-3 py-1.5 w-full max-w-xs"
            >
              <FiSearch className="text-gray-500 text-sm" />
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="ml-2 outline-none text-sm bg-transparent w-full"
              />
            </form>
            <Link onClick={() => setIsOpen(false)} to="/">Home</Link>
            <Link onClick={() => setIsOpen(false)} to="/products">Products</Link>
            <Link onClick={() => setIsOpen(false)} to="/stats">Stats</Link>
            <Link onClick={() => setIsOpen(false)} to="/wishlist" className="flex items-center gap-2">
              <FiHeart /> Wishlist
            </Link>

            <Link onClick={() => setIsOpen(false)} to="/cart" className="flex items-center gap-2">
              <FiShoppingCart /> Cart
            </Link>
            {user ? (
               <>
                 <Link onClick={() => setIsOpen(false)} to="/profile" className="flex items-center gap-2">
                   <FiUser /> Profile
                 </Link>
                 <button
                   onClick={() => {
                     logout()
                     setIsOpen(false)
                   }}
                   className="flex items-center gap-2"
                 >
                   Logout
                 </button>
               </>
             ) : (
               <Link
                 to="/login"
                 onClick={() => setIsOpen(false)}
                 className="flex items-center gap-2"
               >
                 <FiUser /> Login
               </Link>
             )}
          </div>
        )}
      </nav>

      <div className="w-full bg-primary border-t border-b border-gray-200 relative z-0">
        <CurvedLoop
          marqueeText={`🛵 Free Delivery Over 5,000Ksh ✦ New Drops ✦ Limited Stock ✦ Shop Now →`}
          speed={1.2}
          curveAmount={0}
          className="fill-black"
        />
      </div>
    </div>
  )
}

export default Navbar