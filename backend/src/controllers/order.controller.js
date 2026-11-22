
const Order = require("../models/order");
const Product = require("../models/product");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty"
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required"
      });
    }

    if (!["COD", "ONLINE"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method"
      });
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product || !product.isPublished) {
        return res.status(400).json({
          success: false,
          message: "A product is unavailable"
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid product quantity"
        });
      }

      if (quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `${product.name} has insufficient stock`
        });
      }

      subtotal += product.price * quantity;

      orderItems.push({
        productId: product._id,
        name: product.name,
        image: product.images[0] || "",
        price: product.price,
        quantity
      });
    }

    const shippingFee = 0;
    const totalAmount = subtotal + shippingFee;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      subtotal,
      shippingFee,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to place order"
    });
  }
};

// GET MY ORDERS
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (error) {
    console.error("Get Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch orders"
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders
};
