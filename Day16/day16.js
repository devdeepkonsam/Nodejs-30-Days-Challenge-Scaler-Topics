const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

/**
 * Establishes a connection to MongoDB using Mongoose
 */
function connectToMongoDB() {
  // Your implementation here
  mongoose.connect('mongodb://127.0.0.1/myTestdata')
  .then(()=> console.log("Successfully connected to the database"))
  .catch(err=> console.error('Unsuccesful to connect',err));
}


connectToMongoDB();

app.get('/', (req,res) => {
    res.send('hello finally completed day16' );
});

app.listen(port, ()=>{
    console.log(`http://localhost:3000`);
})