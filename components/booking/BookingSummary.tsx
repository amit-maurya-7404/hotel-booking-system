'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash, ChevronUp, ChevronDown } from 'lucide-react'

interface BookingSummaryProps {
  checkInDate: string
  checkOutDate: string
  selectedRooms: Array<{ id: string; name: string; price: number; quantity: number }>
  onContinue?: () => void
  showButton?: boolean
}

export default function BookingSummary({
  checkInDate,
  checkOutDate,
  selectedRooms,
  onContinue,
  showButton = false
}: BookingSummaryProps) {
  const nightsCount = Math.max(1, Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)))

  const roomsTotal = selectedRooms.reduce((total, room) => total + (room.price * room.quantity * nightsCount), 0)
  const taxAmount = Math.round(roomsTotal * 0.12) // 12% tax
  const grandTotal = roomsTotal + taxAmount

  return (
    <Card className="p-0 border-0 shadow-lg bg-card rounded-xl overflow-hidden gap-0">
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground">Booking <span className="text-orange-500">Summary</span></h3>

        <div className="text-sm text-foreground/80 mb-6 pb-4 border-b border-border/60">
          <p className="font-medium">{nightsCount} night{nightsCount !== 1 ? 's' : ''} starting from {new Date(checkInDate).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>

        <div className="space-y-4 mb-6">
          {selectedRooms.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No rooms selected</p>
          ) : (
            selectedRooms.map((room) => (
              <div key={room.id} className="text-sm">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-foreground">{room.name} <span className="text-muted-foreground font-normal">x {room.quantity}</span></span>
                  <button className="text-muted-foreground hover:text-red-500">
                    <Trash className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>₹{room.price} × {nightsCount} night{nightsCount !== 1 ? 's' : ''}</span>
                  <span className="font-medium text-foreground">₹{room.price * room.quantity * nightsCount}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-2 pt-4 border-t border-border/60">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-medium">₹{taxAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total (tax incl.)</span>
            <span className="font-bold">₹{grandTotal}</span>
          </div>
          <div className="flex justify-between text-sm pt-2">
            <span className="font-bold text-foreground">Payable Now</span>
            <span className="font-bold text-foreground">₹{grandTotal}</span>
          </div>
        </div>
      </div>

      {showButton && (
        <div className="p-4">
          <Button
            onClick={onContinue}
            disabled={selectedRooms.length === 0}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 rounded-lg text-lg shadow-md transition-all active:scale-[0.98]"
          >
            Book now
          </Button>
        </div>
      )}
    </Card>
  )
}
