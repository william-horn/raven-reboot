

import mongoose, { Schema } from "mongoose";

const dropsSchema = new Schema(
  {
    name: String,
    description: String,

    wizard101: new Schema({
      category: String,
      type: String,
      url: String
    }),

    raven: new Schema({
      category: String,
    })
  },
  {
    // collection: 'Drop',
    timestamps: true,
  }
);

const Drops = mongoose.models.Drops || mongoose.model("Drops", dropsSchema);

export default Drops;
