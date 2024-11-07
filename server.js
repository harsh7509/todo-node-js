// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Make sure to include this
const todosRoute = require('./routes/todos'); // Adjust this path based on your project structure
const sendEmail = require('./mailer');
const mailerRoute= require('./routes/mailerRoute');

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware for JSON body parsing

// Connect to MongoDB
mongoose.connect('mongodb+srv://harsh:harsh@cluster0.heame.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use the To-Do routes
app.use('/api/todos', todosRoute); // Make sure this is correctly set
// use nodemailer

app.use('/send-email',mailerRoute)



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
