import { config } from "dotenv";

// Load environment variables from.env file
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, DB_URI } = process.env;
