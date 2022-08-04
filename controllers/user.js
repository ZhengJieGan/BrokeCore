import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserData from "../models/userData.js";

export const signIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await UserData.findOne({ email });
 
		if (!existingUser)
			return res.status(404).json({ message: "User doesn't exist" });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordCorrect)
			return res.status(404).json({ message: "Invalid credentials" });

		const token = jwt.sign(
			{
				email: existingUser.email,
				password: existingUser.password,
			},
			"test",
			{ expiresIn: "1h" }
		);

		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}
};

export const signUp = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const existingUser = await UserData.findOne({ email });

		if (existingUser)
			return res.status(400).json({ message: "User already exist" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await UserData.create({
			email,
			password: hashedPassword,
			name,
		});

		const token = jwt.sign(
			{
				email: result.email,
				password: result._id,
			},
			"test",
			{ expiresIn: "1h" }
		);

		res.status(200).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}
};
