import { Inter } from 'next/font/google'
import './globals.css'
import Wireframe from '@/components/Wireframe'
import Text from '@/components/Typography/Text'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Raven Official',
  description: 'By William Horn',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Wireframe/>
      <head>
        {/* <title>Raven Official</title> */}
      </head>
      <body className={inter.className + " theme-dark bg-page"}>
        <header>
          <h1 className="px-2 py-4 text-6xl">Raven</h1>
          <div>

          </div>
        </header>

        {children}

        <footer>
          <div className="flex justify-center gap-3">
            <div className="">
              <Text>Something</Text>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
