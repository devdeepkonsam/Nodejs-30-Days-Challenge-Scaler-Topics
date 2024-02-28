const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = 3000;

function authenticateAndAuthorize(roles = []) {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send("No token provided");
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = await jwt.verify(token, process.env.SECRET_KEY || "Iamyousecretkey");
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(401).send("Unauthorized");
            }
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(403).send("Failed to authenticate token");
        }
    };
}

app.use(express.json());

app.post("/login", (req, res) => {
    const username = req.body.username;
    if (!username) {
        return res.status(400).send("Username is required");
    }
    const user = {
        name: username,
        role: username === "admin" ? "Admin" : "User",
    };
    const token = jwt.sign(user, process.env.SECRET_KEY || "Iamyousecretkey");
    res.json({ token });
});

app.get("/open", (req, res) => {
    res.send("Open to all");
});

app.get("/user", authenticateAndAuthorize(["user", "admin"]), (req, res) => {
    res.send("Hello user");
});

app.get("/admin", authenticateAndAuthorize(["admin"]), (req, res) => {
    res.send("Hello admin");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
