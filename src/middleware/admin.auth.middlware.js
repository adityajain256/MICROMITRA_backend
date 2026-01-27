import prisma from "../../connection/prisma.js";
import jwt from "jsonwebtoken";

export const adminOnly = async (req, res, next) => {
  const authHeader = req.headers.Authorization;

  let token;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return res.status(401).json({ message: "no token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "access denied" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "server error from adminOnly middleware" });
    console.error("Error in adminOnly middleware:", error);
  }
};
