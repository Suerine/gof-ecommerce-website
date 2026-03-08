import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
GET USER CART
*/
router.get("/", protect, getCart);

/*
ADD ITEM TO CART
*/
router.post("/", protect, addToCart);

/*
REMOVE ITEM FROM CART
*/
router.delete("/", protect, removeFromCart);

/*
CLEAR CART
*/
router.delete("/clear", protect, clearCart);

export default router;
