import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react"
import Layout from '../components/Layout'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ 
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <main className={inter.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </SessionProvider>
  )
}