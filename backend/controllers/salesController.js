import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc   get sales total per month for admin
// @route  GET /api/salesbymonth
// @access Private
const getSalesPerMonth = asyncHandler(async (req, res) => {
  //const orders = await Order.find({});

  const sales = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%m", date: "$createdAt" } },
        totalSales: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);

  res.json(sales);
});

export { getSalesPerMonth };
