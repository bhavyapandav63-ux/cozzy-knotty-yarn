
const router = require("express").Router();
const Product = require("../models/product");

// ========================================
// GET ALL PUBLISHED PRODUCTS
// ========================================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({
      isPublished: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    console.error("Get Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});

module.exports = router;
