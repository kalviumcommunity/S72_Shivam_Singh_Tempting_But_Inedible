const mongoose = require('mongoose');
const dotenv = require('dotenv');



dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
});

// Entity Schema
const entitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  img: { type: String }, // Image URL
  category: { type: String, required: true }, // e.g., "liquid"
  createdBy: { type: String, required: true } // e.g., "shivam singh"
}, { timestamps: true });


// Item Schema (If different from entities)
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  img: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// List Schema
const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// List-Item Relationship
const listItemSchema = new mongoose.Schema({
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
});

// Comment Schema
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  entityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Entity' },
});

// Rating Schema
const ratingSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  entityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Entity' },
});

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

// Tag Schema
const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

// Entity-Tag Relationship
const entityTagSchema = new mongoose.Schema({
  entityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Entity' },
  tagId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' },
});

// Create Models
const User = mongoose.model('User', userSchema);
const Entity = mongoose.model("Entity", entitySchema, "entities");
const Item = mongoose.model('Item', itemSchema);
const List = mongoose.model('List', listSchema);
const ListItem = mongoose.model('ListItem', listItemSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Rating = mongoose.model('Rating', ratingSchema);
const Category = mongoose.model('Category', categorySchema);
const Tag = mongoose.model('Tag', tagSchema);
const EntityTag = mongoose.model('EntityTag', entityTagSchema);

module.exports = { User, Entity, Item, List, ListItem, Comment, Rating, Category, Tag, EntityTag };
