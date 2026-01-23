import express from "express";
import { handleUpdateRecruiterProfile } from "../controllers/recruiter.controller";

const recruiterRouter = express.Router();

// GET    /recruiter/profile
// PATCH  /recruiter/company
// GET    /recruiter/jobs
// GET    /recruiter/applications
// PATCH  /recruiter/applications/:id/status

recruiterRouter.patch("/updateCompanyProfile", handleUpdateRecruiterProfile);

export default recruiterRouter;
