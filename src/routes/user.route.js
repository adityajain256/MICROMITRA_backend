import express from "express";
import {
  handleGetAllUsers,
  handleGetProfile,
  handleUpdateRole,
  handleUpdateUser,
  handleUploadProfilePicture,
} from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile details
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/users/profileUpdate:
 *   patch:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               city:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/users/uploadProfilePicture:
 *   patch:
 *     summary: Upload profile picture
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/users/role:
 *   patch:
 *     summary: Update user role
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [ADMIN, RECRUITER, JOBSEEKER]
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Bad request
 */

const userRouter = express.Router();
userRouter.use(authUser);

userRouter.get("/", handleGetAllUsers);
userRouter.get("/profile", handleGetProfile);
userRouter.patch("/profileUpdate", handleUpdateUser);
userRouter.patch(
  "/uploadProfilePicture",
  upload.single("profilePicture"),
  handleUploadProfilePicture,
);
userRouter.patch("/changePassword", (req, res) => {
  res.status(501).json({ message: "Not implemented" });
});
userRouter.patch("/role", handleUpdateRole);

export default userRouter;
