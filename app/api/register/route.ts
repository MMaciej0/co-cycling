import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/app/libs/db';

export async function POST(request: Request) {
  const body = await request.json();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (existingUser) {
    throw new Error('Email exist');
  }

  const hashedPassword = await bcrypt.hashSync(body.password, 12);

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
