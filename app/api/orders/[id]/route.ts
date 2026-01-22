import { NextRequest, NextResponse } from "next/server"

// In-memory store (use a database in production)
const orders: any[] = []

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const orderId = params.id

    // In a real app, update the database
    // For demo, we'll just return success
    const order = {
      id: orderId,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(order, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    )
  }
}

