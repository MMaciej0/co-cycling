import './globals.css';
import { Raleway } from 'next/font/google';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import LoginModal from './components/modals/LoginModal';
import CreateModal from './components/modals/CreateModal';
import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';
import { SafeUser } from './types';

const raleway = Raleway({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${raleway.className} bg-primary text-light`}>
        <Navbar currentUser={user as SafeUser} />
        <RegisterModal />
        <LoginModal />
        <CreateModal />
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
