import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: {type: String, require: true}
});

export const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);