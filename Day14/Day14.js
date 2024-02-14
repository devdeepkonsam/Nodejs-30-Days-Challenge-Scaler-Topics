const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


const cachedResponses = {};
const cacheExpirationTime = 10 * 1000;

/**
 * Caching middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function cachingMiddleware(req, res, next) {
    // Your implementation here
  const url = req.originalUrl || req.url;
  if (cachedResponses[url] && Date.now() - cachedResponses[url].timestamp < cacheExpirationTime) {
    res.send(cachedResponses[url].data);
    return;
  }
  const originalSend = res.send;
  res.send = function (data) {
    cachedResponses[url] = {
      timestamp: Date.now(),
      data: data
    };
    originalSend.apply(res, arguments);
  };
  next();
}


app.use(cachingMiddleware);

app.get('/', (req, res) => {
  res.send('Its Day 14 of 30daysofNodejs!');
});

app.get('/', (req, res) => {
  console.log('Initial request');
});



setTimeout(() => {
  app.get('/', (req, res) => {
    console.log('Request after cache');
  });
}, cacheExpirationTime / 2);


setTimeout(() => {
  app.get('/', (req, res) => {
    console.log('Request after cache expiration');
  });
}, cacheExpirationTime + 1000);

app.listen(port , () => {
  console.log(`http://localhost:${port}`);
});
