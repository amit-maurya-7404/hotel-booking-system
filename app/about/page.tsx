'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About The Hideout Hiraeth</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Discover our story of creating authentic mountain experiences in the heart of Himachal Pradesh.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-foreground/70 mb-4">
              The Hideout Hiraeth began with a simple vision: to create a space where travelers and backpackers could experience authentic mountain living without compromising on comfort or community.
            </p>
            <p className="text-foreground/70 mb-4">
              Nestled near Manali, our hostel is more than just a place to sleep. It's a sanctuary for wanderers, adventure seekers, and cultural enthusiasts who want to connect with the mountains and with each other.
            </p>
            <p className="text-foreground/70">
              From our mixed dorms to private rooms, from yoga sessions at dawn to bonfire stories at night, every experience at The Hideout Hiraeth is designed to create lasting memories.
            </p>
          </div>

          <div className="bg-muted rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Why Choose Us?</h3>
            <div className="space-y-4">
              {[
                { icon: '🏔️', title: 'Mountain Location', desc: 'Breathtaking Himalayan views and proximity to nature' },
                { icon: '🤝', title: 'Community Vibes', desc: 'Connect with travelers from around the world' },
                { icon: '🧘', title: 'Wellness Programs', desc: 'Yoga, meditation, and wellness activities' },
                { icon: '🎯', title: 'Adventure Ready', desc: 'Easy access to trekking, paragliding, and more' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-foreground">{item.title}</h4>
                    <p className="text-sm text-foreground/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Authenticity', desc: 'Real experiences, genuine connections' },
              { title: 'Sustainability', desc: 'Caring for our mountains and communities' },
              { title: 'Inclusivity', desc: 'Welcome to all backgrounds and budgets' },
              { title: 'Quality', desc: 'Excellence in every detail of your stay' },
            ].map((value, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-foreground/60">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-muted rounded-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Arjun Singh', role: 'Founder & Owner', bio: 'Mountain enthusiast with 10+ years of hospitality experience' },
              { name: 'Priya Sharma', role: 'Operations Manager', bio: 'Passionate about creating unforgettable guest experiences' },
              { name: 'Raj Patel', role: 'Activities Coordinator', bio: 'Adventure lover dedicated to curating unique experiences' },
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  👤
                </div>
                <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-foreground/60">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Experience the Mountains?</h2>
          <p className="text-foreground/70 mb-6">Get in touch with us to plan your perfect mountain getaway.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/contact" className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold">
              Contact Us
            </a>
            <a href="https://wa.me/919015453068" target="_blank" rel="noopener noreferrer" 
               className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition font-semibold">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
