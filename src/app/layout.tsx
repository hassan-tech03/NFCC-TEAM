import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'New Friends Cricket Club - Official Website',
  description: 'Official website of New Friends Cricket Club',
  icons: {
    icon: 'https://res.cloudinary.com/dfy225ucr/image/upload/v1763752913/NFCC_qrgele.jpg',
    shortcut: 'https://res.cloudinary.com/dfy225ucr/image/upload/v1763752913/NFCC_qrgele.jpg',
    apple: 'https://res.cloudinary.com/dfy225ucr/image/upload/v1763752913/NFCC_qrgele.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
