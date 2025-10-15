const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');


/*exports.token = async (req, res) => {
  try {
    const { grant_type, username, password } = req.body;

    // Only support password grant in this example
    if (grant_type !== 'password') {
      return res.status(400).json({ error: 'unsupported_grant_type' });
    }

    const user = await User.findOne({ email: username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'invalid_grant' });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token_type: 'Bearer',
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 3600
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server_error' });
  }
};*/
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('Invalid credentials'); err.statusCode = 401; throw err;
  }
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    const err = new Error('Invalid credentials'); err.statusCode = 401; throw err;
  }
  const payload = { id: user._id, role: user.role, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
  res.json({ token, user: payload });
});
exports.token = asyncHandler(async (req, res) => {
  console.log('Incoming OAuth2 request:', req.body);
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'invalid_request', message: 'Missing request body' });
    }

    const { grant_type, username, password } = req.body;
    console.log('Incoming OAuth2 body:', req.body);

    if (grant_type !== 'password') {
      return res.status(400).json({ error: 'unsupported_grant_type' });
    }

    const user = await User.findOne({ email: username });
    if (!user) return res.status(400).json({ error: 'invalid_grant' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(400).json({ error: 'invalid_grant' });

    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token_type: 'Bearer',
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 3600
    });
  } catch (err) {
    console.error('OAuth2 error:', err);
    res.status(500).json({ error: 'server_error' });
  }
});


exports.refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) return res.status(400).json({ error: 'invalid_request' });

    const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token_type: 'Bearer',
      access_token: newAccessToken,
      expires_in: 3600
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'invalid_grant' });
  }
};




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


// Get user profile by ID
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
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


// update user profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, email, passwordHash } = req.body;

  // Find user by ID
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user fields
  user.name = name || user.name;
  user.email = email || user.email;
  if (passwordHash) {
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(passwordHash, salt);
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

 // delete user (admin only) - Optional
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

   res.status(200).json({
    message: 'User deleted successfully'
   });
 });
/*
// User login
exports.login = asyncHandler(async (req, res) => {
  const { email, passwordHash } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(passwordHash, user.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.status(200).json({
    message: 'Login successful',
    token
  });
});
*/

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('Invalid credentials'); err.statusCode = 401; throw err;
  }
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    const err = new Error('Invalid credentials'); err.statusCode = 401; throw err;
  }
  const payload = { id: user._id, role: user.role, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
  res.json({ token, user: payload });
});