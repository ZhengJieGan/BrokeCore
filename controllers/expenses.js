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

export const updateExpenses = async (req, res) => {};

export const deleteExpenses = async (req, res) => {};
