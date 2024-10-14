const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    
    await mongoose.connect(process.env.DB_URI); 
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
