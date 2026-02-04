'use client';

import { Button } from '@/components/ui/button'

interface HeroProps {
  onExplore: () => void
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-secondary/30 to-muted flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4">
              <span className="text-sm font-semibold text-primary">BACKPACKER PARADISE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              The Hideout Hiraeth
            </h2>
            <p className="text-lg text-foreground/80 mb-4">
              An offbeat and peaceful hostel-cum-homestay; a concept of accommodation tailor-made for backpackers and open-minded travellers who are ready for raw & unfiltered experiences of travelling in mountains.
            </p>
            <p className="text-lg text-foreground/80 mb-8">
              Experience guided hiking, cycling tours, local village visits, and unforgettable mountain adventures near Manali.
            </p>
            
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={onExplore}
              >
                EXPLORE
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                Learn More
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-primary">4</h3>
                <p className="text-sm text-foreground/70">Beautiful Rooms</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">100+</h3>
                <p className="text-sm text-foreground/70">Happy Guests</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">5★</h3>
                <p className="text-sm text-foreground/70">Guest Rating</p>
              </div>
            </div>
          </div>

          <div className="relative h-96 md:h-full bg-muted rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 to-primary/20 flex items-center justify-center">
              <div className="text-center text-foreground/60">
                <div className="text-6xl mb-4">🏔️</div>
                <p>Mountain Views</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
