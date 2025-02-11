import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const auth_router = Router();

auth_router.post("/sign-up", signUp);

auth_router.post("/sign-in", signIn);

auth_router.post("/sign-out", signOut);

export default auth_router;
