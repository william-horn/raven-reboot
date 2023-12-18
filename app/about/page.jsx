import Image from 'next/image'
import Text from '@/components/Typography/Text'

/*
  This is the home page component, meaning it should remain a server-side component. Therefore,
  for button-testing purposes, we must create a client component that handles the interactivity logic
  between the user and the button, and nest the button in said client component.
*/
// import Button from '@/components/Buttons/Button'
// import ClientComponent from '@/components/ClientComponent'
import SearchBar from '@/components/Searchbar'
import emptyFunc from '@/util/emptyFunc'
import Heading from '@/components/Typography/Heading'

export default function Home() {
  return (
    <main className="h-screen">
      <div className="w-[30%] mx-auto">
        <Heading>Welcome to Home!</Heading>
      </div>
    </main>
  )
}
