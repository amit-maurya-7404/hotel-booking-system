'use client'

import { Card } from '@/components/ui/card'

const ACTIVITIES = [
  {
    id: 1,
    title: 'Guided Hiking & Overnight Camping',
    emoji: '🏔️',
    description: 'Experience the raw beauty of Himalayan trails with our experienced guides.',
  },
  {
    id: 2,
    title: 'Guided Cycling Tour',
    emoji: '🚴',
    description: 'Pedal through scenic mountain routes and discover hidden gems.',
  },
  {
    id: 3,
    title: 'Day Hikes and Road Trips',
    emoji: '🗻',
    description: 'Explore nearby trails and scenic viewpoints during the day.',
  },
  {
    id: 4,
    title: 'Local Village Tour',
    emoji: '🏘️',
    description: 'Immerse yourself in local culture and meet friendly villagers.',
  },
]

export default function Activities() {
  return (
    <section id="activities" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Events and Activities</h2>
          <p className="text-xl text-foreground/70">Unforgettable experiences await you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {ACTIVITIES.map((activity) => (
            <Card key={activity.id} className="p-8 hover:shadow-lg transition">
              <div className="text-5xl mb-4">{activity.emoji}</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{activity.title}</h3>
              <p className="text-foreground/80">{activity.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
