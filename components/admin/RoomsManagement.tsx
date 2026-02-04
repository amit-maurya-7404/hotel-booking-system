'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit, Trash2, Plus, X, Loader } from 'lucide-react'
import { useAdmin } from '@/context/AdminContext'

export default function RoomsManagement() {
  const { rooms, loading, error, fetchRooms, addRoom, updateRoom, deleteRoom } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'dorm' as 'dorm' | 'private',
    capacity: 0,
    price: 0,
    amenities: '',
    available: true,
  })

  const handleReset = () => {
    setFormData({ name: '', type: 'dorm', capacity: 0, price: 0, amenities: '', available: true })
    setEditingId(null)
    setShowForm(false)
  }

  useEffect(() => {
    fetchRooms().catch(() => {})
  }, [])

  const handleEdit = (room: any) => {
    setFormData({
      name: room.name,
      type: room.type,
      capacity: room.capacity,
      price: room.price,
      amenities: (room.amenities || []).join(', '),
      available: room.available,
    })
    setEditingId(room.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const amenities = formData.amenities.split(',').map(a => a.trim()).filter(Boolean)
      
      if (editingId) {
        await updateRoom(editingId, {
          ...formData,
          capacity: Number(formData.capacity),
          price: Number(formData.price),
          amenities,
        })
      } else {
        await addRoom({
          name: formData.name,
          type: formData.type,
          capacity: Number(formData.capacity),
          price: Number(formData.price),
          amenities,
          available: formData.available,
        })
      }
      await fetchRooms()
      handleReset()
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await deleteRoom(id)
        await fetchRooms()
      } catch (err) {
        console.error('Error deleting room:', err)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Room Management</h1>
          <p className="text-foreground/70 mt-2">Manage your property's rooms and availability</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Room
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8 border border-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-foreground">
              {editingId ? 'Edit Room' : 'Add New Room'}
            </h2>
            <button onClick={handleReset} className="text-foreground/60 hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Room Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Mixed Dorm"
                  required
                />
              </div>
              <div>
                <Label>Room Type *</Label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'dorm' | 'private' })}
                  className="w-full px-3 py-2 border border-border rounded-md"
                >
                  <option value="dorm">Dorm</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Capacity (guests) *</Label>
                <Input
                  type="number"
                  value={formData.capacity || ''}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  placeholder="e.g., 4"
                  required
                />
              </div>
              <div>
                <Label>Price per Night (₹) *</Label>
                <Input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                  placeholder="e.g., 400"
                  required
                />
              </div>
            </div>

            <div>
              <Label>Amenities (comma-separated)</Label>
              <Input
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                placeholder="e.g., WiFi, Shared Bath, Lockers"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    {editingId ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  editingId ? 'Update Room' : 'Add Room'
                )}
              </Button>
              <Button type="button" variant="outline" onClick={handleReset} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {rooms.map((room: any) => (
          <Card key={room.id} className="p-6 border border-border hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">{room.name}</h3>
                <div className="flex gap-4 mt-3 text-sm text-foreground/70 flex-wrap">
                  <span>👥 {room.capacity} guests</span>
                  <span>🛏️ {room.type}</span>
                  <span>💰 ₹{room.price}/night</span>
                  <span className={room.available ? 'text-green-600' : 'text-red-600'}>
                    {room.available ? '✅ Available' : '❌ Unavailable'}
                  </span>
                </div>
                {room.amenities && room.amenities.length > 0 && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {room.amenities.map((amenity: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-muted text-foreground/70 text-xs rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(room)}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(room.id)}
                  className="flex items-center gap-2 text-destructive border-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {rooms.length === 0 && !showForm && (
        <Card className="p-12 text-center border border-dashed">
          <p className="text-foreground/60">No rooms found. Click "Add Room" to get started.</p>
        </Card>
      )}
    </div>
  )
}
