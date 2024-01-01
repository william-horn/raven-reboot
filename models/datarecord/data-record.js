

import mongoose, { Schema } from "mongoose";

const dataRecord = new Schema(
  {
    name: String,
    description: [],
    drops: [],
    stats: statsSchema,
  },
  {
    timestamps: true,
  }
);

const Creature = mongoose.models.Creature || mongoose.model("Creature", creatureSchema);

export default Creature;
 