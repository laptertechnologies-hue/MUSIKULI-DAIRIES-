export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // To prevent user enumeration, we return 200 even if user doesn't exist.
    // However, we only perform the token generation and email sending if they exist.
    if (user) {
      // Generate standard random token
      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 3600000); // 1 hour expiry

      // Clean up any old tokens for this identifier
      await prisma.verificationToken.deleteMany({
        where: { identifier: email },
      });

      // Save token in DB
      await prisma.verificationToken.create({
        data: {
          identifier: email,
          token,
          expires,
        },
      });

      // Construct reset URL using request origin
      const origin = new URL(request.url).origin;
      const resetUrl = `${origin}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

      // Setup nodemailer SMTP configuration matching Quote API
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
        from: process.env.SMTP_FROM || '"Musikuli Dairies" <no-reply@musikulidairies.com>',
        to: email,
        subject: 'Reset your Musikuli Dairies password',
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="${origin}/images/logo.png" alt="Musikuli Dairies Logo" style="max-height: 60px;" />
              <h2 style="color: #1e3a8a; margin-top: 10px;">Musikuli Dairies Ltd</h2>
            </div>
            <h3 style="color: #111827;">Password Reset Request</h3>
            <p style="color: #4b5563; font-size: 0.95rem; line-height: 1.5;">
              You requested to reset the password for your Musikuli Dairies account. Click the button below to set a new password:
            </p>
            <div style="text-align: center; margin: 25px 0;">
              <a href="${resetUrl}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p style="color: #4b5563; font-size: 0.95rem; line-height: 1.5;">
              This link is only valid for <strong>1 hour</strong>. If you did not make this request, you can safely ignore this email.
            </p>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="color: #9ca3af; font-size: 0.8rem; text-align: center;">
              Musikuli Dairies Limited, Uganda.
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Forgot Password API error:', error);
    return NextResponse.json({ error: 'Failed to process password reset request. Please try again later.' }, { status: 500 });
  }
}
