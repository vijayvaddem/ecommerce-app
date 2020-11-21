import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";

import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();
router.route("/").get(getProducts);
router.route("/").post(protect, admin, createProduct);
router.route("/:id").put(protect, admin, updateProduct);
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);

export default router;
