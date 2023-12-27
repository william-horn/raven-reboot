
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectMongoDB = async () => {
  if (cached.conn) {
    console.log("returning CACHED mongoose connection");
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      const DEV = process.env.NODE_ENV === "development";

      // mongoose.set("strictQuery", false);

      cached.promise = mongoose.connect(DEV ? "mongodb://localhost/raven-dev" : process.env.NEXT_PUBLIC_MONGODB_URI)
        .then(mongoose => mongoose);

      console.log("DEV MODE: ", DEV);
      console.log("ENV: ", process.env);
      console.log("MONGOURI: ", process.env.NEXT_PUBLIC_MONGODB_URI);
      console.log("Connected to MongoDB");

    } catch(error) {

      console.log("DATABASE ERROR: ", error);
    }
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongoDB;
