import express from "express";
import { addNotes, deleteNote, getNoteById, getNotes, updateNotes } from "../controllers/notes.controller.js";
const noteRouter = express.Router();

noteRouter.post("/add-note", addNotes);
noteRouter.put("/update-note/:noteId", updateNotes);
noteRouter.get("/notes", getNotes);
noteRouter.get("/note/:noteId", getNoteById);
noteRouter.delete("/:noteId", deleteNote);

export default noteRouter;