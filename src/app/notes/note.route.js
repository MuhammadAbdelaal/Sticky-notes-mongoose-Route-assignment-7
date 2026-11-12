import { Router } from "express";
import * as noteController from "./note.controller.js";

export const noteRouter = Router();

// Create a single note : POST/notes
noteRouter.post("/", noteController.createOne);

// Update the title of all notes : PATCH/notes/all
noteRouter.patch("/all", noteController.updateAllTitles);

// Updae a single note : PATCH/notes/:noteId
noteRouter.patch("/:noteId", noteController.updateOne);

// Replace a single note : PUT/notes/replace/:noteId
noteRouter.put("/replace/:noteId", noteController.replaceOne);

// Delete a single note : DELETE/notes/:noteId
noteRouter.delete("/:noteId", noteController.deleteOne);

// Get paginated and sorted notes : GET/notes/paginate-sort
noteRouter.get("/paginate-sort", noteController.getPaginatedNotes);

// Get a note by its content : GET/notes/note-by-content
noteRouter.get("/note-by-content", noteController.getByContent);

// Get all notes with user info : GET/notes/note-with-user
noteRouter.get("/note-with-user", noteController.getNotesWithUser);

// Get notes by title with user info using aggregation : GET/notes/aggregate
noteRouter.get("/aggregate", noteController.getNotesAggregate);

// Get a single note : GET/notes/:noteId
noteRouter.get("/:noteId", noteController.getOne);

// Delete all notes : DELETE/notes
noteRouter.delete("/", noteController.deleteAll);
