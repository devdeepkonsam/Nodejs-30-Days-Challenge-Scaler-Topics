const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

/**
 * Logging middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function loggingMiddleware(req, res, next) {
    // Your implementation here
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
}

app.use(loggingMiddleware);

app.get('/',(req,res)=>{
    res.send("Hello Scaler Its Day 15");
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
  