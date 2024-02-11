const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const auth = require('./authMiddleware');

app.get('/', (req,res) =>{
    res.send("NO Error Day11");
});

app.get('/protected', auth, (req,res)=>{
    res.send("Error no token provided")
})

app.listen(port , ()=>{
    console.log(`http://localhost${port}`);
})