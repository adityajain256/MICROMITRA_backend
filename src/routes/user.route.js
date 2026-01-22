import express from "express";
import {
  hadnleUpdateJobSeekerProfile,
  hadnleUpdateRecruiterProfile,
  handleGetAllUsers,
  handleLoginUser,
  handleLogOutUser,
  handleRegisterUser,
  handleUpdateUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/", handleGetAllUsers);
userRouter.post("/register", handleRegisterUser);
userRouter.post("/login", handleLoginUser);
userRouter.get("/logout", handleLogOutUser);
userRouter.patch("/profileUpdate", authUser, handleUpdateUser);

// for recruter and jobseeker profile updates
userRouter.patch("/recruterUpdate", authUser, hadnleUpdateRecruiterProfile);
userRouter.patch("/jobseekerUpdate", authUser, hadnleUpdateJobSeekerProfile);
export default userRouter;
