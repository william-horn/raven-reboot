import { Inter } from 'next/font/google'
import './globals.css'
import Wireframe from '@/components/Wireframe'
import Text from '@/components/Typography/Text'
import Image from "next/image";
import MainNav from '@/components/MainLayout/MainNav'
import Heading from '@/components/Typography/Heading'
import Link from "next/link";
import AccountAccessContainer from '@/components/MainLayout/AccountAccessContainer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Raven Official',
  description: 'By William Horn',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Wireframe/>

      {/* METADATA */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Titan+One&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Paytone+One&family=Titan+One&display=swap" rel="stylesheet"/>
      </head>
      
      {/* Main BODY content */}
      <body className={inter.className + " theme-dark bg-primary"}>
        <header>
          <div className="flex justify-between bg-secondary">
            {/* MAIN LOGO */}
            <div className="flex items-center pl-3">
              <div className="relative w-[48px] h-[48px]">
                <Image
                fill
                src="/images/logo3-128.png"
                sizes="50vw"
                className="translate-y-1 pointer-events-none select-none"
                />
              </div>
              <h1 
              className="p-4 text-6xl text-logo-third font-logo-2">
                <span className="text-logo-secondary">Ra</span>ven
                <span className="ml-3 text-sm tracking-wide text-logo">A repository of <Link href="https://www.wizard101.com/" className="underline">Wizard101</Link> statistics</span>
              </h1>
            </div>
            <AccountAccessContainer/>
          </div>
        </header>

        {/* Main NAVIGATION bar */}
        <MainNav/>

        {/* Render all PAGE content */}
        {children}


        {/* Render FOOTER content */}
        <footer>
          <div className="flex justify-center gap-3 bg-secondary">
            <div className="px-5 pt-20 pb-20 resource-section">
              <Heading className={{ self: "font-bold" }}>Resources</Heading>
              <ul>
                <li className="text-white "><Text>Wizard101 Official Wiki</Text></li>
                <li className="text-white "><Text>Next.js and Vercel</Text></li>
                <li className="text-white "><Text>YouTube Channel</Text></li>
              </ul>
            </div>
  
            <div className="px-5 pt-20 pb-20 resource-section">
              <Heading className={{ self: "font-bold" }}>Contacts</Heading>
              <ul>
                <li className="text-white"><Text>Email: <span className="underline">williamjosephhorn@gmail.com</span></Text></li>
                <li className="text-white"><Text>YouTube: <span className="underline">Christopher GoldHammer</span></Text></li>
                <li className="text-white"><Text>Discord: <span className="underline">Jack the Renaissance Cat</span></Text></li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
