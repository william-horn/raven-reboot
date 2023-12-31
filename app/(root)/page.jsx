

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
        // priority
        fill
        // sizes="(min-width: 1024px) 192px, (min-width: 640px) 96px, 48px"
        className="absolute object-cover pointer-events-none select-none brightness-[0.6]"
        />

      <Divider direction="horizontal" size="3xl"/>
      
      <Content span="max" className="relative">
        <Content span="max" className="flex flex-col items-center mx-auto">
          {/* Main page - Get Started styles */}
          <div className="p-3 group">
            <StatelessLink
            href="/about"
            className={{self: `
              ${getResponsiveTextSize('2xl')} 
              ${getResponsivePadding('xl')} 
              text-white font-extralight font-gf-2 rounded-none 
              bg-red-600 hover:bg-red-700 shadow-[5px_5px_30px_black] 
              relative transition-all group-hover:animate-bounce
            `}}>
              <span>Explore Raven</span>
            </StatelessLink>
          </div>
        </Content>

        <Divider direction="horizontal" size="md"/>
        
        <Content span="max">
          <Text 
          textSize="xl"
          className="font-normal text-center">
            Begin searching Raven&apos;s database for statistics on a given item.
          </Text>
        </Content>
      </Content>
    </Page>
  )
}

export default LandingPage;
