const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const port = process.env.PORT || 3000;

const app = express();

mongoose.connect('mongodb://127.0.0.1/testdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});


/**
 * Express route to get all users from MongoDB
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllUsers(req, res) {
  // Your implementation here
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

app.get('/users', getAllUsers);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
