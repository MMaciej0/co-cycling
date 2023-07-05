import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Raleway } from 'next/font/google';

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
        {children}
      </body>
    </html>
  );
}
