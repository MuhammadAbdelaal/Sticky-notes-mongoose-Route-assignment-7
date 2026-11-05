import express from "express";
import "./common/db/connection.js";
import { userRouter } from "./app/users/user.route.js";

const app = express();
const PORT = 3000;

app.use(express.json()); // parse req body

app.use("/users", userRouter); // user routes

// global error handler
app.use((err, req, res, next) => {
  console.log(err.message);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message, success: false });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
