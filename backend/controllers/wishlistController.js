import Wishlist from "../models/Wishlist.js";

/*
GET USER WISHLIST
*/
export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
      "products",
    );

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        products: [],
      });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
ADD TO WISHLIST
*/
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        products: [],
      });
    }

    // 🔥 prevent duplicates
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();

    const updated = await wishlist.populate("products");

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
REMOVE FROM WISHLIST
*/
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId,
    );

    await wishlist.save();

    const updated = await wishlist.populate("products");

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
