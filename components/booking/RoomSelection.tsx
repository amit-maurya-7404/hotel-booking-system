'use client'

import { Card } from '@/components/ui/card'
import { Plus, Minus, User, Wifi, Coffee, Key, Tv } from 'lucide-react'
import Image from 'next/image'

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

interface RoomSelectionProps {
  rooms: Room[]
  quantities: Record<string, number>
  onQuantityChange: (roomId: string, quantity: number) => void
}

const ROOM_EMOJIS: Record<string, string> = {
  dorm: '🏔️',
  private: '🛏️',
}

const AMENITY_ICONS: Record<string, any> = {
  wifi: Wifi,
  breakfast: Coffee,
  locker: Key,
  tv: Tv,
}

export default function RoomSelection({ rooms, quantities, onQuantityChange }: RoomSelectionProps) {
  if (rooms.length === 0) {
    return (
      <div className="text-center p-12 bg-muted/50 rounded-lg">
        <p className="text-foreground/60 mb-4">No rooms available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {rooms.map((room) => (
        <Card key={room.id} className="overflow-hidden py-0 border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="grid md:grid-cols-3 gap-0">
            {/* Image Section */}
            <div className="md:col-span-1 h-64 md:h-auto bg-muted relative">
              {room.images && room.images.length > 0 ? (
                <div className="relative w-full h-full min-h-[200px]">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  {ROOM_EMOJIS[room.type] || '🏠'}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="md:col-span-2 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-foreground">{room.name}</h3>
                  <div className="text-right">
                    <span className="text-xl font-bold text-foreground">₹{room.price}</span>
                    <span className="text-sm text-muted-foreground"> /night</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <User className="w-4 h-4" />
                  <span>x{room.capacity}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                  {room.description || 'A comfortable room for your stay.'}
                </p>

                {room.amenities && room.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-4 mb-6">
                    {room.amenities.slice(0, 8).map(amenity => {
                      const Icon = AMENITY_ICONS[amenity.toLowerCase()]
                      return (
                        <div key={amenity} className="flex items-center gap-1.5 text-xs text-muted-foreground" title={amenity}>
                          {Icon ? <Icon className="w-3.5 h-3.5" /> : null}
                          {/* Optionally show text only on hover or keep it compact */}
                        </div>
                      )
                    })}
                    {/* Using generic icons for sample visualization roughly matching the screenshot icons row */}
                    <div className="flex gap-3 text-muted-foreground/60">
                      <Key className="w-4 h-4" />
                      <Wifi className="w-4 h-4" />
                      <Tv className="w-4 h-4" />
                      <Coffee className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <button className="text-sm text-primary font-medium hover:underline">
                  Availability calendar ⌄
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-primary rounded-md overflow-hidden">
                    <button
                      onClick={() => onQuantityChange(room.id, (quantities[room.id] || 0) - 1)}
                      className="p-2 h-9 w-9 flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition disabled:opacity-50"
                      disabled={!quantities[room.id]}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="bg-background h-9 w-12 flex items-center justify-center border-y border-primary">
                      <span className="font-medium">{quantities[room.id] || 0}</span>
                    </div>
                    <button
                      onClick={() => onQuantityChange(room.id, (quantities[room.id] || 0) + 1)}
                      className="p-2 h-9 w-9 flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
