import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
