 'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Edit, Trash2, Plus, X } from 'lucide-react'
import { Loader } from 'lucide-react'
import { useAdmin } from '@/context/AdminContext'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  status: 'draft' | 'published'
}

const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '10 Best Hiking Trails Near Manali for Beginners',
    excerpt: 'Discover the most beginner-friendly hiking trails with stunning views...',
    content: 'Full content about hiking trails...',
    author: 'Arjun Singh',
    date: '2024-01-15',
    category: 'Travel Guide',
    image: '⛰️',
    status: 'published',
  },
  {
    id: '2',
    title: 'The Ultimate Budget Travel Guide to Manali',
    excerpt: 'How to explore the beauty of Manali without breaking your piggy bank...',
    content: 'Full content about budget travel...',
    author: 'Priya Sharma',
    date: '2024-01-10',
    category: 'Budget Travel',
    image: '💰',
    status: 'published',
  },
]

export default function BlogPostsManagement() {
  const { blogPosts, loading, error, fetchBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Travel Guide',
    image: '📝',
    status: 'draft' as 'draft' | 'published',
  })

  useEffect(() => {
    fetchBlogPosts().catch(() => {})
  }, [])

  const handleReset = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: 'Travel Guide',
      image: '📝',
      status: 'draft',
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      image: post.image,
      status: post.status,
    })
    setEditingId(post.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const date = new Date().toISOString().split('T')[0]
      if (editingId) {
        await updateBlogPost(editingId, { ...formData, date })
      } else {
        await addBlogPost({ ...formData, date })
      }
      await fetchBlogPosts()
      handleReset()
    } catch (err) {
      console.error('Blog post save failed', err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-foreground/70 mt-2">Create and manage blog content</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 border border-border mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-foreground">
              {editingId ? 'Edit Post' : 'Create New Blog Post'}
            </h2>
            <button onClick={handleReset} className="text-foreground/60 hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Blog Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter blog post title"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Author *</Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Author name"
                  required
                />
              </div>
              <div>
                <Label>Category</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md"
                >
                  <option value="Travel Guide">Travel Guide</option>
                  <option value="Budget Travel">Budget Travel</option>
                  <option value="Local Culture">Local Culture</option>
                  <option value="Photography">Photography</option>
                  <option value="Stories">Stories</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Excerpt *</Label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Short excerpt for preview..."
                required
                rows={2}
              />
            </div>

            <div>
              <Label>Full Content *</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Full blog post content..."
                required
                rows={5}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Image/Emoji</Label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="e.g., 📝"
                />
              </div>
              <div>
                <Label>Status</Label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                  className="w-full px-3 py-2 border border-border rounded-md"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                {editingId ? 'Update Post' : 'Publish Post'}
              </Button>
              <Button type="button" variant="outline" onClick={handleReset} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {loading && (
        <div className="flex items-center justify-center p-8">
          <Loader className="w-6 h-6 animate-spin" />
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">{error}</div>
      )}

      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <Card key={post.id} className="p-6 border border-border hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{post.image}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">{post.title}</h3>
                    <div className="flex gap-3 mt-1 text-sm">
                      <span className="text-foreground/60">By {post.author}</span>
                      <span className="text-foreground/60">•</span>
                      <span className="text-foreground/60">{new Date(post.date).toLocaleDateString()}</span>
                      <span className="text-foreground/60">•</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status === 'published' ? '✓ Published' : '✎ Draft'}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-foreground/70 mt-2">{post.excerpt}</p>
              </div>
                <div className="flex gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(post)}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    try {
                      await deleteBlogPost(post.id)
                      await fetchBlogPosts()
                    } catch (err) {
                      console.error('Delete blog post failed', err)
                    }
                  }}
                  className="flex items-center gap-2 text-destructive border-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {blogPosts.length === 0 && !loading && (
        <Card className="p-12 text-center border border-dashed">
          <p className="text-foreground/60">No blog posts yet. Click "New Post" to create your first blog post.</p>
        </Card>
      )}
    </div>
  )
}
