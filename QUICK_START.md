# 🎯 Quick Reference Guide

## 🚀 Start the Project
```bash
cd c:\Users\Hi\Downloads\hostel-booking-system
npm run dev
```
👉 Open: **http://localhost:3000**

---

## 📍 Page URLs

| Page | URL | Features |
|------|-----|----------|
| Home | `/` | Bookings, deals, activities, blog, quotes |
| About | `/about` | Story, values, team, vision |
| Activities | `/activities` | 8 activities, interactive details |
| Contact | `/contact` | Contact form, info, FAQs |
| Blog | `/blog` | Posts, categories, details |
| Admin | `/admin` | Full management dashboard |

---

## 🛠️ Admin Dashboard Features

### 1️⃣ Rooms Management (`/admin` → Rooms)
- ✅ Add rooms (Dorm/Private)
- ✅ Edit room details
- ✅ Delete rooms
- ✅ View capacity, price, amenities

### 2️⃣ Bookings Management (`/admin` → Bookings)
- ✅ View all bookings
- ✅ Filter by status
- ✅ Update booking status
- ✅ Contact guest info

### 3️⃣ Pricing Management (`/admin` → Pricing)
- ✅ Update room prices
- ✅ Set weekday/weekend pricing
- ✅ Configure discounts

### 4️⃣ Offers Management (`/admin` → Offers) ⭐ NEW
- ✅ Create promo codes
- ✅ Set discount % and dates
- ✅ Edit/delete offers
- ✅ View active status

### 5️⃣ Blog Management (`/admin` → Blog)
- ✅ Create blog posts
- ✅ Edit posts
- ✅ Delete posts
- ✅ Save as draft/publish

---

## 🎨 Add Your Logo

1. Prepare logo image (PNG, 256x256px or larger)
2. Place in `public/` folder as `logo.png`
3. Logo appears in header automatically
4. Click logo to return to home page

---

## 📊 Sample Data Included

### Rooms (3)
- Mixed Dorm - 4 guests, ₹400/night
- Premium Double - 2 guests, ₹1200/night
- Female Dorm - 6 guests, ₹450/night

### Offers (2)
- Early Bird 15% (Jan-Mar)
- Weekly 20% (Jan-Dec)

### Blog Posts (6)
All with categories and emojis

### Activities (8)
From trekking to bonfire parties

---

## 🔗 Navigation Structure

```
Header
├── 🏠 Logo (click → home)
├── About
├── Activities
├── Blog
├── Contact
├── Admin
└── WhatsApp Button

Footer
├── Company Links
└── Info
```

---

## 💡 Admin Usage Tips

### ➕ Add a Room
1. Click "Add Room"
2. Fill details
3. Set amenities (comma-separated)
4. Click "Add Room"

### 📝 Create Blog Post
1. Click "New Post"
2. Fill title, author, content
3. Set category & emoji
4. Publish or save as draft

### 🎁 Create Offer
1. Click "Add Offer"
2. Set code, discount %, dates
3. Click "Create Offer"

---

## ⚡ Key Files to Know

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page |
| `components/Header.tsx` | Navigation + logo |
| `app/admin/page.tsx` | Admin dashboard |
| `components/admin/*` | Admin management pages |
| `public/logo.png` | Your logo (add here) |

---

## 🏗️ Build for Production

```bash
npm run build
npm run start
```

---

## ✨ Features Summary

✅ Fully functional hostel booking system
✅ 5 public pages + admin dashboard
✅ Logo navigation (click to home)
✅ Room management
✅ Booking tracker
✅ Pricing controls
✅ **Offers & Promotions** ⭐
✅ Blog posts editor
✅ Sample data included
✅ Responsive design
✅ Modern UI

---

## 📞 Need Help?

1. Check `README.md` for detailed docs
2. Check `PROJECT_SETUP.md` for setup details
3. Browse component code for customization

---

**Status**: ✅ **READY TO USE**

The entire system is set up and running!
Just add your logo and start using it.

Happy Booking! 🏔️
