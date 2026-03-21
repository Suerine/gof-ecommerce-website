import { useContext } from "react"
import { WishlistContext } from "../../context/WishlistContext"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import { FiHeart, FiChevronRight } from "react-icons/fi"
import ProductCard from "../Products/ProductCard"

function Wishlist() {
  const { wishlist, removeFromWishlist, loading } = useContext(WishlistContext)
  const { addToCart } = useContext(CartContext)

  const styles = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
      .wl-bebas { font-family: 'Bebas Neue', sans-serif; }
      .wl-dm { font-family: 'DM Sans', sans-serif; }
      .skeleton { background: linear-gradient(90deg, #e5e5e5 25%, #f0f0f0 50%, #e5e5e5 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
      @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    `}</style>
  )

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f6f3]">
        {styles}
        <div className="bg-black px-6 sm:px-10 py-10">
          <div className="max-w-7xl mx-auto">
            <p className="wl-dm text-yellow-400 text-xs tracking-[0.3em] uppercase mb-2">Saved Items</p>
            <div className="skeleton h-16 w-48 rounded" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="skeleton aspect-[4/5] w-full rounded-xl" />
                <div className="mt-3 space-y-2">
                  <div className="skeleton h-3 w-3/4 rounded" />
                  <div className="skeleton h-3 w-1/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Empty state
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f6f3] flex flex-col items-center justify-center gap-4">
        {styles}
        <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
          <FiHeart className="text-gray-300 text-2xl" />
        </div>
        <div className="text-center">
          <p className="wl-bebas text-4xl text-gray-300 tracking-wide">Your Wishlist is Empty</p>
          <p className="wl-dm text-gray-400 text-sm mt-1">Save items you love for later</p>
        </div>
        <Link
          to="/products"
          className="wl-dm mt-2 px-6 py-2.5 bg-black text-white text-sm rounded-full hover:text-yellow-400 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      {styles}

      {/* Header */}
      <div className="bg-black text-white px-6 sm:px-10 py-10 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full border border-white/5" />
        <div className="max-w-7xl mx-auto relative z-10 flex items-end justify-between">
          <div>
            <p className="wl-dm text-yellow-400 text-xs tracking-[0.3em] uppercase mb-2">Saved Items</p>
            <h1 className="wl-bebas text-6xl sm:text-7xl leading-none">Wishlist</h1>
          </div>
          <p className="wl-dm text-white/30 text-sm pb-1">
            {wishlist.length} item{wishlist.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-6 sm:px-10 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs wl-dm text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <FiChevronRight className="text-gray-300" />
          <span className="text-black font-medium">Wishlist</span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>

        {/* Continue shopping */}
        <div className="flex justify-center mt-14">
          <Link
            to="/products"
            className="wl-dm px-10 py-3.5 bg-black border border-yellow-500 text-white text-sm
              uppercase tracking-widest font-medium rounded-full
              transition duration-300 hover:bg-yellow-500 hover:text-black
              hover:shadow-[0_0_25px_rgba(255,215,0,0.4)]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Wishlist