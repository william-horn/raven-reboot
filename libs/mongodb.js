
import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {

    const DEV = process.env.NODE_ENV === "development";

    // mongoose.set("strictQuery", false);

    await mongoose.connect(
      DEV
        ? "mongodb://localhost/raven-dev"
        : process.env.MONGODB_URI,
    );

    console.log("Connected to MongoDB");

  } catch(error) {

    console.log("DATABASE ERROR: ", error);
  }
}

export default connectMongoDB;
