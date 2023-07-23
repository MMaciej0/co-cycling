import './globals.css';
import { Raleway } from 'next/font/google';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import LoginModal from './components/modals/LoginModal';
import ToasterProvider from './providers/ToasterProvider';

const raleway = Raleway({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${raleway.className} bg-primary text-light`}>
        <Navbar />
        <RegisterModal />
        <LoginModal />
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
