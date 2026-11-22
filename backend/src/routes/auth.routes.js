
const router = require("express").Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth.controller");

// Register API
router.post("/register", registerUser);

// Login API
router.post("/login", loginUser);
// Logout API
router.post("/logout", logoutUser);
module.exports = router;

// TODO: POST /register, POST /login, GET /memodule.exports = router;