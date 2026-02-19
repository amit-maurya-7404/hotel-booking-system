'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { useState, useEffect } from 'react'
import { Loader } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  author: string
  date: string
  category: string
  excerpt: string
  image: string
  content: string
  readTime?: string
  published: boolean
}

const API_URL = 'http://localhost:5000/api'

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = ['All', 'Travel Guide', 'Budget Travel', 'Local Culture', 'Photography', 'Stories']
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/blogs`)
      if (!response.ok) throw new Error('Failed to fetch blog posts')
      const data = await response.json()
      // Filter only published posts
      const publishedPosts = data.filter((post: BlogPost) => post.published)
      setBlogPosts(publishedPosts)
    } catch (err) {
      setError('Failed to load blog posts. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = activeCategory === 'All' ? blogPosts : blogPosts.filter(post => post.category === activeCategory)

  const selectedPostData = blogPosts.find(p => p.id === selectedPost)

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">The Hideout Chronicles</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Stories, guides, and insights from mountain adventurers, wanderers, and culture enthusiasts
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-12 flex-wrap justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition ${activeCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {selectedPost && selectedPostData ? (
          // Blog Post Detail View
          <Card className="p-8 mb-16">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-primary hover:underline mb-6"
            >
              ← Back to All Posts
            </button>

            <div className="mb-8">
              <div className="text-6xl mb-4">{selectedPostData.image}</div>
              <h1 className="text-4xl font-bold text-foreground mb-4">{selectedPostData.title}</h1>
              <div className="flex gap-4 text-sm text-foreground/60">
                <span>By {selectedPostData.author}</span>
                <span>•</span>
                <span>{new Date(selectedPostData.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{selectedPostData.readTime || '5 min read'}</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
                {selectedPostData.content}
              </p>
              <p className="text-foreground/70 leading-relaxed">
                At The Hideout Hiraeth, we believe that travel is more than just visiting places. It's about connecting with people, understanding different cultures, and creating memories that last a lifetime. Every story shared in our hostel is a testament to the transformative power of mountain adventures.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-bold text-foreground mb-4">Share this post</h3>
              <div className="flex gap-4">
                <a href="#" className="text-primary hover:underline">Facebook</a>
                <a href="#" className="text-primary hover:underline">Twitter</a>
                <a href="#" className="text-primary hover:underline">WhatsApp</a>
                <a href="#" className="text-primary hover:underline">Copy Link</a>
              </div>
            </div>
          </Card>
        ) : (
          // Blog Posts Grid
          <>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-foreground/60 text-lg">No blog posts found.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-lg transition cursor-pointer hover:scale-102 transform py-0"
                    onClick={() => setSelectedPost(post.id)}
                  >
                    <div className="aspect-square bg-muted flex items-center justify-center text-6xl">
                      {post.image}
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-semibold text-primary mb-2">{post.category}</div>
                      <h2 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{post.title}</h2>
                      <p className="text-sm text-foreground/60 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-foreground/60">
                        <span>{post.author}</span>
                        <span>{post.readTime || '5 min read'}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Newsletter Signup */}
        <Card className="p-8 bg-primary text-primary-foreground text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with Our Latest Stories</h2>
          <p className="mb-6 text-primary-foreground/90">Get travel tips, mountain stories, and special offers delivered to your inbox</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 rounded text-foreground"
            />
            <button className="px-6 py-2 bg-white text-primary rounded hover:opacity-90 transition font-semibold">
              Subscribe
            </button>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Have your own story to share?</h2>
          <p className="text-foreground/70 mb-6">Join us and become part of The Hideout Hiraeth community</p>
          <a href="/" className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold">
            Book Your Stay
          </a>
        </div>
      </div>

      <Footer />
    </main>
  )
}
