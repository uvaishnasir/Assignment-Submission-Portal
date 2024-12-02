import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = (allowedRoles) => async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = user;
    // console.log(decoded);
    // console.log(req.user);

    // Check if role is allowed
    if (!allowedRoles.includes(decoded.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
