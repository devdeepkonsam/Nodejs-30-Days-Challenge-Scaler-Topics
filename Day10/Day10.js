const express = require('express');
const path = require('path')
const app = express();
const port = process.env.PORT || 3000;

/**
 * Express application serving static files from the "public" directory
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function staticFileServer(req, res) {
    // Your implementation here
    const directory = path.join(__dirname, 'public');
    app.use(express.static(directory));
    app.get('/styles/style.css', (req, res) => {
        res.sendFile(path.join(directory, 'index.html'));
      });
}

staticFileServer();
app.listen(port , () => {
  console.log(`http://localhost:${port}`);
});