import express from "express";
import { authUser } from "../middleware/auth.middleware.js";

const adminRouter = express.Router();

adminRouter.use(authUser);

adminRouter.get("/dashboard", handleGetDashboard);
adminRouter.get("/users", handleGetAllUsers);
adminRouter.get("/recruiters", handleGetRecruiters);
adminRouter.get("/jobseekers", handleGetJobSeekers);
adminRouter.get("/jobs", handleGetAllJobs);
adminRouter.get("/applications", handleGetAllApplications);
adminRouter.post("/blockUser", handleBlockUser);
adminRouter.post("/unblockUser", handleUnblockUser);

export default adminRouter;
