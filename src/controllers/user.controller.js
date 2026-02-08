import prisma from "../../connection/prisma.js";
import bcrypt from "bcrypt";
import cloudinary from "../../connection/cloudinary.js";
import streamifier from "streamifier";

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

export const handleGetProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        recruter: {
          select: {
            jobs: true,
          },
        },

        jobSeeker: {
          select: {
            applications: {
              include: {
                job: true,
              },
            },
          },
        },
      },
    });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.status(200).json({ message: user, ok: true });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("Error fetching user profile:", error);
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

export const handleUploadProfilePicture = async (req, res) => {
  try {
    let profileImageUrl = null;
    if (req.file) {
      const uploadFromBuffer = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "micromitra/profile",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await uploadFromBuffer();
      profileImageUrl = result.secure_url;
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { picture: profileImageUrl },
    });
    res.status(200).json({ message: profileImageUrl });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("Error uploading profile picture:", error);
  }
};

export const handleUpdateRole = async (req, res) => {
  const { role } = req.body;
  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }

  try {
    const updateduser = await prisma.user.update({
      where: { id: req.user.id },
      data: { role },
    });
    res.status(200).json({ message: updateduser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "internal server error", details: error.message });
    console.error("Error updating user role:", error);
  }
};
