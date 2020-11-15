import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getSalesPerMonth } from "../controllers/salesController.js";

const router = express.Router();

router.route("/salesbymonth").get(protect, getSalesPerMonth);

export default router;
