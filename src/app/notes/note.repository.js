import { Note } from "./note.model.js";
import mongoose from "mongoose";

// create a single Note
export const createOne = async (note) => {
  return await Note.create(note);
};

// get note by id
export const getNoteById = async (noteId) => {
  return await Note.findById(noteId);
};

// update a singe Note
export const updateOne = async (noteId, updatedNote) => {
  return await Note.findByIdAndUpdate(noteId, updatedNote, {
    runValidators: true,
    new: true,
  });
};

// replace a single note
export const replaceOne = async (noteId, newNote) => {
  return await Note.findOneAndReplace({ _id: noteId }, newNote, {
    runValidators: true,
    new: true,
  });
};

// update the title of all notes for a user
export const updateAllTitles = async (userId, newTitle) => {
  return await Note.updateMany(
    { userId },
    { title: newTitle },
    { runValidators: true },
  );
};

// delete a single note
export const deleteOne = async (noteId) => {
  return await Note.findByIdAndDelete(noteId);
};

// get paginated notes for a user, newest first
export const getPaginatedNotes = async (userId, skip, limit) => {
  return await Note.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

// Helper regex espacpe function
const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// get a note for a user by partial content match
export const getNoteByContent = async (userId, content) => {
  return await Note.findOne({
    userId,
    content: { $regex: escapeRegex(content), $options: "i" },
  });
};

// Get all notes for a user with user info
export const getNotesWithUser = async (userId) => {
  return await Note.find({ userId })
    .select({ title: 1, userId: 1, createdAt: 1 })
    .populate("userId", { email: 1, _id: 0 });
};

// get notes by title for a user with user info
export const getNotesAggregate = async (userId, title) => {
  return await Note.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), title } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 0,
        title: 1,
        userId: 1,
        createdAt: 1,
        "user.name": 1,
        "user.email": 1,
      },
    },
  ]);
};

// delete all notes for a user
export const deleteAll = async (userId) => {
  return await Note.deleteMany({ userId });
};
