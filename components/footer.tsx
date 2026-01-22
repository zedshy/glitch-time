"use client"

import Link from "next/link"
import { Twitter, Instagram } from "lucide-react"

const currentYear = new Date().getFullYear()

const footerLinks = {
  explore: [
    { label: "Watches", href: "/#watches" },
    { label: "Drops", href: "/#watches" },
    { label: "About", href: "/#about" },
  ],
  support: [
    { label: "FAQ", href: "/#support" },
    { label: "Contact", href: "/#support" },
    { label: "Shipping & Returns", href: "/#support" },
  ],
  legal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund" },
  ],
}

export function Footer() {
  const isDemoMode = process.env.NEXT_PUBLIC_PAYMENT_MODE === "demo" || true // Default to demo for now

  return (
    <footer className="border-t border-muted/40 bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-neon-cyan">GLITCH TIME</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Luxury watches for the digital elite.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-cyan transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-cyan transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-neon-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-neon-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-neon-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider with neon glow */}
        <div className="border-t border-muted/40 my-8 relative">
          <div className="absolute inset-0 border-t border-neon-cyan/20 blur-sm" />
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {currentYear} GLITCH TIME. All rights reserved.</p>
          {isDemoMode && (
            <p className="text-xs text-muted-foreground">
              Demo Mode: Solana Devnet transactions only.
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}

