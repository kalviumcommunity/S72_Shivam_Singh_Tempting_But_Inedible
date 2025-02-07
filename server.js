// Import required modules
const express = require("express");
const dotenv = require("dotenv"); // For environment variables
const { MongoClient } = require("mongodb"); // MongoDB client

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

const mongoURI = process.env.MONGO_URI; // MongoDB connection URI
let dbStatus = "Disconnected"; // Default status

// Function to connect to MongoDB
async function connectDB() {
    try {
        const client = new MongoClient(mongoURI);
        await client.connect();
        dbStatus = "Connected to MongoDB";
        console.log(dbStatus);
    } catch (error) {
        dbStatus = "Error connecting to MongoDB";
        console.error("MongoDB Connection Error:", error);
    }
}

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome!", database: dbStatus });
});

app.get("/ping", (req, res) => {
    res.send("Pong!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
