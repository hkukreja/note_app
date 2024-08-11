import { Types } from "mongoose";
import { STATUS } from "../config/common.js";
import { CommonUtils } from "../config/utils.js";
import Notes from "../models/notes.model.js";

export const addNotes = CommonUtils.asyncHandler(async (req, res, next) => {
    const { title, body } = req.body;

    if (!title || !body) return res.status(STATUS.BAD_REQUEST).json({ message: "All fields are required!" });

    await Notes.create({ title, body });

    return res.status(STATUS.CREATED).json({ message: "Note Added!" })
});

export const updateNotes = CommonUtils.asyncHandler(async (req, res, next) => {
    const { title, body } = req.body;

    if (!title || !body) return res.status(STATUS.BAD_REQUEST).json({ message: "All fields are required!" });

    const updatedNote = await Notes.findByIdAndUpdate(req.params.noteId, { $set: { title, body } }, { new: true });

    return res.status(STATUS.CREATED).json({ message: "Note Updated!", data: updatedNote });
});

export const getNoteById = CommonUtils.asyncHandler(async (req, res, next) => {
    const note = await Notes.findById(req.params.noteId);

    return res.status(STATUS.OK).json({ message: "Note!", data: note });
});

export const getNotes = CommonUtils.asyncHandler(async (req, res, next) => {
    const filter = {};

    if (req.query.title) filter.title = { $regex: req.query.title, $options: "i" }

    const notes = await Notes.find(filter);

    return res.status(STATUS.OK).json({ message: "Notes List!", data: notes });
});

export const deleteNote = CommonUtils.asyncHandler(async (req, res, next) => {
    await Notes.deleteOne({ _id: new Types.ObjectId(req.params.noteId) });

    return res.status(STATUS.NO_CONTENT).json({ message: "Note Deleted!" })
});