import API from "../../api/axios"
import { useState, useContext, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import GOF_Logo from "../../assets/images/GOFlogowhite.png"
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

  const miniCartRef = useRef(null)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (miniCartRef.current && !miniCartRef.current.contains(e.target)) {
        setShowMiniCart(false)
      }
    }
    if (showMiniCart) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showMiniCart])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLoginClick = () => setIsLoginOpen((prev) => !prev)

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
      const res = await API.get(`/api/products/search?search=${encodeURIComponent(query)}`)
      setResults(res.data.products?.slice(0, 5) || [])
      setShowDropdown(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!query) { setResults([]); setShowDropdown(false); return }
    const debounce = setTimeout(() => fetchResults(), 300)
    return () => clearTimeout(debounce)
  }, [query])

  return (
    <>
      <div
        className={`sticky top-0 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="bg-black text-white px-4 sm:px-6 lg:px-10 py-3 md:py-4 relative border-b border-white/5">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img className="w-10 sm:w-12 md:w-14 object-contain" src={GOF_Logo} alt="GOF Logo" />
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 lg:gap-10">
              {[{ to: "/", label: "Home" }, { to: "/products", label: "Products" }, { to: "/stats", label: "Stats" }].map(({ to, label }) => (
                <li key={to}><Link to={to} className="nav-link-item">{label}</Link></li>
              ))}
            </ul>

            {/* Right side */}
            <div className="flex items-center gap-4 sm:gap-5 ml-auto">

              {/* Search */}
              <div className="relative hidden md:block" ref={searchRef}>
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center bg-white/5 border border-white/10
                    hover:border-white/25 focus-within:border-yellow-400/50 focus-within:bg-white/8
                    rounded-full px-3 py-1.5 md:w-28 lg:w-40 xl:w-48 transition-all duration-200"
                >
                  <FiSearch className="text-white/30 text-sm shrink-0" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="ml-2 outline-none text-xs lg:text-sm bg-transparent w-full text-white placeholder-white/25 nav-dm"
                  />
                </form>

                {showDropdown && (
                  <div className="absolute top-11 left-0 w-64 bg-black border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                    {loading && (
                      <div className="flex items-center gap-2 p-4">
                        <div className="w-3 h-3 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
                        <p className="nav-dm text-xs text-white/40">Searching...</p>
                      </div>
                    )}
                    {!loading && results.length === 0 && (
                      <div className="p-4 text-center">
                        <p className="nav-dm text-xs text-white/30">No products found</p>
                      </div>
                    )}
                    {!loading && results.map((product, i) => (
                      <Link
                        key={product._id}
                        to={`/products/${product._id}`}
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors duration-150 ${i !== results.length - 1 ? "border-b border-white/5" : ""}`}
                        onClick={() => { setShowDropdown(false); setQuery("") }}
                      >
                        <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="nav-dm text-white text-xs font-medium truncate">{product.name}</p>
                          <p className="nav-bebas text-yellow-400 text-xs mt-0.5 tracking-wide">KSh {product.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative text-white/50 hover:text-yellow-400 transition-colors duration-200">
                <FiHeart className="text-lg sm:text-xl" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <div className="relative" ref={miniCartRef}>
                <button
                  onClick={() => setShowMiniCart((prev) => !prev)}
                  className="relative text-white/50 hover:text-yellow-400 transition-colors duration-200"
                >
                  <FiShoppingCart className="text-lg sm:text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
                {showMiniCart && <CartCard onClose={() => setShowMiniCart(false)} />}
              </div>

              {/* User */}
              <button
                onClick={handleLoginClick}
                className="hidden md:flex items-center text-white/50 hover:text-yellow-400 transition-colors duration-200"
              >
                {user ? (
                  <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center">
                    <span className="text-black text-xs font-bold nav-dm">{user.name?.charAt(0).toUpperCase()}</span>
                  </div>
                ) : (
                  <FiUser className="text-xl" />
                )}
              </button>

              {/* Mobile toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-xl text-white/50 hover:text-white transition-colors md:hidden"
              >
                {isOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>

          <LoginCard isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />

          {/* Mobile menu */}
          {isOpen && (
            <div className="mobile-menu-enter mt-4 md:hidden flex flex-col items-center gap-5 pb-6 border-t border-white/5 pt-5">

              <form
                onSubmit={(e) => { handleSubmit(e); setIsOpen(false) }}
                className="flex items-center bg-white/5 border border-white/10 rounded-full px-3 py-2 w-full max-w-xs"
              >
                <FiSearch className="text-white/30 text-sm" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="ml-2 outline-none text-sm bg-transparent w-full text-white placeholder-white/25 nav-dm"
                />
              </form>

              {[{ to: "/", label: "Home" }, { to: "/products", label: "Products" }, { to: "/stats", label: "Stats" }].map(({ to, label }) => (
                <Link key={to} onClick={() => setIsOpen(false)} to={to}
                  className="nav-dm text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors">
                  {label}
                </Link>
              ))}

              <div className="w-full max-w-xs h-px bg-white/5" />

              <Link onClick={() => setIsOpen(false)} to="/wishlist" className="nav-dm flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
                <FiHeart className="text-base" /> Wishlist
                {wishlist.length > 0 && <span className="bg-pink-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{wishlist.length}</span>}
              </Link>

              <Link onClick={() => setIsOpen(false)} to="/cart" className="nav-dm flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
                <FiShoppingCart className="text-base" /> Cart
                {cartCount > 0 && <span className="bg-yellow-400 text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{cartCount}</span>}
              </Link>

              <div className="w-full max-w-xs h-px bg-white/5" />

              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                      <span className="text-black text-sm font-bold nav-dm">{user.name?.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="nav-dm text-white text-sm">{user.name}</span>
                  </div>
                  <Link onClick={() => setIsOpen(false)} to="/profile"
                    className="nav-dm text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors flex items-center gap-2">
                    <FiUser className="text-base" /> Profile
                  </Link>
                  <button onClick={() => { logout(); setIsOpen(false) }}
                    className="nav-dm text-red-400 hover:text-red-300 text-sm transition-colors">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)}
                  className="nav-dm px-8 py-2.5 bg-white text-black text-sm rounded-full font-medium hover:bg-yellow-400 transition-colors">
                  Login
                </Link>
              )}
            </div>
          )}
        </nav>

        {/* Marquee — yellow accent bar */}
        <div className="w-full bg-yellow-400 relative z-0">
          <CurvedLoop
            marqueeText={`🛵 Free Delivery Over 5,000Ksh ✦ New Drops ✦ Limited Stock ✦ Shop Now →`}
            speed={1.2}
            curveAmount={0}
            className="fill-black"
          />
        </div>
      </div>
    </>
  )
}

export default Navbar