const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

function greetHandler(req, res) {
    // Your implementation here
    const name = req.query.name;
    if (name) {
        res.send(`Hello, ${name}!`);
    } else {
        res.send('Hello, Guest!');
    }
}

app.get('/greet', greetHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



app.get('/greet?name=John', greetHandler);