import express from "express";
import {
  getAdminStats,
  adminGetProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminToggleProduct,
  adminDeleteProduct,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// All routes require both protect + adminOnly
router.use(protect, adminOnly);

router.get("/stats", getAdminStats);

router.get("/products", adminGetProducts);
router.post("/products", adminCreateProduct);
router.put("/products/:id", adminUpdateProduct);
router.patch("/products/:id/toggle", adminToggleProduct);
router.delete("/products/:id", adminDeleteProduct);

export default router;
