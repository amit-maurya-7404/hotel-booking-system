'use client'

import { Card } from '@/components/ui/card'

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Updates and Trends',
    emoji: '📰',
    date: 'Jan 2025',
    excerpt: 'Latest updates and trends in the backpacking and hospitality world.',
  },
  {
    id: 2,
    title: 'Guided Hiking & Overnight Camping',
    emoji: '⛺',
    date: 'Jan 2025',
    excerpt: 'Everything you need to know about our overnight camping experiences.',
  },
  {
    id: 3,
    title: 'Mountain Photography Tips',
    emoji: '📷',
    date: 'Dec 2024',
    excerpt: 'Capture stunning mountain shots with these helpful tips and tricks.',
  },
  {
    id: 4,
    title: 'Local Manali Guide',
    emoji: '🗺️',
    date: 'Dec 2024',
    excerpt: 'Your complete guide to exploring Manali and nearby attractions.',
  },
]

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Blog</h2>
          <p className="text-xl text-foreground/70">Stories, tips, and insights from the mountains</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <Card key={post.id} className="p-8 hover:shadow-lg transition cursor-pointer group">
              <div className="text-5xl mb-4">{post.emoji}</div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition">{post.title}</h3>
                <span className="text-xs bg-muted px-3 py-1 rounded-full text-foreground/60">{post.date}</span>
              </div>
              <p className="text-foreground/80">{post.excerpt}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
