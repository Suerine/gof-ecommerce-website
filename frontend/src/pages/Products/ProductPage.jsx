import React, { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import API from "../../api/axios"
import ProductCard from "./ProductCard"
import { CartContext } from "../../context/CartContext"
import { getWhatsAppLink } from "../../utils/helper"
import { FaWhatsapp } from "react-icons/fa"
import { FiShoppingCart, FiChevronRight } from "react-icons/fi"

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedSize, setSelectedSize] = useState(null)
  const [cartLoading, setCartLoading] = useState(false)

  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/api/products/${id}`)
        setProduct(res.data)
        setSelectedImage(res.data.images?.[0])
        const related = await API.get(`/api/products?category=${res.data.category}&limit=4`)
        setRelatedProducts(related.data.products || [])
      } catch (error) {
        console.error(error)
      }
    }
    fetchProduct()
  }, [id])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [id])

  if (!product) return (
    <div className="min-h-screen bg-[#f7f6f3] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="prod-dm text-gray-400 text-sm tracking-widest uppercase">Loading</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f7f6f3]">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .prod-bebas { font-family: 'Bebas Neue', sans-serif; }
        .prod-dm { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-6 sm:px-10 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs prod-dm text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <FiChevronRight className="text-gray-300" />
          <Link to="/products" className="hover:text-black transition-colors">Products</Link>
          <FiChevronRight className="text-gray-300" />
          <span className="text-black font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Images */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative overflow-hidden rounded-2xl bg-white aspect-[4/5]">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Category badge */}
              {product.category && (
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white text-xs prod-dm px-3 py-1 rounded-full tracking-widest uppercase">
                  {product.category}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200
                    ${selectedImage === img ? "border-black scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center space-y-8">

            {/* Name + price */}
            <div>
              <p className="prod-dm text-yellow-500 text-xs tracking-[0.3em] uppercase mb-2">
                {product.category}
              </p>
              <h1 className="prod-bebas text-5xl sm:text-6xl leading-none text-black mb-4">
                {product.name}
              </h1>
              <p className="prod-bebas text-4xl text-black">
                KSh {product.price?.toLocaleString()}
              </p>
            </div>

            {/* Description */}
            <p className="prod-dm text-gray-500 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="prod-dm text-xs tracking-[0.2em] uppercase text-gray-400">Select Size</p>
                {selectedSize && (
                  <p className="prod-dm text-xs text-black font-medium">
                    Selected: <span className="text-yellow-500">{selectedSize}</span>
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes?.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size.size)}
                    className={`py-2.5 rounded-xl text-sm prod-dm font-medium border-2 transition-all duration-200
                      ${selectedSize === size.size
                        ? "bg-black text-yellow-400 border-black scale-105"
                        : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black"
                      }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200" />

            {/* CTAs */}
            <div className="space-y-3">
              <button
                onClick={async (e) => {
                  e.preventDefault()
                  if (cartLoading) return
                  setCartLoading(true)
                  try {
                    await addToCart(product, selectedSize)
                  } finally {
                    setCartLoading(false)
                  }
                }}
                disabled={cartLoading}
                className="w-full py-3.5 bg-black text-white prod-dm font-medium rounded-full
                  flex items-center justify-center gap-2
                  hover:text-yellow-400 transition-colors duration-200
                  disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <FiShoppingCart className="text-base" />
                {cartLoading ? "Adding..." : "Add to Cart"}
              </button>

              <a
                href={getWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#25D366] text-white prod-dm font-medium rounded-full
                  flex items-center justify-center gap-2
                  hover:bg-[#1ebe5d] transition-colors duration-200"
              >
                <FaWhatsapp className="text-lg" />
                Ask on WhatsApp
              </a>
            </div>

          </div>
        </div>

        {/* Product details */}
        <div className="mt-20 sm:mt-24">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="prod-bebas text-4xl text-black">Product Details</h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <p className="prod-dm text-gray-500 leading-relaxed text-sm sm:text-base max-w-3xl">
            {product.description}
          </p>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 sm:mt-24">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="prod-bebas text-4xl text-black">You May Also Like</h2>
                <div className="h-px w-16 bg-gray-200" />
              </div>
              <Link
                to="/products"
                className="prod-dm text-xs tracking-widest uppercase text-gray-400 hover:text-black transition-colors flex items-center gap-1"
              >
                View All <FiChevronRight />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((item) => (
                <Link key={item._id} to={`/products/${item._id}`}>
                  <ProductCard product={item} />
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ProductPage