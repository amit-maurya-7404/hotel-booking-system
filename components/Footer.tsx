import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main tagline */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-lg leading-relaxed opacity-90">
            The end of our webpage doesn't have to be the end of your craze. Come, absorb a whole new meaning of travel with The Hideout Hiraeth homely offbeat stays and exciting experiences by exploring things in the most unfiltered ways.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* About Us Column */}
          <div>
            <h3 className="text-sm font-bold mb-6 uppercase tracking-wide">About us</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link href="#about" className="hover:opacity-100 transition">About</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Blog</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Volunteer</Link></li>
            </ul>
          </div>

          {/* Policies Column */}
          <div>
            <h3 className="text-sm font-bold mb-6 uppercase tracking-wide">Policies</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link href="#" className="hover:opacity-100 transition">Guest policy</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Refund and cancellation policy</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Privacy policy</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Terms and conditions</Link></li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="text-sm font-bold mb-6 uppercase tracking-wide">Contact details</h3>
            <div className="space-y-4 text-sm opacity-80">
              <div>
                <p className="opacity-60 text-xs mb-1">Email:</p>
                <a href="mailto:contact@thehideouthiraeth.com" className="hover:opacity-100 transition">
                  contact@thehideouthiraeth.com
                </a>
              </div>
              <div>
                <p className="opacity-60 text-xs mb-1">WhatsApp support:</p>
                <a href="https://wa.me/919015453068" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition">
                  +91 90154 53068
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          {/* Brand Name */}
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold uppercase tracking-wider">
              THE HIDEOUT HIRAETH
            </h2>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs opacity-70">
            <p>© 2025 The Hideout Hiraeth. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
