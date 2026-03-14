const express = require("express");
const db = require("./db");
// import the Person model
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem")

const app = express();
const PORT = 3000;

// middleware to read JSON
app.use(express.json());

//Import the routes
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Home route
app.get("/", (req, res) => {
    res.send("Hello World! My first backend server.");
});

// Use the imported routes
app.use('/person', personRoutes);
app.use('/menuItem', menuItemRoutes);

// Example API route
app.get("/api/message", (req, res) => {
    res.json({
        message: "Backend is working!",
        status: "success"
    });
});

// POST route example
app.post("/api/data", (req, res) => {
    const data = req.body;

    res.json({
        receivedData: data,
        message: "Data received successfully"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});