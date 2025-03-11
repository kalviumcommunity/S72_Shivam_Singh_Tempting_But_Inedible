const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");
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
        db = client.db("ASAP");
        console.log("✅ Connected to database: ASAP");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
}

// Connect to the database at startup
connectDB();

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome!", database: db ? "Connected" : "Disconnected" });
});

// GET - Read all entities
app.get("/api/entities", async (req, res) => {
    try {
        if (!db) {
            return res.status(500).json({ error: "Database connection not established" });
        }
        const entities = await db.collection("entities").find().toArray();
        res.json(entities);
    } catch (error) {
        console.error("Error fetching entities:", error);
        res.status(500).json({ error: "Failed to fetch entities" });
    }
});

// POST - Create new entity
app.post("/api/entities", async (req, res) => {
    try {
        if (!db) {
            return res.status(500).json({ error: "Database connection not established" });
        }
        
        const { name, description, category, img } = req.body;
        
        if (!name || !category) {
            return res.status(400).json({ error: "Name and category are required" });
        }

        const newEntity = {
            name,
            description: description || "",
            category,
            img: img || "",
            createdBy: "user",
            createdAt: new Date()
        };

        const result = await db.collection("entities").insertOne(newEntity);
        
        if (!result.acknowledged) {
            throw new Error("Insert operation not acknowledged");
        }

        res.status(201).json({
            message: "Entity created successfully",
            entity: { ...newEntity, _id: result.insertedId }
        });
    } catch (error) {
        console.error("Error creating entity:", error);
        res.status(500).json({
            error: "Failed to create entity",
            details: error.message
        });
    }
});

// PUT - Update entity
app.put("/api/entities/:id", async (req, res) => {
    try {
        if (!db) {
            return res.status(500).json({ error: "Database connection not established" });
        }

        const { id } = req.params;
        const { name, description, category, img } = req.body;

        if (!name || !category) {
            return res.status(400).json({ error: "Name and category are required" });
        }

        const result = await db.collection("entities").updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name,
                    description: description || "",
                    category,
                    img: img || "",
                    updatedAt: new Date()
                }
            }
        );

        if (!result.matchedCount) {
            return res.status(404).json({ error: "Entity not found" });
        }

        res.json({ message: "Entity updated successfully" });
    } catch (error) {
        console.error("Error updating entity:", error);
        res.status(500).json({ error: "Failed to update entity" });
    }
});

// DELETE - Delete entity
app.delete("/api/entities/:id", async (req, res) => {
    try {
        if (!db) {
            return res.status(500).json({ error: "Database connection not established" });
        }

        const { id } = req.params;
        const result = await db.collection("entities").deleteOne({ _id: new ObjectId(id) });

        if (!result.deletedCount) {
            return res.status(404).json({ error: "Entity not found" });
        }

        res.json({ message: "Entity deleted successfully" });
    } catch (error) {
        console.error("Error deleting entity:", error);
        res.status(500).json({ error: "Failed to delete entity" });
    }
});

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("Closing MongoDB connection...");
    if (client) await client.close();
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});