import mongoose from "mongoose";
import UserRecord from "../models/userRecord";

export const getExpenses = async (req, res) => {
  try {
    const userRecord = await UserRecord.find();
    res.status(200).json(userRecord);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createExpenses = async (req, res) => {};

export const updateExpenses = async (req, res) => {};

export const deleteExpenses = async (req, res) => {};
