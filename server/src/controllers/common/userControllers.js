import User from "../../models/users.js";
import * as crypto from 'crypto';
import bcrypt from "bcrypt";
import { hashPassword } from'../../utilities/hashPassword.js';
import {sendEmail} from '../../utilities/sendEmail.js';
import { randomBytes } from 'crypto';
export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: err.message });
  }
};

export const addUsers = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }, { name }]
    });
    if (existingUser) {
      return res.status(400).json({ message: "Name, email, or mobile already exists" });
    }

    // Hash password
  if (!password) {
  return res.status(400).json({ error: "Password is required" });
}
const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword, // store hashed password
    });

    await newUser.save();

    res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: err.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: err.message });
  }
};
export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // user ID from URL
    const { name, email, mobile, password } = req.body;

    // Find the user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (mobile) user.mobile = mobile;

    // If password is provided, hash it
    if (password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// Request password reset


export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
// 1️⃣ Find user
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

 // 2️⃣ Generate token
  const token = randomBytes(32).toString('hex');
 // 3️⃣ Save token & expiry in DB
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

   // ✅ Use common frontend URL from .env
    // 4️⃣ Send reset link via email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // Send reset email
    await sendEmail(
      user.email,
      "Password Reset Request",
      `Hello ${user.name || "User"},\n\nClick below to reset your password:\n${resetLink}\n\nIf you didn’t request this, ignore this email.`
    );

  res.status(200).json({ message: "Password reset email sent successfully." });
};

// Reset password
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  console.log("Token received:", token);

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  console.log("User found:", user);

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  user.password = await hashPassword(newPassword);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: "Password has been reset successfully" });
};