import API from "../../api/axios"
import { useState, useContext, useEffect } from "react"
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

  const navigate = useNavigate()

  const isMobile = window.innerWidth < 768

  const handleLoginClick = () => {
    if (!isMobile) {
      setIsLoginOpen(!isLoginOpen)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return

    navigate(`/products?search=${encodeURIComponent(query)}`)
    setShowDropdown(false)
  }

  // Fetch search results
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

  // Debounce
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
   <>
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
          <div className="relative hidden md:block">
            <form
              onSubmit={handleSubmit}
              className="flex items-center bg-gray-200 rounded-full px-3 py-1.5 md:w-28 lg:w-40 xl:w-48"
            >
              <FiSearch className="text-gray-500 text-sm" />
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="ml-2 outline-none text-xs lg:text-sm bg-transparent w-full"
              />
            </form>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute top-10 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">

                {loading && (
                  <p className="p-3 text-xs text-gray-500">Searching...</p>
                )}

                {!loading && results.length === 0 && (
                  <p className="p-3 text-xs text-gray-500">No products found</p>
                )}

                {!loading && results.map((product) => (
                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded transition-transform duration-300 hover:scale-110"
                    />
                    <div className="text-xs">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-gray-900 font-semibold">
                        ${product.price}
                      </p>
                    </div>
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
          <div className="relative">
            <button
              onClick={() => setShowMiniCart(prev => !prev)}
              className="flex items-center relative hover:text-amber-300"
            >
              <FiShoppingCart className="text-lg sm:text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {showMiniCart && <CartCard />}
          </div>

          {/* User */}
          <button
            onClick={handleLoginClick}
            className="hidden md:flex items-center hover:text-amber-300"
          >
            <FiUser className="text-xl" />
          </button>

          {/* Mobile Menu */}
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
          <Link onClick={() => setIsOpen(false)} to="/">Home</Link>
          <Link onClick={() => setIsOpen(false)} to="/products">Products</Link>
          <Link onClick={() => setIsOpen(false)} to="/stats">Stats</Link>

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
            <Link onClick={() => setIsOpen(false)} to="/login" className="flex items-center gap-2">
              <FiUser /> Login
            </Link>
          )}
        </div>
      )}
    </nav>
     <div className="w-full bg-primary border-t border-b border-gray-200 relative z-0">
      <CurvedLoop
        marqueeText="🔥 Free Delivery Over 5,000Ksh ✦ New Drops ✦ Limited Stock ✦ Shop Now →"
        speed={1.2}
        curveAmount={0}
        className="fill-black"
      />
    </div> 
    </>
  )
}

export default Navbar