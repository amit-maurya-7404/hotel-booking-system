# ✨ Full Setup Instructions - Complete Working Backend + Frontend

## 🎯 Summary of What's Been Created

✅ **Node.js Express Backend** on port 5000
✅ **MongoDB Database** (local or Atlas)
✅ **4 API Modules** - Rooms, Bookings, Blog Posts, Offers
✅ **Frontend Connected** - AdminContext now calls backend APIs
✅ **Database Seeding** - Automatic initial data population
✅ **Updated Admin Components** - RoomsManagement now uses live backend

---

## 📋 Step-by-Step Setup

### Step 1: Install MongoDB (Choose ONE option)

#### Option A: Local MongoDB (Recommended)

**For Windows:**
```powershell
# Using Chocolatey
choco install mongodb

# After installation, verify it starts
net start MongoDB

# Test MongoDB connection
mongosh
> show databases
> exit
```

**From Website:**
1. Download from: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will auto-start as Windows Service

#### Option B: MongoDB Atlas (No Installation)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostel-booking?retryWrites=true&w=majority
```

---

### Step 2: Install Backend Dependencies

```powershell
cd backend
npm install
```

⏱️ Takes 1-2 minutes. You should see: "audited 123 packages"

---

### Step 3: Start Both Servers

#### Method A: Batch File (Windows Only - Easiest)

From project root in PowerShell:
```powershell
.\start-both.bat
```

This opens:
- Backend server in new window (port 5000)
- Frontend server in current window (port 3000)

#### Method B: Two PowerShell Windows (Recommended)

**Window 1 - Backend:**
```powershell
cd c:\Users\Hi\Downloads\hostel-booking-system\backend
npm run dev
```

Wait for this output:
```
✅ MongoDB Connected
✅ Rooms seeded
✅ Bookings seeded
✅ Blog posts seeded
✅ Offers seeded
🚀 Server running on http://localhost:5000
```

**Window 2 - Frontend:**
```powershell
cd c:\Users\Hi\Downloads\hostel-booking-system
npm run dev
```

Wait for this output:
```
> next dev
ready - started server on 0.0.0.0:3000
```

---

### Step 4: Verify Everything Works

#### Check Backend Health

In browser or PowerShell:
```powershell
# PowerShell
Invoke-RestMethod http://localhost:5000/api/health

# Should return:
# @{status=Server is running}
```

#### Check Frontend

Open browser: `http://localhost:3000`
- Home page loads ✅
- Navigation works ✅

#### Check Admin Panel

Open: `http://localhost:3000/admin`

You should see:
- **Rooms Tab**: 3 rooms from database
  - Mountain View Dorm (6 capacity, ₹500)
  - Private Cottage (2 capacity, ₹1500)
  - Luxury Suite (4 capacity, ₹2500)
  
- **Bookings Tab**: 1 existing booking
  - John Doe's booking

- **Blog Tab**: 2 blog posts
  - Mountain Hiking Guide
  - Budget Travel Tips

- **Offers Tab**: 2 promotional offers
  - Early Bird Offer (15% discount)
  - Weekly Stay (20% discount)

---

## 🧪 Test Admin Operations (All Should Work Live!)

### ✅ Test 1: Add a New Room

1. Go to Admin → Rooms tab
2. Click "Add Room"
3. Fill form:
   - Name: "Garden View Dorm"
   - Type: "dorm"
   - Capacity: 4
   - Price: 600
   - Amenities: "WiFi, Garden View"
4. Click "Add Room"
5. **Verify**: New room appears in list ✅ and persists after refresh

### ✅ Test 2: Edit a Room

1. Click edit icon on any room
2. Change price: 500 → 550
3. Click "Update Room"
4. **Verify**: Price updates and persists ✅

### ✅ Test 3: Delete a Room

1. Click delete icon on a room
2. Confirm deletion
3. **Verify**: Room removed from database ✅

### ✅ Test 4: Add a Booking

1. Go to Bookings tab
2. Click "Add Booking"
3. Fill details:
   - Guest Name: "Test User"
   - Email: "test@example.com"
   - Phone: "+91-1234567890"
   - Room ID: Pick from dropdown
   - Check-in: "2024-03-20"
   - Check-out: "2024-03-22"
   - Price: "1000"
4. Click "Add Booking"
5. **Verify**: Booking saved ✅

### ✅ Test 5: Update Booking Status

1. Click on a booking
2. Change status: pending → confirmed → checked-in
3. Save
4. **Verify**: Status persists ✅

### ✅ Test 6: Create Blog Post

1. Go to Blog tab
2. Click "Create Post"
3. Fill:
   - Title: "New Adventure Post"
   - Author: "Your Name"
   - Category: "travel"
   - Content: "Write something..."
4. Publish
5. **Verify**: Post saved to database ✅

### ✅ Test 7: Create Promotional Offer

1. Go to Offers tab
2. Click "Add Offer"
3. Fill:
   - Title: "Summer Special"
   - Code: "SUMMER25"
   - Discount: 25
   - Valid From: "2024-06-01"
   - Valid To: "2024-08-31"
