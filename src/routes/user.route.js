import express from "express";
import {
  handleGetAllUsers,
  handleUpdateUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const userRouter = express.Router();
// userRouter.use(authUser);

userRouter.get("/", handleGetAllUsers);
userRouter.patch("/profileUpdate", handleUpdateUser);
userRouter.patch("/changePassword", (req, res) => {
  res.status(501).json({ message: "Not implemented" });
});

export default userRouter;
