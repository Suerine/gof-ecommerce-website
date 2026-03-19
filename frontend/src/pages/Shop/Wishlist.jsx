import { useContext } from "react"
import { WishlistContext } from "../../context/WishlistContext"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import { FiShoppingCart, FiTrash2 } from "react-icons/fi"

function Wishlist() {
  const { wishlist, removeFromWishlist, loading } = useContext(WishlistContext)
  const { addToCart } = useContext(CartContext)

  if (loading) {
    return <p className="text-center mt-10">Loading wishlist...</p>
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">Your Wishlist is Empty</h2>
        <Link to="/products" className="mt-4 underline">
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Wishlist ({wishlist.length})
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="
              group relative bg-white/70 backdrop-blur-lg
              rounded-2xl overflow-hidden
              border border-gray-200/60
              hover:shadow-2xl hover:-translate-y-1
              transition-all duration-300
            "
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="
                  w-full h-56 object-cover
                  group-hover:scale-110
                  transition duration-500
                "
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

              {/* Remove button */}
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="
                  absolute top-3 right-3
                  bg-white/80 backdrop-blur-md
                  p-2 rounded-full shadow
                  hover:bg-red-500 hover:text-white
                  transition
                "
              >
                <FiTrash2 />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-sm font-medium line-clamp-1">
                {product.name}
              </h3>

              <p className="text-gray-900 font-semibold mt-1">
                KSh {product.price}
              </p>

              {/* Actions */}
              <button
                onClick={() => addToCart(product)}
                className="
                  mt-4 w-full
                  bg-black text-white
                  py-2 rounded-full text-sm
                  hover:bg-gray-900
                  transition
                "
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist