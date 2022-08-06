import mongoose from "mongoose";

let today = new Date();
today.setHours(today.getHours() + 8);

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: String,
	id: String,
	createdAt: {
		type: Date,
		default: Date(),
	},
});

const UserData = mongoose.model("UserData", userSchema);

export default UserData;
