import React, { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import ProductCard from "./ProductCard"
import { CartContext } from "../../context/CartContext"

const ProductPage = () => {

  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedSize, setSelectedSize] = useState(null)

  const { addToCart } = useContext(CartContext)

  useEffect(() => {

    const fetchProduct = async () => {
      try {

        const res = await axios.get(`/api/products/${id}`)
        setProduct(res.data)
        setSelectedImage(res.data.images?.[0])

        const related = await axios.get(`/api/products?category=${res.data.category}&limit=4`)
        setRelatedProducts(related.data.products)

      } catch (error) {
        console.error(error)
      }
    }

    fetchProduct()

  }, [id])

  useEffect(() => {
   window.scrollTo({ top: 0, behavior: "smooth" })
  }, [id])

  if (!product) return <p className="text-center py-20">Loading...</p>

  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-14 bg-white">

      {/* PRODUCT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* IMAGE SECTION */}
        <div>

          {/* Main Image */}
          <div className="mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full rounded-xl shadow-lg"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto">

            {product.images?.map((img, index) => (

              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setSelectedImage(img)}
                className={`
                  w-16 h-16 sm:w-20 sm:h-20
                  object-cover
                  cursor-pointer
                  rounded
                  border
                  flex-shrink-0
                  ${selectedImage === img ? "border-black" : "border-gray-200"}
                `}
              />

            ))}

          </div>

        </div>

        {/* PRODUCT DETAILS */}
        <div className="max-w-lg">

          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            {product.description}
          </p>

          <p className="text-2xl font-medium mb-8">
            KSh {product.price}
          </p>

          {/* SIZE SELECTOR */}
          <div className="mb-8">

            <p className="font-small mb-3">
              Select Size
            </p>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">

              {product.sizes?.map((size, index) => (

                <button
                  key={index}
                  onClick={() => setSelectedSize(size.size)}
                  className={`
                    border
                    py-2 sm:py-3
                    rounded
                    text-sm sm:text-base
                    transition
                    ${
                      selectedSize === size.size
                        ? "bg-black text-yellow-500 border-black"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  {size.size}
                </button>

              ))}

            </div>

          </div>

          {/* ADD TO CART */}
          <button
             onClick={(e) => {
               e.preventDefault()
               addToCart(product)
             }}
            className="
             w-full
             py-3
             bg-black
             border
             border-yellow-500
             text-white
             uppercase
             tracking-widest
             font-semibold
             rounded-full
             transition
             duration-500
             hover:bg-yellow-500
             hover:text-black
             "
          >
            Add to Cart
          </button>

        </div>

      </div>

      {/* PRODUCT DETAILS */}
      <div className="mt-16 sm:mt-20 max-w-4xl">

        <h2 className="text-xl sm:text-2xl font-semibold mb-6">
          Product Details
        </h2>

        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          {product.description}
        </p>

      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-16 sm:mt-20">

        <h2 className="text-xl sm:text-2xl font-semibold mb-8 sm:mb-10">
          You May Also Like
        </h2>

        <div className="
          grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
          sm:gap-8
        ">

          {relatedProducts.map((item) => (

            <Link key={item._id} to={`/products/${item._id}`}>
              <ProductCard product={item} />
            </Link>

          ))}

        </div>

      </div>

    </section>
  )
}

export default ProductPage