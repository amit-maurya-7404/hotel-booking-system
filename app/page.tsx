'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/home/HeroSection'
import BookingFlow from '@/components/BookingFlow'
import DealsSection from '@/components/home/DealsSection'
import CreateWithUsSection from '@/components/home/CreateWithUsSection'
import EventsAndActivities from '@/components/home/EventsAndActivities'
import FeaturedBlogSection from '@/components/home/FeaturedBlogSection'
import FeaturedPostsSection from '@/components/home/FeaturedPostsSection'
import QuotesSection from '@/components/home/QuotesSection'
import MediaMentions from '@/components/home/MediaMentions'
import Footer from '@/components/Footer'

export default function Home() {
  const [showBooking, setShowBooking] = useState(false)
  const [bookingDates, setBookingDates] = useState({ checkIn: '', checkOut: '' })

  const handleExplore = (checkInDate: string, checkOutDate: string) => {
    setBookingDates({ checkIn: checkInDate, checkOut: checkOutDate })
    setShowBooking(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {showBooking ? (
        <BookingFlow onClose={() => setShowBooking(false)} checkInDate={bookingDates.checkIn} checkOutDate={bookingDates.checkOut} />
      ) : (
        <>
          <HeroSection onExplore={handleExplore} />
          {/* <DealsSection /> */}
          {/* <CreateWithUsSection /> */}
          <EventsAndActivities />
          <FeaturedBlogSection />
          <FeaturedPostsSection />
          <QuotesSection />
          {/* <MediaMentions /> */}
          <Footer />
        </>
      )}
    </main>
  )
}
