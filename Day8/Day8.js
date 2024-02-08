const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

/**
 * Express route to handle requests with a positive integer parameter
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function positiveIntegerHandler(req, res, next) {
    // Your implementation here
    const number = parseInt(req.query.number);
    if (number <= 0 || !Number.isInteger(number)) {
        next(new PositiveIntegerError());
      } else {
        res.json({ message: 'Successful' });
      }
}
class PositiveIntegerError extends Error {}

function errorHandler(err, req, res, next) {
    if (err instanceof PositiveIntegerError) {
      res.status(400).json({ error: 'Try again with positive number' });
    } else {
      next(err);
    }
  }

app.get('/positive',positiveIntegerHandler);
app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})
