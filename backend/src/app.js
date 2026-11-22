
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const app = express();

// Import Routes
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const adminOrderRoutes = require("./routes/adminOrder.routes");
// Security
app.use(helmet());

// Middleware
app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use(morgan("dev"));

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

app.use("/api", limiter);

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Cozzy Knotty Yarn API 🧶"
    });
});

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy"
    });
});

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.statusCode ? err.message : "Internal Server Error"
    });
});

module.exports = app;
