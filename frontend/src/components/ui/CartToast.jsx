import React from "react"

const CartToast = ({ product }) => {
  return (
    <div className="flex items-center gap-3">

      <img
        src={product.images?.[0]}
        alt={product.name}
        className="w-12 h-12 object-cover rounded"
      />

      <div className="flex flex-col">
        <span className="text-sm font-semibold">
          Added to cart
        </span>

        <span className="text-xs text-gray-300 line-clamp-1">
          {product.name}
        </span>
      </div>

    </div>
  )
}

export default CartToast