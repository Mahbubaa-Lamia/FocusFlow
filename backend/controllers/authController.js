import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ১. USER SIGN UP (রেজিস্ট্রেশন)
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // ইমেইল আগে থেকেই আছে কি না চেক
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already registered' });

    // পাসওয়ার্ড সিকিউর হ্যাশিং (Bcrypt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // নতুন ইউজার সেভ
    const user = await User.create({ name, email, password: hashedPassword });

    // JWT Token জেনারেট (মেয়াদ ৭ দিন)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'focusflow_super_secret_key', { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// ২. USER SIGN IN (লগইন)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // ইউজার খোঁজা
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // পাসওয়ার্ড ম্যাচিং চেক
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // JWT Token জেনারেট
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'focusflow_super_secret_key', { expiresIn: '7d' });

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};