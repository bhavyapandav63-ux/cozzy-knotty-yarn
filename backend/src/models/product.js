
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    images: [
      {
        type: String,
      },
    ],

    category: {
      type: String,
      required: true,
      trim: true,
    },

    colors: [
      {
        type: String,
      },
    ],

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    sizes: [
      {
        type: String,
      },
    ],

    isCustomizable: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create Product Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
