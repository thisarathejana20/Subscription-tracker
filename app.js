import express from "express";
import { PORT } from "./config/env.js";
import auth_router from "./routes/auth_routes.js";
import user_router from "./routes/user_routes.js";
import subscription_router from "./routes/subscription_routes.js";
import connectionToDb from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

//express built in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", auth_router);
app.use("/api/v1/users", user_router);
app.use("/api/v1/subscription", subscription_router);

//error middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  // Connect to your database here
  await connectionToDb();
});

export default app;
