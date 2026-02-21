'use client'

import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface FeaturePost {
  id: string
  image: string
  instagramUrl: string
  active: boolean
}

export default function FeaturedPostsSection() {
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
    <section className="py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-black mb-16 text-foreground">
          Featured Posts
        </h2>

        {!loading && posts.length === 0 ? (
          <div className="text-center text-foreground/60 p-12">
            No stories available right now. Share your story with us!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <a
                href={post.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={post.id}
                className="text-center space-y-3 block transition hover:opacity-90"
              >
                <Card className="aspect-square bg-gradient-to-br from-orange-100 to-yellow-50 border-border overflow-hidden relative">
                  <Image
                    src={post.image}
                    alt="Featured Post"
                    fill
                    className="object-cover"
                    unoptimized // Because base64 strings or external URLs might not be optimized nicely immediately
                  />
                </Card>
                <div>
                  <p className="text-sm font-bold text-foreground hover:underline cursor-pointer">View on Instagram</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
