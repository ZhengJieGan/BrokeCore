import { application } from "express";
import mongoose from "mongoose";
import ExpensesData from "../models/expensesData.js";

export const getExpenses = async (req, res) => {
  try {
    const expensesData = await ExpensesData.find();
    res.status(200).json(expensesData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createExpenses = async (req, res) => {
  const expense = req.body;
  const newExpense = new ExpensesData(expense);

  try {
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateExpenses = async (req, res) => {
  const { id: _id } = req.params;
  const expense = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No expenses is found");

  const updatedPost = await ExpensesData.findByIdAndUpdate(_id, expense, {
    new: true,
  });

  res.json(updatedPost);
};

export const deleteExpenses = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No expense with that id");
  }

  await ExpensesData.findByIdAndRemove(id);
  res.json({ message: "Expense deleted successfully" });
};
