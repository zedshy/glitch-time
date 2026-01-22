"use client"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useVaultStore } from "@/store/vault-store"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function VaultDrawer() {
  const { isOpen, closeVault, items, updateQuantity, removeItem, total } = useVaultStore()
  const totalAmount = total()
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    if (items.length > 0) {
      setGlitch(true)
      const timer = setTimeout(() => setGlitch(false), 300)
      return () => clearTimeout(timer)
    }
  }, [items])

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && closeVault()}>
      <DrawerContent className="border-neon-cyan">
        <DrawerHeader className={glitch ? "animate-glitch" : ""}>
          <DrawerTitle className="text-3xl text-neon-cyan">THE VAULT</DrawerTitle>
          <DrawerDescription className="text-gray-400">
            Your selected timepieces
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Your vault is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 border border-muted rounded-lg hover:border-neon-cyan transition-colors"
                >
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white mb-1 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.product.price} USDT
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center text-white">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <DrawerFooter className="border-t border-muted pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-white">TOTAL</span>
              <span className="text-2xl font-bold text-neon-cyan">
                {totalAmount.toFixed(2)} USDT
              </span>
            </div>
            <Link href="/checkout" className="w-full">
              <Button className="w-full" size="lg">
                PROCEED TO CHECKOUT
              </Button>
            </Link>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                CONTINUE SHOPPING
              </Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}

