"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useVaultStore } from "@/store/vault-store"
import { ShoppingBag } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useVaultStore()

  const handleAddToVault = () => {
    addItem(product)
  }

  return (
    <Card className="group border-muted hover:border-neon-cyan transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-square overflow-hidden rounded-t-lg bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        <p className="text-2xl font-bold text-neon-cyan">
          {product.price} USDT
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToVault}
          className="w-full group-hover:animate-glow-pulse"
          variant="outline"
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          ADD TO VAULT
        </Button>
      </CardFooter>
    </Card>
  )
}

