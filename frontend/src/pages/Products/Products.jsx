import { useEffect, useState } from "react"
import API from "../../api/axios"
import ProductCard from "./ProductCard"
import { Link, useSearchParams } from "react-router-dom"
import { FiSearch, FiSliders } from "react-icons/fi"

const CATEGORIES = ["All", "Jerseys", "Boots", "Balls"]

function Products() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  const [searchParams] = useSearchParams()
  const search = searchParams.get("search")

  const filteredProducts = (products || []).filter((product) =>
    product.name.toLowerCase().includes(search?.toLowerCase() || "")
  )

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const url = category !== "All" ? `/api/products?category=${category}` : "/api/products"
        const res = await API.get(url)
        setProducts(res.data.products || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [category])

  return (
    <div className="min-h-screen bg-[#f7f6f3]">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .prod-bebas { font-family: 'Bebas Neue', sans-serif; }
        .prod-dm { font-family: 'DM Sans', sans-serif; }
        .skeleton { background: linear-gradient(90deg, #e5e5e5 25%, #f0f0f0 50%, #e5e5e5 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .cat-pill { transition: all 0.2s ease; }
      `}</style>

      {/* Page header */}
      <div className="bg-black text-white px-6 sm:px-10 py-10 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full border border-white/5" />
        <div className="absolute -bottom-16 left-20 w-72 h-72 rounded-full border border-white/5" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="prod-dm text-yellow-400 text-xs tracking-[0.3em] uppercase mb-2">
              {search ? `Search: "${search}"` : category === "All" ? "Full Collection" : category}
            </p>
            <h1 className="prod-bebas text-6xl sm:text-7xl leading-none text-white">
              {search ? "Results" : "Products"}
            </h1>
          </div>

          {/* Count */}
          {!loading && (
            <p className="prod-dm text-white/30 text-sm">
              {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-white border-b border-gray-100 px-6 sm:px-10 py-4 sticky top-[var(--navbar-h,0px)] z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto scrollbar-hide">
          <FiSliders className="text-gray-300 shrink-0 text-lg" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`cat-pill shrink-0 px-5 py-1.5 rounded-full text-sm prod-dm font-medium border
                ${category === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                <div className="skeleton aspect-[4/5] w-full rounded-lg" />
                <div className="mt-3 space-y-2">
                  <div className="skeleton h-3 w-3/4 rounded" />
                  <div className="skeleton h-3 w-1/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <FiSearch className="text-gray-300 text-2xl" />
            </div>
            <div className="text-center">
              <p className="prod-bebas text-3xl text-gray-300 tracking-wide">No Products Found</p>
              <p className="prod-dm text-gray-400 text-sm mt-1">
                {search ? `No results for "${search}"` : `Nothing in ${category} yet`}
              </p>
            </div>
            <button
              onClick={() => setCategory("All")}
              className="mt-2 px-6 py-2 bg-black text-white text-sm prod-dm rounded-full hover:text-yellow-400 transition-colors"
            >
              View All Products
            </button>
          </div>
        )}

        {/* Product grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <Link key={product._id} to={`/products/${product._id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Products