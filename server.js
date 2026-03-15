const express = require("express");
const db = require("./db");
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// import the Person model
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem")

const app = express();
const PORT = process.env.PORT || 3000;

// middleware to read JSON
app.use(express.json());

//Import the routes
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//Middleware Function
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next();
}

//Passport JS Authentication
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log('Received credentials: ', username, password);
        const user = await Person.findOne({ username: username });

        if (!user) return done(null, false, { message: 'Incorrect username.' });

        const isPasswordMatch = user.password === password ? true : false;

        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect Password.' });
        }
    }
    catch (err) {
        return done(err);
    }
}));

// Initialize Passport
// app.use(passport.initialize());

//For all endpoints
app.use(logRequest);

// Home route
app.get("/", passport.authenticate('local', {sessions : true}), (req, res) => {
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