const mongoose = require("mongoose");
require('dotenv').config();  // Load environment variables

module.exports = async () => {
    const DB = process.env.DB;  // Make sure your .env file contains this variable

    console.log("Database URI:", DB);  // Confirm URI is correct

    try {
        await mongoose.connect(DB, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });  // Specify connection options
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
