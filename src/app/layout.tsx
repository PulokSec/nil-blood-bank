import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReduxStoreProvider from '@/redux/provider'
import { Toaster } from 'react-hot-toast'
import ProtectedRoutesData from '@/components/routes/ProtectedRoutesData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nil Blood bank',
  description: 'this page show you the primary interface of Our blood bank',
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "Pulok Chowdhury" },
    {
      name: "Pulok Chowdhury",
      url: "https://www.linkedin.com/in/pulokc/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "assets/blood-bank-icon.png" },
    { rel: "icon", url: "assets/blood-bank-icon.png" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      
        <body className={inter.className} suppressHydrationWarning={true}>
          <ReduxStoreProvider>
            <ProtectedRoutesData>
                  {children}
            </ProtectedRoutesData>
          </ReduxStoreProvider>          
          <Toaster
            position="top-center"
            reverseOrder={true}
          />
        </body>
      
    </html>
  )
}
