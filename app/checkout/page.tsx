"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useConnection } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useVaultStore } from "@/store/vault-store"
import { useRouter } from "next/navigation"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

interface CustomerInfo {
  name: string
  email: string
  address: string
  city: string
  state?: string // US/Other
  county?: string // UK
  zipCode?: string // US
  postcode?: string // UK
  country: string
}

export default function CheckoutPage() {
  const { publicKey, sendTransaction, connected } = useWallet()
  const { connection } = useConnection()
  const { items, total, clearVault } = useVaultStore()
  const totalAmount = total()
  const router = useRouter()
  
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [txSignature, setTxSignature] = useState<string>("")
  const [orderId, setOrderId] = useState<string>("")
  const [trackingNumber, setTrackingNumber] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "United Kingdom",
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isUK = customerInfo.country === "United Kingdom"
  const isUS = customerInfo.country === "United States"

  const countries = [
    "United Kingdom",
    "United States",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Belgium",
    "Switzerland",
    "Austria",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Poland",
    "Portugal",
    "Ireland",
    "Greece",
    "Czech Republic",
    "Hungary",
    "Romania",
    "Other",
  ]
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({})

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof CustomerInfo, string>> = {}
    
    if (!customerInfo.name.trim()) {
      errors.name = "Name is required"
    }
    if (!customerInfo.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = "Invalid email address"
    }
    if (!customerInfo.address.trim()) {
      errors.address = "Address is required"
    }
    if (!customerInfo.city.trim()) {
      errors.city = "City is required"
    }
    
    // UK-specific validation
    if (isUK) {
      if (!customerInfo.county?.trim()) {
        errors.county = "County is required"
      }
      if (!customerInfo.postcode?.trim()) {
        errors.postcode = "Postcode is required"
      }
    } 
    // US-specific validation
    else if (isUS) {
      if (!customerInfo.state?.trim()) {
        errors.state = "State is required"
      }
      if (!customerInfo.zipCode?.trim()) {
        errors.zipCode = "ZIP code is required"
      }
    }
    // Other countries - require state/province and postal code
    else {
      if (!customerInfo.state?.trim()) {
        errors.state = "State/Province is required"
      }
      if (!customerInfo.zipCode?.trim()) {
        errors.zipCode = "Postal code is required"
      }
    }
    
    if (!customerInfo.country.trim()) {
      errors.country = "Country is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCheckout = async () => {
    if (!connected || !publicKey) {
      setError("Please connect your wallet first")
      return
    }

    if (items.length === 0) {
      setError("Your vault is empty")
      return
    }

    if (!validateForm()) {
      setError("Please fill in all required fields")
      return
    }

    setStatus("processing")
    setError("")

    try {
      // Create order via API
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: publicKey.toString(),
          customerInfo,
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
          total: totalAmount,
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create order")
      }

      const order = await orderResponse.json()
      setOrderId(order.id)
      setTrackingNumber(order.trackingNumber)

      // Check wallet balance
      const balance = await connection.getBalance(publicKey)
      const requiredBalance = 0.001 * LAMPORTS_PER_SOL + 5000 // 0.001 SOL + fees
      
      if (balance < requiredBalance) {
        throw new Error(`Insufficient balance. You need at least ${(requiredBalance / LAMPORTS_PER_SOL).toFixed(4)} SOL (including fees). Get free devnet SOL from https://faucet.solana.com`)
      }

      // Get recent blockhash for transaction
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
      
      // Create transaction (demo: sending SOL instead of USDT for simplicity)
      // In production, you'd use SPL token transfer for USDT
      // Using a valid demo recipient address (Solana Foundation Devnet address)
      // This is a known devnet address that accepts transfers
      const demoRecipient = new PublicKey("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM") // Valid devnet address
      
      const transaction = new Transaction({
        blockhash,
        lastValidBlockHeight,
        feePayer: publicKey,
      }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: demoRecipient,
          lamports: 0.001 * LAMPORTS_PER_SOL, // Minimal amount for demo (0.001 SOL)
        })
      )

      // Send transaction
      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: false,
        maxRetries: 3,
      })
      setTxSignature(signature)

      // Verify transaction with timeout
      try {
        await Promise.race([
          connection.confirmTransaction({
            signature,
            blockhash,
            lastValidBlockHeight,
          }, "confirmed"),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Transaction confirmation timeout")), 30000)
          ),
        ])
      } catch (confirmError: any) {
        // Transaction might still be processing, but we have the signature
        console.warn("Confirmation warning:", confirmError.message)
        // Continue anyway since we have the signature
      }

      // Update order with transaction signature
      await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txSignature: signature }),
      })

      setStatus("success")
      clearVault()

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push(`/success?orderId=${order.id}&signature=${signature}&tracking=${order.trackingNumber}`)
      }, 2000)
    } catch (err: any) {
      setStatus("error")
      setError(err.message || "Transaction failed")
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-neon-cyan">
          <CardHeader className="text-center">
            <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-green-500" />
            <CardTitle className="text-neon-cyan">Transaction Successful!</CardTitle>
            <CardDescription>Redirecting to confirmation page...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-16 px-4 relative">
      {/* Background Support Image */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url(/media/images/checkout-support.png)' }}
        />
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <h1 className="text-4xl font-bold text-neon-cyan mb-8 text-center">
          CHECKOUT
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column: Customer Info & Order Summary */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="text-neon-cyan">Shipping Information</CardTitle>
                <CardDescription>Please provide your shipping details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className={formErrors.name ? "border-destructive" : ""}
                  />
                  {formErrors.name && (
                    <p className="text-xs text-destructive mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className={formErrors.email ? "border-destructive" : ""}
                  />
                  {formErrors.email && (
                    <p className="text-xs text-destructive mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Street Address <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="123 Main Street"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className={formErrors.address ? "border-destructive" : ""}
                  />
                  {formErrors.address && (
                    <p className="text-xs text-destructive mt-1">{formErrors.address}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    City <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder={isUK ? "London" : "New York"}
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                    className={formErrors.city ? "border-destructive" : ""}
                  />
                  {formErrors.city && (
                    <p className="text-xs text-destructive mt-1">{formErrors.city}</p>
                  )}
                </div>

                {/* UK-specific fields */}
                {isUK && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">
                        County <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Greater London"
                        value={customerInfo.county || ""}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, county: e.target.value, state: undefined, zipCode: undefined })}
                        className={formErrors.county ? "border-destructive" : ""}
                      />
                      {formErrors.county && (
                        <p className="text-xs text-destructive mt-1">{formErrors.county}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">
                        Postcode <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="SW1A 1AA"
                        value={customerInfo.postcode || ""}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, postcode: e.target.value, zipCode: undefined })}
                        className={formErrors.postcode ? "border-destructive" : ""}
                      />
                      {formErrors.postcode && (
                        <p className="text-xs text-destructive mt-1">{formErrors.postcode}</p>
                      )}
                    </div>
                  </>
                )}

                {/* US and Other countries fields */}
                {!isUK && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">
                        {isUS ? "State" : "State/Province"} <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder={isUS ? "NY" : "Province"}
                        value={customerInfo.state || ""}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, state: e.target.value, county: undefined, postcode: undefined })}
                        className={formErrors.state ? "border-destructive" : ""}
                      />
                      {formErrors.state && (
                        <p className="text-xs text-destructive mt-1">{formErrors.state}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">
                        {isUS ? "ZIP Code" : "Postal Code"} <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder={isUS ? "10001" : "Postal Code"}
                        value={customerInfo.zipCode || ""}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, zipCode: e.target.value, postcode: undefined })}
                        className={formErrors.zipCode ? "border-destructive" : ""}
                      />
                      {formErrors.zipCode && (
                        <p className="text-xs text-destructive mt-1">{formErrors.zipCode}</p>
                      )}
                    </div>
                  </>
                )}

                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Country <span className="text-destructive">*</span>
                  </label>
                  {mounted ? (
                    <Select
                      value={customerInfo.country || "United Kingdom"}
                      onValueChange={(value) => {
                        // Clear country-specific fields when changing country
                        setCustomerInfo({
                          ...customerInfo,
                          country: value,
                          state: value !== "United Kingdom" ? customerInfo.state : undefined,
                          county: value === "United Kingdom" ? customerInfo.county : undefined,
                          zipCode: value !== "United Kingdom" ? customerInfo.zipCode : undefined,
                          postcode: value === "United Kingdom" ? customerInfo.postcode : undefined,
                        })
                      }}
                    >
                      <SelectTrigger 
                        className={formErrors.country ? "border-destructive" : ""}
                        suppressHydrationWarning
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      type="text"
                      value={customerInfo.country || "United Kingdom"}
                      readOnly
                      className="bg-muted"
                      suppressHydrationWarning
                    />
                  )}
                  {formErrors.country && (
                    <p className="text-xs text-destructive mt-1">{formErrors.country}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="text-neon-cyan">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × {item.product.price} USDT
                      </p>
                    </div>
                    <p className="text-neon-cyan font-semibold">
                      {(item.product.price * item.quantity).toFixed(2)} USDT
                    </p>
                  </div>
                ))}
                <div className="border-t border-muted pt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">TOTAL</span>
                  <span className="text-2xl font-bold text-neon-cyan">
                    {totalAmount.toFixed(2)} USDT
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Payment */}
          <Card className="border-muted">
            <CardHeader>
              <CardTitle className="text-neon-cyan">Payment</CardTitle>
              <CardDescription>
                <Badge variant="outline" className="mt-2">
                  DEMO MODE - Solana Devnet
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!connected ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Connect your Solana wallet to proceed
                  </p>
                  {mounted && <WalletMultiButton className="w-full" />}
                  <div className="p-3 bg-muted/50 rounded-lg border border-muted">
                    <p className="text-xs text-muted-foreground">
                      💡 <strong>Demo Mode:</strong> Make sure your wallet is connected to <strong>Solana Devnet</strong>. You'll need devnet SOL for transactions. Get free devnet SOL from{" "}
                      <a 
                        href="https://faucet.solana.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-neon-cyan hover:underline"
                      >
                        faucet.solana.com
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Wallet Address</p>
                    <p className="text-sm text-white font-mono break-all">
                      {publicKey.toString()}
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive rounded-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                        <p className="text-sm text-destructive font-medium">{error}</p>
                      </div>
                      {error.includes("balance") && (
                        <a 
                          href="https://faucet.solana.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-neon-cyan hover:underline block mt-2"
                        >
                          → Get free devnet SOL from faucet.solana.com
                        </a>
                      )}
                    </div>
                  )}

                  {status === "processing" && (
                    <div className="p-4 bg-muted rounded-lg flex items-center gap-2">
                      <Loader2 className="h-5 w-5 text-neon-cyan animate-spin" />
                      <p className="text-sm text-white">Processing transaction...</p>
                    </div>
                  )}

                  <Button
                    onClick={handleCheckout}
                    disabled={status === "processing" || items.length === 0}
                    className="w-full"
                    size="lg"
                  >
                    {status === "processing" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "COMPLETE PURCHASE"
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

