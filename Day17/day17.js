const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String
});

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost:27017/myTestdata');
function addUserToDatabase(user) {
  try {
    const newUser = new User(user);
    newUser.save();
    console.log('User added successfully.');
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

// Test the function
addUserToDatabase({ username: 'john_doe', email: 'john@example.com' });
