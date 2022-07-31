import mongoose from "mongoose";

var today = new Date();
today.setHours(today.getHours() + 8);

const expensesSchema = mongoose.Schema({
	price: Number,
	category: String,
	remarks: String,
	happiness: Number,
	createdAt: {
		type: Date,
		default: today,
	},
});

const ExpensesData = mongoose.model("ExpensesData", expensesSchema);

export default ExpensesData;
