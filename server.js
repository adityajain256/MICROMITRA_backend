import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.route.js";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
