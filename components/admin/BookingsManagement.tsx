'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, Mail, Phone } from 'lucide-react'
import { Loader } from 'lucide-react'
import { useAdmin } from '@/context/AdminContext'
import { Booking } from '@/context/AdminContext'

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  'checked-in': 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function BookingsManagement() {
  const { bookings, loading, error, fetchBookings, updateBooking } = useAdmin()
  const [filter, setFilter] = useState<Booking['status'] | 'all'>('all')

  useEffect(() => {
    fetchBookings().catch(() => { })
  }, [])

  const filteredBookings = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  const updateStatus = async (id: string, newStatus: Booking['status']) => {
    try {
      const booking = bookings.find(b => b.id === id)
      if (!booking) return
      await updateBooking(id, { ...booking, status: newStatus })
      await fetchBookings()
    } catch (err) {
      console.error('Update booking status failed', err)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Bookings Management</h1>
        <p className="text-foreground/70 mt-2">Track and manage guest bookings</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'pending', 'confirmed', 'checked-in', 'completed', 'cancelled'] as const).map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            onClick={() => setFilter(status)}
            className={filter === status ? 'bg-primary text-primary-foreground' : ''}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center p-8">
          <Loader className="w-6 h-6 animate-spin" />
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">{error}</div>
      )}

      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-foreground">{booking.guestName}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${STATUS_COLORS[booking.status]}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-foreground/70">Booking ID: {booking.id}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">₹{booking.price ?? 0}</p>
                <p className="text-xs text-foreground/60">1 guest(s)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-border">
              <div>
                <p className="text-xs text-foreground/60 mb-1">Room</p>
                <p className="font-semibold text-foreground">{booking.roomId || booking.room || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60 mb-1">Check-in</p>
                <p className="font-semibold text-foreground">{new Date(booking.checkIn).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60 mb-1">Check-out</p>
                <p className="font-semibold text-foreground">{new Date(booking.checkOut).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60 mb-1">Duration</p>
                <p className="font-semibold text-foreground">
                  {Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <a href={`mailto:${booking.email}`} className="flex items-center gap-2 text-primary hover:opacity-80 transition">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{booking.email}</span>
                </a>
                <a href={`tel:${booking.phone}`} className="flex items-center gap-2 text-primary hover:opacity-80 transition">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{booking.phone}</span>
                </a>
              </div>

              <div className="flex gap-2">
                {booking.status === 'pending' && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(booking.id, 'confirmed')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Confirm
                  </Button>
                )}
                {booking.status === 'confirmed' && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(booking.id, 'checked-in')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Check In
                  </Button>
                )}
                {booking.status === 'checked-in' && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(booking.id, 'completed')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Check Out
                  </Button>
                )}
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
