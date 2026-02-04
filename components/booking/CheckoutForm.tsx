'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mail, Phone, User, MapPin, Calendar } from 'lucide-react'

interface CheckoutFormProps {
  checkInDate: string
  checkOutDate: string
  selectedRooms: Array<{ id: string; name: string; price: number; quantity: number }>
  onBack: () => void
}

export default function CheckoutForm({ checkInDate, checkOutDate, selectedRooms, onBack }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    guestCount: '1',
    specialRequests: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log('[v0] Booking submitted:', formData)
      setIsSubmitting(false)
      setBookingComplete(true)
    }, 1500)
  }

  if (bookingComplete) {
    return (
      <div className="py-12 text-center">
        <div className="mb-6 text-6xl">✅</div>
        <h3 className="text-3xl font-bold text-foreground mb-4">Booking Confirmed!</h3>
        <p className="text-foreground/80 mb-6 max-w-md mx-auto">
          Thank you {formData.fullName}! We've sent a confirmation email to {formData.email}. Our team will contact you shortly to confirm your booking.
        </p>
        <div className="bg-muted p-6 rounded-lg mb-6 text-left">
          <p className="text-sm text-foreground/70 mb-2">Confirmation Number</p>
          <p className="text-lg font-bold text-primary">THH-{Date.now().toString().slice(-6)}</p>
        </div>
        <p className="text-foreground/70 mb-6">
          📞 WhatsApp: <a href="https://wa.me/919015453068" className="text-primary font-semibold hover:underline">+91 90154 53068</a>
        </p>
        <p className="text-foreground/70">
          📧 Email: contact@thehideouthiraeth.com
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6">Guest Information</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your full name"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address Information
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Street address"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Zip code"
                />
              </div>
            </div>
          </div>

          {/* Stay Details */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Stay Details
            </h4>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Number of Guests *</label>
              <select
                name="guestCount"
                value={formData.guestCount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Special Requests or Preferences</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
                placeholder="Any dietary restrictions, allergies, or special requirements?"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="pt-4 border-t border-border">
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" required />
              <span className="text-sm text-foreground/80">
                I agree to The Hideout Hiraeth's <a href="#" className="text-primary hover:underline">cancellation policy</a> and <a href="#" className="text-primary hover:underline">terms and conditions</a>
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
              Back
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Complete Booking'}
            </Button>
          </div>

          <p className="text-xs text-foreground/60 text-center pt-4">
            💳 No payment required yet. We'll contact you to confirm your booking and payment details.
          </p>
        </form>
      </div>
    </div>
  )
}
