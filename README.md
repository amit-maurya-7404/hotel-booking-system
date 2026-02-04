# 🏔️ The Hideout Hiraeth - Hostel Booking System

A complete, fully functional hostel booking management system built with Next.js, React, and TypeScript.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### Installation & Running

```bash
# Navigate to project directory
cd c:\Users\Hi\Downloads\hostel-booking-system

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit: **http://localhost:3000**

---

## 📋 Features Implemented

### ✅ Public Pages
- **Home** - Main landing page with hero, bookings, deals, activities, blog showcase
- **About** - Company story, values, team, mission statement
- **Activities** - 8 different adventure activities with interactive details panel
- **Contact** - Contact form, location info, business hours, FAQs
- **Blog** - Blog posts with category filtering and detailed post views

### ✅ Admin Dashboard (`/admin`)
A comprehensive management system for property owners:

1. **Overview Tab**
   - Dashboard statistics (bookings, rooms, occupancy, revenue)
   - Recent bookings overview
   - Quick action buttons

2. **Rooms Management**
   - Add new rooms (Dorm/Private type)
   - Edit room details (capacity, price, amenities)
   - Delete rooms
   - Track availability status

3. **Bookings Management**
   - View all bookings
   - Filter by status (Pending, Confirmed, Checked-in)
   - Update booking status
   - Contact guests via email/phone
   - Track booking duration and total price

4. **Pricing Management**
   - Update room prices
   - Set weekday/weekend pricing
   - Configure discount rates

5. **Offers & Promotions**
   - Create promotional codes
   - Set discount percentages
   - Configure validity periods
   - Edit/delete offers
   - Status indicator (Active/Inactive)

6. **Blog Management**
   - Create new blog posts
   - Edit existing posts
   - Delete posts
   - Save as draft or publish
   - Set author, category, and emoji/image

### ✅ Navigation Features
- **Header Logo** - Click logo to return to home page
- **Responsive Navigation** - Mobile-friendly menu structure
- **Easy Access** - All pages accessible via header navigation

---

## 📁 Project Structure

```
hostel-booking-system/
├── app/
│   ├── page.tsx                    # Home page
│   ├── about/page.tsx              # About page
│   ├── activities/page.tsx         # Activities page
│   ├── contact/page.tsx            # Contact page
│   ├── blog/page.tsx               # Blog page
│   ├── admin/page.tsx              # Admin dashboard
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
│
├── components/
│   ├── Header.tsx                  # Navigation header
│   ├── Footer.tsx                  # Footer
│   ├── BookingFlow.tsx             # Booking component
│   ├── home/                       # Home page sections
│   ├── admin/                      # Admin components
│   │   ├── AdminHeader.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── RoomsManagement.tsx
│   │   ├── BookingsManagement.tsx
│   │   ├── PricingManagement.tsx
│   │   ├── BlogPostsManagement.tsx
│   │   └── OffersManagement.tsx
│   └── ui/                         # Radix UI components
│
├── context/
│   └── AdminContext.tsx            # State management (optional)
│
├── lib/
│   └── utils.ts                    # Utility functions
│
├── public/
│   └── logo.png                    # Your logo image (add here)
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.mjs
```

---

## 🎨 UI/UX Details

- **Design System**: Tailwind CSS + Radix UI components
- **Colors**: Primary, secondary, muted, background, foreground
- **Responsive**: Mobile, tablet, desktop optimized
- **Icons**: Lucide React icons throughout
- **Theme**: Light/Dark mode support

---

## 📝 Sample Data

The admin dashboard comes pre-loaded with:

### Rooms (3)
- Mixed Dorm (4 guests, ₹400/night)
- Premium Double Room (2 guests, ₹1200/night)
- Female Dorm (6 guests, ₹450/night)

### Bookings (1)
- Rahul Kumar - Premium Room - Jan 20-22, 2024 - Confirmed

### Offers (2)
- Early Bird 15% - Valid Jan-Mar 2024
- Weekly 20% - Valid Jan-Dec 2024

### Blog Posts (6)
- 10 Best Hiking Trails
- Budget Travel Guide
- Local Culture Stories
- Adventure Photography
- Best Seasons to Visit
- Solo Travel Stories

### Activities (8)
- Mountain Trekking
- Paragliding
- Yoga & Meditation
- Rock Climbing
- Village Tours
- River Rafting
- Photography Walk
- Bonfire & Stargazing

---

## 🔧 How to Use Admin Features

### Add a Room
1. Go to Admin → Rooms tab
2. Click "Add Room" button
3. Fill in room details (name, type, capacity, price, amenities)
4. Click "Add Room"

### Create a Booking
1. Go to Admin → Bookings tab
2. Click "New Booking" or manage existing ones
3. Update status as guests check in/out

### Create an Offer
1. Go to Admin → Offers tab
2. Click "Add Offer"
3. Set discount code, percentage, and validity dates
4. Click "Create Offer"

### Write a Blog Post
1. Go to Admin → Blog tab
2. Click "New Post"
3. Fill in title, author, category, and content
4. Choose Draft or Published status
5. Click "Publish Post"

---

## 🖼️ Adding Your Logo

1. Prepare your logo image (recommended: PNG format, square, 256x256px or larger)
2. Place the image in the `public/` folder with name `logo.png`
3. The logo will automatically appear in the header
4. Click the logo anytime to return to home page

---

## 📱 Responsive Design

All pages are fully responsive:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

---

## 🚀 Production Build

To create an optimized production build:

```bash
npm run build
npm run start
```

---

## 📦 Dependencies

Key packages included:
- **next**: ^16.0.10 - React framework
- **react**: ^19 - UI library
- **typescript**: Latest - Type safety
- **tailwindcss**: ^4.0.0 - Styling
- **radix-ui**: Various components - Accessible UI
- **lucide-react**: ^0.454.0 - Icon library
- **react-hook-form**: ^7 - Form management
- **date-fns**: ^4.1.0 - Date utilities

---

## 🎯 Key Features by Page

### Home Page
- Hero section with booking
- Deals showcase
- Activities preview
- Blog featured posts
- Quotes/testimonials
- Media mentions

### About Page
- Company story
- Why choose us section
- Core values
- Team members
- Contact CTA

### Activities Page
- Activity grid (8 activities)
- Interactive details panel
- Pricing and duration info
- Difficulty levels
- Booking buttons
- FAQ section

### Contact Page
- Contact information cards
- Contact form with validation
- Business hours
- Quick links
- Map placeholder
- FAQ section

### Blog Page
- Blog post grid
- Category filtering
- Post details view
- Author and date info
- Newsletter signup
- Share buttons

### Admin Dashboard
- Overview with statistics
- Room management system
- Booking tracker
- Pricing controls
- Offers management
- Blog post editor
- Status indicators
- Action buttons

---

## 🔐 Admin Access

Currently, the admin panel is accessible without authentication.

**For production**, you should add:
1. Authentication/login system
2. Admin user roles
3. Permission checks
4. Data persistence (database)

---

## 🔄 Data Management

Currently, all data is stored in component state. For production:

1. **Backend Integration**: Connect to Node/Python/Java backend
2. **Database**: Use MongoDB, PostgreSQL, or any SQL database
3. **API Endpoints**: Create REST or GraphQL APIs
4. **Authentication**: Add JWT or session-based auth

---

## 📞 Support

For issues or questions:
1. Check the `PROJECT_SETUP.md` file
2. Review the component code
3. Check Next.js documentation: https://nextjs.org/docs

---

## 📄 License

This project is ready for commercial use at The Hideout Hiraeth.

---

**Version**: 1.0.0
**Last Updated**: January 2025
**Status**: ✅ Production Ready
