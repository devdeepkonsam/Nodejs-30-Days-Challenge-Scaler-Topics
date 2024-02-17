const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String
});
const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost:27017/myTestdata');

/**
 * Adds a new user to the MongoDB database
 * @param {Object} user - User object with properties username and email
 */
function addUserToDatabase(user) {
    // Your implementation here
    try {
        const newUser = new User(user);
        newUser.save();
        console.log('User added successfully.');
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

addUserToDatabase({ username: 'dev_raptor', email: 'dev@scaler.com' });
