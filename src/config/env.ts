import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const NODE_ENV = process.env.NODE_ENV || "development";

if (!MONGO_URI) {
  throw new Error("Missing environment variables");
}
