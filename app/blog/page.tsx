'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { useState } from 'react'

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null)

  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: '10 Best Hiking Trails Near Manali for Beginners',
      author: 'Arjun Singh',
      date: '2024-01-15',
      category: 'Travel Guide',
      excerpt: 'Discover the most beginner-friendly hiking trails with stunning views of the Himalayas...',
      image: '⛰️',
      content: 'Discover the most beginner-friendly hiking trails with stunning views of the Himalayas. From Old Manali to Jogini Falls, we guide you through the best trails that won\'t break your legs but will take your breath away. Each trail is carefully selected for its accessibility, beauty, and community vibe.',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'The Ultimate Budget Travel Guide to Manali',
      author: 'Priya Sharma',
      date: '2024-01-10',
      category: 'Budget Travel',
      excerpt: 'How to explore the beauty of Manali without breaking your piggy bank...',
      image: '💰',
      content: 'How to explore the beauty of Manali without breaking your piggy bank. We break down the costs for accommodation, food, activities, and transport. Learn insider tips on where locals eat, which activities offer the best value, and how to travel sustainably while staying within budget.',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: 'Connecting with Local Culture: A Homestay Experience',
      author: 'Raj Patel',
      date: '2024-01-05',
      category: 'Local Culture',
      excerpt: 'What we learned from living among the mountains and the people who call them home...',
      image: '🏡',
      content: 'What we learned from living among the mountains and the people who call them home. Homestays offer a unique perspective on mountain life. We share stories of real connections, traditional meals, and the wisdom of local communities. Discover how tourism can be a two-way exchange.',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Adventure Photography: Capturing the Himalayas',
      author: 'Arjun Singh',
      date: '2023-12-28',
      category: 'Photography',
      excerpt: 'Pro tips for capturing stunning mountain photography with your smartphone or camera...',
      image: '📸',
      content: 'Pro tips for capturing stunning mountain photography with your smartphone or camera. Learn about golden hour photography, composition techniques, and post-processing secrets. We share some of the most stunning shots taken by our guests and offer a framework for achieving them yourself.',
      readTime: '7 min read'
    },
    {
      id: 5,
      title: 'The Best Seasons to Visit Manali and Why',
      author: 'Priya Sharma',
      date: '2023-12-20',
      category: 'Travel Guide',
      excerpt: 'Each season offers a different face of the mountains. Find out which is perfect for you...',
      image: '🌄',
      content: 'Each season offers a different face of the mountains. Find out which is perfect for you. Spring brings wildflowers, summer offers clear skies for activities, autumn presents golden landscapes, and winter transforms the region into a snowy wonderland. We break down what to expect and how to prepare.',
      readTime: '6 min read'
    },
    {
      id: 6,
      title: 'Solo Travel Stories: Independence in the Mountains',
      author: 'Raj Patel',
      date: '2023-12-15',
      category: 'Stories',
      excerpt: 'Real stories from solo travelers who found themselves and their community in our hostel...',
      image: '🎒',
      content: 'Real stories from solo travelers who found themselves and their community in our hostel. From finding confidence on mountain peaks to making lifelong friendships, these are the transformative stories that make the Hideout Hiraeth special. Every journey is unique, but all lead to growth.',
      readTime: '8 min read'
    },
  ])

  const categories = ['All', 'Travel Guide', 'Budget Travel', 'Local Culture', 'Photography', 'Stories']
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPosts = activeCategory === 'All' ? blogPosts : blogPosts.filter(post => post.category === activeCategory)

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
              className={`px-4 py-2 rounded-full transition ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {selectedPost !== null ? (
          // Blog Post Detail View
          <Card className="p-8 mb-16">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-primary hover:underline mb-6"
            >
              ← Back to All Posts
            </button>

            <div className="mb-8">
              <div className="text-6xl mb-4">{blogPosts[selectedPost].image}</div>
              <h1 className="text-4xl font-bold text-foreground mb-4">{blogPosts[selectedPost].title}</h1>
              <div className="flex gap-4 text-sm text-foreground/60">
                <span>By {blogPosts[selectedPost].author}</span>
                <span>•</span>
                <span>{new Date(blogPosts[selectedPost].date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{blogPosts[selectedPost].readTime}</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                {blogPosts[selectedPost].content}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition cursor-pointer hover:scale-105 transform"
                onClick={() => setSelectedPost(post.id - 1)}
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
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
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
