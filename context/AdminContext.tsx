'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api'

export interface Room {
  id: string
  name: string
  type: 'dorm' | 'private'
  capacity: number
  price: number
  amenities: string[]
  available: boolean
}

export interface Booking {
  id: string
  guestName: string
  email: string
  phone: string
  roomId: string
  room?: string
  checkIn: string
  checkOut: string
  price: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'checked-in' | 'completed'
}

export interface BlogPost {
  id: string
  title: string
  author: string
  category: string
  excerpt: string
  content: string
  date: string
  image: string
  status: 'draft' | 'published'
}

export interface Offer {
  id: string
  title: string
  description: string
  discount: number
  validFrom: string
  validTo: string
  code: string
  active?: boolean
}

interface AdminContextType {
  rooms: Room[]
  bookings: Booking[]
  blogPosts: BlogPost[]
  offers: Offer[]
  loading: boolean
  error: string | null
  
  // Room operations
  fetchRooms: () => Promise<void>
  addRoom: (room: Omit<Room, 'id'>) => Promise<void>
  updateRoom: (id: string, room: Omit<Room, 'id'>) => Promise<void>
  deleteRoom: (id: string) => Promise<void>
  
  // Booking operations
  fetchBookings: () => Promise<void>
  addBooking: (booking: Omit<Booking, 'id'>) => Promise<void>
  updateBooking: (id: string, booking: Omit<Booking, 'id'>) => Promise<void>
  deleteBooking: (id: string) => Promise<void>
  
  // Blog operations
  fetchBlogPosts: () => Promise<void>
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>
  updateBlogPost: (id: string, post: Omit<BlogPost, 'id'>) => Promise<void>
  deleteBlogPost: (id: string) => Promise<void>
  
  // Offer operations
  fetchOffers: () => Promise<void>
  addOffer: (offer: Omit<Offer, 'id'>) => Promise<void>
  updateOffer: (id: string, offer: Omit<Offer, 'id'>) => Promise<void>
  deleteOffer: (id: string) => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    await Promise.all([
      fetchRooms(),
      fetchBookings(),
      fetchBlogPosts(),
      fetchOffers(),
    ])
  }

  // ROOM OPERATIONS
  const fetchRooms = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_URL}/rooms`)
      if (!response.ok) throw new Error('Failed to fetch rooms')
      const data = await response.json()
      setRooms(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching rooms'
      setError(message)
      console.error(message)
    } finally {
      setLoading(false)
    }
  }

  const addRoom = async (room: Omit<Room, 'id'>) => {
    try {
      setError(null)
      const response = await fetch(`${API_URL}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(room),
      })
      if (!response.ok) throw new Error('Failed to add room')
      await fetchRooms()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error adding room'
      setError(message)
      throw err
    }
  }

  const updateRoom = async (id: string, room: Omit<Room, 'id'>) => {
    try {
      setError(null)
      const response = await fetch(`${API_URL}/rooms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(room),
      })
      if (!response.ok) throw new Error('Failed to update room')
      await fetchRooms()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating room'
      setError(message)
      throw err
    }
  }

  const deleteRoom = async (id: string) => {
    try {
      setError(null)
      const response = await fetch(`${API_URL}/rooms/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete room')
      await fetchRooms()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting room'
      setError(message)
      throw err
    }
  }

  // BOOKING OPERATIONS
  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_URL}/bookings`)
      if (!response.ok) throw new Error('Failed to fetch bookings')
      const data = await response.json()
      setBookings(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching bookings'
      setError(message)
      console.error(message)
    } finally {
      setLoading(false)
    }
  }

  const addBooking = async (booking: Omit<Booking, 'id'>) => {
    try {
      setError(null)
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      })
      if (!response.ok) throw new Error('Failed to add booking')
      await fetchBookings()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error adding booking'
      setError(message)
      throw err
    }
  }

  const updateBooking = async (id: string, booking: Omit<Booking, 'id'>) => {
    try {
      setError(null)
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      })
      if (!response.ok) throw new Error('Failed to update booking')
      await fetchBookings()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating booking'
      setError(message)
      throw err
    }
  }

  const deleteBooking = async (id: string) => {
    try {
      setError(null)
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete booking')
      await fetchBookings()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting booking'
      setError(message)
      throw err
    }
  }

  // BLOG OPERATIONS
  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_URL}/blogs`)
      if (!response.ok) throw new Error('Failed to fetch blog posts')
      const data = await response.json()
      setBlogPosts(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching blog posts'
      setError(message)
      console.error(message)
    } finally {
      setLoading(false)
    }
  }

  const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    try {
      setError(null)
      const response = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      })
      if (!response.ok) throw new Error('Failed to add blog post')
      await fetchBlogPosts()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error adding blog post'
      setError(message)
      throw err
    }
  }

  const updateBlogPost = async (id: string, post: Omit<BlogPost, 'id'>) => {
    try {
      setError(null)
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      })
      if (!response.ok) throw new Error('Failed to update blog post')
      await fetchBlogPosts()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating blog post'
      setError(message)
      throw err
    }
  }

  const deleteBlogPost = async (id: string) => {
    try {
      setError(null)
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete blog post')
      await fetchBlogPosts()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting blog post'
      setError(message)
      throw err
    }
  }

  // OFFER OPERATIONS
  const fetchOffers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_URL}/offers`)
      if (!response.ok) throw new Error('Failed to fetch offers')
      const data = await response.json()
      setOffers(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching offers'
      setError(message)
      console.error(message)
    } finally {
      setLoading(false)
    }
  }

  const addOffer = async (offer: Omit<Offer, 'id'>) => {
    try {
      setError(null)
      const response = await fetch(`${API_URL}/offers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer),
      })
      if (!response.ok) throw new Error('Failed to add offer')
      await fetchOffers()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error adding offer'
      setError(message)
      throw err
    }
  }

  const updateOffer = async (id: string, offer: Omit<Offer, 'id'>) => {
    try {
      setError(null)
      const response = await fetch(`${API_URL}/offers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer),
      })
      if (!response.ok) throw new Error('Failed to update offer')
      await fetchOffers()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating offer'
      setError(message)
      throw err
    }
  }

  const deleteOffer = async (id: string) => {
    try {
      setError(null)
      const response = await fetch(`${API_URL}/offers/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete offer')
      await fetchOffers()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting offer'
      setError(message)
      throw err
    }
  }

  return (
    <AdminContext.Provider
      value={{
        rooms,
        bookings,
        blogPosts,
        offers,
        loading,
        error,
        fetchRooms,
        addRoom,
        updateRoom,
        deleteRoom,
        fetchBookings,
        addBooking,
        updateBooking,
        deleteBooking,
        fetchBlogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        fetchOffers,
        addOffer,
        updateOffer,
        deleteOffer,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
