import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/*
ADD TO CART
*/
export const addToCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    if (!productId || !size || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find selected size
    const selectedSize = product.sizes.find((s) => s.size === size);

    if (!selectedSize) {
      return res.status(400).json({ message: "Invalid size selected" });
    }

    if (selectedSize.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size,
    );

    if (existingItem) {
      existingItem.quantity += quantity;

      if (existingItem.quantity > selectedSize.stock) {
        return res.status(400).json({ message: "Exceeds available stock" });
      }
    } else {
      cart.items.push({
        product: productId,
        size,
        quantity,
        price: product.price, // snapshot price
      });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    const item = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size,
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.quantity = quantity;

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId, size } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => !(item.product.toString() === productId && item.size === size),
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const mergeCart = async (req, res) => {
  try {
    const { items } = req.body; // [{ productId, size, quantity }]

    if (!items || !items.length) {
      return res.status(400).json({ message: "No items to merge" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    for (const guestItem of items) {
      const { productId, size, quantity } = guestItem;

      const product = await Product.findById(productId);
      if (!product || !product.isActive) continue;

      const selectedSize = product.sizes.find((s) => s.size === size);
      if (!selectedSize) continue;

      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId && item.size === size,
      );

      if (existingItem) {
        const newQty = existingItem.quantity + quantity;
        existingItem.quantity = Math.min(newQty, selectedSize.stock);
      } else {
        cart.items.push({
          product: productId,
          size,
          quantity: Math.min(quantity, selectedSize.stock),
          price: product.price,
        });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
