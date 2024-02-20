const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const userSchema = new mongoose.Schema({
    username : {type: String},
    age : {type : Number}
  });
const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://127.0.0.1/age_data', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.get('/average-age', async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: '$age' }
        }
      }
    ]);
    if (result.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }
    const averageAge = result[0].averageAge;
    res.json({ averageAge });
  } catch (error) {
    console.error('Error calculating average age:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// function addUserToDatabase(user) {
//     // Your implementation here
//     try {
//         const newUser = new User(user);
//         newUser.save();
//         console.log('User added successfully.');
//     } catch (error) {
//         console.error('Error adding user:', error);
//     }
// }

// addUserToDatabase({username : 'drixel', age : 10});

