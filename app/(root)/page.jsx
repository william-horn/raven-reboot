

/*
  This is the home page component, meaning it should remain a server-side component. Therefore,
  for button-testing purposes, we must create a client component that handles the interactivity logic
  between the user and the button, and nest the button in said client component.
*/

import Page from "@/components/Page";
// import SearchBar from "@/components/Searchbar";
import SearchContent from "@/components/Pages/root/SearchContent";
import Heading from "@/components/Typography/Heading";
import Text from "@/components/Typography/Text";
import DropdownSelection from "@/components/Buttons/DropdownSelection";
import { StatelessButton } from "@/components/Buttons/Buttons";

const LandingPage = function() {
  return (
    <Page>
      <Page.Content small className="mt-20">
        
        <Heading 
        center 
        className={{
          self: "text-2xl text-heading"
        }}>
          Explore Raven
        </Heading>

        <Text 
        center 
        className={{ self: "mb-3 italic text-muted" }}>
          Begin searching Raven's database for statistics on a given item.
        </Text>
      </Page.Content>
      
      <SearchContent/>
    </Page>
  )
}

export default LandingPage;
