import { Router } from "express";
import * as userController from "./user.controller.js";

export const userRouter = Router();

// Signup route => POST: user/signup
userRouter.post("/signup", userController.signup);

// Login route: POST /users/login
userRouter.post("/login", userController.login);

// Update route: PATCH /users/:id
userRouter.patch("/:id", userController.updateUser);

// Delete route: DELETE /users/
userRouter.delete("/", userController.deleteUser);

// Get route: GET /users/
userRouter.get("/", userController.getUserData);
