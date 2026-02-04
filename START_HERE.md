# 🎯 QUICK START - Backend Setup (5 Minutes)

## What You Need to Do Right Now

### ✅ 1. Install MongoDB (Choose One)

**Fastest Option - MongoDB Atlas (No Installation):**
```
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Copy connection string
5. Update backend/.env:
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostel-booking
```

**Local Option - Windows:**
```powershell
choco install mongodb
net start MongoDB
```

---

### ✅ 2. Open Two PowerShell Windows

**Window 1 - Backend:**
```powershell
cd c:\Users\Hi\Downloads\hostel-booking-system\backend
npm run dev
```

**Window 2 - Frontend:**
```powershell
cd c:\Users\Hi\Downloads\hostel-booking-system
npm run dev
```

---

### ✅ 3. Open Browser

Go to: `http://localhost:3000/admin`

You should see:
- 3 rooms from database
- 1 booking from database
- 2 blog posts from database
- 2 offers from database

---

## ✨ What's Working Now

| Feature | Status |
|---------|--------|
| Add Room | ✅ Saves to MongoDB |
| Edit Room | ✅ Updates database |
| Delete Room | ✅ Removes from database |
| Add Booking | ✅ Saves to MongoDB |
| Update Booking Status | ✅ Updates database |
| Delete Booking | ✅ Removes from database |
| Create Blog Post | ✅ Saves to MongoDB |
| Edit Blog Post | ✅ Updates database |
| Delete Blog Post | ✅ Removes from database |
| Create Offer | ✅ Saves to MongoDB |
| Edit Offer | ✅ Updates database |
| Delete Offer | ✅ Removes from database |

---

## 🔍 Verify It Works

1. **Add a room** in admin panel
2. **Refresh page** (F5) - Room still there ✅
3. **Restart backend** - Data persists ✅

That's it! Your backend is working! 🚀

---

## 📊 What Was Created

```
✅ backend/server.js         - Express server
✅ backend/models/           - 4 MongoDB schemas
✅ backend/routes/           - 4 API modules
✅ context/AdminContext.tsx  - Updated to use APIs
✅ components/admin/         - Updated to use APIs
✅ Documentation             - 5 guide files
✅ .env config               - MongoDB settings
```

---

## 🆘 If Something Goes Wrong

### Backend won't start?
- Check MongoDB is running: `net start MongoDB`
- Check port 5000 is free: `netstat -ano | findstr :5000`

### Admin panel shows empty?
- Wait 5 seconds for database seeding
- Refresh browser (Ctrl+R)
- Check backend terminal for errors

### CORS Error?
- Ensure `CORS_ORIGIN=http://localhost:3000` in backend/.env
- Restart backend

---

## 📚 Read More

For detailed setup: **SETUP_BACKEND.md**
For integration details: **INTEGRATION_GUIDE.md**
For API reference: **BACKEND_SETUP.md**

---

That's all! Start the servers and you're done! 🎉
