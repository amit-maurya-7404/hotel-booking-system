'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Minus } from 'lucide-react'

interface Room {
  id: string
  name: string
  type: 'dorm' | 'private'
  capacity: number
  price: number
  description: string
  amenities: string[]
  image: string
}

interface RoomSelectionProps {
  checkInDate: string
  checkOutDate: string
  onNext: (rooms: Array<{ id: string; name: string; price: number; quantity: number }>) => void
  onBack: () => void
}

const ROOMS: Room[] = [
  {
    id: '1',
    name: '4 Bed Mixed Dorm',
    type: 'dorm',
    capacity: 4,
    price: 599,
    description: 'A bed in a mixed dormitory with shared en-suite washroom and a shared balcony with valley views.',
    amenities: ['WiFi', 'Lockers', 'Shared Kitchen', 'Hot Water', 'Mountain View', 'Common Area'],
    image: '🏔️',
  },
  {
    id: '2',
    name: 'Premium Room',
    type: 'private',
    capacity: 2,
    price: 2499,
    description: 'En-suite luxe room with wooden decor, double bed, 360° valley view, and private balcony.',
    amenities: ['WiFi', 'Private Bathroom', 'AC', 'Hot Water', '360° View', 'Balcony', 'TV'],
    image: '🛏️',
  },
  {
    id: '3',
    name: '6 Bed Female Dorm',
    type: 'dorm',
    capacity: 6,
    price: 899,
    description: 'A bed in a female-only dormitory with private lockers and a shared en-suite washroom.',
    amenities: ['WiFi', 'Lockers', 'Shared Kitchen', 'Hot Water', 'Safety', 'Common Area'],
    image: '👭',
  },
]

export default function RoomSelection({ checkInDate, checkOutDate, onNext, onBack }: RoomSelectionProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const updateQuantity = (roomId: string, quantity: number) => {
    if (quantity < 0) return
    if (quantity === 0) {
      const { [roomId]: _, ...rest } = quantities
      setQuantities(rest)
    } else {
      setQuantities({ ...quantities, [roomId]: quantity })
    }
  }

  const handleSubmit = () => {
    const selectedRooms = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([roomId, quantity]) => {
        const room = ROOMS.find(r => r.id === roomId)!
        return {
          id: roomId,
          name: room.name,
          price: room.price,
          quantity,
        }
      })

    if (selectedRooms.length > 0) {
      onNext(selectedRooms)
    }
  }

  const nightsCount = Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-1 gap-6">
        {ROOMS.map((room) => (
          <Card key={room.id} className="overflow-hidden border border-border">
            <div className="flex flex-col md:flex-row gap-6 p-6">
              <div className="flex-shrink-0 w-full md:w-48 h-48 bg-muted rounded-lg flex items-center justify-center text-6xl">
                {room.image}
              </div>

              <div className="flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{room.name}</h3>
                    <p className="text-sm text-foreground/60 mt-1">👥 x{room.capacity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">₹{room.price}</p>
                    <p className="text-xs text-foreground/60">/night</p>
                  </div>
                </div>

                <p className="text-foreground/80 mb-4">{room.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {room.amenities.map((amenity) => (
                    <span key={amenity} className="text-xs bg-muted px-3 py-1 rounded-full text-foreground/70">
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">Quantity:</span>
                    <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(room.id, (quantities[room.id] || 0) - 1)}
                        className="p-2 hover:bg-background rounded transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{quantities[room.id] || 0}</span>
                      <button
                        onClick={() => updateQuantity(room.id, (quantities[room.id] || 0) + 1)}
                        className="p-2 hover:bg-background rounded transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {quantities[room.id] && (
                    <div className="text-right">
                      <p className="text-sm text-foreground/70">Total for {nightsCount} night{nightsCount > 1 ? 's' : ''}:</p>
                      <p className="text-xl font-bold text-primary">₹{room.price * quantities[room.id] * nightsCount}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
          Back
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={Object.values(quantities).every(q => q === 0)}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Checkout
        </Button>
      </div>
    </div>
  )
}
