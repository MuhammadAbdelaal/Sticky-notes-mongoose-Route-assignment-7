import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, min: 18, max: 60 },
  },
  { timestamps: true, collection: "users" },
);

export const User = model("User", userSchema);
