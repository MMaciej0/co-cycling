import bcrypt from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import StravaProvider from 'next-auth/providers/strava';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/app/libs/db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_CLIENT_ID as string,
      clientSecret: process.env.STRAVA_CLIENT_SECRET as string,
    }),
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
    jwt({ token, session }) {
      console.log('jwt', { token, session });
      return token;
    },
    session({ session, token }) {
      console.log('session', { token, session });
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
