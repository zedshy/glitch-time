"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/types/product"

interface VaultItem {
  product: Product
  quantity: number
}

interface VaultStore {
  isOpen: boolean
  items: VaultItem[]
  openVault: () => void
  closeVault: () => void
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearVault: () => void
  itemCount: () => number
  total: () => number
}

export const useVaultStore = create<VaultStore>()(
  persist(
    (set, get) => ({
      isOpen: false,
      items: [],
      openVault: () => set({ isOpen: true }),
      closeVault: () => set({ isOpen: false }),
      addItem: (product) => {
        const items = get().items
        const existingItem = items.find((item) => item.product.id === product.id)
        
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({ items: [...items, { product, quantity: 1 }] })
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        })
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })
      },
      clearVault: () => set({ items: [] }),
      itemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
      total: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        )
      },
    }),
    {
      name: "vault-storage",
    }
  )
)

