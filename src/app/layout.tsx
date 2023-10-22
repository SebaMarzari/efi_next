'use client'
import { useEffect, useState } from 'react'
import { Layout } from 'antd'
import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar } from './components'
import Provider from './context/Provider/Provider'
import { AuthContextProvider } from './context/AuthContextProvider/AuthContextProvider'
import { usePathname } from 'next/navigation'

const { Header, Content, Footer } = Layout
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showLayout, setShowLayout] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.includes('access')) {
      setShowLayout(false)
    } else {
      setShowLayout(true)
    }
  }, [pathname])

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Provider>
            <Layout>
              {
                showLayout && (
                  <Header className='header'>
                    <Navbar />
                  </Header>
                )
              }
              <Content
                className='content'
                style={{
                  height: !showLayout ? '100vh' : 'calc(100vh - 10rem)',
                }}
              >
                {children}
              </Content>
              {
                showLayout && (
                  <Footer className='footer'>Footer</Footer>
                )
              }
            </Layout>
          </Provider>
        </AuthContextProvider>
      </body>
    </html>
  )
}