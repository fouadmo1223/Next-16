// lib/mongodb.ts

import mongoose, { Mongoose } from "mongoose";

/**
 * Interface describing the shape of the cached connection object.
 * This avoids using `any` and ensures full type safety.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Extend the Node.js global type definition to allow
 * storing a cached Mongoose connection during development.
 *
 * This prevents Next.js from creating multiple connections
 * when files are hot-reloaded.
 */
// eslint-disable-next-line no-var
declare global {
  var mongooseCache: MongooseCache | undefined;
}

/**
 * Initialize the global mongoose cache if it does not exist.
 */
const globalCache: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

global.mongooseCache = globalCache;

/**
 * Connection function for MongoDB using Mongoose.
 * Ensures we always return a single shared connection.
 */
export async function connectDB(): Promise<Mongoose> {
  const { conn, promise } = globalCache;

  // If we already have a connection, return it
  if (conn) return conn;

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("❌ MONGODB_URI is missing in environment variables.");
  }

  // If no existing promise, create a new connection promise
  if (!promise) {
    globalCache.promise = mongoose.connect(mongoUri, {
      dbName: process.env.MONGODB_DB, // optional: set DB name
      autoIndex: true,
    });
  }

  try {
    globalCache.conn = await globalCache.promise;
  } catch (err) {
    globalCache.promise = null; // reset on failure
    throw err;
  }

  return globalCache.conn!;
}
