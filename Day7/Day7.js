const express = require('express');
const app = express();
const port = process.env.PORT || 3000


/**
 * Express middleware to log incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function requestLoggerMiddleware(req, res, next) {
    // Your implementation here
    const timestamp = new Date().toISOString();
    const method = req.method;
    console.log(`${timestamp} - ${method} request received`);
    next();
}

app.get('/',requestLoggerMiddleware,(req, res)=>{
    res.send("Hello World");
})

app.listen(port, ()=>{
    console.log(`go to http://localhost:${port}`);
})