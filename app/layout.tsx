import './globals.css';
import { Raleway } from 'next/font/google';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import LoginModal from './components/modals/LoginModal';
import ToasterProvider from './providers/ToasterProvider';
import { getServerSession } from 'next-auth';
import { SafeUser } from './types';

const raleway = Raleway({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${raleway.className} bg-primary text-light`}>
        <Navbar currentUser={session?.user as SafeUser} />
        <RegisterModal />
        <LoginModal />
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
