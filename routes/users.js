import express from "express";
import { signIn, signUp, deleteAccount } from "../controllers/user.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.delete("/deleteAccount/:id", deleteAccount)

export default router;
