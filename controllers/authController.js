const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
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

// Additional methods like login, getProfile, updateProfile can be added here

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({
    message: 'User logged in successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({
    message: 'User profile retrieved successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Find user by ID
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user fields
  user.name = name || user.name;
  user.email = email || user.email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  await user.save();

  res.status(200).json({
    message: 'User profile updated successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

exports.logout = asyncHandler(async (req, res) => {
  // For JWT, logout is handled on the client side by deleting the token.
  // Optionally, you can implement token blacklisting on the server side.
  res.status(200).json({ message: 'User logged out successfully' });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate password reset token (implement this function)
  const resetToken = user.getResetPasswordToken();

  // Save the token to the database
  await user.save({ validateBeforeSave: false });

  // Send email with reset link (implement this function)
  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
  await sendEmail({
    email: user.email,
    subject: 'Password Reset',
    message: `Click the link to reset your password: ${resetUrl}`
  });

  res.status(200).json({ message: 'Password reset email sent' });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Find user by reset token
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpire: { $gt: Date.now() } });
  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({ message: 'Password reset successfully' });
});

// Helper function to send email (you need to implement this)
async function sendEmail({ email, subject, message }) {
  // Implement email sending logic using nodemailer or any email service
  console.log(`Email sent to ${email} with subject "${subject}" and message: ${message}`);
}
// Note: Ensure to implement the getResetPasswordToken method in the User model and set up email sending functionality.
// Also, make sure to protect routes like getProfile and updateProfile with authentication middleware.
// You can use JWT or any other method for authentication.
// Additionally, consider adding validation for request bodies using a library like express-validator or Joi.
// Finally, don't forget to handle errors properly and return appropriate status codes and messages.
// You can use the asyncHandler middleware to wrap your async route handlers for error handling.

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});