import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/sticky_notes")
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => {
    console.log("Error in initial connection to MongoDB:", err);
  });
