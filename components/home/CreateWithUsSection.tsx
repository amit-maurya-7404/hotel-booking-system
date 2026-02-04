'use client'

import { Camera, PenTool } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CreateWithUsSection() {
  return (
    <section className="py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-black text-center mb-16 text-foreground">
          Create with us!
        </h2>

        <div className="flex items-center justify-center gap-12 max-w-2xl mx-auto">
          {/* Click Great Pictures */}
          <div className="flex-1 space-y-8 text-center">
            <div className="flex justify-center">
              <Camera className="w-16 h-16 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-black text-foreground leading-relaxed">
              CLICK<br/>GREAT<br/>PICTURES
            </h3>
            <Button className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 text-base">
              CLICK
            </Button>
          </div>

          {/* OR Divider */}
          <div className="text-3xl font-bold text-muted-foreground">OR</div>

          {/* Write */}
          <div className="flex-1 space-y-8 text-center">
            <div className="flex justify-center">
              <PenTool className="w-16 h-16 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-black text-foreground">
              WRITE
            </h3>
            <Button className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 text-base">
              WRITE
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
