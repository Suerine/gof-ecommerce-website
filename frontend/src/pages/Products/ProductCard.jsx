import { FiHeart, FiShoppingCart } from "react-icons/fi"
import { useState, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { WishlistContext } from "../../context/WishlistContext"
import toast from "react-hot-toast"

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const [cartLoading, setCartLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const image1 = product.images?.[0]
  const image2 = product.images?.[1] || image1

  const { addToCart } = useContext(CartContext)
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext)
  const isInWishlist = wishlist.some(item => item._id === product._id)

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden">

        {/* Product image */}
        <img
          src={hovered ? image2 : image1}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />

        {/* Dark gradient for button legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Wishlist button */}
        <button
          onClick={async (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (loading) return
            setLoading(true)
            try {
              if (isInWishlist) {
                await removeFromWishlist(product._id)
                toast("Removed from wishlist", { icon: <FiHeart className="text-gray-400" /> })
              } else {
                await addToWishlist(product)
                toast("Added to wishlist", { icon: <FiHeart className="fill-pink-500 text-pink-500" /> })
              }
            } finally {
              setLoading(false)
            }
          }}
          className={`
            absolute top-3 right-3 z-10
            p-2 rounded-full shadow-md
            transition-all duration-300 active:scale-90
            ${isInWishlist
              ? "bg-red-500 text-white ring-2 ring-pink-200"
              : "bg-white/80 backdrop-blur-md text-gray-700 hover:bg-pink-50"
            }
            opacity-100 sm:opacity-0 sm:group-hover:opacity-100
          `}
        >
          <FiHeart
            className={`
              text-sm transition-all duration-300
              ${isInWishlist ? "fill-white" : ""}
              ${loading ? "animate-pulse" : ""}
            `}
          />
        </button>

        {/* Add to Cart button */}
        <button
          onClick={async (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (cartLoading) return
            setCartLoading(true)
            try {
              await addToCart(product)
            } finally {
              setCartLoading(false)
            }
          }}
          className={`
            absolute bottom-3 left-1/2 -translate-x-1/2
            bg-black text-white font-medium rounded-full shadow-lg
            flex items-center justify-center gap-1.5
            px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm sm:gap-2
            transition-all duration-300 ease-in-out
            hover:text-yellow-400
            sm:translate-y-4 sm:opacity-0
            sm:group-hover:translate-y-0 sm:group-hover:opacity-100
            whitespace-nowrap
          `}
        >
          <FiShoppingCart className="shrink-0 text-sm sm:text-base" />
          <span className="nav-dm">{cartLoading ? "Adding..." : "Add to Cart"}</span>
        </button>

      </div>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <h3 className="nav-dm text-sm sm:text-base font-medium line-clamp-1 text-black">
          {product.name}
        </h3>
        <p className="nav-bebas text-yellow-500 text-base mt-1 tracking-wide">
          KSh {product.price?.toLocaleString()}
        </p>
      </div>

    </div>
  )
}

export default ProductCard