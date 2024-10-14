require('dotenv').config(); 

const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');    
const authRoutes = require('./routes/authroutes');

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,  
  resave: false,
  saveUninitialized: true,
}));

app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
