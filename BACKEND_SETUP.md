# Hostel Booking System - Backend Setup Guide

## Prerequisites

- Node.js 16+ installed
- MongoDB installed and running locally (or MongoDB Atlas connection string)
- npm or pnpm installed

## Installation

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure MongoDB

Update `.env` file with your MongoDB connection string:

```
MONGODB_URI=mongodb://localhost:27017/hostel-booking
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Options:**

#### Local MongoDB (Windows)
If you have MongoDB installed locally:
```
MONGODB_URI=mongodb://localhost:27017/hostel-booking
```

#### MongoDB Atlas (Cloud)
Get your connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and update:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostel-booking
```

### 4. Install and Run MongoDB Locally (Windows)

If you don't have MongoDB installed:

```powershell
# Using chocolatey (recommended)
choco install mongodb

# Or download from https://www.mongodb.com/try/download/community
```

Start MongoDB service:
```powershell
# Windows
net start MongoDB

# Or if not installed as service, run mongod directly
mongod
```

## Running the Backend Server

### Development Mode

```bash
npm run dev
```

This starts the server with auto-reload on file changes.

### Production Mode

```bash
npm start
```

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Rooms
- `GET /rooms` - Get all rooms
- `GET /rooms/:id` - Get single room
- `POST /rooms` - Create new room
- `PUT /rooms/:id` - Update room
- `DELETE /rooms/:id` - Delete room

### Bookings
- `GET /bookings` - Get all bookings
- `GET /bookings/:id` - Get single booking
- `POST /bookings` - Create new booking
- `PUT /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Delete booking

### Blog Posts
- `GET /blogs` - Get all blog posts
- `GET /blogs/:id` - Get single blog post
- `POST /blogs` - Create new blog post
- `PUT /blogs/:id` - Update blog post
- `DELETE /blogs/:id` - Delete blog post

### Offers
- `GET /offers` - Get all offers
- `GET /offers/:id` - Get single offer
- `POST /offers` - Create new offer
- `PUT /offers/:id` - Update offer
- `DELETE /offers/:id` - Delete offer

## Database Seeding

The database is automatically seeded with initial data on first run:

- **3 Sample Rooms** (Mixed Dorm, Mountain View Dorm, Luxury Suite)
- **1 Sample Booking** (John Doe)
- **2 Sample Blog Posts** (Mountain Hiking Guide, Budget Travel Tips)
- **2 Sample Offers** (Early Bird 15%, Weekly Stay 20%)

## Testing the Backend

### Using curl

```bash
# Get all rooms
curl http://localhost:5000/api/rooms

# Get health status
curl http://localhost:5000/api/health
```

### Using Postman
1. Import the collection (if provided)
2. Test each endpoint

## Common Issues

### MongoDB Connection Error
**Error**: `MongooseError: connect ECONNREFUSED`

**Solution**: 
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Try connecting to MongoDB Atlas instead

### CORS Error in Frontend
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
- Check `CORS_ORIGIN` in `.env` matches your frontend URL
- Ensure backend is running on port 5000

### Port Already in Use
**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find process using port 5000 and kill it
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in .env
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGODB_URI` | mongodb://localhost:27017/hostel-booking | MongoDB connection string |
| `PORT` | 5000 | Server port |
| `NODE_ENV` | development | Environment type |
| `CORS_ORIGIN` | http://localhost:3000 | Allowed CORS origin |

## Running Both Frontend and Backend

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Troubleshooting

### Check Backend Status
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{ "status": "Server is running" }
```

### View MongoDB Collections
```bash
# Connect to MongoDB
mongosh

# List databases
show dbs

# Use hostel-booking database
use hostel-booking

# List collections
show collections

# View data
db.rooms.find()
db.bookings.find()
db.blogposts.find()
db.offers.find()
```

## Next Steps

1. ✅ Backend server running on port 5000
2. ✅ MongoDB connected
3. ✅ Sample data seeded
4. Run frontend: `npm run dev`
5. Admin panel will now use live database instead of local state
6. All CRUD operations in admin panel now persist to MongoDB

---

**Backend API is now ready to power your hostel booking system!** 🚀
