import * as userRepository from "./user.repository.js";

// signup service
export const signup = async (userData) => {
  // check if user already exists before creating a new user
  const existingUser = await userRepository.findUserByEmail(userData.email);
  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409; // conflict state/data
    throw error;
  }

  // if not, create a new user
  return await userRepository.createUser(userData);
};

// user login
export const login = async ({ email, password }) => {
  // check if user exists
  const existingUser = await userRepository.findUserByEmail(email);
  // if not existing or password is incorrect, throw an error
  if (!existingUser || existingUser.password !== password) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401; // unauthorized request
    throw error;
  }
  return existingUser;
};

// update logged-in user info
export const updateUser = async (id, newData) => {
  // check if the user exists
  const existingUser = await userRepository.findUserById(id);
  if (!existingUser) {
    const error = new Error("User not found.");
    error.statusCode = 404; // not found
    throw error;
  }
  // if the data contain email
  if (newData.email) {
    // if email already exists before
    const userWithEmail = await userRepository.findUserByEmail(newData.email);
    // is it belogns to different user?
    if (userWithEmail && userWithEmail._id.toString() !== id) {
      const newError = new Error("Email already exists.");
      newError.statusCode = 400; // bad request
      throw newError;
    }
  }

  return await userRepository.updateUserData(id, newData);
};

// delete user
export const deleteUser = async (id) => {
  const result = await userRepository.deleteUser(id);
  if (!result) {
    const error = new Error("User not found.");
    error.statusCode = 404; // not found
    throw error;
  }
  return result;
};

// get user data by Id
export const getUserById = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404; // not found
    throw error;
  }
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};
