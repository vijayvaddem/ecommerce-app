import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  updateOrderToPaid,
  getAllOrders,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, getAllOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderByID);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
