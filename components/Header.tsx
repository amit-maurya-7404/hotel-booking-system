'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
  const router = useRouter()

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogoClick}>
          {/* Logo Image */}
          <div className="relative w-10 h-10 hidden sm:block">
            <Image
              src="/logo.svg"
              alt="The Hideout Hiraeth Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-primary hover:opacity-80 transition">The Hideout Hiraeth</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-foreground hover:text-primary transition">About</Link>
          <Link href="/activities" className="text-foreground hover:text-primary transition">Activities</Link>
          <Link href="/blog" className="text-foreground hover:text-primary transition">Blog</Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition">Contact</Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin" className="px-4 py-2 bg-muted text-foreground rounded-lg hover:opacity-90 transition text-sm font-medium">
            Admin
          </Link>
          <a href="https://wa.me/919015453068" target="_blank" rel="noopener noreferrer" 
             className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition text-sm font-medium">
            WhatsApp
          </a>
        </div>
      </nav>
    </header>
  )
}
