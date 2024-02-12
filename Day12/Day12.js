const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


let requestno = {};
setInterval(() =>{
    request = {};
}, 100);
/**
 * Rate-limiting middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function rateLimitMiddleware(req, res, next) {
    // Your implementation here
    const ipaddr = req.ip;
    if (!ipaddr) {
        return next();
    } 
    if(!requestno[ipaddr]) {
        requestno[ipaddr] = 1;
    } else {
        requestno[ipaddr]++;
    }
    if(requestno[ipaddr]>5){
        res.status(429).json({"Error" : "Too may request limit exceeded"});
    } else {
        next();
    }
}

app.use(rateLimitMiddleware);

app.get('/', rateLimitMiddleware, (req,res) =>{
    res.send("Its Day 12");
});

app.listen(port , ()=>{
    console.log(`http://localhost:${port}`);
})