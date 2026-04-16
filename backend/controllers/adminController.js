import Product from "../models/Product.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";

// ─── Overview Stats ───────────────────────────────────────────────────────────

export const getAdminStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });

    // Products by category
    const productsByCategory = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Recently added products
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name price category isActive createdAt images");

    // Low stock alert (any size with stock < 5)
    const lowStockProducts = await Product.find({
      "sizes.stock": { $lt: 5, $gt: 0 },
    }).select("name sizes images category");

    // Out of stock
    const outOfStock = await Product.find({
      "sizes.stock": 0,
    }).countDocuments();

    res.status(200).json({
      products: {
        total: totalProducts,
        active: activeProducts,
        outOfStock,
        byCategory: productsByCategory,
      },
      users: {
        total: totalUsers,
        admins: totalAdmins,
      },
      recentProducts,
      lowStockProducts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Get All Products (admin view, includes inactive) ────────────────────────

export const adminGetProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, search, active } = req.query;

    const query = {};
    if (category && category !== "All") query.category = category;
    if (search) query.name = { $regex: search, $options: "i" };
    if (active !== undefined) query.isActive = active === "true";

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Create Product ───────────────────────────────────────────────────────────

export const adminCreateProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, sizes, featured } =
      req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: "Name, price and category are required" });
    }

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      images: images || [],
      sizes: sizes || [],
      featured: featured || false,
      isActive: true,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Update Product ───────────────────────────────────────────────────────────

export const adminUpdateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const fields = [
      "name",
      "description",
      "price",
      "category",
      "images",
      "sizes",
      "featured",
      "isActive",
    ];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) product[field] = req.body[field];
    });

    await product.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Toggle Product Active Status ────────────────────────────────────────────

export const adminToggleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isActive = !product.isActive;
    await product.save();

    res.status(200).json({ isActive: product.isActive });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Delete Product ───────────────────────────────────────────────────────────

export const adminDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
