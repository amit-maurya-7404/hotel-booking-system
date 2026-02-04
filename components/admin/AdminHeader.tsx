import { LogOut } from 'lucide-react'

export default function AdminHeader() {
  return (
    <header className="bg-white border-b border-border px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-foreground">The Hideout Hiraeth</h1>
        <p className="text-xs text-foreground/60">Admin Panel</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">Admin User</p>
          <p className="text-xs text-foreground/60">admin@thehideouthiraeth.com</p>
        </div>
        <button className="p-2 hover:bg-muted rounded-lg transition text-foreground/70 hover:text-foreground">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
