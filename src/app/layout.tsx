import { Layout } from 'antd'
import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar } from './components'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'EFI - Next.js',
    template: '%s | EFI - Next.js',
  },
  description: 'EFI - Next.js',
  keywords: 'Next.js, React, TypeScript, Ant Design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          <div className='header'>
            <Navbar />
          </div>
          <div
            className='content'
            style={{
              height: 'calc(100vh - 10rem)',
            }}
          >
            {children}
          </div>
          <div className='footer'>© 2023 Copyright: Marzari - Moreno</div>
        </Layout>
      </body>
    </html>
  )
}