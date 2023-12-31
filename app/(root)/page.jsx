

/*
  This is the home page component, meaning it should remain a server-side component. Therefore,
  for button-testing purposes, we must create a client component that handles the interactivity logic
  between the user and the button, and nest the button in said client component.
*/
import Page from "@/components/Page";
import Content from "@/components/Content";
import Heading from "@/components/Typography/Heading";
import Text from "@/components/Typography/Text";
import Image from "next/image";
import Link from "next/link";
import { getResponsivePadding, getResponsiveTextSize } from "@/libs/utils/responsiveStyles";
import { StatelessLink, StatelessButton } from "@/components/Buttons/Buttons";
import Divider from "@/components/Divider";

const LandingPage = function() {

  return (
    <Page className="relative">
        <Image
        src="/images/novus-black-and-white-room-bg.jpg"
        priority
        fill
        sizes="(min-width: 1024px) 1920px, (min-width: 640px) 96px, 512px"
        className="absolute object-cover pointer-events-none select-none brightness-[0.6]"
        />

      <Divider direction="horizontal" size="3xl"/>
      
      <Content span="max" className="relative">
        <Content span="max" className="flex flex-col items-center mx-auto">
          {/* Main page - Get Started styles */}
          <div className="p-3 group">
            <StatelessLink
            href="/search"
            className={{self: `
              ${getResponsiveTextSize('2xl')} 
              ${getResponsivePadding('xl')} 
              text-white font-extralight font-gf-2 rounded-none 
              bg-landing-page-entry-button hover:bg-landing-page-entry-button-hover shadow-[5px_5px_30px_black] 
              relative transition-all group-hover:animate-bounce select-none
            `}}>
              <span className="drop-shadow-[0_0_10px_black]">Explore Raven</span>
            </StatelessLink>
          </div>
        </Content>

        <Divider direction="horizontal" size="3xs"/>
        
        <Content span="max">
          <Content span="xs" className="mx-auto">
            <Text 
            textSize="xl"
            className="font-normal text-center drop-shadow-[0_0_15px_black]">
              Wizard101's largest repository for user-collected game statistics such as drop
              rates for <span className="underline cursor-pointer text-hyperlink">Packs</span>,&nbsp;
              <span className="underline cursor-pointer text-hyperlink">Creatures</span>,&nbsp;
              <span className="underline cursor-pointer text-hyperlink">Chests</span>,&nbsp;
              and much more!
            </Text>
          </Content>
        </Content>
      </Content>
    </Page>
  )
}

export default LandingPage;
