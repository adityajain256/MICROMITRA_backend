import express from "express";
import {
  handleLoginUser,
  handleLogOutUser,
  handleRegisterUser,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", handleRegisterUser);
authRouter.post("/login", handleLoginUser);
authRouter.get("/logout", handleLogOutUser);

export default authRouter;
