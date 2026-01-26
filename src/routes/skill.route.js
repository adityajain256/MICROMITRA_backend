import express from "express";

const skillRouter = express.Router();

skillRouter.post("/createSkill", handleCreateSkill);
skillRouter.delete("/deleteSkill", handleDeleteSkill);

export default skillRouter;