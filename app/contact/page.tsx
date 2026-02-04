'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Contact Us</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Get in touch with us for bookings, inquiries, or just to say hello!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <Card className="p-8 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Location</h3>
            <p className="text-foreground/70">
              The Hideout Hiraeth<br/>
              Near Manali<br/>
              Himachal Pradesh, India
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Phone</h3>
            <p className="text-foreground/70">
              <a href="tel:+919015453068" className="hover:text-primary transition">
                +91 9015 453 068
              </a><br/>
              <span className="text-sm">Mon - Sun, 8AM - 10PM</span>
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
            <p className="text-foreground/70">
              <a href="mailto:info@hideouthiraeth.com" className="hover:text-primary transition">
                info@hideouthiraeth.com
              </a><br/>
              <span className="text-sm">Response within 24 hours</span>
            </p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                ✓ Thank you! Your message has been sent. We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9XXX XXX XXX"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Booking Inquiry / General Question / etc."
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  required
                  className="mt-1"
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>

          {/* Additional Info */}
          <div className="space-y-6">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Business Hours</h3>
              <div className="space-y-2 text-foreground/70">
                <p>Monday - Sunday: <span className="font-semibold">8:00 AM - 10:00 PM</span></p>
                <p className="text-sm">We're available 24/7 for WhatsApp inquiries</p>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a href="/about" className="block text-primary hover:underline">About Us</a>
                <a href="/activities" className="block text-primary hover:underline">Activities & Adventures</a>
                <a href="/blog" className="block text-primary hover:underline">Blog & Stories</a>
                <a href="/" className="block text-primary hover:underline">Back to Home</a>
              </div>
            </Card>

            <Card className="p-8 bg-primary text-primary-foreground">
              <h3 className="text-xl font-bold mb-4">Prefer WhatsApp?</h3>
              <p className="mb-4">Chat with us directly on WhatsApp for quick responses</p>
              <a href="https://wa.me/919015453068" target="_blank" rel="noopener noreferrer" 
                 className="inline-block px-6 py-2 bg-white text-primary rounded-lg hover:opacity-90 transition font-semibold">
                WhatsApp Us
              </a>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="p-8 mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Find Us on Map</h2>
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <p className="text-foreground/70">Google Map Integration</p>
              <p className="text-sm text-foreground/60 mt-2">Interactive map showing our location near Manali</p>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { q: 'How do I make a booking?', a: 'You can book directly through our website, call us, or WhatsApp us. We\'ll guide you through the process.' },
              { q: 'What is your cancellation policy?', a: 'We offer free cancellation up to 7 days before check-in. Specific terms apply based on your booking.' },
              { q: 'Do you offer group discounts?', a: 'Yes! We provide special rates for groups of 6 or more. Contact us for custom packages.' },
              { q: 'Are pets allowed?', a: 'We love pet lovers! Please inform us in advance and we\'ll be happy to accommodate your furry friends.' },
            ].map((item, i) => (
              <Card key={i} className="p-6">
                <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                <p className="text-foreground/70">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
