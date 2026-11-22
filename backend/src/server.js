
require("dotenv").config();

const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {

        // MongoDB Connection
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ MongoDB Connected Successfully");

        // Start Server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Server Error:", error.message);
        process.exit(1);
    }
};

startServer();
