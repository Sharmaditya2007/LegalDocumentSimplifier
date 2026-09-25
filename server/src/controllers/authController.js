const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const localStore = require('../data/localStore');

const JWT_SECRET = process.env.JWT_SECRET || 'legalease_super_secret_jwt_key_2026_production';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

// @desc    Register new user
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, company } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    const existingUser = localStore.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await localStore.createUser({
      name,
      email,
      password: hashedPassword,
      company: company || 'Independent Legal Professional',
      role: 'user',
      subscription: 'free'
    });

    const token = generateToken(newUser._id);
    const { password: _, ...safeUser } = newUser;

    res.status(201).json({
      success: true,
      token,
      user: safeUser,
      message: 'Account registered successfully.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const user = localStore.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (user.status === 'blocked') {
      return res.status(403).json({ success: false, message: 'Account is suspended by an administrator.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = generateToken(user._id);
    const { password: _, ...safeUser } = user;

    res.json({
      success: true,
      token,
      user: safeUser,
      message: 'Logged in successfully.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const user = localStore.findUserById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    const { password: _, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Google OAuth Simulated Login
// @route   POST /api/auth/google
const googleLogin = async (req, res) => {
  try {
    const { email, name, avatar } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Google account email is required.' });
    }

    let user = localStore.findUserByEmail(email);
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      user = localStore.createUser({
        name: name || 'Google Legal User',
        email,
        password: hashedPassword,
        avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        role: 'user',
        subscription: 'free',
        company: 'Enterprise Legal'
      });
    }

    const token = generateToken(user._id);
    const { password: _, ...safeUser } = user;

    res.json({
      success: true,
      token,
      user: safeUser,
      message: 'Google authentication successful.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Forgot Password Request
// @route   POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = localStore.findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ success: false, message: 'No account found with this email.' });
  }

  res.json({
    success: true,
    message: 'Password reset link has been dispatched to your email address (Simulated in development mode).'
  });
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = localStore.findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  localStore.updateUser(user._id, { password: hashedPassword });

  res.json({
    success: true,
    message: 'Password reset successfully. You may now log in.'
  });
};

module.exports = {
  register,
  login,
  getMe,
  googleLogin,
  forgotPassword,
  resetPassword
};
