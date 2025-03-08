const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error("MONGO_URI is not set. Exiting...");
    process.exit(1);
}

let db;
let client;

// Enable CORS
app.use(cors());
app.use(express.json());

// Function to connect to MongoDB
async function connectDB() {
    try {
        client = new MongoClient(mongoURI);
        await client.connect();
        db = client.db();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
}

// Connect to the database at startup
connectDB();

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome!", database: db ? "Connected" : "Disconnected" });
});

app.get("/ping", (req, res) => {
    res.send("Pong!");
});

// API route to fetch entities
app.get("/api/entities", async (req, res) => {
    if (!db) {
        return res.status(500).json({ error: "Database connection not established" });
    }
    try {
        const items = await db.collection("items").find().toArray();
        res.json(items);
    } catch (error) {
        console.error("Error fetching entities:", error);
        res.status(500).json({ error: "Failed to fetch entities" });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Graceful shutdown to close MongoDB connection
process.on("SIGINT", async () => {
    console.log("Closing MongoDB connection...");
    if (client) await client.close();
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
