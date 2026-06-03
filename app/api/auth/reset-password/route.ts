export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { token, email, password } = await request.json();

    if (!token || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify token
    const dbToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token: token,
      },
    });

    if (!dbToken) {
      return NextResponse.json({ error: 'Invalid reset link or link has already been used' }, { status: 400 });
    }

    // Check expiry
    if (new Date() > dbToken.expires) {
      // Clean up expired token
      await prisma.verificationToken.delete({
        where: { token: token },
      });
      return NextResponse.json({ error: 'Reset link has expired. Please request a new one.' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Delete token so it cannot be used again
    await prisma.verificationToken.delete({
      where: { token: token },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Reset Password API error:', error);
    return NextResponse.json({ error: 'Failed to reset password. Please try again later.' }, { status: 500 });
  }
}
