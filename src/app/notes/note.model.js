import { model, Schema } from "mongoose";

function titleNotAllUpperCase(value) {
  // custom validator
  if (value === value.toUpperCase()) {
    throw new Error("Title must not be all uppercase");
  }
}

const noteSchema = new Schema(
  {
    title: { type: String, required: true, validate: titleNotAllUpperCase },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, collection: "notes" },
);

export const Note = model("Note", noteSchema);
