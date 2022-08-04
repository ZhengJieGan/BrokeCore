import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: String,
	id: String,
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const UserData = mongoose.model("UserData", userSchema);

export default UserData;
