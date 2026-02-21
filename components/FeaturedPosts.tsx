'use client'

import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'

interface FeaturePost {
  id: string
  image: string
  instagramUrl: string
  active: boolean
}

// Removed FALLBACK_POSTS

export default function FeaturedPosts() {
  const [posts, setPosts] = useState<FeaturePost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/feature-posts')
        if (response.ok) {
          const data = await response.json()
          setPosts(data.filter((post: FeaturePost) => post.active))
        }
      } catch (err) {
        console.error('Failed to fetch feature posts', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Posts</h2>
          <p className="text-xl text-foreground/70">Stories from our guests and the mountain life</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {!loading && posts.length > 0 ? (
            posts.map((post) => (
              <a href={post.instagramUrl} target="_blank" rel="noopener noreferrer" key={post.id} className="block transition cursor-pointer">
                <Card className="overflow-hidden hover:shadow-lg h-full border-border">
                  <div className="h-64 relative bg-secondary/20">
                    <img
                      src={post.image}
                      alt="Featured post"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=800'
                      }}
                    />
                  </div>
                  <div className="p-4 bg-card text-center">
                    <p className="text-sm text-primary font-semibold truncate hover:underline">
                      See Original on Instagram
                    </p>
                  </div>
                </Card>
              </a>
            ))
          ) : !loading && posts.length === 0 ? (
            <div className="col-span-full text-center text-foreground/60 p-12">
              No stories available right now. Share your story with us!
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
