import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { handleGetAllUsers } from "../controllers/user.controller.js";
import {
  handleGetAllApplications,
  handleGetDashboard,
  handleGetJobs,
  handleGetJobseeker,
  handleGetRecruiters,
} from "../controllers/admin.controller.js";
import { adminOnly } from "../middleware/admin.auth.middlware.js";

const adminRouter = express.Router();
adminRouter.use(adminOnly);

// middleware
adminRouter.use(authUser);

// dashboard routes
adminRouter.get("/dashboard", handleGetDashboard);

// data routes
// adminRouter.get("/users", handleGetAllUsers);
adminRouter.get("/recruiters", handleGetRecruiters);
adminRouter.get("/jobseekers", handleGetJobseeker);
adminRouter.get("/jobs", handleGetJobs);
adminRouter.get("/applications", handleGetAllApplications);

// user management routes
// adminRouter.post("/blockUser", handleBlockUser);
// adminRouter.post("/unblockUser", handleUnblockUser);

export default adminRouter;
