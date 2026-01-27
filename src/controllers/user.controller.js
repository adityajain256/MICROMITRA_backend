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
      data: { picture: profileImageUrl.secure_url },
    });
    res.status(200).json({ message: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
