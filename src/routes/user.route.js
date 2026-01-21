import express from "express";
import {
  handleGetAllUsers,
  handleLoginUser,
  handleRegisterUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", handleGetAllUsers);
userRouter.post("/register", handleRegisterUser);
userRouter.post("/login", handleLoginUser);
// userRouter.patch("/profile");
// userRouter.get("/profile");

export default userRouter;
