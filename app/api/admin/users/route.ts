import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/admin/users — user count and list of all users
export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [count, users] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return NextResponse.json({ count, users });
}

// PUT /api/admin/users — promote/demote or activate/deactivate user
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, role, isActive } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Prevent administrative self-lockouts
    const currentAdminId = (session.user as any).id;
    if (id === currentAdminId || id === session.user?.email || id === session.user?.name) {
      // Find the user to confirm it is indeed the current session user
      const userToModify = await prisma.user.findUnique({ where: { id } });
      if (userToModify && userToModify.email === session.user?.email) {
        if (isActive === false) {
          return NextResponse.json({ error: 'You cannot deactivate your own account!' }, { status: 400 });
        }
        if (role === 'USER') {
          return NextResponse.json({ error: 'You cannot demote yourself from Admin!' }, { status: 400 });
        }
      }
    }

    const updateData: any = {};
    if (role !== undefined) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, name: true, email: true, role: true, isActive: true },
    });

    return NextResponse.json({ user: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Update failed' }, { status: 500 });
  }
}
