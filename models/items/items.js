

import mongoose, { Schema } from "mongoose";

const itemsSchema = new Schema(
  {
    name: String,
    description: String,
    url: String,
    category: String,
    type: String
  },
  {
    timestamps: true,
  }
);

const Items = mongoose.models.Items || mongoose.model("Items", itemsSchema);

export default Items;
