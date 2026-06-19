import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// POST: Place an order/inquiry on a listing
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { listingId, buyerName, buyerEmail, buyerPhone, quantity } = body;

    if (!listingId || !buyerName || !buyerPhone || !quantity) {
      return NextResponse.json({ error: "Missing required fields (listingId, buyerName, buyerPhone, quantity)" }, { status: 400 });
    }

    // Verify listing exists and is approved
    const listing = await prisma.brokerListing.findUnique({
      where: { id: listingId }
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    if (listing.status !== "APPROVED") {
      return NextResponse.json({ error: "Listing is not active" }, { status: 400 });
    }

    // Create the order
    const order = await prisma.brokerOrder.create({
      data: {
        listingId,
        buyerId: session?.user ? (session.user as any).id : null,
        buyerName,
        buyerEmail: buyerEmail || "",
        buyerPhone,
        quantity,
        status: "PENDING",
        revenue: 0 // Recorded revenue can be updated by admin upon completion
      }
    });

    return NextResponse.json({ message: "Inquiry / Order submitted successfully! The owner and our brokerage team have been notified.", order });
  } catch (err: any) {
    console.error("POST marketplace order error:", err);
    return NextResponse.json({ error: err.message || "Failed to submit order" }, { status: 500 });
  }
}
