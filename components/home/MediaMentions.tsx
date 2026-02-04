import { Card } from '@/components/ui/card'

export default function MediaMentions() {
  return (
    <section className="py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-black mb-16 text-center text-foreground">
          Media Mentions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {['THH OPTION 1', 'THH OPTION 2', 'THH OPTION 3', 'THH OPTION 4'].map((item, idx) => (
            <Card 
              key={idx}
              className="bg-muted rounded-lg p-6 flex items-center justify-center text-center min-h-28 border-border cursor-pointer hover:shadow-sm transition-shadow"
            >
              <p className="text-muted-foreground text-sm font-bold">{item}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
