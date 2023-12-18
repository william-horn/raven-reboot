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
import Icon from '@/components/Graphics/Icon'

const CardText = ({children}) => (
  <Text className={{self: "text-center text-primary leading-6 text-xl tracking-wide mt-10"}}>
    {children}
  </Text>
);

const HL1 = ({children, color="text-logo-third", underline, bold}) => (
  <span className={color + (underline ? " underline" : "") + (bold ? " font-bold" : "")}>
    {children}
  </span>
);

const HL2 = ({children, ...rest}) => (
  <HL1 color="text-logo-secondary" {...rest}>
    {children}
  </HL1>
);

export default function Home() {
  return (
    <main className="h-screen">

      {/* INTRO SECTION */}
      <div className="mx-auto bg-secondary md:w-[45%] w-full rounded mt-20 mb-28">
        <div className="p-10">
          <div className="relative w-[128px] h-[128px] mx-auto mb-10">
            <Image
            fill
            src="/images/logo3-128.png"
            sizes="100vw"
            className=" drop-shadow-[0_0_20px_#554b3a] select-none pointer-events-none animate-pulse"
            />
          </div>

          <CardText><HL2 bold>Raven</HL2> is a special project created by <span className="font-bold text-logo-third">William J. Horn</span> to make esoteric Wizard101 stats, such as drop rates, more accessible to the public.</CardText>
          <CardText>We primarily track <HL1 bold>drop rates.</HL1> Drop rates are the percentage chance of receiving a specific item every time you open a Chest, kill a Mob, open a Pack, etc.</CardText>

        </div>
      </div>


      <div className="w-full py-8 mx-auto bg-secondary">
        <div className="text-center">
          <Heading className={{self: "font-bold text-xl pb-10" }}>Where to Start</Heading>
          <Text>I dunno</Text>
          <Text className={{self: "w-[50%] mx-auto leading-6" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, odio asperiores. </Text>
        </div>
      </div>
    </main>
  )
}
