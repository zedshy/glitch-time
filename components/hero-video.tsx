"use client"

import { Button } from "@/components/ui/button"
import { useVaultStore } from "@/store/vault-store"
import { ShoppingBag } from "lucide-react"

export function HeroVideo() {
  const { openVault, itemCount } = useVaultStore()
  const count = itemCount()

  const scrollToCollection = () => {
    const watchesSection = document.getElementById("watches")
    if (watchesSection) {
      watchesSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fallback gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-950/20 to-black" />
      
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        onError={(e) => {
          // Hide video if it fails to load
          e.currentTarget.style.display = 'none'
        }}
      >
        <source src="/media/video/hero.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-bold text-neon-cyan mb-6 tracking-wider">
          GLITCH TIME
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
          Luxury timepieces for the digital age
        </p>
        <div className="flex gap-4">
          <Button size="lg" className="text-lg px-8" onClick={scrollToCollection}>
            EXPLORE COLLECTION
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 relative"
            onClick={openVault}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            VAULT
            {count > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

