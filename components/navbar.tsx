"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useVaultStore } from "@/store/vault-store"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/#watches", label: "Watches", anchor: "watches" },
  { href: "/#about", label: "About", anchor: "about" },
  { href: "/checkout", label: "Checkout", anchor: null },
  { href: "/#support", label: "Support", anchor: "support" },
]

export function Navbar() {
  const pathname = usePathname()
  const { openVault, itemCount } = useVaultStore()
  const { connected } = useWallet()
  const count = itemCount()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string | null) => {
    if (anchor && pathname === "/") {
      e.preventDefault()
      const element = document.getElementById(anchor)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
        setMobileMenuOpen(false)
      }
    } else if (anchor) {
      setMobileMenuOpen(false)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-muted/40 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-neon-cyan hover:text-neon-cyan/80 transition-colors"
            aria-label="GLITCH TIME Home"
          >
            <span>GLITCH TIME</span>
            <span className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
          </Link>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.anchor)}
                className={cn(
                  "text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors relative group",
                  pathname === link.href && "text-neon-cyan"
                )}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-cyan transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop: Vault Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={openVault}
              className="hidden md:flex items-center gap-2 text-gray-300 hover:text-neon-cyan"
              aria-label="Open Vault"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Vault</span>
              {count > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs">
                  {count}
                </span>
              )}
            </Button>

            {/* Desktop: Wallet Connect */}
            <div className="hidden md:block">
              <WalletMultiButton className="!bg-transparent !border !border-neon-cyan !text-neon-cyan hover:!bg-neon-cyan/10" />
            </div>

            {/* Mobile: Hamburger Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5 text-gray-300" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-neon-cyan">
                <SheetHeader>
                  <SheetTitle className="text-neon-cyan">GLITCH TIME</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.anchor)}
                      className={cn(
                        "text-base font-medium text-gray-300 hover:text-neon-cyan transition-colors",
                        pathname === link.href && "text-neon-cyan"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-muted">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        openVault()
                        setMobileMenuOpen(false)
                      }}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Vault
                      {count > 0 && (
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs">
                          {count}
                        </span>
                      )}
                    </Button>
                    <div className="mt-4">
                      <WalletMultiButton className="!w-full !bg-transparent !border !border-neon-cyan !text-neon-cyan hover:!bg-neon-cyan/10" />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

