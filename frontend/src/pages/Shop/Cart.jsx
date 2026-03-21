import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { CartContext } from "../../context/CartContext"
import { Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { FiShoppingCart, FiChevronRight } from "react-icons/fi"

const CartPage = () => {
  const { user } = useContext(AuthContext)
  const { cart, removeItem, updateQuantity } = useContext(CartContext)

  const normalizeItem = (item) => {
    if (user) {
      const isPopulated = item.product && typeof item.product === "object"
      return {
        id: item._id,
        productId: isPopulated ? item.product._id : item.product,
        name: isPopulated ? item.product.name : "",
        image: isPopulated ? item.product.images?.[0] : "",
        size: item.size,
        price: item.price,
        quantity: item.quantity,
      }
    }
    return {
      id: `${item.productId}-${item.size}`,
      productId: item.productId,
      name: item.name,
      image: item.image,
      size: item.size,
      price: item.price,
      quantity: item.quantity,
    }
  }

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f6f3] flex flex-col items-center justify-center gap-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
          .cart-bebas { font-family: 'Bebas Neue', sans-serif; }
          .cart-dm { font-family: 'DM Sans', sans-serif; }
        `}</style>
        <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
          <FiShoppingCart className="text-gray-300 text-2xl" />
        </div>
        <div className="text-center">
          <p className="cart-bebas text-4xl text-gray-300 tracking-wide">Your Cart is Empty</p>
          <p className="cart-dm text-gray-400 text-sm mt-1">Add some items to get started</p>
        </div>
        <Link
          to="/products"
          className="cart-dm mt-2 px-6 py-2.5 bg-black text-white text-sm rounded-full hover:text-yellow-400 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  const normalizedItems = cart.items.map(normalizeItem)
  const totalPrice = normalizedItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )

  return (
    <div className="min-h-screen bg-[#f7f6f3]">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .cart-bebas { font-family: 'Bebas Neue', sans-serif; }
        .cart-dm { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* Header */}
      <div className="bg-black text-white px-6 sm:px-10 py-10 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full border border-white/5" />
        <div className="max-w-6xl mx-auto relative z-10 flex items-end justify-between">
          <div>
            <p className="cart-dm text-yellow-400 text-xs tracking-[0.3em] uppercase mb-2">Your Order</p>
            <h1 className="cart-bebas text-6xl sm:text-7xl leading-none">Cart</h1>
          </div>
          <p className="cart-dm text-white/30 text-sm pb-1">
            {normalizedItems.length} item{normalizedItems.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-6 sm:px-10 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs cart-dm text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <FiChevronRight className="text-gray-300" />
          <span className="text-black font-medium">Cart</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Items list */}
        <div className="lg:col-span-2 space-y-4">
          {normalizedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-5 border border-gray-100"
            >
              {/* Image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-gray-50">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="cart-dm font-medium text-black text-sm sm:text-base truncate">{item.name}</h3>
                <p className="cart-dm text-gray-400 text-xs mt-0.5 tracking-widest uppercase">Size: {item.size}</p>

                <p className="cart-bebas text-yellow-500 text-2xl mt-2 leading-none">
                  KSh {(item.price * item.quantity).toLocaleString()}
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-sm
                      hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <span className="cart-dm text-sm font-medium w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-sm
                      hover:border-black transition-colors"
                  >
                    +
                  </button>
                  <span className="cart-dm text-gray-300 text-xs ml-1">× KSh {item.price?.toLocaleString()}</span>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.productId, item.size)}
                className="self-start p-2 text-gray-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">

            <p className="cart-dm text-xs tracking-[0.2em] uppercase text-gray-400 mb-5">Order Summary</p>

            <div className="space-y-3 mb-5">
              {normalizedItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <p className="cart-dm text-gray-500 text-xs truncate max-w-[160px]">
                    {item.name} <span className="text-gray-300">×{item.quantity}</span>
                  </p>
                  <p className="cart-dm text-black text-xs font-medium shrink-0">
                    KSh {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="h-px bg-gray-100 mb-5" />

            <div className="flex justify-between items-center mb-6">
              <p className="cart-dm text-sm font-medium text-black">Total</p>
              <p className="cart-bebas text-3xl text-black leading-none">
                KSh {totalPrice.toLocaleString()}
              </p>
            </div>

            {!user && (
              <p className="cart-dm text-xs text-gray-400 text-center mb-4">
                <Link to="/login" className="underline text-black">Log in</Link> to save your cart and checkout
              </p>
            )}

            {user ? (
              <Link
                to="/checkout"
                className="w-full py-3 bg-black text-white cart-dm text-sm font-medium rounded-full
                  hover:text-yellow-400 transition-colors text-center block"
              >
                Checkout
              </Link>
            ) : (
              <button
                disabled
                className="w-full py-3 bg-black text-white cart-dm text-sm font-medium rounded-full
                  opacity-40 cursor-not-allowed"
              >
                Checkout
              </button>
            )}
            
            <Link
              to="/products"
              className="block text-center mt-3 cart-dm text-xs text-gray-400 hover:text-black transition-colors"
            >
              Continue Shopping →
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartPage