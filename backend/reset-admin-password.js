
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/user");

async function resetAdminPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const email = "bhavyapandav63@gmail.com";
    const newPassword = "bhavya123@";

    const user = await User.findOne({
      email: email.toLowerCase(),
      role: "admin"
    });

    if (!user) {
      console.log("Admin account not found.");
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    await user.save();

    console.log("Admin password updated successfully!");

  } catch (error) {
    console.error("Password reset failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

resetAdminPassword();
