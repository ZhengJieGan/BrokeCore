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

export const getTotalExpenses = async (req, res) => {
	try {
		let expensesData = await ExpensesData.find({}).select("price -_id");

		let total = 0;
		for (let i = 0; i < expensesData.length; i++) {
			total = total + expensesData[i]["price"];
		}

		res.status(200).json(total);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getTodayExpenses = async (req, res) => {
	var start = new Date();
	start.setHours(start.getHours() + 8);
	start.setHours(-16, 0, 0, 0);

	var end = new Date();
	end.setHours(23 + 8, 59, 59, 999);

	try {
		let expensesData = await ExpensesData.find({
			createdAt: { $gte: start, $lte: end },
		}).select("price -_id");

		let total = 0;
		for (let i = 0; i < expensesData.length; i++) {
			total = total + expensesData[i]["price"];
		}

		res.status(200).json(total);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getEachCategoryExpenses = async (req, res) => {
	try {
		let expensesData = await ExpensesData.find({}).select(
			"category price -_id"
		);

		let categoryData = await ExpensesData.find({}).distinct("category");

		let data = [];

		for (let i = 0; i < categoryData.length; i++) {
			data.push([]);
		}

		function sum(total, num) {
			return total + num;
		}

		for (let i = 0; i < expensesData.length; i++) {
			for (let j = 0; j < categoryData.length; j++) {
				if (expensesData[i]["category"] === categoryData[j]) {
					data[j].push(expensesData[i]["price"]);
				}
			}
		}

		for (let i = 0; i < data.length; i++) {
			data[i] = data[i].reduce(sum);
		}

		let refinedData = [];

		for (let i = 0; i < data.length; i++) {
			refinedData.push({ category: categoryData[i], total: data[i] });
		}

		res.status(200).json(refinedData);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
