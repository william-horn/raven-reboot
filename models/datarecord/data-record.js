

import mongoose, { Schema } from "mongoose";

const dataRecord = new Schema(
  {

  },
  {
    timestamps: true,
  }
);

const DataRecord = mongoose.models.DataRecord || mongoose.model("DataRecord", dataRecord);

export default DataRecord;
 