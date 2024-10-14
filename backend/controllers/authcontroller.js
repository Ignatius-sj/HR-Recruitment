const User = require('../models/usermodel'); 
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body; 
  const { role } = req.params; 

  try {
    
    if (!['admin', 'hr', 'recruiter'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    if (password.length > 100) {
      return res.status(400).json({ error: 'Password must not exceed 100 characters' });
    }

  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name, 
      email,
      password: hashedPassword,
      role, 
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully', user: { name, email, role } });
  } catch (error) {
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  const { role } = req.params;

  try {
    
    if (!['admin', 'hr', 'recruiter'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (user.role !== role) {
      return res.status(403).json({ error: 'Role mismatch' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

   
    req.session.user = {
      name: user.name,
      email: user.email,
      role: user.role,
    };  

    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { register, login };
