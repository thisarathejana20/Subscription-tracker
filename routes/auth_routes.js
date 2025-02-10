import { Router } from "express";

const auth_router = Router();

auth_router.post("/sign-up", (req, res) => {
  // Simulate user registration
  const { username, email, password } = req.body;
  console.log(`User registered: ${username}, ${email}, ${password}`);
  res.status(201).json({ message: "User registered successfully" });
});

auth_router.post("/sign-in", (req, res) => {
  // Simulate user login
  const { email, password } = req.body;
  console.log(`User logged in: ${email}, ${password}`);
  res.status(200).json({ message: "User logged in successfully" });
});

auth_router.post("/sign-out", (req, res) => {
  // Simulate user logout
  const { email } = req.body;
  console.log(`User logged out: ${email}`);
  res.status(200).json({ message: "User logged out successfully" });
});

export default auth_router;
