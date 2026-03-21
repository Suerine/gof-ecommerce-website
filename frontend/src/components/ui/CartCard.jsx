import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import { FiShoppingCart } from "react-icons/fi"

const CartCard = () => {
  const { cart } = useContext(CartContext)
  const { user } = useContext(AuthContext)

  const normalizeItem = (item) => {
    if (!user) {
      return {
        id: `${item.productId}-${item.size}`,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
      }
    }
    const isPopulated = item.product && typeof item.product === "object"
    return {
      id: item._id,
      name: isPopulated ? item.product.name : item.name,
      image: isPopulated ? item.product.images?.[0] : item.image,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
    }
  }

  // Empty state
  if (!cart || cart.items.length === 0) {
    return (
      <div className="absolute right-0 top-12 w-72 bg-black border border-white/10 rounded-2xl shadow-2xl p-5 z-50">
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
            <FiShoppingCart className="text-white/20 text-lg" />
          </div>
          <p className="nav-dm text-white/30 text-xs tracking-widest uppercase">Cart is empty</p>
          <Link
            to="/products"
            className="nav-dm text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            Browse products →
          </Link>
        </div>
      </div>
    )
  }

  const normalizedItems = cart.items.map(normalizeItem)
  const total = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="absolute right-0 top-12 w-80 bg-black border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">

      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <p className="nav-dm text-white/30 text-xs tracking-[0.2em] uppercase">Your Cart</p>
        <span className="nav-dm text-white/20 text-xs">{normalizedItems.length} item{normalizedItems.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Items */}
      <div className="space-y-0 max-h-64 overflow-y-auto">
        {normalizedItems.map((item, i) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${
              i !== normalizedItems.length - 1 ? "border-b border-white/5" : ""
            }`}
          >
            <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-white/5">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="nav-dm text-white text-xs font-medium truncate">{item.name}</p>
              <p className="nav-dm text-white/30 text-xs mt-0.5 tracking-widest uppercase">
                {item.size} · ×{item.quantity}
              </p>
            </div>
            <p className="nav-bebas text-yellow-400 text-sm shrink-0 tracking-wide">
              KSh {(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/5">
        <div className="flex justify-between items-center mb-3">
          <p className="nav-dm text-white/40 text-xs uppercase tracking-widest">Total</p>
          <p className="nav-bebas text-white text-xl tracking-wide">KSh {total.toLocaleString()}</p>
        </div>
        <Link
          to="/cart"
          className="nav-dm block w-full text-center bg-white text-black text-xs font-medium
            py-2.5 rounded-full hover:bg-yellow-400 transition-colors duration-200 tracking-widest uppercase"
        >
          View Cart
        </Link>
      </div>

    </div>
  )
}

export default CartCard