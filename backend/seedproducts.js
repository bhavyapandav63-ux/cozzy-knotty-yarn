
require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./src/models/product");

const products = [
  {
    name: "Rainbow Tulip Bouquet",
    description: "Beautiful handmade crochet rainbow tulip bouquet.",
    price: 499,
    category: "Bouquets",
    images: [],
    stock: 10,
    isCustomizable: true,
    isBestSeller: true,
    isNewArrival: true,
    isPublished: true,
  },
  {
    name: "Sunflower & Lily Bouquet",
    description: "Handmade crochet sunflower and lily bouquet.",
    price: 599,
    category: "Bouquets",
    images: [],
    stock: 10,
    isCustomizable: true,
    isPublished: true,
  },
  {
    name: "Evil Eye & Daisy Bouquet",
    description: "Cute handmade crochet daisy bouquet.",
    price: 499,
    category: "Bouquets",
    images: [],
    stock: 10,
    isCustomizable: true,
    isPublished: true,
  },
  {
    name: "Red & Cream Roses",
    description: "Elegant handmade crochet rose bouquet.",
    price: 599,
    category: "Bouquets",
    images: [],
    stock: 10,
    isCustomizable: true,
    isPublished: true,
  },
  {
    name: "Doraemon Keychain",
    description: "Cute handmade crochet keychain.",
    price: 149,
    category: "Keychains",
    images: [],
    stock: 15,
    isPublished: true,
  },
  {
    name: "Crochet Phone Cover",
    description: "Custom handmade crochet phone cover.",
    price: 299,
    category: "Phone Covers",
    images: [],
    stock: 10,
    isCustomizable: true,
    isPublished: true,
  },
  {
    name: "Crochet Rose Anklet",
    description: "Beautiful handmade crochet rose anklet.",
    price: 199,
    category: "Accessories",
    images: [],
    stock: 10,
    isPublished: true,
  },
  {
    name: "Crochet Tulip Hair Clip",
    description: "Handmade crochet tulip hair accessory.",
    price: 99,
    category: "Accessories",
    images: [],
    stock: 15,
    isPublished: true,
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected!");

    for (const product of products) {
      await Product.updateOne(
        { name: product.name },
        { $set: product },
        { upsert: true }
      );
    }

    console.log("✅ Products added successfully!");

  } catch (error) {
    console.error("❌ Error:", error.message);

  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();
