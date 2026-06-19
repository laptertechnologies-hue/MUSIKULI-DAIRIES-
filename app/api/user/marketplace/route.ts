import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Fetch user's listings and the orders received on them
    const listings = await prisma.brokerListing.findMany({
      where: { userId },
      include: {
        orders: {
          orderBy: { createdAt: "desc" }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    // Fetch orders placed by this user on other listings
    const ordersPlaced = await prisma.brokerOrder.findMany({
      where: { buyerId: userId },
      include: {
        listing: {
          include: {
            user: {
              select: { name: true, email: true, phone: true }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ listings, ordersPlaced });
  } catch (err: any) {
    console.error("GET user marketplace error:", err);
    return NextResponse.json({ error: "Failed to fetch marketplace data" }, { status: 500 });
  }
}
