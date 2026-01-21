import express from "express";
import {
  handleGetAllUsers,
  handleRegisterUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", handleGetAllUsers);
userRouter.post("/register", handleRegisterUser);
// userRouter.post("/login");
// userRouter.patch("/profile");
// userRouter.get("/profile");

export default userRouter;
