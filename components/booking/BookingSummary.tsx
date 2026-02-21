'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash, ChevronUp, ChevronDown } from 'lucide-react'

interface Offer {
  id: string
  title: string
  discount: number
  offerType: 'all' | 'room_specific' | 'duration'
  applicableRooms: string[]
  minDays: number
}

interface BookingSummaryProps {
  checkInDate: string
  checkOutDate: string
  selectedRooms: Array<{ id: string; name: string; price: number; quantity: number }>
  activeOffers?: Offer[]
  onContinue?: () => void
  showButton?: boolean
}

export default function BookingSummary({
  checkInDate,
  checkOutDate,
  selectedRooms,
  activeOffers = [],
  onContinue,
  showButton = false
}: BookingSummaryProps) {
  const nightsCount = Math.max(1, Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)))

  // Calculate Base Price
  const roomsTotal = selectedRooms.reduce((total, room) => total + (room.price * room.quantity * nightsCount), 0)

  // Calculate Discounts
  let totalDiscount = 0
  const appliedOffers: { title: string; discountAmount: number }[] = []

  selectedRooms.forEach(room => {
    let roomDiscountPercentage = 0;
    let applicableOfferTitle = '';

    // 1. Duration-based offer
    const durationOffers = activeOffers.filter(o => o.offerType === 'duration' && nightsCount >= o.minDays)
    const bestDurationOffer = durationOffers.sort((a, b) => b.discount - a.discount)[0]

    // 2. Room-specific offer
    const roomOffers = activeOffers.filter(o => o.offerType === 'room_specific' && o.applicableRooms.includes(room.id))
    const bestRoomOffer = roomOffers.sort((a, b) => b.discount - a.discount)[0]

    // 3. All rooms offer
    const allOffers = activeOffers.filter(o => o.offerType === 'all')
    const bestAllOffer = allOffers.sort((a, b) => b.discount - a.discount)[0]

    // Find the highest applicable discount for THIS room
    if (bestDurationOffer && bestDurationOffer.discount > roomDiscountPercentage) {
      roomDiscountPercentage = bestDurationOffer.discount
      applicableOfferTitle = bestDurationOffer.title
    }
    if (bestRoomOffer && bestRoomOffer.discount > roomDiscountPercentage) {
      roomDiscountPercentage = bestRoomOffer.discount
      applicableOfferTitle = bestRoomOffer.title
    }
    if (bestAllOffer && bestAllOffer.discount > roomDiscountPercentage) {
      roomDiscountPercentage = bestAllOffer.discount
      applicableOfferTitle = bestAllOffer.title
    }

    if (roomDiscountPercentage > 0) {
      const roomBaseTotal = room.price * room.quantity * nightsCount
      const discountAmount = Math.round(roomBaseTotal * (roomDiscountPercentage / 100))
      totalDiscount += discountAmount

      // Just keep track of offers used to show in UI
      if (!appliedOffers.find(o => o.title === applicableOfferTitle)) {
        appliedOffers.push({ title: applicableOfferTitle, discountAmount: discountAmount })
      } else {
        const existing = appliedOffers.find(o => o.title === applicableOfferTitle)!
        existing.discountAmount += discountAmount
      }
    }
  })

  const discountedTotal = roomsTotal - totalDiscount
  const taxAmount = Math.round(discountedTotal * 0.12) // 12% tax on discounted amount
  const grandTotal = discountedTotal + taxAmount

  return (
    <Card className="p-0 border-0 shadow-lg bg-card rounded-xl overflow-hidden gap-0">
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground">Booking <span className="text-primary">Summary</span></h3>

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
          {totalDiscount > 0 && (
            <>
              <div className="flex justify-between text-sm text-green-600 font-medium pb-2">
                <span>Subtotal</span>
                <span>₹{roomsTotal}</span>
              </div>
              {appliedOffers.map((offer, idx) => (
                <div key={idx} className="flex justify-between text-sm text-green-600">
                  <span>Offer: {offer.title}</span>
                  <span>-₹{offer.discountAmount}</span>
                </div>
              ))}
              <div className="border-t border-dotted border-border/60 my-2"></div>
            </>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (12%)</span>
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
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-lg text-lg shadow-md transition-all active:scale-[0.98]"
          >
            Book now
          </Button>
        </div>
      )}
    </Card>
  )
}
