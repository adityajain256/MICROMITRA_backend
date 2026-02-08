import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
  handleCloseJob,
  handlecreateJob,
  handleGetAllJobs,
  handleGetJob,
  handleGetMyJobs,
} from "../controllers/job.controller.js";
import { checkRecruiter } from "../middleware/roleCheck.middleware.js";

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of all jobs
 *       404:
 *         description: No jobs found
 */

/**
 * @swagger
 * /api/jobs/myJobs:
 *   get:
 *     summary: Get my posted jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of my jobs
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - address
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: string
 *               salary:
 *                 type: string
 *               jobType:
 *                 type: string
 *                 enum: [FULL_TIME, PART_TIME, CONTRACT]
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Bad request
 */

const jobRouter = express.Router();

jobRouter.get("/", handleGetAllJobs);
jobRouter.get("/myJobs", authUser, handleGetMyJobs);
jobRouter.post("/", authUser, handlecreateJob);
jobRouter.get("/job/:id", checkRecruiter, handleGetJob);
jobRouter.patch("/job/:id/close", checkRecruiter, handleCloseJob);
export default jobRouter;
