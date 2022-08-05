import express from "express";
import {
	getExpenses,
	getTotalExpenses,
	getTodayExpenses,
	createExpenses,
	updateExpenses,
	deleteExpenses,
	getEachCategoryExpenses,
	deleteUserExpenses,
} from "../controllers/expenses.js";

const router = express.Router();

router.get("/:id", getExpenses);
router.get("/total/:id", getTotalExpenses);
router.get("/today/:id", getTodayExpenses);
router.get("/category/:id", getEachCategoryExpenses);
router.post("/", createExpenses);
router.patch("/:id", updateExpenses);
router.delete("/:id", deleteExpenses);
router.delete("/terminate/:id", deleteUserExpenses);

export default router;
