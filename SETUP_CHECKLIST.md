# ✅ SETUP CHECKLIST - Track Your Progress

## 🎯 Pre-Setup (Verify You Have These)

- [ ] Node.js installed (`node --version`)
- [ ] npm working (`npm --version`)
- [ ] PowerShell or Command Prompt ready
- [ ] This project folder open

---

## 📦 Step 1: MongoDB Setup (Choose One)

### Option A: MongoDB Atlas (Cloud - Recommended for Beginners)
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Create free account
- [ ] Create a new cluster
- [ ] Get connection string (looks like: `mongodb+srv://...`)
- [ ] Update `backend/.env`:
  ```
  MONGODB_URI=your_connection_string_here
  ```
- [ ] Verify connection string is correct

### Option B: Local MongoDB (Windows)
- [ ] Install MongoDB: `choco install mongodb`
- [ ] Wait for installation to complete
- [ ] Start MongoDB service: `net start MongoDB`
- [ ] Verify it's running: `Get-Service MongoDB`
- [ ] Leave it running (required for backend)

**✅ Choose Option A or B - One is enough!**

---

## ⚙️ Step 2: Backend Installation

In PowerShell, navigate to backend:
```powershell
cd c:\Users\Hi\Downloads\hostel-booking-system\backend
```

- [ ] Run: `npm install`
- [ ] Wait for installation (1-2 minutes)
- [ ] See message: "audited 123 packages"
- [ ] Check: `package-lock.json` created

**✅ Backend dependencies installed!**

---

## 🚀 Step 3: Start Backend

Still in backend folder:

```powershell
npm run dev
```

**Expected Output:**
```
✅ MongoDB Connected
✅ Rooms seeded
✅ Bookings seeded
✅ Blog posts seeded
✅ Offers seeded
🚀 Server running on http://localhost:5000
```

- [ ] See "MongoDB Connected" message
- [ ] See "Server running on http://localhost:5000"
- [ ] No error messages
- [ ] **Don't close this window!** Keep it running

---

## 🌐 Step 4: Start Frontend (New PowerShell Window)

Open a NEW PowerShell window and navigate to project root:
```powershell
cd c:\Users\Hi\Downloads\hostel-booking-system
npm run dev
```

**Expected Output:**
```
> next dev
ready - started server on 0.0.0.0:3000
```

- [ ] See "ready - started server on 0.0.0.0:3000"
- [ ] No error messages
- [ ] **Keep this window open too!**

---

## 🔍 Step 5: Verify Everything

### Test Backend Health
In PowerShell:
```powershell
Invoke-RestMethod http://localhost:5000/api/health
```

**Expected Output:**
```
status
------
Server is running
```

- [ ] See "Server is running" response
- [ ] Backend is working ✅

### Test Frontend
Open Browser: `http://localhost:3000`

- [ ] Page loads without errors
- [ ] Navigation works
- [ ] Home page displays

### Test Admin Panel
Open Browser: `http://localhost:3000/admin`

- [ ] Admin page loads
- [ ] Rooms tab shows 3 rooms:
  - [ ] Mountain View Dorm
  - [ ] Private Cottage
  - [ ] Luxury Suite
- [ ] Bookings tab shows 1 booking
- [ ] Blog tab shows 2 posts
- [ ] Offers tab shows 2 offers

**✅ Everything is working!**

---

## 🧪 Step 6: Test Operations

### Test 1: Add a Room
- [ ] Go to Admin → Rooms tab
- [ ] Click "Add Room"
- [ ] Fill form:
  - Name: "Garden View Dorm"
  - Type: "dorm"
  - Capacity: 4
  - Price: 600
  - Amenities: "WiFi, Garden View"
- [ ] Click "Add Room"
- [ ] New room appears in list ✅
- [ ] Refresh browser (F5)
- [ ] Room still there ✅

### Test 2: Edit a Room
- [ ] Click edit icon on any room
- [ ] Change price from 500 → 550
- [ ] Click "Update Room"
- [ ] Price updates in list ✅

### Test 3: Delete a Room
- [ ] Click delete icon on a room
- [ ] Confirm deletion
- [ ] Room is gone ✅

### Test 4: Add a Booking
- [ ] Go to Bookings tab
- [ ] Click "Add Booking"
- [ ] Fill form with test data
- [ ] Click "Add Booking"
- [ ] Booking appears in list ✅
- [ ] Refresh page
- [ ] Still there ✅

### Test 5: Create Blog Post
- [ ] Go to Blog tab
- [ ] Click "Create Post"
- [ ] Fill form with test data
- [ ] Click "Publish"
- [ ] Post appears ✅

### Test 6: Create Offer
- [ ] Go to Offers tab
- [ ] Click "Add Offer"
- [ ] Fill form with test data
- [ ] Click "Save"
- [ ] Offer appears ✅

**✅ All operations working!**

---

## 💾 Step 7: Verify Data Persistence

### Test Refresh
- [ ] Go to Admin
- [ ] Add something new
- [ ] Refresh page (F5)
- [ ] New item still there ✅

### Test Restart Backend
- [ ] Stop backend (Ctrl+C in backend window)
- [ ] Wait 2 seconds
- [ ] Start backend again: `npm run dev`
- [ ] Refresh browser
- [ ] All data still there ✅

**✅ Data is persistent!**

---

## 📊 Step 8: View Database

Open new PowerShell:
```powershell
mongosh
use hostel-booking
db.rooms.find().pretty()
exit
```

- [ ] MongoDB connects
- [ ] See rooms collection
- [ ] Shows your added rooms
- [ ] Database is populated ✅

---

## 🎉 FINAL CHECKLIST

- [ ] MongoDB installed or connected (Atlas)
- [ ] Backend dependencies installed
- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 3000)
- [ ] Admin panel loads
- [ ] Database data visible in admin
- [ ] Can add rooms ✅
- [ ] Can edit rooms ✅
- [ ] Can delete rooms ✅
- [ ] Can add bookings ✅
- [ ] Can add blog posts ✅
- [ ] Can add offers ✅
- [ ] Data persists after refresh ✅
- [ ] Data persists after restart ✅
- [ ] MongoDB contains data ✅

---

## 🚨 If Something Failed

**Backend won't start?**
- [ ] Check MongoDB is running: `net start MongoDB`
- [ ] Check MONGODB_URI in backend/.env is correct
- [ ] Check port 5000 is free

**Admin panel shows empty?**
- [ ] Wait 5 seconds for seeding
- [ ] Refresh browser (Ctrl+R)
- [ ] Check backend terminal for errors

**CORS Error?**
- [ ] Check backend/.env has: `CORS_ORIGIN=http://localhost:3000`
- [ ] Restart backend

**Data won't save?**
- [ ] Check MongoDB is running
- [ ] Check backend shows no errors
- [ ] Try restarting both servers

---

## 📚 Need Help?

1. **Quick Issues** → Check **START_HERE.md**
2. **Step-by-Step** → Check **SETUP_BACKEND.md**
3. **Full Details** → Check **INTEGRATION_GUIDE.md**
4. **Architecture** → Check **BACKEND_COMPLETE.md**

---

## ✨ Success!

If all checkboxes are ticked, you have:

✅ Working Node.js backend
✅ Connected MongoDB database
✅ Persistent data storage
✅ Functional admin panel
✅ All CRUD operations working
✅ Production-ready system

**You're done!** 🎉

Now you can:
- Manage rooms
- Manage bookings
- Create blog posts
- Create promotional offers
- All data persists to database

**Happy managing!** 🏔️
