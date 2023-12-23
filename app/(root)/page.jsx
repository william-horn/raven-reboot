

/*
  This is the home page component, meaning it should remain a server-side component. Therefore,
  for button-testing purposes, we must create a client component that handles the interactivity logic
  between the user and the button, and nest the button in said client component.
*/

import Page from "@/components/Page";
import SearchBar from "@/components/Searchbar";

const LandingPage = function() {
  return (
    <Page>
      <Page.Content large>
        <SearchBar
        />
      </Page.Content>
    </Page>
  )
}

export default LandingPage;
