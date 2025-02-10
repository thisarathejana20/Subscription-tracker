import { Router } from "express";

const user_router = Router();

// Define user routes here
user_router.get("/", (req, res) => {
  res.send("User API");
});

user_router.get("/:id", (req, res) => {
  res.send(`User with ID: ${req.params.id}`);
});

user_router.post("/", (req, res) => {
  res.send("Create a new user");
});

user_router.put("/:id", (req, res) => {
  res.send(`Update user with ID: ${req.params.id}`);
});

user_router.delete("/:id", (req, res) => {
  res.send(`Delete user with ID: ${req.params.id}`);
});

export default user_router;
