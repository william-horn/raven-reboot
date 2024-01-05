

import mongoose, { Schema } from "mongoose";

const testmodelSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const TestModel = mongoose.models.TestModel || mongoose.model("TestModel", testmodelSchema);

export default TestModel;
