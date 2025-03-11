const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { User, Entity } = require("./schema"); // Import Entity model

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("MONGO_URI is not set. Exiting...");
    process.exit(1);
}

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Auth Routes
app.post("/api/signup", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        res.json({ 
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Entity Routes
app.get("/api/entities", async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        if (!mongoose.connection.readyState) {
            return res.status(500).json({ error: "Database connection not established" });
        }

        const entities = await Entity.find({ createdBy: userId });
        res.json(entities);
    } catch (error) {
        console.error("Error fetching entities:", error);
        res.status(500).json({ error: "Failed to fetch entities" });
    }
});

// Add new entity
app.post("/api/entities", async (req, res) => {
    try {
        const { name, description, category, img, userId } = req.body;
        
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Create new entity
        const entity = new Entity({
            name,
            description,
            category,
            img,
            createdBy: userId
        });

        await entity.save();
        res.status(201).json(entity);
    } catch (error) {
        console.error("Error creating entity:", error);
        res.status(500).json({ error: "Failed to create entity" });
    }
});

// Update entity
app.put("/api/entities/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, img, userId } = req.body;

        const entity = await Entity.findById(id);
        if (!entity) {
            return res.status(404).json({ error: "Entity not found" });
        }

        // Check if the entity belongs to the user
        if (entity.createdBy.toString() !== userId) {
            return res.status(403).json({ error: "Not authorized to update this entity" });
        }

        const updatedEntity = await Entity.findByIdAndUpdate(
            id,
            { name, description, category, img },
            { new: true }
        );

        res.json(updatedEntity);
    } catch (error) {
        console.error("Error updating entity:", error);
        res.status(500).json({ error: "Failed to update entity" });
    }
});

// Delete entity
app.delete("/api/entities/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const entity = await Entity.findById(id);
        if (!entity) {
            return res.status(404).json({ error: "Entity not found" });
        }

        // Check if the entity belongs to the user
        if (entity.createdBy.toString() !== userId) {
            return res.status(403).json({ error: "Not authorized to delete this entity" });
        }

        await Entity.findByIdAndDelete(id);
        res.json({ message: "Entity deleted successfully" });
    } catch (error) {
        console.error("Error deleting entity:", error);
        res.status(500).json({ error: "Failed to delete entity" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});