import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Kosugi_Maru } from "next/font/google"
import type { NextPage } from 'next'
import { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Navbar from './components/Navbar'
import { signOut } from 'next-auth/react'

const kosugi = Kosugi_Maru({ subsets: ["latin"], weight: "400" })

type NextPageWithLayout = NextPage & {
  getLayout: (page: ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<SessionProvider session={session}>
    <Navbar signOut={signOut} />
    <main className={kosugi.className} style={{ height: "100%" }}>
      <QueryClientProvider client={queryClient}>
        <Component  {...pageProps} />
      </QueryClientProvider>
    </main>
  </SessionProvider>)
}
