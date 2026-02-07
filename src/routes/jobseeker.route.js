import express from "express";
import {
  hadnleUpdateJobSeekerProfile,
  handleGetJobSeekerProfile,
} from "../controllers/jobseeker.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

/**
 * @swagger
 * /api/jobseeker:
 *   get:
 *     summary: Get jobseeker profile
 *     tags: [JobSeeker]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Jobseeker profile details
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/jobseeker:
 *   patch:
 *     summary: Update jobseeker profile
 *     tags: [JobSeeker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               experience:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request
 */

const jobseekerRouter = express.Router();

jobseekerRouter.use(authUser);

jobseekerRouter.get("/", handleGetJobSeekerProfile);
jobseekerRouter.patch("/", hadnleUpdateJobSeekerProfile);

export default jobseekerRouter;
