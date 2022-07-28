import express from "express";
import { getExpenses, createExpenses } from "../controllers/expenses.js";

const router = express.Router();

router.get("/", getExpenses)
router.post("/", createExpenses)

export default router;
