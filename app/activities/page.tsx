'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { useState } from 'react'

export default function ActivitiesPage() {
  const [selectedActivity, setSelectedActivity] = useState(0)

  const activities = [
    {
      id: 1,
      title: 'Mountain Trekking',
      icon: '⛰️',
      price: '₹500',
      duration: '4-6 hours',
      difficulty: 'Moderate',
      description: 'Explore breathtaking mountain trails with experienced guides. Perfect for nature lovers and fitness enthusiasts.',
      highlights: ['Scenic trails', 'Expert guides', 'Packed lunch included', 'Group or private'],
      image: '🏔️'
    },
    {
      id: 2,
      title: 'Paragliding Adventure',
      icon: '🪂',
      price: '₹3,500',
      duration: '2-3 hours',
      difficulty: 'Easy',
      description: 'Experience the thrill of paragliding with a trained pilot. See the Himalayas from a bird\'s eye view.',
      highlights: ['Professional pilots', 'Safety certified', 'Photos included', 'For all levels'],
      image: '🪂'
    },
    {
      id: 3,
      title: 'Yoga & Meditation',
      icon: '🧘',
      price: '₹300',
      duration: '1.5 hours',
      difficulty: 'Easy',
      description: 'Start your day with rejuvenating yoga and meditation sessions led by certified instructors.',
      highlights: ['Certified instructors', 'Morning sessions', 'All levels welcome', 'Flexible timing'],
      image: '🧘'
    },
    {
      id: 4,
      title: 'Rock Climbing',
      icon: '🧗',
      price: '₹800',
      duration: '2-3 hours',
      difficulty: 'Hard',
      description: 'Challenge yourself with guided rock climbing on natural rock faces. Equipment and training provided.',
      highlights: ['Safety gear provided', 'Experienced climbers', 'Natural rock faces', 'Small group size'],
      image: '🧗'
    },
    {
      id: 5,
      title: 'Local Village Tour',
      icon: '🚶',
      price: '₹400',
      duration: '3-4 hours',
      difficulty: 'Easy',
      description: 'Discover the authentic culture and lifestyle of local Himachal villages. Meet locals and taste traditional food.',
      highlights: ['Local guide', 'Cultural immersion', 'Home-cooked meals', 'Photography friendly'],
      image: '🏘️'
    },
    {
      id: 6,
      title: 'River Rafting',
      icon: '🚣',
      price: '₹1,200',
      duration: '3-4 hours',
      difficulty: 'Moderate',
      description: 'Experience the rush of river rafting on clear mountain streams. Perfect for adventure seekers.',
      highlights: ['Safety equipment', 'Trained instructors', 'Scenic routes', 'Group friendly'],
      image: '🌊'
    },
    {
      id: 7,
      title: 'Photography Walk',
      icon: '📸',
      price: '₹600',
      duration: '2-3 hours',
      difficulty: 'Easy',
      description: 'Capture the beauty of the mountains with a professional photographer. Perfect for all skill levels.',
      highlights: ['Expert photographer', 'Golden hour shots', 'Editing tips', 'Best spots revealed'],
      image: '📷'
    },
    {
      id: 8,
      title: 'Bonfire & Stargazing',
      icon: '🔥',
      price: '₹300',
      duration: '2-3 hours',
      difficulty: 'Easy',
      description: 'Gather around the bonfire, share stories, and stargaze under the clear mountain sky.',
      highlights: ['Campfire snacks', 'Guitar & songs', 'Clear skies', 'Free for guests'],
      image: '✨'
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Adventures & Activities</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Discover unforgettable experiences in the heart of the Himalayas
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {activities.map((activity, idx) => (
            <Card 
              key={activity.id} 
              className="p-6 cursor-pointer hover:shadow-lg transition hover:scale-105 transform"
              onClick={() => setSelectedActivity(idx)}
            >
              <div className="text-4xl mb-4">{activity.icon}</div>
              <h3 className="font-bold text-foreground mb-2">{activity.title}</h3>
              <p className="text-sm text-foreground/60 mb-3">{activity.duration}</p>
              <div className="text-lg font-bold text-primary">{activity.price}</div>
            </Card>
          ))}
        </div>

        {/* Activity Details */}
        <div className="bg-card rounded-lg border border-border p-8 mb-16">
          <div className="flex gap-8 flex-col md:flex-row">
            <div className="flex-1">
              <div className="text-6xl mb-4">{activities[selectedActivity].icon}</div>
              <h2 className="text-3xl font-bold text-foreground mb-4">{activities[selectedActivity].title}</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-foreground/60">Price</p>
                  <p className="text-2xl font-bold text-primary">{activities[selectedActivity].price}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Duration</p>
                  <p className="text-lg font-bold text-foreground">{activities[selectedActivity].duration}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Difficulty</p>
                  <p className="text-lg font-bold text-foreground">{activities[selectedActivity].difficulty}</p>
                </div>
              </div>
              <p className="text-foreground/70 mb-6">{activities[selectedActivity].description}</p>
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold">
                Book Now
              </button>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-4">Highlights</h3>
              <ul className="space-y-3">
                {activities[selectedActivity].highlights.map((highlight, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-green-500 font-bold">✓</span>
                    <span className="text-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h4 className="font-bold text-foreground mb-2">Ready for this adventure?</h4>
                <p className="text-sm text-foreground/60 mb-4">Contact us to schedule your activity</p>
                <a href="/contact" className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:opacity-90 transition">
                  Book Activity
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'What is the best time to visit for activities?', a: 'April to October is ideal for most outdoor activities. Winter activities are available December to February.' },
              { q: 'Do you provide equipment?', a: 'Yes, all necessary safety equipment and gear are provided for every activity.' },
              { q: 'Are activities suitable for beginners?', a: 'Most of our activities are beginner-friendly. Difficulty levels are mentioned for each activity.' },
              { q: 'Can I book group activities?', a: 'Absolutely! We offer group discounts and can customize group experiences.' },
            ].map((item, i) => (
              <Card key={i} className="p-6">
                <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                <p className="text-foreground/70">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-primary-foreground rounded-lg p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Can't decide? Let us help!</h2>
          <p className="mb-6 text-primary-foreground/90">Our activity coordinators can create a custom itinerary based on your interests and skill level.</p>
          <a href="https://wa.me/919015453068" target="_blank" rel="noopener noreferrer" 
             className="inline-block px-8 py-3 bg-white text-primary rounded-lg hover:opacity-90 transition font-semibold">
            Chat with Us on WhatsApp
          </a>
        </div>
      </div>

      <Footer />
    </main>
  )
}
