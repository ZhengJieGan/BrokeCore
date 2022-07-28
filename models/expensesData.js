import mongoose from "mongoose";

const expensesSchema = mongoose.Schema({
  price: Number,
  category: String,
  remarks: String,
  happiness: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ExpensesData = mongoose.model("ExpensesData", expensesSchema);

export default ExpensesData;
