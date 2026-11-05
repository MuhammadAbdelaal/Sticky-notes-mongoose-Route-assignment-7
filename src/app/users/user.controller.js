import * as userService from "./user.service.js";
import mongoose from "mongoose";

// signup controller
export const signup = async (req, res, next) => {
  try {
    const { name, email, password, phone, age } = req.body || {};

    // name, email, password, and phone are required fields
    if (!name || !email || !password || !phone) {
      const error = new Error("Missing required fields");
      error.statusCode = 400; // bad request
      throw error;
    }

   await userService.signup({
      name,
      email,
      password,
      phone,
      age,
    });
    return res.status(201).json({
      message: "User added successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// user login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    // email and password are required fields
    if (!email || !password) {
      const error = new Error("Missing required fields");
      error.statusCode = 400; // bad request code
      throw error;
    }
    await userService.login({ email, password });
    return res.status(200).json({
      message: "User logged in successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// update user info
export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    // if id is not a valid objectId
    if (!mongoose.isValidObjectId(id)) {
      const error = new Error("Invalid user id");
      error.statusCode = 400;
      throw error;
    }
    const body = req.body || {}; // avoid undefined body errors
    const allowedInputs = ["name", "email", "phone", "age"];
    const newData = {};

    // filter the req.body
    for (const key of allowedInputs) {
      if (body[key] !== undefined) {
        newData[key] = body[key];
      }
    }
    await userService.updateUser(id, newData);
    return res.status(200).json({ message: "User updated", success: true });
  } catch (error) {
    next(error);
  }
};

// delete user
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.query.userId;
    if (!mongoose.isValidObjectId(id)) {
      const error = new Error("Invalid user id");
      error.statusCode = 400; // bad request
      throw error;
    }
    await userService.deleteUser(id);
    return res.status(200).json({message: "User deleted.", success: true});
  } catch (error) {
    next(error);
  }
};