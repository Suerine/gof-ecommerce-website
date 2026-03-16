import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "./ProductCard"
import { Link } from "react-router-dom"

function Products() {

  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchProducts = async () => {
      try {

        setLoading(true)

        let url = "/api/products"

        if (category !== "All") {
          url = `/api/products?category=${category}`
        }

        const res = await axios.get(url)

        setProducts(res.data.products)

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()

  }, [category])

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
        Products
      </h1>

      {/* Category Buttons */}
      <div className="
        flex
        gap-3
        mb-8
        overflow-x-auto
        pb-2
      ">
        {["All", "Jerseys", "Boots", "Balls"].map((cat) => (

          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`
              px-4
              py-2
              whitespace-nowrap
              rounded-full
              text-sm
              transition
              ${
                category === cat
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }
            `}
          >
            {cat}
          </button>

        ))}
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center py-10 text-gray-500">
          Loading products...
        </p>
      )}

      {/* Product Grid */}
      {!loading && (
        <div className="
          grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-4
          sm:gap-6
        ">

          {products.map((product) => (

            <Link
              key={product._id}
              to={`/products/${product._id}`}
            >
              <ProductCard product={product} />
            </Link>

          ))}

        </div>
      )}

    </div>
  )
}

export default Products