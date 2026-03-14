const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.DB_URL
//const mongoURL = process.env.DB_URL_LOCAL

mongoose.connect(mongoURL)
.then(() => {
    console.log('MongoDB connection successful')
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
})

const db = mongoose.connection;

// db.on('connected', () => {
//     console.log('Connected to MongoDB Server');
// });

// db.on('error', (err) => {
//     console.error('MomgoDB connection error:', err);
// });

// db.on('disconnected', () => {
//     console.log('MongoDB connection disconnected');
// });

module.exports = db;