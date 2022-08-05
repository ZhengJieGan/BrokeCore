import mongoose from "mongoose";
import ExpensesData from "../models/expensesData.js";

export const getExpenses = async (req, res) => {
	const { id } = req.params;

	try {
		const expensesData = await ExpensesData.find({
			createdBy: id,
		});

		res.status(200).json(expensesData);
	} catch (error) {
		res.status(404).json({ message: error });
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
	const { id } = req.params;
	try {
		let expensesData = await ExpensesData.find({ createdBy: id }).select(
			"price -_id"
		);

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
	const { id } = req.params;

	var start = new Date();
	start.setHours(start.getHours() + 8);
	start.setHours(-16, 0, 0, 0);

	var end = new Date();
	end.setHours(23 + 8, 59, 59, 999);

	try {
		let expensesData = await ExpensesData.find({
			createdBy: id,
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
	const { id } = req.params;

	try {
		// Find all categories with its price
		let expensesData = await ExpensesData.find({ createdBy: id }).select(
			"category price -_id"
		);

		// Find the number of cateogories and append empty array
		let categoryData = await ExpensesData.find({ createdBy: id }).distinct(
			"category"
		);

		let data = [];

		for (let i = 0; i < categoryData.length; i++) {
			data.push([]);
		}

		// Get total spending
		let expensesTotal = await ExpensesData.find({ createdBy: id }).select(
			"price -_id"
		);

		let total = 0;
		for (let i = 0; i < expensesTotal.length; i++) {
			total = total + expensesTotal[i]["price"];
		}

		// Find the same category of spending and group them together
		for (let i = 0; i < expensesData.length; i++) {
			for (let j = 0; j < categoryData.length; j++) {
				if (expensesData[i]["category"] === categoryData[j]) {
					data[j].push(expensesData[i]["price"]);
				}
			}
		}

		// Function to sum up an array
		function sum(total, num) {
			return total + num;
		}

		for (let i = 0; i < data.length; i++) {
			data[i] = data[i].reduce(sum);
		}

		// Generate random colours
		const colors = [
			"#007ED6",
			"#7CDDDD",
			"#52D726",
			"#FFEC00",
			"#FF7300",
			"#FF0000",
		];

		// Creating the final result
		let refinedData = [];

		for (let i = 0; i < data.length; i++) {
			refinedData.push({
				title: categoryData[i],
				value: (data[i] / total) * 100,
				color: colors[i],
			});
		}

		res.status(200).json(refinedData);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};


export const deleteUserExpenses = async (req, res) => {
	const { id } = req.params;

	
	await ExpensesData.findByIdAndRemove(id);
	res.json({ message: "Expense deleted successfully" });
};