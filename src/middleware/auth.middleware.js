import jwt from "jsonwebtoken";
import prisma from "../../connection/prisma.js";

export const authUser = async (req, res, next) => {
  const authHeader = req.headers.Authorization;

  let token;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    req.user = user;
  } catch (error) {
    return res.status(401).json({ error: "invalid token" });
  }

  next();
};
