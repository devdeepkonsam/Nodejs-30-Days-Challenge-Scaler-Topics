const express = require('express');
const errorHandler = require('./errorHandler');
const port = process.env.PORT || 3000;
const app = express();

app.use(errorHandler);

app.listen(port , () => {
    console.log(`http://localhost:${port}`);
});
