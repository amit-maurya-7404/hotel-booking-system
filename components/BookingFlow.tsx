'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import RoomSelection from '@/components/booking/RoomSelection'
import BookingSummary from '@/components/booking/BookingSummary'
import CheckoutForm from '@/components/booking/CheckoutForm'
import { X } from 'lucide-react'

interface BookingFlowProps {
  onClose: () => void
  checkInDate: string
  checkOutDate: string
}

export default function BookingFlow({ onClose, checkInDate, checkOutDate }: BookingFlowProps) {
  const [step, setStep] = useState<'rooms' | 'checkout'>('rooms')
  const [selectedRooms, setSelectedRooms] = useState<Array<{ id: string; name: string; price: number; quantity: number }>>([])

  const handleRoomSelection = (rooms: typeof selectedRooms) => {
    setSelectedRooms(rooms)
    setStep('checkout')
  }

  const handleBackToRooms = () => {
    setStep('rooms')
    setSelectedRooms([])
  }

  const handleDateSelection = (dates: { checkInDate: string, checkOutDate: string }) => {
    // Implement date selection logic here
    setStep('rooms')
  }

  const handleBackToDates = () => {
    setStep('rooms')
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center overflow-y-auto py-8">
      <Card className="w-full max-w-4xl mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-muted rounded-lg transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Book your stay</h2>
          <p className="text-foreground/70 mb-8">Select from a range of beautiful rooms</p>

          {step === 'rooms' && (
            <>
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-foreground/70">Selected Dates</p>
                <p className="font-semibold text-foreground">
                  {new Date(checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → {new Date(checkOutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
              <RoomSelection 
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                onNext={handleRoomSelection}
                onBack={onClose}
              />
            </>
          )}

          {step === 'checkout' && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <CheckoutForm 
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  selectedRooms={selectedRooms}
                  onBack={handleBackToRooms}
                />
              </div>
              <div>
                <BookingSummary 
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  selectedRooms={selectedRooms}
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
