import express from "express";
import {
  getExpenses,
  createExpenses,
  updateExpenses,
  deleteExpenses,
} from "../controllers/expenses.js";

const router = express.Router();

router.get("/", getExpenses);
router.post("/", createExpenses);
router.patch("/:id", updateExpenses);
router.delete("/:id", deleteExpenses);

export default router;
