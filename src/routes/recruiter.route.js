import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
  handleGetRecruiterProfile,
  hadnleUpdateRecruiterProfile,
} from "../controllers/recruiter.controller.js";
const recruiterRouter = express.Router();

recruiterRouter.use(authUser);
// GET    /recruiter/profile
// PATCH  /recruiter/company
// GET    /recruiter/jobs
// GET    /recruiter/applications
// PATCH  /recruiter/applications/:id/status

recruiterRouter.get("/profile", handleGetRecruiterProfile);
recruiterRouter.patch("/updateCompanyProfile", hadnleUpdateRecruiterProfile);

export default recruiterRouter;
