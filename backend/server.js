const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Connected');
    seedDatabase();
  })
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/offers', require('./routes/offers'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Seed Database with Initial Data
async function seedDatabase() {
  try {
    const Room = require('./models/Room');
    const Booking = require('./models/Booking');
    const BlogPost = require('./models/BlogPost');
    const Offer = require('./models/Offer');

    // Check if data already exists
    const roomCount = await Room.countDocuments();
    if (roomCount > 0) {
      console.log('✅ Database already seeded');
      return;
    }

    // Seed Rooms
    const rooms = [
      {
        id: uuidv4(),
        name: 'Mountain View Dorm',
        type: 'dorm',
        capacity: 6,
        price: 500,
        amenities: ['WiFi', 'Hot Water', 'Mountain View'],
        available: true,
      },
      {
        id: uuidv4(),
        name: 'Private Cottage',
        type: 'private',
        capacity: 2,
        price: 1500,
        amenities: ['Private Bathroom', 'WiFi', 'Kitchen Access', 'Garden View'],
        available: true,
      },
      {
        id: uuidv4(),
        name: 'Luxury Suite',
        type: 'private',
        capacity: 4,
        price: 2500,
        amenities: ['Jacuzzi', 'WiFi', 'Premium Bedding', 'Room Service'],
        available: true,
      },
    ];

    await Room.insertMany(rooms);
    console.log('✅ Rooms seeded');

    // Seed Bookings
    const bookings = [
      {
        id: uuidv4(),
        guestName: 'John Doe',
        email: 'john@example.com',
        phone: '+91-9876543210',
        roomId: rooms[0].id,
        checkIn: '2024-03-14',
        checkOut: '2024-03-16',
        price: 1000,
        status: 'confirmed',
      },
    ];

    await Booking.insertMany(bookings);
    console.log('✅ Bookings seeded');

    // Seed Blog Posts
    const blogPosts = [
      {
        id: uuidv4(),
        title: 'Mountain Hiking Guide',
        author: 'Admin',
        category: 'travel',
        excerpt: 'Complete guide to hiking in the mountains',
        content: 'This is a comprehensive guide about mountain hiking with tips and tricks.',
        date: new Date().toISOString(),
        image: 'hiking.jpg',
        published: true,
      },
      {
        id: uuidv4(),
        title: 'Budget Travel Tips',
        author: 'Admin',
        category: 'tips',
        excerpt: 'Save money while traveling',
        content: 'Learn how to travel on a budget without compromising on experiences.',
        date: new Date().toISOString(),
        image: 'budget.jpg',
        published: true,
      },
    ];

    await BlogPost.insertMany(blogPosts);
    console.log('✅ Blog posts seeded');

    // Seed Offers
    const offers = [
      {
        id: uuidv4(),
        title: 'Early Bird Offer',
        description: 'Book 30 days in advance and get 15% discount',
        discount: 15,
        validFrom: '2024-01-01',
        validTo: '2024-12-31',
        code: 'EARLYBIRD15',
        active: true,
      },
      {
        id: uuidv4(),
        title: 'Weekly Stay',
        description: 'Stay for 7 nights and get 20% discount',
        discount: 20,
        validFrom: '2024-01-01',
        validTo: '2024-12-31',
        code: 'WEEKLY20',
        active: true,
      },
    ];

    await Offer.insertMany(offers);
    console.log('✅ Offers seeded');
  } catch (error) {
    console.log('⚠️ Seeding error:', error.message);
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
