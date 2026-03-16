import { FiHeart, FiShoppingCart } from "react-icons/fi"
import { useState, useContext } from "react"
import { CartContext } from "../../context/CartContext"

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const { addToCart } = useContext(CartContext)
  
  const image1 = product.images?.[0]
  const image2 = product.images?.[1] || image1

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
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Add To Cart */}
        <button
          onClick={(e) => {
            e.preventDefault()
            addToCart(product)
          }}
          className="
            absolute bottom-2 left-1/2 -translate-x-1/2
            bg-black text-white px-3 py-1.5 rounded-full
            flex items-center gap-1 text-xs
            opacity-100 sm:opacity-0
            sm:group-hover:opacity-100
            translate-y-0 sm:translate-y-4
            sm:group-hover:translate-y-0
            transition-all duration-300
            z-10
          "
        >
          <FiShoppingCart size={14} />
          Add
        </button>

        {/* Wishlist */}
        <button
          className="
            absolute top-3 right-3
            bg-white text-gray-800 p-2 rounded-full
            shadow
            opacity-100 sm:opacity-0
            sm:group-hover:opacity-100
            transition-all duration-300 z-10
          "
        >
          <FiHeart />
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