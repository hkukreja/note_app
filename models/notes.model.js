import mongoose from "mongoose";
const { Schema, model } = mongoose;

const NoteSchema = new Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const NoteModel = model("notes", NoteSchema);
export default NoteModel;