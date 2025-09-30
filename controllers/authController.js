const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

exports.register = asyncHandler(async (req, res) => {
  const { name, email, passwordHash, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passwordHash, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    passwordHash: hashedPassword,
    role
  });

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});