

import mongoose, { Schema, SchemaType } from "mongoose";

const dropSource = new Schema(
  {
    name: String,
    description: String,
    isUserGenerated: Boolean,
    raven_generated: Boolean,

    wizard101: new Schema({
      category: String,
      type: String,
      url: String
    }),

    raven: new Schema({
      category: String,
    }),

    data: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

const DropSources = mongoose.models.DropSources || mongoose.model("DropSources", dropSource);

export default DropSources;
