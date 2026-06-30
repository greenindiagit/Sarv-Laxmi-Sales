import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import UserModel from "../../models/users.js";
import { buildPagination } from "../../utilities/pagination.js";
import {sendEmail} from "../../utilities/sendEmail.js"; // ⬅️ add if you have a mail utility


// ✅ Add this function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "defaultsecretkey", {
    expiresIn: "7d",
  });
};
// 🔹 Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, mobile, password, role } = req.body;
// console.log("📩 Received form data:", req.body);
  const existingUserByEmail = await UserModel.findOne({ email });
  if (existingUserByEmail) {
    throw new ApiError(400, "User already exists with this email id");
  };

  const existingUserByMobile = await UserModel.findOne({ mobile });
  if (existingUserByMobile) {
    throw new ApiError(400, "User already exists with this mobile number");
  };

  const user = await UserModel.create({ name, email, mobile, password, role });

  if (!user) {
    throw new ApiError(400, "Invalid user data");
  };

  return res.status(201).json({
    success: true,
    message: "Registered successfully",
    user,
    token: generateToken(user?._id),
  });
});


// 🔹 Get all users (with pagination, sorting, and search)
export const getAllUsers = asyncHandler(async (req, res) => {
   console.log("📩 Incoming request to GET /api/admin/users");
  console.log("🧭 Query Params:", req.query);
  console.log("🧍‍♂️ Authenticated User:", req.user?._id);
  let { search, role, sort = "desc", page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
    ];
  }

  if (role) filters.role = role;

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const users = await UserModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .select("-password")
    .lean();

  const total = await UserModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: users,
    pagination: buildPagination({ page, limit, total }),
  });
});

// 🔹 Get user by ID
export const getUserById = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id).select("-password");
  if (!user) throw new ApiError(404, "User not found");
  res.json(user);
});

// 🔹 Update user
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, password, role } = req.body;

  const user = await UserModel.findById(id);
  if (!user) throw new ApiError(404, "User not found");

  if (name) user.name = name;
  if (email) user.email = email;
  if (mobile) user.mobile = mobile;
  if (role) user.role = role;
  if (password) user.password = await bcrypt.hash(password, 10);

  await user.save();

  res.json({
    success: true,
    message: "User updated successfully",
    user: { ...user.toObject(), password: undefined },
  });
});

// 🔹 Delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);
  if (!user) throw new ApiError(404, "User not found");

  await UserModel.findByIdAndDelete(id);
  res.json({ success: true, message: "User deleted successfully" });
});

// 🔹 Change Password
export const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  console.log("🟢 changePassword called with:", { id, oldPassword, newPassword });

  // 🔹 Explicitly select password (since it's select: false in schema)
  const user = await UserModel.findById(id).select("+password");
  if (!user) throw new ApiError(404, "User not found");

  // 🔹 Verify old password
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new ApiError(400, "Old password is incorrect");

  // 🔹 Set new password (pre-save hook will hash it automatically)
  user.password = newPassword;

  await user.save();

  res.json({ success: true, message: "Password updated successfully" });
});


// 🔹 Request Password Reset
export const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const token = randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await sendEmail(
    user.email,
    "Password Reset Request",
    `Hello ${user.name},\n\nClick below to reset your password:\n${resetLink}`
  );

  res.json({ success: true, message: "Password reset email sent successfully" });
});

// 🔹 Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) throw new ApiError(400, "Invalid or expired token");

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ success: true, message: "Password has been reset successfully" });
});
