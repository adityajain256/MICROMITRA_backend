import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
  handleGetRecruiterProfile,
  hadnleUpdateRecruiterProfile,
} from "../controllers/recruiter.controller.js";
import { handleGetApplicationsForMyJobs } from "../controllers/applicatoin.controller.js";
import { checkRecruiter } from "../middleware/roleCheck.middleware.js";

/**
 * @swagger
 * /api/recruiter/profile:
 *   get:
 *     summary: Get recruiter profile
 *     tags: [Recruiter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recruiter profile details
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/recruiter/updateCompanyProfile:
 *   patch:
 *     summary: Update company profile
 *     tags: [Recruiter]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company profile updated successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/recruiter/applications/{jobId}:
 *   get:
 *     summary: Get applications for a job
 *     tags: [Recruiter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of applications for the job
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 */

const recruiterRouter = express.Router();

recruiterRouter.get("/profile", authUser, handleGetRecruiterProfile);
recruiterRouter.patch(
  "/updateCompanyProfile",
  authUser,
  hadnleUpdateRecruiterProfile,
);
recruiterRouter.get(
  "/applications/:jobId",
  checkRecruiter,
  handleGetApplicationsForMyJobs,
);

export default recruiterRouter;
