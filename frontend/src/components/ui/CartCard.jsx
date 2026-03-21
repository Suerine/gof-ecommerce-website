import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"

const CartCard = () => {
  const { cart } = useContext(CartContext)
  const { user } = useContext(AuthContext)

  if (!cart || cart.items.length === 0) {
    return (
      <div className="absolute right-0 top-10 w-72 bg-white border shadow p-4 z-50">
        <p>Your cart is empty</p>
      </div>
    )
  }

  // Normalize items regardless of guest vs logged-in shape
  const normalizeItem = (item) => {
  // Guest item — has flat structure
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

  // Logged-in: product may be a populated object or just an ID string
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

  const normalizedItems = cart.items.map(normalizeItem)
  const total = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="absolute right-0 top-10 w-80 bg-white border border-gray-100 shadow-lg p-4 z-50 rounded-xs">

      <h3 className="font-semibold mb-3">Cart</h3>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {normalizedItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover"
            />
            <div className="flex-1">
              <p className="text-sm">{item.name}</p>
              <p className="text-xs text-gray-500">
                {item.quantity} × KSh {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t mt-3 pt-3">
        <p className="font-semibold">Total: KSh {total}</p>
        <Link
          to="/cart"
          className="block mt-2 bg-black text-white text-center py-2 rounded-full"
        >
          View Cart
        </Link>
      </div>

    </div>
  )
}

export default CartCard