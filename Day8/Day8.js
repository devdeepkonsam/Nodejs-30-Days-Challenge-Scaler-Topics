const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


/**
 * Express route to handle requests with a positive integer parameter
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function positiveIntegerHandler(req, res) {
    // Your implementation here
    const number = parseInt(req.query.number);
    if(Number.isInteger(number) && number > 0){
        res.status(200).send(`{"Message" : "Succesful"}`);
    } else {
        res.status(400).send(`{"Message" : "Error enter a positive number"}`)
    }
}

app.get('/positive',positiveIntegerHandler);

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})