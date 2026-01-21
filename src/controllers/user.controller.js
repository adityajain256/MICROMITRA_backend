import { PrismaClient } from "@prisma/client";

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
  const body = req.body;
  if (!body) {
    return res.status(400).json({ error: "bad request" });
  }
  try {
    const newUser = await prisma.user.create({
      data: body,
    });
    res.status(201).json({ message: newUser });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
