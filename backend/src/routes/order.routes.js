
const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders
} = require("../controllers/order.controller");

const { protect } = require("../middleware/auth.middleware");

// Create order
router.post("/", protect, createOrder);

// Get logged-in customer's orders
router.get("/my-orders", protect, getMyOrders);

module.exports = router;
