import express from "express";
import {
	getExpenses,
	getTotalExpenses,
  getTodayExpenses,
	createExpenses,
	updateExpenses,
	deleteExpenses,
} from "../controllers/expenses.js";

const router = express.Router();

router.get("/", getExpenses);
router.get("/total", getTotalExpenses);
router.get("/today", getTodayExpenses);
router.post("/", createExpenses);
router.patch("/:id", updateExpenses);
router.delete("/:id", deleteExpenses);

export default router;
