const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
});

const entitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  img: { type: String },
  category: { type: String, required: true },
  createdBy: { type: String, required: true },
  likes: [{ type: String }] // Array of user IDs who liked the entity
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Entity = mongoose.model("Entity", entitySchema, "entities");

module.exports = { User, Entity };