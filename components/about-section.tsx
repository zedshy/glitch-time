"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Hammer, ShieldCheck, Sparkles } from "lucide-react"

const principles = [
  {
    icon: Hammer,
    title: "Craft & Scarcity",
    description: "Each timepiece is meticulously designed with limited production runs, ensuring exclusivity and lasting value.",
  },
  {
    icon: ShieldCheck,
    title: "On-Chain Ownership",
    description: "Your watch is verified on-chain. True digital ownership with immutable proof of authenticity.",
  },
  {
    icon: Sparkles,
    title: "Silent Confidence",
    description: "Luxury that speaks through design, not logos. For those who understand without explanation.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/media/video/ambient-loop.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Brand Story */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-neon-cyan mb-6">
              Time glitched. We refined it.
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                GLITCH TIME exists at the intersection of traditional luxury and digital innovation. 
                We do not follow trends—we create them. Each watch is a statement piece for the on-chain era, 
                where craftsmanship meets blockchain verification.
              </p>
              <p>
                Our timepieces are designed for those who understand that true luxury is understated, 
                verified, and timeless. No hype. No noise. Just exceptional design and immutable ownership.
              </p>
              <p className="text-neon-cyan font-medium">
                Luxury for the on-chain era.
              </p>
            </div>
          </div>

          {/* Right: Principles Cards */}
          <div className="grid gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <Card
                  key={index}
                  className="border-muted hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 group"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-muted group-hover:bg-neon-cyan/10 transition-colors">
                        <Icon className="h-5 w-5 text-neon-cyan" />
                      </div>
                      <CardTitle className="text-xl text-white">{principle.title}</CardTitle>
                    </div>
                    <div className="h-0.5 w-0 bg-neon-cyan group-hover:w-full transition-all duration-500" />
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 leading-relaxed">
                      {principle.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

