
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

      cached.promise = mongoose.connect(
        DEV 
          ? "mongodb://localhost/raven-dev" 
          : "mongodb+srv://williamjosephhorn:2775KRI5x7ntlzbn@cluster0.2m9gcsc.mongodb.net/Raven"
        )
        .then(mongoose => mongoose);

    } catch(error) {

      console.log("DATABASE ERROR: ", error);
    }
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongoDB;
