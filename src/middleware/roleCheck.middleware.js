import jwt from "jsonwebtoken";
import prisma from "../../connection/prisma.js";

export const checkJobseeker = async (req, res, next) => {
  const authHeader = req.headers["Authorization".toLowerCase()];
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

    if (user.role !== "JOBSEEKER") {
      return res.status(403).json({ error: "access denied, not a jobseeker" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "invalid error in server" });
  }
};

export const checkRecruiter = async (req, res, next) => {
  const authHeader = req.headers["Authorization".toLowerCase()];
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

    if (user.role !== "RECRUITER") {
      return res.status(403).json({ error: "access denied, not a recruiter" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "invalid error in server" });
  }
};
