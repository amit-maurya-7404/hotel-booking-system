'use client'

import { LayoutGrid, Home, Calendar, DollarSign, FileText, Gift } from 'lucide-react'

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: any) => void
}

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'rooms', label: 'Rooms', icon: LayoutGrid },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'feature-posts', label: 'Feature Post', icon: FileText },
  { id: 'offers', label: 'Offers', icon: Gift },
  { id: 'blog', label: 'Blog', icon: FileText },
]

export default function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-sidebar border-r border-border">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-sidebar-foreground">THH</h2>
        <p className="text-xs text-sidebar-foreground/60 mt-1">Admin Control</p>
      </div>

      <nav className="p-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
