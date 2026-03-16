import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { CartContext } from "../../context/CartContext"
import { Trash2 } from "lucide-react"

const CartPage = () => {

  const { user } = useContext(AuthContext)
  const { fetchCart } = useContext(CartContext)
  const [cart, setCart] = useState(null)

  const loadCart = async () => {
    try {
      const res = await axios.get("/api/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setCart(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (user) loadCart()
  }, [user])

  // REMOVE ITEM
  const removeItem = async (productId, size) => {
    try {

      await axios.delete("/api/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        data: { productId, size }
      })

      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter(
          (item) =>
            !(item.product._id === productId && item.size === size)
        )
      }))

      fetchCart()

    } catch (err) {
      console.error(err)
    }
  }

  // UPDATE QUANTITY
  const updateQuantity = async (productId, size, quantity) => {
    try {

      await axios.put("/api/cart", 
        { productId, size, quantity },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.product._id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
      }))

      fetchCart()

    } catch (err) {
      console.error(err)
    }
  }

  const totalPrice =
    cart?.items?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ) || 0

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Your cart is empty 🛒</h2>
      </div>
    )
  }
  return (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

    <h1 className="text-2xl font-semibold mb-8">
      Your Cart
    </h1>

    {cart.items.map((item) => (

      <div
        key={item._id}
        className="
          flex flex-col sm:flex-row
          gap-4 sm:gap-6
          border-b pb-6 mb-6
        "
      >

        {/* Product Image */}
        <img
          src={item.product.images?.[0]}
          alt={item.product.name}
          className="
            w-full sm:w-24
            h-48 sm:h-24
            object-cover
            rounded
          "
        />

        {/* Product Info */}
        <div className="flex-1">

          <h3 className="font-medium">
            {item.product.name}
          </h3>

          <p className="text-sm text-gray-500">
            Size: {item.size}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 mt-3">

            <button
              onClick={() =>
                updateQuantity(
                  item.product._id,
                  item.size,
                  item.quantity - 1
                )
              }
              disabled={item.quantity <= 1}
              className="px-2 py-1 border"
            >
              -
            </button>

            <span className="px-2">
              {item.quantity}
            </span>

            <button
              onClick={() =>
                updateQuantity(
                  item.product._id,
                  item.size,
                  item.quantity + 1
                )
              }
              className="px-2 py-1 border"
            >
              +
            </button>

          </div>

        </div>

        {/* Price + Remove */}
        <div className="
          flex sm:flex-col
          justify-between sm:items-end
          items-center
          gap-3
        ">

          <p className="font-semibold">
            KSh {item.price * item.quantity}
          </p>

          <button
            onClick={() =>
              removeItem(item.product._id, item.size)
            }
            className="text-red-600"
          >
            <Trash2 size={20} />
          </button>

        </div>

      </div>

    ))}

    {/* Total Section */}
    <div className="
      mt-10
      flex flex-col sm:flex-row
      gap-4
      sm:justify-between
      sm:items-center
    ">

      <h2 className="text-xl font-semibold">
        Total: KSh {totalPrice}
      </h2>

      <button className="
        bg-black text-white
        px-6 py-3
        w-full sm:w-auto
      ">
        Checkout
      </button>

    </div>

  </div>
)
}

export default CartPage