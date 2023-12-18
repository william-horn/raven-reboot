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

      <div className="mx-auto bg-secondary w-[45%] rounded mt-20 p-5 my-20">
        <div className="py-5">
          <Heading 
          className={{ self: "text-center text-3xl pb-6 font-extralight" }}>
            Welcome to Raven!
          </Heading>

          <Text className={{self: "text-center text-primary leading-6"}}>
            Raven is a modern app for Wizard101 players, which is designed to make technical information about 
            the game more accessible. We primarily focus on calculating drop rate percentages for mobs, packs, 
            etc, but anything in the game that is deducible we try to provide data for. We also have areas where 
            users can post any interesting discovery they've made in the game that is worth sharing (technical or not).
          </Text>
        </div>
      </div>


      <div className="w-full py-8 mx-auto bg-secondary">
        <div className="text-center">
          <Heading className={{self: "font-bold text-xl" }}>Where to Start</Heading>
          <Text>I dunno</Text>
          <Text className={{self: "w-[50%] mx-auto leading-6" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, odio asperiores. 
            Vitae iure adipisci mollitia fuga assumenda ad maxime consequatur, soluta delectus, placeat 
            quisquam repellendus dolorum? Rerum, recusandae similique sunt laboriosam amet impedit sequi at 
            accusantium. Illo, ipsam nam eum sapiente, suscipit maiores hic culpa vel accusantium eius molestias fuga.
          </Text>
        </div>
      </div>
    </main>
  )
}
