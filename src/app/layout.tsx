'use client'
import { Layout } from 'antd'
import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar } from './components'
import Provider from './context/Provider/Provider'
import { AuthContextProvider } from './context/AuthContextProvider/AuthContextProvider'

const { Header, Content, Footer } = Layout
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Provider>
            <Layout>
              <Header className='header'>
                <Navbar />
              </Header>
              <Content className='content'>{children}</Content>
              <Footer className='footer'>Footer</Footer>
            </Layout>
          </Provider>
        </AuthContextProvider>
      </body>
    </html>
  )
}