import * as noteRepository from "./note.repository.js";
import * as userRepository from "../users/user.repository.js";

// Create a single note
export const createOne = async (note) => {
  // check if user exists
  const existingUser = await userRepository.findUserById(note.userId);
  if (!existingUser) {
    // if not, throw error
    const error = new Error("User does not exist.");
    error.statusCode = 404; // not found
    throw error;
  }
  // all good? create the note
  return await noteRepository.createOne(note);
};

// Update a single note
export const updateOne = async (noteId, userId, updatedNote) => {
  // chekc if the note exists
  const existingNote = await noteRepository.getNoteById(noteId);
  if (!existingNote) {
    // if not, throw error
    const error = new Error("Note not found.");
    error.statusCode = 404; // not found
    throw error;
  }
  // check if user owns this note
  if (existingNote.userId.toString() !== userId) {
    // if not, throw error
    const error = new Error("You are not the owner.");
    error.statusCode = 403; // forbidden request
    throw error;
  }
  // all good? update the note
  return await noteRepository.updateOne(noteId, updatedNote);
};

// Replace a single note
export const replaceOne = async (noteId, userId, newNote) => {
  // check if the note exists
  const existingNote = await noteRepository.getNoteById(noteId);
  if (!existingNote) {
    // if not, throw error
    const error = new Error("Note not found.");
    error.statusCode = 404; // not found
    throw error;
  }
  // check if user owns this note
  if (existingNote.userId.toString() !== userId) {
    // if not, throw error
    const error = new Error("You are not the owner.");
    error.statusCode = 403; // forbidden request
    throw error;
  }
  // all good? replace the note
  return await noteRepository.replaceOne(noteId, newNote);
};

// Update the title of all notes for a user
export const updateAllTitles = async (userId, newTitle) => {
  // try to update all notes of this user
  const result = await noteRepository.updateAllTitles(userId, newTitle);
  // check if the user has any notes
  if (result.matchedCount === 0) {
    // if not, throw error
    const error = new Error("No note found.");
    error.statusCode = 404; // not found
    throw error;
  }
  return result;
};

// Delete a single note
export const deleteOne = async (noteId, userId) => {
  // check if the note exists
  const existingNote = await noteRepository.getNoteById(noteId);
  if (!existingNote) {
    // if not, throw error
    const error = new Error("Note not found.");
    error.statusCode = 404; // not found
    throw error;
  }
  // check if user owns this note
  if (existingNote.userId.toString() !== userId) {
    // if not, throw error
    const error = new Error("You are not the owner.");
    error.statusCode = 403; // forbidden request
    throw error;
  }
  // all good? delete the note
  return await noteRepository.deleteOne(noteId);
};

// Get paginated notes
export const getPaginatedNotes = async (userId, page, limit) => {
  // calculate how many notes to skip
  const skip = (page - 1) * limit;
  // get the notes of this page
  return await noteRepository.getPaginatedNotes(userId, skip, limit);
};

// Get a single note by id
export const getOne = async (noteId, userId) => {
  // check if the note exists
  const existingNote = await noteRepository.getNoteById(noteId);
  if (!existingNote) {
    // if not, throw error
    const error = new Error("Note not found.");
    error.statusCode = 404; // not found
    throw error;
  }
  // check if user owns this note
  if (existingNote.userId.toString() !== userId) {
    // if not, throw error
    const error = new Error("You are not the owner.");
    error.statusCode = 403; // forbidden request
    throw error;
  }
  // all good? return the note
  return existingNote;
};

// Get a note for user by content
export const getByContent = async (userId, content) => {
  // try to find the note
  const note = await noteRepository.getNoteByContent(userId, content);
  // check if the note exists
  if (!note) {
    // if not, throw error
    const error = new Error("No note found.");
    error.statusCode = 404; // not found
    throw error;
  }
  // all good? return the note
  return note;
};
