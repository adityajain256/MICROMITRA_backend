import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
  handlecreateJob,
  handleGetAllJobs,
} from "../controllers/job.controller.js";
const jobRouter = express.Router();

jobRouter.get("/", authUser, handleGetAllJobs);
jobRouter.post("/", authUser, handlecreateJob);

export default jobRouter;
