// Import required modules
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://shivam03669:Shivam26062006@cluster0.ea9ve.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define entities
const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  email: String,
  password: String,
  profilePicture: String,
});

const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  imageUrl: String,
  userId: { type: Number, ref: 'User ' },
});

const listSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  userId: { type: Number, ref: 'User ' },
});

const listItemSchema = new mongoose.Schema({
  id: Number,
  listId: { type: Number, ref: 'List' },
  itemId: { type: Number, ref: 'Item' },
});

const commentSchema = new mongoose.Schema({
  id: Number,
  text: String,
  userId: { type: Number, ref: 'User ' },
  itemId: { type: Number, ref: 'Item' },
});

const ratingSchema = new mongoose.Schema({
  id: Number,
  rating: Number,
  userId: { type: Number, ref: 'User ' },
  itemId: { type: Number, ref: 'Item' },
});

const categorySchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
});

const subCategorySchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  categoryId: { type: Number, ref: 'Category' },
});

const tagSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
});

const itemTagSchema = new mongoose.Schema({
  id: Number,
  itemId: { type: Number, ref: 'Item' },
  tagId: { type: Number, ref: 'Tag' },
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
      id: 1,
      username: 'shivam',
      email: 'shivam@example.com',
      password: 'password',
      profilePicture: 'https://example.com/shivam.jpg',
    });
    await user1.save();

    const user2 = new User({
      id: 2,
      username: 'john',
      email: 'john@example.com',
      password: 'password',
      profilePicture: 'https://example.com/john.jpg',
    });
    await user2.save();

    // Add items
    const item1 = new Item({
      id: 1,
      name: 'Soap Cake',
      description: 'A soap shaped like a cake',
      imageUrl: 'https://example.com/soap-cake.jpg',
      userId: user1.id,
    });
    await item1.save();

    const item2 = new Item({
      id: 2,
      name: 'Colorful Soap',
      description: 'A colorful soap',
      imageUrl: 'https://example.com/colorful-soap.jpg',
      userId: user2.id,
    });
    await item2.save();

    // Add lists
    const list1 = new List({
      id: 1,
      name: 'My Favorite Soaps',
      description: 'A list of my favorite soap items',
      userId: user1.id,
    });
    await list1.save();

    const list2 = new List({
      id: 2,
      name: 'John\'s Favorite Soaps',
      description: 'A list of John\'s favorite soap items',
      userId: user2.id,
    });
    await list2.save();

    // Add list items
    const listItem1 = new ListItem({
      id: 1,
      listId: list1.id,
      itemId: item1.id,
    });
    await listItem1.save();

    const listItem2 = new ListItem({
      id: 2,
      listId: list2.id,
      itemId: item2.id,
    });
    await listItem2.save();

    // Add comments
    const comment1 = new Comment({
      id: 1,
      text: 'This soap is so cool!',
      userId: user1.id,
      itemId: item1.id,
    });
    await comment1.save();

    const comment2 = new Comment({
      id: 2,
      text: 'I love this soap!',
      userId: user2.id,
      itemId: item2.id,
    });
    await comment2.save();

    // Add  
    const rating1 = new Rating({
      id: 1,
      rating: 5,



      // Add categories
const category1 = new Category({
  id: 1,
  name: 'Soap',
  description: 'Soap items',
});
await category1.save();

const category2 = new Category({
  id: 2,
  name: 'Shampoo',
  description: 'Shampoo items',
});
await category2.save();

// Add subcategories
const subCategory1 = new SubCategory({
  id: 1,
  name: 'Bath Soap',
  description: 'Bath soap items',
  categoryId: category1.id,
});
await subCategory1.save();

const subCategory2 = new SubCategory({
  id: 2,
  name: 'Hand Soap',
  description: 'Hand soap items',
  categoryId: category1.id,
});
await subCategory2.save();

// Add tags
const tag1 = new Tag({
  id: 1,
  name: 'Natural',
  description: 'Natural soap items',
});
await tag1.save();

const tag2 = new Tag({
  id: 2,
  name: 'Organic',
  description: 'Organic soap items',
});
await tag2.save();

// Add item tags
const itemTag1 = new ItemTag({
  id: 1,
  itemId: item1.id,
  tagId: tag1.id,
});
await itemTag1.save();

const itemTag2 = new ItemTag({
  id: 2,
  itemId: item2.id,
  tagId: tag2.id,
});
await itemTag2.save();

console.log('Data added successfully!');
``` ```javascript
// Add users
const user3 = new User({
  id: 3,
  name: 'Alice',
  email: 'alice@example.com',
});
await user3.save();

const user4 = new User({
  id: 4,
  name: 'Bob',
  email: 'bob@example.com',
});
await user4.save();

// Add more comments
const comment3 = new Comment({
  id: 3,
  text: 'This soap smells amazing!',
  userId: user3.id,
  itemId: item1.id,
});
await comment3.save();

const comment4 = new Comment({
  id: 4,
  text: 'Not what I expected.',
  userId: user4.id,
  itemId: item2.id,
});
await comment4.save();
``` ```javascript
// Add more ratings
const rating4 = new Rating({
  id: 4,
  rating: 2,
  userId: user3.id,
  itemId: item1.id,
});
await rating4.save();

const rating5 = new Rating({
  id: 5,
  rating: 5,
  userId: user4.id,
  itemId: item2.id,
});
await rating5.save();

// Add items
const item3 = new Item({
  id: 3,
  name: 'Herbal Shampoo',
  description: 'A gentle herbal shampoo for all hair types.',
  categoryId: category2.id,
});
await item3.save();

const item4 = new Item({
  id: 4,
  name: 'Moisturizing Soap',
  description: 'A soap that moisturizes while cleansing.',
  categoryId: category1.id,
});
await item4.save();
``` ```javascript
// Add more item tags
const itemTag3 = new ItemTag({
  id: 3,
  itemId: item3.id,
  tagId: tag1.id,
}); 
await itemTag3.save();

const itemTag4 = new ItemTag({
  id: 4,
  itemId: item4.id,
  tagId: tag2.id,
});
await itemTag4.save();

// Add inventory
const inventory1 = new Inventory({
  id: 1,
  itemId: item3.id,
  quantity: 100,
});
await inventory1.save();

const inventory2 = new Inventory({
  id: 2,
  itemId: item4.id,
  quantity: 50,
});           
await inventory2.save();

// Add orders
const order1 = new Order({
  id: 1,
  userId: user1.id,
  itemId: item3.id,
  quantity: 2,
});
await order1.save();

const order2 = new Order({
  id: 2,
  userId: user2.id,
  itemId: item4.id,
  quantity: 1,
});
await order2.save();

console.log('Additional data added successfully!');
``` ```javascript
// Add order details
const orderDetail1 = new OrderDetail({
  id: 1,
  orderId: order1.id,
  itemId: item3.id,
  price: 15.99,
});
await orderDetail1.save();

const orderDetail2 = new OrderDetail({
  id: 2,
  orderId: order2.id,
  itemId: item4.id,
  price: 8.99,
});
await orderDetail2.save();

// Add shipping information
const shipping1 = new Shipping({
  id: 1,
  orderId: order1.id,
  address: '123 Main St, Anytown, USA',
  status: 'Shipped',
});
await shipping1.save();

const shipping2 = new Shipping({
  id: 2,
  orderId: order2.id,
  address: '456 Elm St, Othertown, USA',
  status: 'Processing',
});
await shipping2.save();

console.log('Order details and shipping information added successfully!');
``` ```javascript
// Add payment information
const payment1 = new Payment({
  id: 1,
  orderId: order1.id,
  amount: 31.98,
  method: 'Credit Card',
  status: 'Completed',
});
await payment1.save();

const payment2 = new Payment({
  id: 2,
  orderId: order2.id,
  amount: 8.99,
  method: 'PayPal',
  status: 'Pending',
});
await payment2.save();

// Add user addresses
const address1 = new Address({
  id: 1,
  userId: user1.id,
  street: '123 Main St',
  city: 'Anytown',
  state: 'CA',
  zip: '90210',
});
await address1.save();

const address2 = new Address({
  id: 2,
  userId: user2.id,
  street: '456 Elm St',
  city: 'Othertown',
  state: 'NY',
  zip: '10001',
});
await address2.save();

console.log('Payment information and user addresses added successfully!');