import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// GET: Get active approved listings
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // optional: BUY or SELL
    const product = searchParams.get("product"); // optional: Maize, Beans, Goats, Milk

    const whereClause: any = { status: "APPROVED" };
    if (type) whereClause.type = type;
    if (product) whereClause.product = product;

    const listings = await prisma.brokerListing.findMany({
      where: whereClause,
      include: {
        user: {
          select: { name: true, email: true, phone: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(listings);
  } catch (err: any) {
    console.error("GET marketplace listings error:", err);
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}

// POST: Create a new broker listing (requires authenticated user)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { type, product, quantity, price, description, contactName, contactPhone, contactEmail } = body;

    if (!type || !product || !quantity) {
      return NextResponse.json({ error: "Missing required fields (type, product, quantity)" }, { status: 400 });
    }

    if (type !== "BUY" && type !== "SELL") {
      return NextResponse.json({ error: "Invalid type. Must be BUY or SELL" }, { status: 400 });
    }

    const listing = await prisma.brokerListing.create({
      data: {
        userId: (session.user as any).id,
        type,
        product,
        quantity,
        price: price || "Negotiable",
        description,
        contactName: contactName || session.user.name,
        contactPhone: contactPhone || "",
        contactEmail: contactEmail || session.user.email,
        status: (session.user as any).role === "ADMIN" ? "APPROVED" : "PENDING"
      }
    });

    return NextResponse.json({ message: "Listing created successfully. Awaiting administrator approval.", listing });
  } catch (err: any) {
    console.error("POST marketplace listing error:", err);
    return NextResponse.json({ error: err.message || "Failed to create listing" }, { status: 500 });
  }
}
