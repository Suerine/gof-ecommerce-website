import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/* CREATE ORDER FROM CART */
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address required" });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "orderItems.product",
      "name price images",
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty " });
    }

    let totalPrice = 0;
    const orderItems = [];

    // Valiate stock again + reduce it
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);

      if (!product || !product.isActive) {
        return res.status(400).json({ message: "Product no longer available" });
      }

      const selectedSize = product.sizes.find((s) => s.size === item.size);

      if (!selectedSize) {
        return res.status(400).json({ message: "Invalid size in cart" });
      }

      if (selectedSize.stock < item.quantity) {
        return res
          .status(400)
          .json({ messgae: `Insufficient stock for ${product.name}` });
      }

      // Reduce stock
      selectedSize.stock -= item.quantity;
      await product.save();

      totalPrice += item.quantity * item.price;

      orderItems.push({
        product: product._id,
        name: product.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        image: product.images[0],
      });
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged in user's order history
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("orderItems.product", "name price images")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
