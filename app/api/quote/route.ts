export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized. Please log in to request a quote.' }, { status: 401 });
    }

    const { product, quantity, message } = await request.json();

    if (!product || !message) {
      return NextResponse.json({ error: 'Product and message are required fields' }, { status: 400 });
    }

    // Save to Database
    const quote = await prisma.quoteRequest.create({
      data: {
        userId: session.user.id as string,
        product,
        quantity: quantity?.toString(),
        message
      }
    });

    // Send Email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: 'info@musikulidairies.com',
      subject: `New Quote Request: ${product}`,
      html: `
        <h2>New Quote Request via Website</h2>
        <p><strong>From:</strong> ${session.user.name} (${session.user.email})</p>
        <p><strong>Product/Service:</strong> ${product}</p>
        <p><strong>Quantity (if applicable):</strong> ${quantity || 'N/A'}</p>
        <br/>
        <h3>Message:</h3>
        <p>${message}</p>
        <br/>
        <p><em>This quote was automatically generated and saved in the website database (Quote ID: ${quote.id}).</em></p>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, quote });
  } catch (error: any) {
    console.error('Quote Request Error:', error);
    return NextResponse.json({ error: 'Failed to submit quote request. Please try again later.' }, { status: 500 });
  }
}
