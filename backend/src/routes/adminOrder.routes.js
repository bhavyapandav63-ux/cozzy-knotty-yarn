
const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  updateOrderStatus
} = require("../controllers/adminOrder.controller");

const { protect } = require("../middleware/auth.middleware");
const { admin } = require("../middleware/admin.middleware");

// Get all customer orders
router.get("/all", protect, admin, getAllOrders);

// Update an order's status
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;
