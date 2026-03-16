import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} from "../controllers/productController.js";
import cloudinary from "../config/cloudinary.js";

import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/cloud-test", async (req, res) => {
  const result = await cloudinary.api.ping();
  res.json(result);
});

/*
GET ALL PRODUCTS (Public)
*/
router.get("/", getProducts);

/* SEARCH PRODUCTS (Public) */
router.get("/search", searchProducts);

/*
GET SINGLE PRODUCT (Public)
*/
router.get("/:id", getProductById);

/*
CREATE PRODUCT (Admin Only)
*/
router.post("/", protect, admin, createProduct);

/*
UPDATE PRODUCT (Admin Only)
*/
router.put("/:id", protect, admin, updateProduct);

/*
DELETE PRODUCT (Soft Delete - Admin Only)
*/
router.delete("/:id", protect, admin, deleteProduct);

// UPLOAD IMAGES
router.post("/upload", upload.array("images", 5), (req, res) => {
  const imageUrls = req.files.map((file) => file.path);

  res.json({
    images: imageUrls,
  });
});

export default router;
