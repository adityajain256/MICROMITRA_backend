import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const handleGetAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      return res.status(404).json({ error: "no users found" });
    }
    res.status(200).json({ message: users });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("Error fetching users:", error);
  }
};

export const handleRegisterUser = async (req, res) => {
  const { email, name, password, phone, role, city } = req.body;
  if (!email || !name || !password || !phone || !role) {
    return res.status(400).json({ error: "bad request" });
  }

  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, name, password: hashedPass, phone, role, city },
    });
    res.status(201).json({ message: newUser });
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
      return res.status(402).json({ message: "bad request." });
    }
    res.status(200).json({ message: "login successful", user });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("Error during user login:", error);
  }
};
