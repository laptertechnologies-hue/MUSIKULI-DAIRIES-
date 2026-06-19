import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session && session.user && (session.user as any).role === "ADMIN";
}

// GET: Fetch all listings and orders for admin board
export async function GET(req: NextRequest) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    if (action === "revenue") {
      // Calculate simple revenue stats grouped by product
      const completedOrders = await prisma.brokerOrder.findMany({
        where: { status: "COMPLETED" },
        include: { listing: true }
      });

      const revenueStats: Record<string, { product: string, sales: number, cost: number, net: number, count: number }> = {};

      completedOrders.forEach(o => {
        const prod = o.listing.product;
        const rev = o.revenue || 0;
        const cst = o.cost || 0;
        if (!revenueStats[prod]) {
          revenueStats[prod] = { product: prod, sales: 0, cost: 0, net: 0, count: 0 };
        }
        revenueStats[prod].sales += rev;
        revenueStats[prod].cost += cst;
        revenueStats[prod].net += (rev - cst);
        revenueStats[prod].count += 1;
      });

      return NextResponse.json(Object.values(revenueStats));
    }

    // Default: return all listings with their orders
    const listings = await prisma.brokerListing.findMany({
      include: {
        user: {
          select: { name: true, email: true, phone: true }
        },
        orders: {
          include: {
            buyer: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: "desc" }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(listings);
  } catch (err: any) {
    console.error("GET admin marketplace error:", err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

// PUT: Update status of a listing or an order
export async function PUT(req: NextRequest) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { listingId, listingStatus, orderId, orderStatus, revenue, cost } = body;

    // 1. Update Listing Status
    if (listingId && listingStatus) {
      const listing = await prisma.brokerListing.update({
        where: { id: listingId },
        data: { status: listingStatus }
      });
      return NextResponse.json({ message: "Listing updated successfully", listing });
    }

    // 2. Update Order Status and Revenue/Cost metrics
    if (orderId) {
      const updateData: any = {};
      if (orderStatus) updateData.status = orderStatus;
      if (revenue !== undefined) updateData.revenue = parseFloat(revenue);
      if (cost !== undefined) updateData.cost = parseFloat(cost);

      const order = await prisma.brokerOrder.update({
        where: { id: orderId },
        data: updateData,
        include: { listing: true }
      });
      return NextResponse.json({ message: "Order updated successfully", order });
    }

    return NextResponse.json({ error: "Invalid parameters. Specify listingId or orderId" }, { status: 400 });
  } catch (err: any) {
    console.error("PUT admin marketplace error:", err);
    return NextResponse.json({ error: err.message || "Failed to update record" }, { status: 500 });
  }
}

// DELETE: Delete a listing
export async function DELETE(req: NextRequest) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { listingId } = body;

    if (!listingId) {
      return NextResponse.json({ error: "Missing listingId" }, { status: 400 });
    }

    await prisma.brokerListing.delete({
      where: { id: listingId }
    });

    return NextResponse.json({ message: "Listing deleted successfully from marketplace" });
  } catch (err: any) {
    console.error("DELETE admin marketplace error:", err);
    return NextResponse.json({ error: "Failed to delete listing" }, { status: 500 });
  }
}
