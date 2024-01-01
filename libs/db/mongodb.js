
import mongoose from "mongoose";

const getLocation = (location) => {
  console.log('\n\n==================================================');
  console.log('Mongoose connection: |');
  console.log('---------------------\n');
  const isDev = process.env.NODE_ENV === "development";
  console.log("Is development environment: ", isDev);

  const prod = "mongodb+srv://williamjosephhorn:2775KRI5x7ntlzbn@cluster0.2m9gcsc.mongodb.net/Raven";
  const dev = "mongodb://localhost/raven-dev" ;

  let final;

  if (location === 'production') {
    final = prod;

  } else if (location === 'dev') {
    final = dev;

  } else if (location) {
    final = location

  } else {
    final = isDev ? dev : prod;
  }

  console.log(`Mongoose connected to: ${final}`);
  console.log('\n==================================================\n\n');
  return final;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectMongoDB = async (location) => {
  if (cached.conn) {
    console.log("returning CACHED mongoose connection");
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      const DEV = process.env.NODE_ENV === "development";

      // mongoose.set("strictQuery", false);

      cached.promise = mongoose.connect(getLocation(location))
        .then(mongoose => mongoose);

    } catch(error) {

      console.log("DATABASE ERROR: ", error);
    }
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongoDB;
