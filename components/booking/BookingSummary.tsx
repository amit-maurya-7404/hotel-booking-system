'use client'

import { Card } from '@/components/ui/card'

interface BookingSummaryProps {
  checkInDate: string
  checkOutDate: string
  selectedRooms: Array<{ id: string; name: string; price: number; quantity: number }>
}

export default function BookingSummary({ checkInDate, checkOutDate, selectedRooms }: BookingSummaryProps) {
  const nightsCount = Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))
  
  const roomsTotal = selectedRooms.reduce((total, room) => total + (room.price * room.quantity * nightsCount), 0)
  const taxAmount = Math.round(roomsTotal * 0.12) // 12% tax
  const grandTotal = roomsTotal + taxAmount

  return (
    <Card className="p-6 sticky top-8 h-fit">
      <h3 className="text-xl font-bold text-foreground mb-6">Booking Summary</h3>

      <div className="space-y-4 mb-6 pb-6 border-b border-border">
        {selectedRooms.map((room) => (
          <div key={room.id} className="flex justify-between items-start">
            <div>
              <p className="font-medium text-foreground">{room.name}</p>
              <p className="text-xs text-foreground/60">₹{room.price} × {room.quantity} × {nightsCount} night{nightsCount > 1 ? 's' : ''}</p>
            </div>
            <p className="font-semibold text-foreground">₹{room.price * room.quantity * nightsCount}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-foreground">
          <span>Subtotal</span>
          <span>₹{roomsTotal}</span>
        </div>
        <div className="flex justify-between text-foreground">
          <span>Tax (12%)</span>
          <span>₹{taxAmount}</span>
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-foreground">Total (incl. tax)</span>
          <span className="text-2xl font-bold text-primary">₹{grandTotal}</span>
        </div>
        <p className="text-xs text-foreground/60 text-center">
          {new Date(checkInDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {new Date(checkOutDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </Card>
  )
}
