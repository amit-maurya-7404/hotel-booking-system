'use client'

import { Card } from '@/components/ui/card'

const FEATURED_POSTS = [
  {
    id: 1,
    author: 'Anshul Sharma',
    title: 'Caught Unquote',
    description: 'Any random quote/dialogue by any visitor, just not copied',
    image: '🎵',
  },
  {
    id: 2,
    author: 'Anshul Sharma',
    title: 'Mountain Adventures',
    description: 'Unforgettable moments from our guests exploring the Himalayas',
    image: '📸',
  },
  {
    id: 3,
    author: 'Anshul Sharma',
    title: 'Local Stories',
    description: 'Tales from our community and the people who make this place special',
    image: '📖',
  },
]

export default function FeaturedPosts() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Posts</h2>
          <p className="text-xl text-foreground/70">Stories from our guests and the mountain life</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURED_POSTS.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-secondary/30 to-primary/20 flex items-center justify-center text-6xl">
                {post.image}
              </div>
              <div className="p-6">
                <p className="text-sm text-primary font-semibold mb-2">@{post.author.toLowerCase().replace(' ', '')}</p>
                <h3 className="text-xl font-bold text-foreground mb-3">{post.title}</h3>
                <p className="text-foreground/80">{post.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
