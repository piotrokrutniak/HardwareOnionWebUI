import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HardwareOnion',
  description: 'HardwareOnion Web Store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en ">
      <body className={`min-w-mobile h-auto  ${inter.className}`}>{children}</body>
    </html>
  )
}
