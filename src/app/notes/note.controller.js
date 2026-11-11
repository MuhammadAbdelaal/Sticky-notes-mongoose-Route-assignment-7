import * as noteService from "./note.service.js";
import mongoose from "mongoose";

// create a single note
export const createOne = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const { title, content } = req.body || {};

    // if id is not a valid objectId
    if (!mongoose.isValidObjectId(userId)) {
      const error = new Error("Invalid user id");
      error.statusCode = 400; // bad request
      throw error;
    }

    // title and body are required
    if (!title || !content) {
      const error = new Error("Title and content are both required.");
      error.statusCode = 400; // bad request
      throw error;
    }

    // call the service
    await noteService.createOne({ userId, title, content });
    // send res and return
    return res.status(201).json({ message: "Note created", success: true });
  } catch (error) {
    next(error);
  }
};

// update a single note
export const updateOne = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.query.userId;
    const { title, content } = req.body || {};

    // if ids are not valid objectIds
    if (
      !mongoose.isValidObjectId(noteId) ||
      !mongoose.isValidObjectId(userId)
    ) {
      const error = new Error("Invalid id formats");
      error.statusCode = 400; // bad request
      throw error;
    }

    // call the service
    const updatedNote = await noteService.updateOne(noteId, userId, {
      title,
      content,
    });
    // send res and return
    return res
      .status(200)
      .json({ message: "Note updated", success: true, note: updatedNote });
  } catch (error) {
    next(error);
  }
};

// replace a single note
export const replaceOne = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.query.userId;
    const { title, content, userId: newUserId } = req.body || {};

    // if ids are not valid objectIds
    if (
      !mongoose.isValidObjectId(noteId) ||
      !mongoose.isValidObjectId(userId) ||
      !mongoose.isValidObjectId(newUserId)
    ) {
      const error = new Error("Invalid id formats");
      error.statusCode = 400; // bad request
      throw error;
    }

    // title and content are required
    if (!title || !content) {
      const error = new Error("Title and content are both required.");
      error.statusCode = 400; // bad request
      throw error;
    }

    // call the service
    const replacedNote = await noteService.replaceOne(noteId, userId, {
      title,
      content,
      userId: newUserId,
    });
    // send res and return
    return res
      .status(200)
      .json({ message: "Note replaced", success: true, note: replacedNote });
  } catch (error) {
    next(error);
  }
};

// update the title of all notes
export const updateAllTitles = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const { title } = req.body || {};

    // if id is not a valid objectId
    if (!mongoose.isValidObjectId(userId)) {
      const error = new Error("Invalid user id");
      error.statusCode = 400; // bad request
      throw error;
    }

    // title is required
    if (!title) {
      const error = new Error("Title is required.");
      error.statusCode = 400; // bad request
      throw error;
    }

    // call the service
    await noteService.updateAllTitles(userId, title);
    // send res and return
    return res
      .status(200)
      .json({ message: "All notes updated", success: true });
  } catch (error) {
    next(error);
  }
};

// delete a single note
export const deleteOne = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.query.userId;

    // if ids are not valid objectIds
    if (
      !mongoose.isValidObjectId(noteId) ||
      !mongoose.isValidObjectId(userId)
    ) {
      const error = new Error("Invalid id formats");
      error.statusCode = 400; // bad request
      throw error;
    }

    // call the service
    const deletedNote = await noteService.deleteOne(noteId, userId);
    // send res and return
    return res
      .status(200)
      .json({ message: "deleted", success: true, note: deletedNote });
  } catch (error) {
    next(error);
  }
};

// get paginated notes
export const getPaginatedNotes = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const page = Number(req.query.page) || 1; // default page 1
    const limit = Number(req.query.limit) || 3; // default 3 notes per page

    // if id is not a valid objectId
    if (!mongoose.isValidObjectId(userId)) {
      const error = new Error("Invalid user id");
      error.statusCode = 400; // bad request
      throw error;
    }

    // page and limit must be positive whole numbers
    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1
    ) {
      const error = new Error("Page and limit must be positive whole numbers.");
      error.statusCode = 400; // bad request
      throw error;
    }

    // call the service
    const notes = await noteService.getPaginatedNotes(userId, page, limit);
    // send res and return
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    next(error);
  }
};

// get a single note
export const getOne = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.query.userId;

    // if ids are not valid objectIds
    if (
      !mongoose.isValidObjectId(noteId) ||
      !mongoose.isValidObjectId(userId)
    ) {
      const error = new Error("Invalid id formats");
      error.statusCode = 400; // bad request
      throw error;
    }

    // call the service
    const note = await noteService.getOne(noteId, userId);
    // send res and return
    return res.status(200).json({ success: true, note });
  } catch (error) {
    next(error);
  }
};

// get a note by its content
export const getByContent = async (req, res, next) => {
  try {
    const { userId, content } = req.query;

    // if id is not a valid objectId
    if (!mongoose.isValidObjectId(userId)) {
      const error = new Error("Invalid user id");
      error.statusCode = 400; // bad request
      throw error;
    }

    // content is required
    if (!content) {
      const error = new Error("Content is required.");
      error.statusCode = 400; // bad request
      throw error;
    }

    // call the service
    const note = await noteService.getByContent(userId, content);
    // send res and return
    return res.status(200).json({ success: true, note });
  } catch (error) {
    next(error);
  }
};
