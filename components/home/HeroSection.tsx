'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { DatePicker } from '@/components/booking/DatePicker'
import { format } from 'date-fns'

interface HeroSectionProps {
  onExplore: (checkInDate: string, checkOutDate: string) => void
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined)
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined)
  const [accommodationType, setAccommodationType] = useState<string>('all')

  const handleExplore = () => {
    if (checkInDate && checkOutDate) {
      const checkInStr = format(checkInDate, 'yyyy-MM-dd')
      const checkOutStr = format(checkOutDate, 'yyyy-MM-dd')
      onExplore(checkInStr, checkOutStr)
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

            <div className="flex flex-col md:flex-row gap-5 w-full">

              <div className="flex-1 w-full md:w-[40%]">
                <label className="text-xs font-bold text-foreground block mb-2 uppercase">Accommodation Type</label>
                <Select value={accommodationType} onValueChange={setAccommodationType}>
                  <SelectTrigger className="w-full bg-background h-10 cursor-pointer">
                    <SelectValue placeholder="Accommodation Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="dormitory">Dormitory Room</SelectItem>
                    <SelectItem value="private">Private Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 w-full md:w-[60%]">
                <div className="flex items-center justify-between text-xs font-bold text-foreground mb-2 uppercase">
                  <span>Check In</span>
                  <span>Check Out</span>
                </div>

                <div className="flex items-center gap-2 w-full text-sm">
                  <div className="flex-1 min-w-0">
                    <DatePicker
                      date={checkInDate}
                      setDate={setCheckInDate}
                      minDate={new Date()}
                      placeholder="Check In"
                      classname="w-full cursor-pointer"
                    />
                  </div>
                  <span className="text-lg text-muted-foreground shrink-0">→</span>
                  <div className="flex-1 min-w-0">
                    <DatePicker
                      date={checkOutDate}
                      setDate={setCheckOutDate}
                      minDate={checkInDate || new Date()}
                      placeholder="Check Out"
                      classname="w-full cursor-pointer"
                    />
                  </div>
                </div>
              </div>

            </div>
            <div>
              <Button
                onClick={handleExplore}
                className="w-full bg-primary hover:opacity-90 text-white py-2 font-bold text-sm uppercase cursor-pointer"
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
