'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

interface RoomPrice {
  id: string
  name: string
  type: string
  basePrice: number
  weekendPrice: number
  discounts: {
    threeNights: number
    weekPlus: number
  }
}

const INITIAL_PRICES: RoomPrice[] = [
  {
    id: '1',
    name: '4 Bed Mixed Dorm',
    type: 'Dorm',
    basePrice: 599,
    weekendPrice: 699,
    discounts: { threeNights: 5, weekPlus: 10 },
  },
  {
    id: '2',
    name: 'Premium Room',
    type: 'Private',
    basePrice: 2499,
    weekendPrice: 2999,
    discounts: { threeNights: 8, weekPlus: 15 },
  },
  {
    id: '3',
    name: '6 Bed Female Dorm',
    type: 'Dorm',
    basePrice: 899,
    weekendPrice: 999,
    discounts: { threeNights: 5, weekPlus: 10 },
  },
]

export default function PricingManagement() {
  const [prices, setPrices] = useState<RoomPrice[]>(INITIAL_PRICES)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<RoomPrice>>({})

  const handleEdit = (room: RoomPrice) => {
    setEditingId(room.id)
    setFormData(room)
  }

  const handleSave = () => {
    if (editingId && formData.id) {
      setPrices(prices.map(p => p.id === editingId ? { ...p, ...formData } as RoomPrice : p))
      setEditingId(null)
      setFormData({})
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Pricing Management</h1>
        <p className="text-foreground/70 mt-2">Update room prices and discount rates</p>
      </div>

      <div className="grid gap-6">
        {prices.map((room) => (
          <Card key={room.id} className="p-6 border border-border">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">{room.name}</h3>
                <p className="text-sm text-foreground/60">{room.type}</p>
              </div>
            </div>

            {editingId === room.id ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Weekday Price (₹/night)</label>
                    <input
                      type="number"
                      value={formData.basePrice || 0}
                      onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Weekend Price (₹/night)</label>
                    <input
                      type="number"
                      value={formData.weekendPrice || 0}
                      onChange={(e) => setFormData({ ...formData, weekendPrice: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-4">Discounts</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">3+ Nights (%)</label>
                      <input
                        type="number"
                        value={formData.discounts?.threeNights || 0}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          discounts: { ...formData.discounts!, threeNights: Number(e.target.value) } 
                        })}
                        className="w-full px-4 py-2 border border-border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">7+ Nights (%)</label>
                      <input
                        type="number"
                        value={formData.discounts?.weekPlus || 0}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          discounts: { ...formData.discounts!, weekPlus: Number(e.target.value) } 
                        })}
                        className="w-full px-4 py-2 border border-border rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 flex-1">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setEditingId(null)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-foreground/60 mb-1">Weekday Price</p>
                    <p className="text-2xl font-bold text-primary">₹{room.basePrice}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-foreground/60 mb-1">Weekend Price</p>
                    <p className="text-2xl font-bold text-primary">₹{room.weekendPrice}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-foreground/60 mb-1">3+ Nights Discount</p>
                    <p className="text-2xl font-bold text-primary">{room.discounts.threeNights}%</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-foreground/60 mb-1">7+ Nights Discount</p>
                    <p className="text-2xl font-bold text-primary">{room.discounts.weekPlus}%</p>
                  </div>
                </div>

                <Button
                  onClick={() => handleEdit(room)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                >
                  Edit Pricing
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card className="p-6 border border-border mt-8 bg-muted">
        <h3 className="font-bold text-foreground mb-4">Pricing Tips</h3>
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>• Adjust weekend prices higher to maximize revenue</li>
          <li>• Offer discounts for longer stays to reduce vacancy</li>
          <li>• Review and update prices seasonally</li>
          <li>• Monitor competitor rates in the Manali area</li>
        </ul>
      </Card>
    </div>
  )
}
