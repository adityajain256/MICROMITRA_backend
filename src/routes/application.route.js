import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
const applicationRouter = express.Router();
applicationRouter.use(authUser);

applicationRouter.get("/", handleGetAllApplications);
applicationRouter.get("/:id", handleGetApplicationById);
applicationRouter.post("/", handleCreateApplication);
applicationRouter.patch("/:id/status", handleUpdateApplicationStatus);
applicationRouter.delete("/:id", handleDeleteApplication);

export default applicationRouter;
