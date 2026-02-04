'use client'

import { useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import RoomsManagement from '@/components/admin/RoomsManagement'
import BookingsManagement from '@/components/admin/BookingsManagement'
import PricingManagement from '@/components/admin/PricingManagement'
import BlogPostsManagement from '@/components/admin/BlogPostsManagement'
import OffersManagement from '@/components/admin/OffersManagement'

type AdminTab = 'overview' | 'rooms' | 'bookings' | 'pricing' | 'offers' | 'blog'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 overflow-auto p-8">
          {activeTab === 'overview' && (
            <OverviewTab />
          )}
          {activeTab === 'rooms' && (
            <RoomsManagement />
          )}
          {activeTab === 'bookings' && (
            <BookingsManagement />
          )}
          {activeTab === 'pricing' && (
            <PricingManagement />
          )}
          {activeTab === 'offers' && (
            <OffersManagement />
          )}
          {activeTab === 'blog' && (
            <BlogPostsManagement />
          )}
        </main>
      </div>
    </div>
  )
}

function OverviewTab() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-foreground/70 mt-2">Welcome to The Hideout Hiraeth Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Bookings" value="24" icon="📅" />
        <StatCard label="Available Rooms" value="4" icon="🛏️" />
        <StatCard label="Occupancy Rate" value="75%" icon="📊" />
        <StatCard label="Total Revenue" value="₹1,49,875" icon="💰" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Recent Bookings</h2>
            <div className="space-y-4">
              {[
                { name: 'Rahul Kumar', room: 'Premium Room', date: 'Jan 20-22' },
                { name: 'Priya Singh', room: 'Mixed Dorm', date: 'Jan 21-23' },
                { name: 'John Smith', room: 'Female Dorm', date: 'Jan 22-24' },
              ].map((booking, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-semibold text-foreground">{booking.name}</p>
                    <p className="text-sm text-foreground/60">{booking.room}</p>
                  </div>
                  <span className="text-sm bg-muted px-3 py-1 rounded text-foreground/70">{booking.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-medium text-sm">
              New Booking
            </button>
            <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition font-medium text-sm">
              Update Pricing
            </button>
            <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition font-medium text-sm text-foreground">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground/70 mb-1">{label}</p>
          <p className="text-3xl font-bold text-primary">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  )
}
