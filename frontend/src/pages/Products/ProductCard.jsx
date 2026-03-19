import { FiHeart, FiShoppingCart } from "react-icons/fi"
import { useState, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { WishlistContext } from "../../context/WishlistContext"

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const { addToCart } = useContext(CartContext)
  
  const image1 = product.images?.[0]
  const image2 = product.images?.[1] || image1

  const [loading, setLoading] = useState(false)

  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext) 
  const isInWishlist = wishlist.some(item => item._id === product._id)

  return (

    <div
      className="group bg-white rounded-lg overflow-hidden transition hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      <div className="relative w-full aspect-[4/5] overflow-hidden">

        <img
          src={hovered ? image2 : image1}
          alt={product.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105 z-10"
        />

        {/* Add To Cart */}
        <button
         onClick={async (e) => {
           e.preventDefault()
           e.stopPropagation()

           if (loading) return
           setLoading(true)

           try {
             if (isInWishlist) {
               await removeFromWishlist(product._id)
             } else {
               await addToWishlist(product)
             }
           } finally {
             setLoading(false)
           }
         }}
         className={`
           absolute top-3 right-3
           p-2 rounded-full shadow z-50
           transition-all duration-300 active:scale-90

           ${isInWishlist
             ? "bg-red-500 text-white scale-100 ring-2 ring-pink-200"
             : "bg-white/80 backdrop-blur-md text-gray-800 hover:bg-pink-100"}

           opacity-100 sm:opacity-0
           sm:group-hover:opacity-100
         `}
       >
         <FiHeart
           className={`
             transition-all duration-300
             ${isInWishlist ? "fill-white scale-110" : ""}
             ${loading ? "animate-pulse" : ""}
           `}
         />
       </button>

      </div>

      <div className="p-3">
        <h3 className="text-sm sm:text-base font-medium line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-700 text-sm mt-1 font-medium">
          KSh {product.price}
        </p>
      </div>

    </div>

  )
}

export default ProductCard