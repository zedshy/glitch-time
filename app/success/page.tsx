"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const signature = searchParams.get("signature")
  const trackingNumber = searchParams.get("tracking")
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const explorerUrl = signature
    ? `https://explorer.solana.com/tx/${signature}?cluster=devnet`
    : "#"

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className={`max-w-2xl w-full border-neon-cyan ${animate ? "animate-fade-in" : ""}`}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-20 w-20 text-green-500 animate-glow-pulse" />
          </div>
          <CardTitle className="text-4xl text-neon-cyan mb-2">
            ORDER CONFIRMED
          </CardTitle>
          <CardDescription className="text-lg">
            Your transaction has been successfully processed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {orderId && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Order ID</p>
              <p className="text-lg font-mono text-white break-all">{orderId}</p>
            </div>
          )}

          {trackingNumber && (
            <div className="p-4 bg-muted rounded-lg border border-neon-cyan/50">
              <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
              <p className="text-2xl font-bold font-mono text-neon-cyan break-all">{trackingNumber}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Use this number to track your shipment. You'll receive an email with tracking updates.
              </p>
            </div>
          )}

          {signature && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Transaction Signature</p>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-mono text-white break-all flex-1 min-w-0">
                  {signature}
                </p>
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-cyan hover:text-neon-cyan/80 transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/" className="flex-1">
              <Button className="w-full" size="lg">
                RETURN TO STORE
              </Button>
            </Link>
            {signature && (
              <a href={explorerUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full" size="lg">
                  VIEW ON EXPLORER
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            )}
          </div>

          <div className="text-center pt-4">
            <Badge variant="outline" className="text-xs">
              DEMO MODE - Solana Devnet
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

