const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels'

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