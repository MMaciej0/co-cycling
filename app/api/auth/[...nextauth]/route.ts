import bcrypt from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/app/libs/db';
import { User } from '@prisma/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Creadentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('No email or password');
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('No user or wrong password');
        }

        const correctPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!correctPassword) {
          throw new Error('Wrong password');
        }

        return user;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/' },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: { ...session.user, id: token.id, favoriteIds: token.favoriteIds },
      };
    },
    jwt: async ({ token, user, session, trigger }) => {
      if (trigger === 'update' && session?.favoriteIds) {
        token.favoriteIds = session.favoriteIds;

        await prisma.user.update({
          where: {
            id: token.id as string,
          },
          data: {
            favoriteIds: token.favoriteIds as string[],
          },
        });
      }

      if (trigger === 'update' && session?.name) {
        token.name = session.name;

        await prisma.user.update({
          where: {
            id: token.id as string,
          },
          data: {
            name: token.name as string,
          },
        });
      }

      const customUser = user as unknown as User;
      if (customUser) {
        return {
          ...token,
          id: customUser.id,
          favoriteIds: customUser.favoriteIds,
        };
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
