const mongoose = require('mongoose');


function connectToMongoDB(){
    mongoose.connect('mongodb://127.0.0.1/testdatabase')
    .then(()=> console.log("succesfully connected"))
    .catch((err)=>{console.log('not connected')});
}

connectToMongoDB();

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    }
  });

const User = mongoose.model('User', userSchema);

async function addUserwithValidation(user) {
    const newUser = new User (user);
    try {
        const result = await newUser.save();
    console.log(result);
    console.log('Successfully added user to database!!!');
    } catch (error) {
    console.log('Error adding user to database:', error);
    }
}

addUserwithValidation({ username: 'raptor', email: 'raptor@scaler.com' });