'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface HeroSectionProps {
  onExplore: (checkInDate: string, checkOutDate: string) => void
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  const [checkInDate, setCheckInDate] = useState('2024-03-14')
  const [checkOutDate, setCheckOutDate] = useState('2024-03-15')

  const handleExplore = () => {
    if (checkInDate && checkOutDate) {
      onExplore(checkInDate, checkOutDate)
    }
  }

  return (
    <section
      className="relative min-h-[80vh] pt-8 pb-12"
      style={{
        backgroundImage: "url('/mountain_bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* overlay to ensure text readable over image */}
      <div className="absolute inset-0" aria-hidden="true" />

      <div className="relative container mx-auto px-4">
        {/* Top Right Booking Box (pulled up) */}
        <div className="mt-8 mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">You Deserve This Break</h1>
          <Card className="w-full p-8 shadow-md border-border">

            <div className="flex flex-col sm:flex-row gap-5 w-full">
              <div className="grow">
                <label className="text-xs font-bold text-foreground block mb-2 uppercase">Accommodation Type</label>
                <Input placeholder="Select Accommodation Type" />
              </div>

              <div className="grow">
                <div className="flex items-center justify-between text-xs font-bold text-foreground uppercase">
                  <span>Check In</span>
                  <span>Check Out</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Input
                    type="date"
                    className="px-3 py-2 text-xs"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                  />
                  <span className="text-lg text-muted-foreground">→</span>
                  <Input
                    type="date"
                    className="px-3 py-2 text-xs"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate}
                  />
                </div>
              </div>

            </div>
            <div>
              <Button
                onClick={handleExplore}
                className="w-full bg-primary hover:bg-orange-600 text-white py-2 font-bold text-sm uppercase"
              >
                Explore
              </Button>
            </div>
          </Card>
        </div>

        {/* Main Hero Content - Left aligned (pulled up for less top gap) */}
        {/* <div className="max-w-2xl space-y-8 text-white -mt-2 lg:-mt-70">
          <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            <div className="text-foreground">THE</div>
            <div className="text-foreground">HIDEOUT</div>
            <div className="text-primary">HIRAETH</div>
          </h1>

          <p className="text-base lg:text-lg  text-white leading-relaxed max-w-lg">
            is an offbeat and peaceful hostel-cum-homestay; a concept of accommodation tailor-made for backpackers and open-minded travellers who are ready for raw & unfiltered experiences of travelling in mountains.
          </p>
        </div> */}
      </div>
    </section>
  )
}
