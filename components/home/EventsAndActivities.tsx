import { Card } from '@/components/ui/card'

export default function EventsAndActivities() {
  const activities = [
    'Guided Hiking & Overnight Camping',
    'Guided Cycling Tour',
    'Day Hikes and Road Trips',
    'Local Village Tour',
    'Guided Hiking & Overnight Camping',
    'Guided Hiking & Overnight Camping',
    'Updates and Trends',
    'Guided Hiking & Overnight Camping',
  ]

  return (
    <section className="py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-black mb-16 text-foreground">
          Events and Activities
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {activities.map((activity, idx) => (
            <Card 
              key={idx}
              className="aspect-square bg-gradient-to-br from-orange-100 to-yellow-50 hover:shadow-md transition-shadow flex items-end p-5 border-border cursor-pointer"
            >
              <h3 className="text-foreground font-semibold text-sm leading-tight">{activity}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
