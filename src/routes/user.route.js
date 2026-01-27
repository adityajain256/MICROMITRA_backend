import express from "express";
import {
  handleGetAllUsers,
  handleUpdateUser,
  handleUploadProfilePicture,
} from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const userRouter = express.Router();
userRouter.use(authUser);

userRouter.get("/", handleGetAllUsers);
userRouter.patch("/profileUpdate", handleUpdateUser);
userRouter.patch(
  "/uploadProfilePicture",
  upload.single("profilePicture"),
  handleUploadProfilePicture,
);
userRouter.patch("/changePassword", (req, res) => {
  res.status(501).json({ message: "Not implemented" });
});

export default userRouter;
