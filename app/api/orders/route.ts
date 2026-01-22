import { NextRequest, NextResponse } from "next/server"

// In-memory store for demo (use a database in production)
const orders: any[] = []

// Generate tracking number
function generateTrackingNumber(): string {
  const prefix = "GT"
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}${timestamp}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const trackingNumber = generateTrackingNumber()
    
    const order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      trackingNumber,
      walletAddress: body.walletAddress,
      customerInfo: body.customerInfo || {},
      items: body.items,
      total: body.total,
      status: "pending",
      shippingStatus: "processing",
      createdAt: new Date().toISOString(),
      txSignature: null,
    }

    orders.push(order)

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  
  // Simple admin token check (use proper auth in production)
  if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN || "demo-admin-token"}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json(orders.reverse(), { status: 200 })
}

