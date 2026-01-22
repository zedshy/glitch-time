"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ExternalLink, Lock } from "lucide-react"

interface Order {
  id: string
  walletAddress: string
  items: Array<{ productId: string; quantity: number }>
  total: number
  status: string
  txSignature: string | null
  createdAt: string
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [token, setToken] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  const fetchOrders = async () => {
    if (!token) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 401) {
        setError("Invalid admin token")
        setAuthenticated(false)
        return
      }

      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }

      const data = await response.json()
      setOrders(data)
      setAuthenticated(true)
    } catch (err: any) {
      setError(err.message || "Failed to fetch orders")
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    if (token) {
      fetchOrders()
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-muted">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-neon-cyan">Admin Access</CardTitle>
            </div>
            <CardDescription>
              Enter admin token to view orders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Admin Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="bg-muted"
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button onClick={handleLogin} className="w-full">
              Access Dashboard
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Demo token: demo-admin-token
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-neon-cyan">ORDERS DASHBOARD</h1>
          <Button variant="outline" onClick={() => setAuthenticated(false)}>
            Logout
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <Card className="border-muted">
            <CardContent className="py-12 text-center text-muted-foreground">
              No orders found
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="border-muted">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-neon-cyan mb-2">
                        {order.id}
                      </CardTitle>
                      <CardDescription>
                        {new Date(order.createdAt).toLocaleString()}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        order.status === "completed" ? "default" : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Wallet Address
                    </p>
                    <p className="text-sm font-mono text-white break-all">
                      {order.walletAddress}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total</p>
                    <p className="text-lg font-bold text-neon-cyan">
                      {order.total.toFixed(2)} USDT
                    </p>
                  </div>
                  {order.txSignature && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Transaction Signature
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-mono text-white break-all flex-1">
                          {order.txSignature}
                        </p>
                        <a
                          href={`https://explorer.solana.com/tx/${order.txSignature}?cluster=devnet`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neon-cyan hover:text-neon-cyan/80"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Items</p>
                    <div className="space-y-1">
                      {order.items.map((item: any, idx: number) => (
                        <p key={idx} className="text-sm text-white">
                          Product {item.productId} × {item.quantity}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

