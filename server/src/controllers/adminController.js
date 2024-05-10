import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AdminModel } from "../models/Admin.js";

const router = express.Router();
export { router as userRouter };

async function registerAdmin(req, res) {
  const { username, phone, email, password } = req.body;

  if (!username || !phone || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required credentials!" });
  }

  const userEmail = await AdminModel.findOne({ email });
  if (userEmail) {
    return res
      .status(400)
      .json({ message: "User with this email already exists!" });
  }

  if (password < 6) {
    return res.json({ message: "Password must be atleast 6 charaters long !" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new AdminModel({
    username,
    phone,
    email,
    passowrd: hashedPassword,
  });
  await newUser.save();
  res.json({ message: "User registered succesfully !" });
}

async function loginAdmin(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password" });
  }

  const user = await AdminModel.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "username or password is incorrect!" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, userID: user._id });
}

export { registerAdmin, loginAdmin };
