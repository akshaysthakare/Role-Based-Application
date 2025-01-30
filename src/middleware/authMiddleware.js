const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ROLES = require("../utils/roles");

require("dotenv").config();

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);

    if (!req.user) return res.status(401).json({ message: "User not found" });
    // console.log("User Role:", req.user.role); 
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

exports.roleMiddleware = (action) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!ROLES[userRole]?.includes(action)) {
      console.log(`Role ${userRole} does not have permission for ${action}`);
      return res.status(403).json({ message: "Forbidden: You do not have permission" });
    }
    next();
  };
};
