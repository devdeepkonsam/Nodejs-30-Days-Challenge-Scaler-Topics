// Import Mongoose
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // You can add more fields as needed
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
