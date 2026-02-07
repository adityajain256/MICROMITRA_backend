import express from "express";
import { getSkills } from "../controllers/skill.conroller.js";
import { authUser } from "../middleware/auth.middleware.js";

const skillRouter = express.Router();

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: List of all skills
 *       404:
 *         description: No skills found
 *       500:
 *         description: Internal server error
 */

skillRouter.get("/", getSkills);

export default skillRouter;
