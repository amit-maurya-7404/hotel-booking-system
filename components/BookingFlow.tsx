'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import RoomSelection from '@/components/booking/RoomSelection'
import BookingSummary from '@/components/booking/BookingSummary'
import CheckoutForm from '@/components/booking/CheckoutForm'
import { DateRangePicker } from '@/components/booking/DateRangePicker'
import { X, Loader } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'

interface BookingFlowProps {
  onClose: () => void
  checkInDate: string
  checkOutDate: string
}

interface Room {
  id: string
  name: string
  type: 'dorm' | 'private'
  capacity: number
  price: number
  description?: string
  amenities: string[]
  available: boolean
  images?: string[]
}

interface Offer {
  id: string
  title: string
  description: string
  discount: number
  validFrom: string
  validTo: string
  code: string
  offerType: 'all' | 'room_specific' | 'duration'
  applicableRooms: string[]
  minDays: number
  active?: boolean
}

const API_URL = 'http://localhost:5000/api'

export default function BookingFlow({ onClose, checkInDate, checkOutDate }: BookingFlowProps) {
  const [step, setStep] = useState<'rooms' | 'checkout'>('rooms')

  // State lifted from RoomSelection
  const [rooms, setRooms] = useState<Room[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  // Date state
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(checkInDate),
    to: new Date(checkOutDate),
  })

  const fetchRoomsAndOffers = async () => {
    try {
      setLoading(true)
      setError(null)
      const [roomsRes, offersRes] = await Promise.all([
        fetch(`${API_URL}/rooms`),
        fetch(`${API_URL}/offers`)
      ])

      if (!roomsRes.ok) throw new Error('Failed to fetch rooms')
      if (!offersRes.ok) throw new Error('Failed to fetch offers')

      const roomsData = await roomsRes.json()
      const offersData = await offersRes.json()

      setRooms(roomsData.filter((room: Room) => room.available))

      // Only keep active offers
      const now = new Date();
      setOffers(offersData.filter((offer: Offer) => {
        return offer.active !== false &&
          new Date(offer.validFrom) <= now &&
          new Date(offer.validTo) >= now
      }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching data'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoomsAndOffers()
  }, [])

  const updateQuantity = (roomId: string, quantity: number) => {
    if (quantity < 0) return
    const room = rooms.find(r => r.id === roomId)
    // Optional: Add max quantity check based on availability if needed

    if (quantity === 0) {
      const { [roomId]: _, ...rest } = quantities
      setQuantities(rest)
    } else {
      setQuantities({ ...quantities, [roomId]: quantity })
    }
  }

  const handleContinueToCheckout = () => {
    setStep('checkout')
  }

  const handleBackToRooms = () => {
    setStep('rooms')
  }

  // Derived state for summary/checkout
  const selectedRoomsList = Object.entries(quantities)
    .filter(([_, qty]) => qty > 0)
    .map(([roomId, quantity]) => {
      const room = rooms.find(r => r.id === roomId)!
      return {
        id: roomId,
        name: room.name,
        price: room.price,
        quantity,
      }
    })

  return (
    <div className="z-40 flex items-center justify-center overflow-y-auto py-8">
      <button
        onClick={onClose}
        className="fixed top-24 right-4 z-50 p-2 bg-background/80 backdrop-blur-sm hover:bg-muted rounded-full shadow-sm transition border border-border"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
        {step === 'rooms' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Book your stay</h2>
                  <p className="text-foreground/70">Select from a range of beautiful rooms</p>
                </div>
                <DateRangePicker date={date} setDate={setDate} />
              </div>

              {loading ? (
                <div className="flex items-center justify-center p-12">
                  <Loader className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center p-12 text-red-500">
                  {error}
                  <Button onClick={fetchRoomsAndOffers} variant="outline" className="ml-4">Retry</Button>
                </div>
              ) : (
                <RoomSelection
                  rooms={rooms}
                  quantities={quantities}
                  activeOffers={offers}
                  onQuantityChange={updateQuantity}
                />
              )}
            </div>

            <div className="hidden lg:block">
              {/* Sticky sidebar placeholder - enables sticky behavior */}
              <div className="sticky top-8">
                <BookingSummary
                  checkInDate={date?.from?.toISOString() || checkInDate}
                  checkOutDate={date?.to?.toISOString() || checkOutDate}
                  selectedRooms={selectedRoomsList}
                  activeOffers={offers}
                  onContinue={handleContinueToCheckout}
                  showButton={true}
                />
              </div>
            </div>

            {/* Mobile Summary (bottom fixed or inline? Inline for now to handle complexity) */}
            <div className="lg:hidden">
              <BookingSummary
                checkInDate={date?.from?.toISOString() || checkInDate}
                checkOutDate={date?.to?.toISOString() || checkOutDate}
                selectedRooms={selectedRoomsList}
                activeOffers={offers}
                onContinue={handleContinueToCheckout}
                showButton={true}
              />
            </div>
          </div>
        )}

        {step === 'checkout' && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <CheckoutForm
                checkInDate={date?.from?.toISOString() || checkInDate}
                checkOutDate={date?.to?.toISOString() || checkOutDate}
                selectedRooms={selectedRoomsList}
                activeOffers={offers}
                onBack={handleBackToRooms}
              />
            </div>
            <div>
              <div className="sticky top-8">
                <BookingSummary
                  checkInDate={date?.from?.toISOString() || checkInDate}
                  checkOutDate={date?.to?.toISOString() || checkOutDate}
                  selectedRooms={selectedRoomsList}
                  activeOffers={offers}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
