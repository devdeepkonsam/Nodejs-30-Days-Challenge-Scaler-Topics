const express = require('express');
const port = process.env.PORT || 3000;
const app = express();


function errorHandler(err, req, res, next) {
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err instanceof SyntaxError) {
        statusCode = 400;
        message = 'Invalid JSON';
    } else if (err instanceof SyntaxError && err.status === 404) {
        statusCode = 404;
        message = 'Not Found';
    } else if (err instanceof SyntaxError && err.status === 401) {
        statusCode = 401;
        message = 'Unauthorized';
    } else if (err instanceof SyntaxError && err.status === 403) {
        statusCode = 403;
        message = 'Forbidden';
    } else if (err instanceof SyntaxError && err.status === 409) {
        statusCode = 409;
        message = 'Conflict';
    }
    res.status(statusCode).json({ error: message });
}

app.get("/hello",(req,res,next)=>{
    const error = new Error();
    error.status = 500;
    next(error);
})
app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})