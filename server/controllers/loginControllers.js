import jwt from "jsonwebtoken";
import React, { useState, useEffect } from "react";
import bcrypt from "bcrypt";
import User from "../models/users.js";
import { blacklistedTokens } from "../utilities/tokenBlacklist.js";
// login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
     { id: user._id, email: user.email, name: user.name }, 
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// logout 
export const logoutUser = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  blacklistedTokens.push(token);

  return res.json({ message: "✅ Logout successful, token revoked" });
};