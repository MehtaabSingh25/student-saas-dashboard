import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const student = await Student.findById(decoded.id).select("-password");

      if (!student) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      req.student = student;

      next();
    } else {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token invalid",
    });
  }
};

export default protect;
