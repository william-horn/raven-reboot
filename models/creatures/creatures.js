

import mongoose, { Schema } from "mongoose";

const statsSchema = new Schema({
  rank: String,
  health: String,
  classification: [],
  school: [],
  starting_pips: String,
  school_pips: [],
  out_pierce: String,
  out_boost: String,
  inc_boost: [],
  inc_resist: [],
  stunable: String,
  beguilable: String,
  critical_rating: String,
  critical_block_rating: String,
  inc_healing: String, 
  out_healing: String,
  cheats: String,
  shadow_pips: String,
});

const creatureSchema = new Schema(
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
