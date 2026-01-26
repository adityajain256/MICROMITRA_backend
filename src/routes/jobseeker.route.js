import express from "express";
import {
  hadnleUpdateJobSeekerProfile,
  handleGetJobSeekerProfile,
} from "../controllers/jobseeker.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
const jobseekerRouter = express.Router();

jobseekerRouter.use(authUser);

jobseekerRouter.get("/", handleGetJobSeekerProfile);
jobseekerRouter.patch("/", hadnleUpdateJobSeekerProfile);

export default jobseekerRouter;
