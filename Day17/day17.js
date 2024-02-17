const mongoose = require('mongoose')
const express = require('express')
const app = express()

const UserSchema = mongoose.Schema({
    username: String,
    email: String
});

const User = mongoose.model('User', UserSchema);

/**
 * Adds a new user to the MongoDB database
 * @param {Object} user - User object with properties username and email
 */
function addUserToDatabase(user) {
    // Your implementation here
    mongoose.connect('mongodb://127.0.0.1/myTestdata');
    async function addUserToDatabase(user) {
        try {
            // Create a new User object using the provided user data
            const newUser = new User(user);
            // Save the new user to the database
            await newUser.save();
            console.log('User added successfully.');
        } catch (err) {
            console.error('Error adding user:', err);
        }
    }
}

addUserToDatabase({username : 'Dev', email : 'devscaler@gmail.com'})