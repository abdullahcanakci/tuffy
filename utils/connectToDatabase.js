import { MongoClient } from "mongodb";
const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_DB) {
  throw new Error("Please define MONGODB_URI environment variable");
}

if (!MONGODB_DB) {
  throw new Error("Please define MONGODB_DB environment variable");
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = await MongoClient.connect(MONGODB_URI, opts).then(
      (client) => {
        return {
          client,
          db: client.db(MONGODB_DB),
        };
      }
    );
    cached.conn = await cached.promise;
    return cached.conn;
  }
};

export default connectToDatabase;
