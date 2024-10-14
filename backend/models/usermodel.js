const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  name: { 
    type: String, 
    required: true, 
    minlength: 3,  
    maxlength: 50, 
  },
  
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  

  password: { 
    type: String, 
    required: true, 
    minlength: 6, 
    maxlength: 100 
  },
  
  role: { 
    type: String, 
    enum: ['admin', 'hr', 'recruiter'], 
    required: true 
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;

