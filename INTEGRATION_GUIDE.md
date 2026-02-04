# 🚀 Complete Integration Guide - Backend + MongoDB + Frontend

## What's Been Set Up

✅ **Node.js Express Backend** - Running on port 5000
✅ **MongoDB Connection** - Local or Atlas support
✅ **4 API Modules** - Rooms, Bookings, Blog Posts, Offers
✅ **Frontend Integration** - AdminContext now calls backend APIs
✅ **Database Seeding** - Automatic initial data setup
✅ **CORS Enabled** - Cross-origin requests allowed

---

## ⚙️ Prerequisites

### 1. MongoDB Setup (Choose One)

#### Option A: Local MongoDB (Recommended for Development)

**Windows Installation:**

```powershell
# Using Chocolatey (recommended)
choco install mongodb

# After installation, start MongoDB service
net start MongoDB

# Verify it's running
mongosh
```

**MongoDB Community Edition Download:**
- Download from: https://www.mongodb.com/try/download/community
- Install with default settings
- MongoDB will automatically start as a Windows service

**Verify MongoDB is running:**
```bash
mongosh
> show databases
> exit
```

#### Option B: MongoDB Atlas (Cloud - No Installation Needed)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostel-booking
```

### 2. Node.js Installation
- Ensure Node.js 16+ is installed: `node --version`
- Ensure npm is working: `npm --version`

---

## 🚀 Running Everything

### Method 1: Using Batch File (Windows Only - Easiest)

```bash
# From project root
start-both.bat
```

This will:
1. Start backend server in a new window (port 5000)
2. Start frontend server in current window (port 3000)

### Method 2: Using Two Terminal Windows (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Output should look like:
```
✅ MongoDB Connected
✅ Rooms seeded
✅ Bookings seeded
✅ Blog posts seeded
✅ Offers seeded
🚀 Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Output should look like:
```
> next dev
ready - started server on 0.0.0.0:3000
```

### Method 3: Using npm Scripts

**Terminal 1:**
```bash
npm run backend
```

**Terminal 2:**
```bash
npm run dev
```

---

## ✅ Verification Steps

### 1. Check Backend Health

**Using Browser:**
```
http://localhost:5000/api/health
```

Should return:
```json
{ "status": "Server is running" }
```

**Using curl (PowerShell):**
```powershell
Invoke-RestMethod http://localhost:5000/api/health
```

### 2. Check MongoDB Connection

**Terminal:**
```powershell
mongosh
> use hostel-booking
> db.rooms.find()
> exit
```

Should show your seeded rooms data.

### 3. Check Frontend

**Browser:**
```
http://localhost:3000/admin
```

The admin panel should load. Check:
- Rooms tab - shows 3 rooms from database
- Bookings tab - shows 1 booking from database
- Blog tab - shows 2 blog posts
- Offers tab - shows 2 promotional offers

---

## 🧪 Testing Admin Panel Operations

### Test Room Management

1. **View Rooms:**
   - Go to `/admin` → Rooms tab
   - Should see: "Mountain View Dorm", "Private Cottage", "Luxury Suite"

2. **Add Room:**
   - Click "Add Room" button
   - Fill in form:
     - Name: "Garden View Dorm"
     - Type: "dorm"
     - Capacity: 4
     - Price: 600
     - Amenities: WiFi, Garden View
   - Click "Add"
   - ✅ Room appears in list (saved to MongoDB)

3. **Edit Room:**
   - Click edit icon on any room
   - Change price from 500 to 550
   - Click "Update"
   - ✅ Price updated in database

4. **Delete Room:**
   - Click delete icon on a room
   - Confirm deletion
   - ✅ Room removed from database

### Test Booking Management

1. **View Bookings:**
   - Go to Bookings tab
   - Should see existing booking

2. **Add Booking:**
   - Click "Add Booking"
   - Fill form with guest details
   - Click "Add"
   - ✅ Booking saved to database

3. **Update Status:**
   - Click on a booking
   - Change status: pending → confirmed → checked-in
   - ✅ Status changes persist

4. **Delete Booking:**
   - Delete a booking
   - ✅ Removed from database

### Test Blog Management

1. **Create Post:**
   - Go to Blog tab
   - Click "Create Post"
   - Fill: Title, Author, Category, Content
   - Click "Publish"
   - ✅ Post saved to MongoDB

2. **Edit Post:**
   - Click edit on a post
   - Change title or content
   - Save
   - ✅ Changes persist

3. **Delete Post:**
   - Delete a post
   - ✅ Removed from database

### Test Offers Management

1. **Create Offer:**
   - Go to Offers tab
   - Click "Add Offer"
   - Fill: Title, Code, Discount %, Valid From/To dates
   - Save
   - ✅ Offer created in database

2. **Update Offer:**
   - Edit discount percentage
   - ✅ Changes saved

3. **Delete Offer:**
   - Delete an offer
   - ✅ Removed from database

---

## 📊 Database Structure

### Collections Created

