import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Inter } from 'next/font/google';
import WhatsAppButton from '@/components/WhatsappButton';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GBPS D-1 Area',
  description: 'Official school website of GBPS D-1 Area',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="max-w-6xl mx-auto p-4">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
