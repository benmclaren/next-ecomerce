import './globals.css'
import Nav from './components/Nav'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { get } from 'http'
import Hydrate from './components/Hydrate'
import { Roboto, Lobster_Two } from "next/font/google"

// Define fonts
const roboto = Roboto({weight: ['400', '500', '700'], subsets:['latin']})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  // console.log(session)
  return (
    <html lang="en">
      {/* adding global font */}
      <body className={`mx-4 lg:mx-48 ${roboto.className}`}>
        {/* {Passing nav the user and when the session expires} */}
        <Hydrate>
          <Nav user={session?.user} expires={session?.expires as string}/>
          {children}
        </Hydrate>
      </body>
    </html>
  )
}
