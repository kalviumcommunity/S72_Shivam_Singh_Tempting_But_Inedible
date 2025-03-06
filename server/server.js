const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const { default: Entities } = require("../Client/src/components/Entities");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGO_URI;
let dbStatus = "Disconnected";

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

async function connectDB() {
    try {
        const client = new MongoClient(mongoURI);
        await client.connect();
        dbStatus = "Connected to MongoDB";
        console.log(dbStatus);
        return client.db();
    } catch (error) {
        dbStatus = "Error connecting to MongoDB";
        console.error("MongoDB Connection Error:", error);
        return null;
    }
}

// Connect to the database
let db;
(async () => {
    db = await connectDB();
})();

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome!", database: dbStatus });
});

app.get("/ping", (req, res) => {
    res.send("Pong!");
});

// API route to fetch entities
app.get("/api/entities", async (req, res) => {
    try {
        if (!db) {
            throw new Error("Database connection not established");
        }
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});