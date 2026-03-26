import prisma from "../../connection/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleRegisterUser = async (req, res) => {
  const { email, name, password, phone, role, city } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "invalid email format" });
  }
  if (phone.length < 10 || phone.length > 10) {
    return res.status(400).json({ error: "invalid phone number" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "password must be at least 8 characters long" });
  }
  if (!email || !name || !password || !phone || !role) {
    return res.status(400).json({ error: "bad request" });
  }

  const isExist = await prisma.user.findUnique({
    where: { email: email },
  });

  if (isExist) {
    return res.status(409).json({ error: "user already exists" });
  }

  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, name, password: hashedPass, phone, role, city },
    });

    await prisma.recruter.create({
      data: {
        userId: newUser.id,
      },
    });

    await prisma.jobSeeker.create({
      data: {
        userId: newUser.id,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
      expiresIn: "7d",
    });

    // setting cookie here
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: "Strict",
    });

    res.status(201).json({ message: newUser, token: token, ok: true });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.log(error.message);
  }
};

export const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "bad request" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "bad request." });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    // setting cookie here
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: "Strict",
    });
    res.status(200).json({
      message: "login successful",
      token: token,
      ok: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("Error during user login:", error);
  }
};

export const handleLogOutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
