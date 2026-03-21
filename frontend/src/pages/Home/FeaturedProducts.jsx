import React, { useEffect, useState } from "react"
import API from "../../api/axios"
import ProductCard from "../Products/ProductCard"
import { Link } from "react-router-dom"

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await API.get("/api/products?featured=true&limit=4")
        setProducts(res.data.products || res.data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedProducts()
  }, [])

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-12 overflow-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .fp-bebas { font-family: 'Bebas Neue', sans-serif; }
        .fp-dm { font-family: 'DM Sans', sans-serif; }
        .skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="fp-dm text-yellow-500 text-xs tracking-[0.3em] uppercase mb-2">Hand Picked</p>
          <h2 className="fp-bebas text-6xl sm:text-7xl leading-none text-black">Featured</h2>
        </div>
        <Link
          to="/products"
          className="fp-dm text-xs tracking-widest uppercase text-gray-400 hover:text-black transition-colors flex items-center gap-1 pb-2"
        >
          View All →
        </Link>
      </div>

      {/* Skeleton loaders */}
      {loading && (
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden">
              <div className="skeleton aspect-[4/5] w-full rounded-xl" />
              <div className="mt-3 space-y-2">
                <div className="skeleton h-3 w-3/4 rounded" />
                <div className="skeleton h-3 w-1/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product grid */}
      {!loading && (
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="flex justify-center mt-16">
        <a
          href="/products"
          className="fp-dm px-10 py-3.5 bg-black border border-yellow-500 text-white text-sm
            uppercase tracking-widest font-medium rounded-full
            transition duration-300 hover:bg-yellow-500 hover:text-black
            hover:shadow-[0_0_25px_rgba(255,215,0,0.4)]"
        >
          Discover More
        </a>
      </div>

    </section>
  )
}

export default FeaturedProducts