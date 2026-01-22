import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
      expiresIn: "7d",
    });

    // setting cookie here
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: "Strict",
    });

    res.status(201).json({ message: newUser, token: token });
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
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    // setting cookie here
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: "Strict",
    });
    res.status(200).json({ message: "login successful", token: token });
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

export const hadnleUpdateRecruiterProfile = async (req, res) => {
  const { company } = req.body;
  if (!company) {
    return res.status(400).json({ error: "bad request" });
  }

  const user = req.user;
  if (user.role !== "RECRUITER") {
    return res.status(403).json({ error: "forbidden access" });
  }
  try {
    const recruiter = await prisma.recruter.findUnique({
      where: { userId: req.user.id },
    });
    if (!recruiter) {
      await prisma.recruter.create({
        data: {
          userId: req.user.id,
          company,
        },
      });
    }
    const updatedRecruter = await prisma.recruter.update({
      where: { userId: req.user.id },
      data: { company },
    });
    res.status(200).json({ message: updatedRecruter });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("Error updating recruiter profile:", error);
  }
};

export const hadnleUpdateJobSeekerProfile = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "bad request" });
  }
  const user = req.user;
  if (user.role !== "JOBSEEKER") {
    return res.status(403).json({ error: "forbidden access" });
  }
  try {
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: req.user.id },
    });
    if (!jobSeeker) {
      await prisma.jobSeeker.create({
        data: {
          userId: req.user.id,
        },
      });
    }
    console.log(name);
    const skill = await prisma.skill.create({
      data: {
        name: name,
      },
    });

    res.status(200).json({ message: skill });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
