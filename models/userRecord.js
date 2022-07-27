import mongoose from "mongoose";

const userRecord = mongoose.Schema({
  price: Number,
  category: String,
  remarks: String,
  happiness: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const UserRecord = mongoose.model("UserRecord", userRecord);

export default UserRecord;
