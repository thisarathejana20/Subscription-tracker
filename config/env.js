import { config } from "dotenv";

// Load environment variables from.env file
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ARCJET_KEY,
  ARCJET_ENV,
} = process.env;
