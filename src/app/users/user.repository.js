import { User } from "./user.model.js";

// find user by email
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// find user by id
export const findUserById = async (id) => {
  return await User.findById(id);
};

// create a new user
export const createUser = async (userData) => {
  return await User.create(userData);
};

// updated user data
export const updateUserData = async (id, newData) => {
  return await User.updateOne({ _id: id }, newData, { runValidators: true });
};
