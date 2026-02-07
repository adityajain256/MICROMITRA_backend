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

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard data
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/admin/recruiters:
 *   get:
 *     summary: Get all recruiters
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all recruiters
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/admin/jobseekers:
 *   get:
 *     summary: Get all jobseekers
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all jobseekers
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/admin/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all jobs
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/admin/applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all applications
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

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
