import React, { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "../Products/ProductCard"
import { Link } from "react-router-dom"

const FeaturedProducts = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {

    const fetchFeaturedProducts = async () => {
      try {

        const res = await axios.get("/api/products?featured=true&limit=4")

        setProducts(res.data.products)

      } catch (error) {
        console.error(error)
      }
    }

    fetchFeaturedProducts()

  }, [])

  return (
    <section className="bg-white px-4 sm:px-10 md:px-16 py-16">

      {/* Title */}
      <h2 className="
        text-2xl
        sm:text-3xl
        md:text-3xl
        font-medium
        text-center
        mb-12
        tracking-widest
        text-gold
        title
      ">
        Featured Products
      </h2>

      {/* Grid */}
      <div className="
        grid
        grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-5
        md:gap-6
      ">
        {products.map((product) => (
          <Link key={product._id} to={`/products/${product._id}`}>
              <ProductCard product={product} />
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-16">
        <a
          href="/products"
          className="
            px-10
            py-4
            bg-gray-900
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
          Discover More
        </a>
      </div>

    </section>
  )
}

export default FeaturedProducts