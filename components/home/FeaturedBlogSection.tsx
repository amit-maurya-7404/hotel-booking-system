import { Card } from '@/components/ui/card'

export default function FeaturedBlogSection() {
  return (
    <section className="py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-black mb-16 text-foreground">
          Featured Blog
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Featured Post */}
          <Card className="overflow-hidden shadow-md border-border">
            <div className="aspect-video bg-gradient-to-br from-orange-100 to-yellow-50"></div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Guided Hiking & Overnight Camping
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Experience the thrill of mountain trekking and camping under the stars with our expert guides.
              </p>
            </div>
          </Card>

          {/* Blog Grid */}
          <div className="grid grid-cols-2 gap-5">
            {['Guided Hiking & Overnight Camping', 'Guided Hiking & Overnight Camping', 'Guided Hiking & Overnight Camping', 'Guided Hiking & Overnight Camping'].map((title, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-md transition-shadow border-border">
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-yellow-50"></div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-foreground line-clamp-2">{title}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
