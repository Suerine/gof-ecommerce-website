import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST Create new order Protected
router.post("/", protect, createOrder);

// Order history
router.get("/my-orders", protect, getMyOrders);

export default router;
