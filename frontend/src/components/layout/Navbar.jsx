import axios from "axios";
import { useState, useContext, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import GOF_Logo from "../../assets/images/GOFlogo.png"
import LoginCard from "../ui/LoginCard"
import { Link } from "react-router-dom"
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch, FiHeart } from "react-icons/fi"
import { CartContext } from "../../context/CartContext"
import { AuthContext } from "../../context/AuthContext"
import CartCard from "../ui/CartCard"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const { user, logout } = useContext(AuthContext)
  const { cartCount } = useContext(CartContext)

  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  // const cartCount = 3

  const [showMiniCart, setShowMiniCart] = useState(false)
  const navigate = useNavigate()

  const handleLoginClick = () => {
    if (window.innerWidth >= 768) {
      setIsLoginOpen(!isLoginOpen)
    }
  }

  const handleSubmit = (e) => {
   e.preventDefault()
   navigate(`/products?search=${query}`)
   setShowDropdown(false)
  }

  useEffect(() => {
   if (!query) {
     setResults([])
     return
   }

   const fetchResults = async () => {
     try {
       const res = await axios.get(`/api/products/search?search=${query}`)
       setResults(res.data.products.slice(0,5)) // limit to 5
       setShowDropdown(true)
     } catch (err) {
       console.error(err)
     }
   }

   const delay = setTimeout(fetchResults, 300) // debounce

   return () => clearTimeout(delay)

 }, [query])

  return (
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

       {/* Desktop Navigation */}
       <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-6 lg:gap-8 text-base lg:text-lg font-medium">
         <li><Link to="/" className="hover:text-white nav-link nav-link:hover">Home</Link></li>
         <li><Link to="/products" className="hover:text-white nav-link nav-link:hover">Products</Link></li>
         <li><Link to="/stats" className="hover:text-white nav-link nav-link:hover">Stats</Link></li>
       </ul>

       {/* Right Section */}
       <div className="flex items-center gap-4 sm:gap-5 md:gap-6 ml-auto">

        {/* Search */}
        <div className="relative hidden md:block">
         <form
           onSubmit={handleSubmit}
           className="flex items-center bg-gray-200 rounded-full px-3 py-1.5 md:w-28 lg:w-40 xl:w-48 z-50"
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

         {showDropdown && results.length > 0 && (
           <div
             className="
               absolute
               top-10
               left-0
               w-full
               bg-white
               border
               border-gray-300
               rounded-lg
               shadow-lg
               z-50
             "
           >
             {results.map((product) => (
               <Link
                 key={product._id}
                 to={`/products/${product._id}`}
                 className="flex items-center gap-3 p-3 hover:bg-gray-100"
                 onClick={() => setShowDropdown(false)}
               >
                 <img
                   src={product.images[0]}
                   alt={product.name}
                   className="w-10 h-10 object-cover rounded"
                 />

                 <div className="text-xs">
                   <p className="font-medium">{product.name}</p>
                   <p className="text-gray-500">${product.price}</p>
                 </div>
               </Link>
             ))}
           </div>
         )}

       </div>

         {/* Wishlist */}
         <Link
           to="/wishlist"
           className="flex items-center relative hover:text-amber-300"
         >
           <FiHeart className="text-lg sm:text-xl" />
         </Link>

        {/* Cart */}
        <div
          className="relative"
          onMouseEnter={() => setShowMiniCart(true)}
          onMouseLeave={() => setShowMiniCart(false)}
        >

          <Link
            to="/cart"
            className="flex items-center relative hover:text-amber-300"
          >

            <FiShoppingCart className="text-lg sm:text-xl" />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}

          </Link>

          {showMiniCart && <CartCard />}

        </div>

        {/* Desktop Login */}
        <button
          onClick={handleLoginClick}
          className="hidden md:flex items-center hover:text-amber-300"
        >
          <FiUser className="text-xl" />
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl md:hidden"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

      </div>

     </div>

      {/* Login Card */}
      <LoginCard
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
      />

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 md:hidden flex flex-col items-center gap-5 text-base font-medium">

          <Link onClick={() => setIsOpen(false)} to="/">
            Home
          </Link>

          <Link onClick={() => setIsOpen(false)} to="/products">
            Products
          </Link>

          <Link onClick={() => setIsOpen(false)} to="/stats">
            Stats
          </Link>

          <Link
            onClick={() => setIsOpen(false)}
            to="/cart"
            className="flex items-center gap-2"
          >
            <FiShoppingCart />
            Cart
          </Link>

          {user ? (
          <>
            <Link
              onClick={() => setIsOpen(false)}
              to="/profile"
              className="flex items-center gap-2"
            >
              <FiUser />
              Profile
            </Link>

            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className="flex items-center gap-2 "
            >
              Logout
            </button>
          </>

        ) : (

          <Link
            onClick={() => setIsOpen(false)}
            to="/login"
            className="flex items-center gap-2"
          >
            <FiUser />
            Login
          </Link>
         )}
        </div>
      )}

    </nav>
  )
}

export default Navbar