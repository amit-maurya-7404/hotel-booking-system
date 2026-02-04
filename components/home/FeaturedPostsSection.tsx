import { Card } from '@/components/ui/card'

export default function FeaturedPostsSection() {
  const posts = [
    { name: 'Anshul Sharma', handle: '@anshulsujanian', image: 'post1' },
    { name: 'Priya Sharma', handle: '@priyatravels', image: 'post2' },
    { name: 'Rohan Kumar', handle: '@rohankadventure', image: 'post3' },
    { name: 'Neha Singh', handle: '@neha.explores', image: 'post4' },
    { name: 'Amit Patel', handle: '@amitroaming', image: 'post5' },
    { name: 'Sarah Wilson', handle: '@sarahwanders', image: 'post6' },
  ]

  return (
    <section className="py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-black mb-16 text-foreground">
          Featured Posts
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post, idx) => (
            <div 
              key={idx}
              className="text-center space-y-3"
            >
              <Card className="aspect-square bg-gradient-to-br from-orange-100 to-yellow-50 border-border" />
              <div>
                <p className="text-sm font-bold text-foreground">{post.name}</p>
                <p className="text-xs text-muted-foreground">{post.handle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
