'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Loader, Plus, X, Trash2, Edit } from 'lucide-react'
import { useAdmin, FeaturePost } from '@/context/AdminContext'

export default function FeaturePostManagement() {
    const { featurePosts, loading, error, fetchFeaturePosts, addFeaturePost, updateFeaturePost, deleteFeaturePost } = useAdmin()
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        image: '',
        instagramUrl: '',
        active: true,
    })

    useEffect(() => {
        fetchFeaturePosts().catch(() => { })
    }, [])

    const handleReset = () => {
        setFormData({ image: '', instagramUrl: '', active: true })
        setEditingId(null)
        setShowForm(false)
    }

    const handleEdit = (post: FeaturePost) => {
        setFormData({ image: post.image, instagramUrl: post.instagramUrl, active: post.active !== false })
        setEditingId(post.id)
        setShowForm(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editingId) {
                await updateFeaturePost(editingId, { ...formData })
            } else {
                await addFeaturePost({ ...formData })
            }
            await fetchFeaturePosts()
            handleReset()
        } catch (err) {
            console.error('Feature post save failed', err)
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, image: reader.result as string }))
        }
        reader.readAsDataURL(file)
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Feature Posts</h1>
                    <p className="text-foreground/70 mt-2">Manage feature posts displayed on the landing page</p>
                </div>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Post
                </Button>
            </div>

            {showForm && (
                <Card className="p-6 mb-8 border border-border py-0">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-foreground">
                            {editingId ? 'Edit Feature Post' : 'Add Feature Post'}
                        </h2>
                        <button onClick={handleReset} className="text-foreground/60 hover:text-foreground">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Feature Image *</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="cursor-pointer"
                                required={!editingId && !formData.image}
                            />
                            {formData.image && (
                                <div className="mt-2 h-32 w-32 relative rounded overflow-hidden bg-muted flex items-center justify-center">
                                    <img src={formData.image} alt="Preview" className="object-cover w-full h-full" />
                                </div>
                            )}
                        </div>

                        <div>
                            <Label>Instagram URL *</Label>
                            <Input
                                value={formData.instagramUrl}
                                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                                placeholder="https://instagram.com/p/..."
                                required
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={formData.active}
                                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                            />
                            <Label>Active (Visible on landing page)</Label>
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                                {editingId ? 'Update Post' : 'Add Post'}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featurePosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden border border-border hover:shadow-md transition py-0">
                        <div className="h-48 relative bg-muted">
                            <img src={post.image} alt="Feature" className="w-full h-full object-cover" />
                            {!post.active && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
                                        Inactive
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <a
                                href={post.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline text-sm font-medium mb-4 block truncate"
                            >
                                {post.instagramUrl}
                            </a>
                            <div className="flex justify-end gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEdit(post)}
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={async () => {
                                        try {
                                            await deleteFeaturePost(post.id)
                                        } catch (err) {
                                            console.error('Delete post failed', err)
                                        }
                                    }}
                                    className="text-destructive border-destructive hover:bg-destructive/10"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {featurePosts.length === 0 && !loading && (
                <Card className="p-12 text-center border border-dashed">
                    <p className="text-foreground/60">No feature posts yet. Click "Add Post" to create one.</p>
                </Card>
            )}
        </div>
    )
}
