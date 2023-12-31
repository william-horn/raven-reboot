

/*
  This is the home page component, meaning it should remain a server-side component. Therefore,
  for button-testing purposes, we must create a client component that handles the interactivity logic
  between the user and the button, and nest the button in said client component.
*/

import Page from "@/components/Page";
import Content from "@/components/Content";
import Heading from "@/components/Typography/Heading";
import Text from "@/components/Typography/Text";


const LandingPage = function() {

  return (
    <Page className="relative pt-20">
      {/* <Image
      fill
      src="/images/dragon-mouth-cave-bg.jpg"
      className="absolute"
      /> */}

      <Content span="sm" className="z-[10] mx-auto relative">
        
        <Heading 
        textSize="3xl"
        className="text-heading">
          Explore Raven
        </Heading>

        <Text 
        className="mb-5 italic font-normal text-center text-muted">
          Begin searching Raven&apos;s database for statistics on a given item.
        </Text>
      </Content>
    </Page>
  )
}

export default LandingPage;
