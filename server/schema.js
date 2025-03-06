// Import required modules
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://shivam03669:Shivam26062006@cluster0.ea9ve.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define entities
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
});

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
});

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
});

const listItemSchema = new mongoose.Schema({
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
});

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
});

const ratingSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const itemTagSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  tagId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' },
});

// Create models
const User = mongoose.model('User ', userSchema);
const Item = mongoose.model('Item', itemSchema);
const List = mongoose.model('List', listSchema);
const ListItem = mongoose.model('ListItem', listItemSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Rating = mongoose.model('Rating', ratingSchema);
const Category = mongoose.model('Category', categorySchema);
const SubCategory = mongoose.model('SubCategory', subCategorySchema);
const Tag = mongoose.model('Tag', tagSchema);
const ItemTag = mongoose.model('ItemTag', itemTagSchema);

// Add data to entities
async function addData() {
  try {
    // Add users
    const user1 = new User({
      username: 'shivam',
      email: 'shivam@example.com',
      password: 'password',
      profilePicture: 'https://example.com/shivam.jpg',
    });
    await user1.save();

    const user2 = new User({
      username: 'john',
      email: 'john@example.com',
      password: 'password',
      profilePicture: 'https://example.com/john.jpg',
    });
    await user2.save();

    // Add items
    const item1 = new Item({
      name: 'Soap Cake',
      description: 'A soap shaped like a cake',
      imageUrl: 'https://example.com/soap-cake.jpg',
      userId: user1._id,
    });
    await item1.save();

    const item2 = new Item({
      name: 'Colorful Soap',
      description: 'A colorful soap',
      imageUrl: 'https://example.com/colorful-soap.jpg',
      userId: user2._id,
    });
    await item2.save();

    // Add lists
    const list1 = new List({
      name: 'My Favorite Soaps',
      description: 'A list of my favorite soap items',
      userId: user1._id,
    });
    await list1.save();

    const list2 = new List({
      name: 'John\'s Favorite Soaps',
      description: 'A list of John\'s favorite soap items',
      userId: user2._id,
    });
    await list2.save();

    // Add list items
    const listItem1 = new ListItem({
      listId: list1._id,
      itemId: item1._id,
    });
    await listItem1.save();

    const listItem2 = new ListItem({
      listId: list2._id,
      itemId: item2._id,
    });
    await listItem2.save();

    // Add comments
    const comment1 = new Comment({
      text: 'This soap is so cool!',
      userId: user1._id,
      itemId: item1._id,
    });
    await comment1.save();

    const comment2 = new Comment({
      text: 'I love this soap!',
      userId: user2._id,
      itemId: item2._id,
    });
    await comment2.save();

    // Add ratings
    const rating1 = new Rating({
      rating: 5,
      userId: user1._id,
      itemId: item1._id,
    });
    await rating1.save();

    const rating2 = new Rating({
      rating: 4,
      userId: user2._id,
      itemId: item2._id,
    });
    await rating2.save();

    // Add categories
    const category1 = new Category({
      name: 'Soap',
      description: 'Soap items',
    });
    await category1.save();

    const category2 = new Category({
      name: 'Shampoo',
      description: 'Shampoo items',
    });
    await category2.save();

    // Add subcategories
    const subCategory1 = new SubCategory({
      name: 'Bath Soap',
      description: 'Bath soap items',
      categoryId: category1._id,
    });
    await subCategory1.save();

    const subCategory2 = new SubCategory({
      name: 'Hand Soap',
      description: 'Hand soap items',
      categoryId: category1._id,
    });
    await subCategory2.save();

    // Add tags
    const tag1 = new Tag({
      name: 'Natural',
      description: 'Natural soap items',
    });
    await tag1.save();

    const tag2 = new Tag({
      name: 'Organic',
      description: 'Organic soap items',
    });
    await tag2.save();

    // Add item tags
    const itemTag1 = new ItemTag({
      itemId: item1._id,
      tagId: tag1._id,
    });
    await itemTag1.save();

    const itemTag2 = new ItemTag({
      itemId: item2._id,
      tagId: tag2._id,
    });
    await itemTag2.save();

    console.log('Data added successfully!');
  } catch (error) {
    console.error('Error adding data:', error);
  }
}

// Call the function to add data
addData();