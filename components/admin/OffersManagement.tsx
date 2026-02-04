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

interface Offer {
  id: string
  title: string
  description: string
  discount: number
  validFrom: string
  validTo: string
  code: string
}

const INITIAL_OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Early Bird Special',
    description: 'Book 7 days in advance for 15% discount',
    discount: 15,
    validFrom: '2024-01-01',
    validTo: '2024-03-31',
    code: 'EARLYBIRD15',
  },
  {
    id: '2',
    title: 'Weekly Stay Discount',
    description: 'Stay for 7+ nights and get 20% off',
    discount: 20,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    code: 'WEEKLY20',
  },
]

export default function OffersManagement() {
  const { offers, loading, error, fetchOffers, addOffer, updateOffer, deleteOffer } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount: 0,
    validFrom: '',
    validTo: '',
    code: '',
  })

  const handleReset = () => {
    setFormData({ title: '', description: '', discount: 0, validFrom: '', validTo: '', code: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (offer: Offer) => {
    setFormData(offer)
    setEditingId(offer.id)
    setShowForm(true)
  }

  useEffect(() => {
    fetchOffers().catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateOffer(editingId, { ...formData })
      } else {
        await addOffer({ ...formData })
      }
      await fetchOffers()
      handleReset()
    } catch (err) {
      console.error('Offer save failed', err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Offers & Promotions</h1>
          <p className="text-foreground/70 mt-2">Create and manage special offers and discount codes</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Offer
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8 border border-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-foreground">
              {editingId ? 'Edit Offer' : 'Create New Offer'}
            </h2>
            <button onClick={handleReset} className="text-foreground/60 hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Offer Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Early Bird Special"
                required
              />
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your offer..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Discount (%) *</Label>
                <Input
                  type="number"
                  value={formData.discount || ''}
                  onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) })}
                  placeholder="e.g., 15"
                  required
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <Label>Promo Code *</Label>
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., EARLYBIRD15"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Valid From *</Label>
                <Input
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Valid To *</Label>
                <Input
                  type="date"
                  value={formData.validTo}
                  onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                {editingId ? 'Update Offer' : 'Create Offer'}
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
        {offers.map((offer) => {
          const isActive = new Date(offer.validFrom) <= new Date() && new Date() <= new Date(offer.validTo)
          
          return (
            <Card key={offer.id} className={`p-6 border ${isActive ? 'border-green-500' : 'border-border'} hover:shadow-md transition`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-foreground">{offer.title}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {isActive ? '✓ Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-foreground/70 mb-3">{offer.description}</p>
                  <div className="flex gap-6 text-sm text-foreground/60 flex-wrap">
                    <div>
                      <span className="font-semibold text-foreground text-lg">{offer.discount}%</span>
                      <p className="text-xs">Discount</p>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">{offer.code}</span>
                      <p className="text-xs">Promo Code</p>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">
                        {new Date(offer.validFrom).toLocaleDateString()}
                      </span>
                      <p className="text-xs">Valid From</p>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">
                        {new Date(offer.validTo).toLocaleDateString()}
                      </span>
                      <p className="text-xs">Valid To</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(offer)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      try {
                        await deleteOffer(offer.id)
                        await fetchOffers()
                      } catch (err) {
                        console.error('Delete offer failed', err)
                      }
                    }}
                    className="flex items-center gap-2 text-destructive border-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {offers.length === 0 && !loading && (
        <Card className="p-12 text-center border border-dashed">
          <p className="text-foreground/60">No offers created yet. Click "Add Offer" to create your first promotion.</p>
        </Card>
      )}
    </div>
  )
}