#### Rooms
```json
{
  "_id": ObjectId,
  "id": "uuid",
  "name": "String",
  "type": "dorm|private",
  "capacity": Number,
  "price": Number,
  "amenities": [String],
  "available": Boolean,
  "createdAt": Date
}
```

#### Bookings
```json
{
  "_id": ObjectId,
  "id": "uuid",
  "guestName": "String",
  "email": "String",
  "phone": "String",
  "roomId": "String",
  "checkIn": "String",
  "checkOut": "String",
  "price": Number,
  "status": "pending|confirmed|cancelled|checked-in",
  "createdAt": Date
}
```

#### BlogPosts
```json
{
  "_id": ObjectId,
  "id": "uuid",
  "title": "String",
  "author": "String",
  "category": "String",
  "excerpt": "String",
  "content": "String",
  "date": "String",
  "image": "String",
  "published": Boolean,
  "createdAt": Date
}
```

#### Offers
```json
{
  "_id": ObjectId,
  "id": "uuid",
  "title": "String",
  "description": "String",
  "discount": Number,
  "validFrom": "String",
  "validTo": "String",
  "code": "String",
  "active": Boolean,
  "createdAt": Date
}
```

---

## 🔧 Environment Configuration

### Backend `.env`
Located at: `backend/.env`

```env
MONGODB_URI=mongodb://localhost:27017/hostel-booking
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostel-booking?retryWrites=true&w=majority
```

---

## 📝 API Endpoints Reference

### Base URL: `http://localhost:5000/api`

**Rooms:**
- `GET /rooms` - Get all
- `GET /rooms/:id` - Get one
- `POST /rooms` - Create
- `PUT /rooms/:id` - Update
- `DELETE /rooms/:id` - Delete

**Bookings:**
- `GET /bookings` - Get all
- `POST /bookings` - Create
- `PUT /bookings/:id` - Update
- `DELETE /bookings/:id` - Delete

**Blog Posts:**
- `GET /blogs` - Get all
- `POST /blogs` - Create
- `PUT /blogs/:id` - Update
- `DELETE /blogs/:id` - Delete

**Offers:**
- `GET /offers` - Get all
- `POST /offers` - Create
- `PUT /offers/:id` - Update
- `DELETE /offers/:id` - Delete

---

## 🚨 Troubleshooting

### Issue: "MongoDB Connection Error"

**Solution:**
1. Check if MongoDB is running: `net start MongoDB`
2. Verify connection string in `backend/.env`
3. If using Atlas, check internet connection
4. Verify credentials in connection string

### Issue: "CORS Error" in Browser Console

**Solution:**
- Backend is not running on port 5000
- Check `CORS_ORIGIN` in `backend/.env`
- Ensure it matches your frontend URL

### Issue: "Cannot POST /api/rooms"

**Solution:**
- Backend server not running
- Check that `npm run dev` is working in backend folder
- Check port 5000 is available

### Issue: Admin panel shows empty lists

**Solution:**
- Wait 5-10 seconds for backend to seed database
- Refresh browser (F5)
- Check browser console for errors
- Verify MongoDB is connected

### Issue: "Port 5000 already in use"

**Solution:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID 12345 /F

# Or change PORT in backend/.env
```

---

## 📦 Project Structure

```
hostel-booking-system/
├── backend/                 # Node.js Express server
│   ├── models/             # MongoDB schemas
│   │   ├── Room.js
│   │   ├── Booking.js
│   │   ├── BlogPost.js
│   │   └── Offer.js
│   ├── routes/             # API endpoints
│   │   ├── rooms.js
│   │   ├── bookings.js
│   │   ├── blogs.js
│   │   └── offers.js
│   ├── server.js           # Main server file
│   ├── .env                # Environment config
│   └── package.json
│
├── app/                    # Next.js pages
├── components/
│   └── admin/             # Admin panel components
├── context/
│   └── AdminContext.tsx   # State management (now with API calls)
└── package.json
```

---

## ✨ What's Now Working

✅ All room operations (add, edit, delete) persist to MongoDB
✅ All booking operations persist to MongoDB
✅ All blog post operations persist to MongoDB
✅ All offer operations persist to MongoDB
✅ Data survives page refreshes and server restarts
✅ CORS enabled for frontend-backend communication
✅ Automatic database seeding on first run
✅ Error handling with user feedback
✅ Loading states in admin panel

---

## 🎯 Next Steps

1. **Open Two Terminals:**
   - Terminal 1: `cd backend && npm run dev`
   - Terminal 2: `npm run dev`

2. **Open Browser:**
   - Frontend: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin`

3. **Test Operations:**
   - Add/edit/delete rooms, bookings, posts, offers
   - Data should persist after refresh

4. **Production Deployment:**
   - Update `MONGODB_URI` to use MongoDB Atlas
   - Update `CORS_ORIGIN` to production domain
   - Deploy backend to cloud (Heroku, Railway, etc.)
   - Deploy frontend to Vercel

---

**🎉 Your full-stack hostel booking system is now live with a real database!**
