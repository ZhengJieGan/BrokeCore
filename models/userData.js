import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  totalSpending: Number,
  records: [],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const UserData = mongoose.model("UserData", userSchema);

export default UserData;