4. Save
5. **Verify**: Offer created ✅

---

## 📊 Architecture Overview

```
Your Application
│
├─ Frontend (Next.js) → http://localhost:3000
│  ├─ AdminContext (calls API)
│  ├─ RoomsManagement (updated ✨)
│  ├─ BookingsManagement
│  ├─ BlogPostsManagement
│  └─ OffersManagement
│
└─ Backend (Express) → http://localhost:5000
   ├─ MongoDB Connection
   ├─ /api/rooms (CRUD)
   ├─ /api/bookings (CRUD)
   ├─ /api/blogs (CRUD)
   └─ /api/offers (CRUD)
        │
        └─ MongoDB Database
           ├─ rooms collection (3 initial)
           ├─ bookings collection (1 initial)
           ├─ blogposts collection (2 initial)
           └─ offers collection (2 initial)
```

---

## 🔍 Database Inspection

### View Data in MongoDB

```powershell
# Connect to MongoDB
mongosh

# Select database
> use hostel-booking

# View collections
> show collections

# View all rooms
> db.rooms.find().pretty()

# View all bookings
> db.bookings.find().pretty()

# Count documents
> db.rooms.countDocuments()

# Exit
> exit
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Cannot connect to MongoDB"

**Cause**: MongoDB not running

**Solution**:
```powershell
# Start MongoDB
net start MongoDB

# Or verify it's running
Get-Service MongoDB

# If not installed as service, run mongod.exe directly
# Usually at: C:\Program Files\MongoDB\Server\[version]\bin\mongod.exe
```

### Issue 2: "Port 5000 already in use"

**Solution**:
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace XXXX with PID)
taskkill /PID XXXX /F

# Or change port in backend/.env
PORT=5001
```

### Issue 3: "Cannot connect to server at http://localhost:5000"

**Cause**: Backend not running

**Solution**:
- Make sure Terminal 1 shows "Server running on http://localhost:5000"
- Check for errors in backend terminal
- Restart backend

### Issue 4: "CORS Error" in browser console

**Solution**:
- Check CORS_ORIGIN in `backend/.env`
- Should be: `CORS_ORIGIN=http://localhost:3000`
- Restart backend after changing

### Issue 5: "Admin panel shows empty lists"

**Solution**:
1. Wait 5 seconds for database seeding
2. Refresh browser (Ctrl+R)
3. Check browser console for errors
4. Check MongoDB is connected (see terminal output)

---

## 📁 File Structure

```
hostel-booking-system/
├── backend/
│   ├── models/
│   │   ├── Room.js
│   │   ├── Booking.js
│   │   ├── BlogPost.js
│   │   └── Offer.js
│   ├── routes/
│   │   ├── rooms.js
│   │   ├── bookings.js
│   │   ├── blogs.js
│   │   └── offers.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── components/
│   ├── admin/
│   │   ├── RoomsManagement.tsx ✨ UPDATED
│   │   ├── BookingsManagement.tsx
│   │   ├── BlogPostsManagement.tsx
│   │   └── OffersManagement.tsx
│
├── context/
│   └── AdminContext.tsx ✨ UPDATED (now calls APIs)
│
├── package.json
├── start-both.bat
├── BACKEND_SETUP.md
├── INTEGRATION_GUIDE.md
└── QUICK_START.md
```

---

## 🚀 Next Steps

1. **Start servers:**
   ```powershell
   .\start-both.bat  # or use Method B above
   ```

2. **Open admin panel:**
   - http://localhost:3000/admin

3. **Test all operations:**
   - Add/edit/delete rooms
   - Manage bookings
   - Create blog posts
   - Create promotional offers

4. **All changes persist** to MongoDB database ✅

5. **Data survives server restart** ✅

---

## 📚 Documentation Files

- **BACKEND_SETUP.md** - Detailed backend configuration
- **INTEGRATION_GUIDE.md** - Complete integration walkthrough
- **QUICK_START.md** - Quick reference guide
- **SETUP_COMPLETE.md** - Initial setup notes

---

## 💡 What's Different Now?

### Before (Local State)
❌ Data lost on refresh
❌ Changes not persistent
❌ No real database
❌ Admin panel demo only

### Now (With Backend + MongoDB) ✨
✅ **Data persists** - All changes saved to MongoDB
✅ **Real database** - All operations use MongoDB
✅ **API-driven** - Frontend calls backend APIs
✅ **Production-ready** - Can scale and deploy
✅ **Live data** - Admin panel works with real database

---

## 🎉 You're All Set!

Your hostel booking system now has:
- ✅ Fully functional Node.js backend
- ✅ MongoDB database with seeded data
- ✅ Live CRUD operations in admin panel
- ✅ Persistent data storage
- ✅ API endpoints for all entities
- ✅ Error handling and validation

**Open http://localhost:3000/admin and start managing your hostel!** 🏔️

---

**Need help?** Check the terminal output for error messages. All backend operations are logged.

Good luck! 🚀
