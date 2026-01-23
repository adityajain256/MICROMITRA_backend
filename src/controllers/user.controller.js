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

// update user profile
export const handleUpdateUser = async (req, res) => {
  const { name, phone, city, password } = req.body;

  try {
    const hashedPass = bcrypt.hashSync(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, phone, city, password: hashedPass },
    });
    res.status(200).json({ message: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("Error updating user profile:", error);
  }
};
