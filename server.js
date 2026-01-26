import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.route.js";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.route.js";
import jobRouter from "./src/routes/job.route.js";
import recruiterRouter from "./src/routes/recruiter.route.js";
import jobseekerRouter from "./src/routes/jobseeker.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/recruiter", recruiterRouter);
app.use("/api/jobseeker", jobseekerRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
