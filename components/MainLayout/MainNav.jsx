
"use client";

import SearchBar from "../Searchbar";

import { 
  StatelessButton, 
  StatefulButton, 
  StatefulLinkButton, 
  StatelessLinkButton 
} from "../Buttons/Buttons";

import DropdownSelection from "../Buttons/Dropdown";
import Text from "../Typography/Text";
import ButtonGroup from "../Buttons/ButtonGroup";
import { useRouter, usePathname } from "next/navigation";

const className = {
  // Page navigation //

  pageNavButtons: {
    self: "flex-row",
    buttons: {
      self: "gap-1",
      __selected: {
        self: "translate-y-2 rounded-b-none bg-primary hover:bg-primary underline"
      } 
    }
  }
}

const MainNav = function({
  
}) {
  const path = usePathname();
  
  return (
    <nav className="sticky top-0 bg-secondary">
      <div className="flex justify-between gap-2 px-3 py-2">
        {/* <ul className="flex gap-2">
          <li>
            <Button
            leftIcon="/icons/home_icon.svg"
            className={{ 
              self: "gap-1 min-w-fit", 
              __selected: { 
                self: "translate-y-2 rounded-b-none bg-primary hover:bg-primary" 
              } 
            }}>
              Home
            </Button>
          </li>
          <li>
            <Button
            leftIcon="/icons/book_icon.svg"
            className={{ 
              self: "gap-1 min-w-fit", 
              __selected: { 
                self: "translate-y-2 rounded-b-none bg-primary hover:bg-primary" 
              } 
            }}>
              About Us
            </Button>
          </li>
          <li>
            <Button
            leftIcon="/icons/analytics_icon.svg"
            className={{ 
              self: "gap-1 min-w-fit", 
              __selected: { 
                self: "translate-y-2 rounded-b-none bg-primary hover:bg-primary" 
              } 
            }}>
              Analytics
            </Button>
          </li>
        </ul> */}

        <ButtonGroup
        selectionLimit={1}
        unselectLastChoice
        onClick={(data) => console.log(data)}
        className={className.pageNavButtons}
        >
          <StatefulLinkButton id="home" leftIcon="/icons/home_icon.svg" href="/home">Home</StatefulLinkButton>
          <StatefulLinkButton id="about" leftIcon="/icons/menu_book_icon.svg" href="/about">About Raven</StatefulLinkButton>
          <StatefulLinkButton id="analytics" leftIcon="/icons/analytics_icon.svg" href="/analytics">Analytics</StatefulLinkButton>
        </ButtonGroup>

        <div className="flex gap-2">
          <DropdownSelection
          placeholder="Category"
          rightIcon="/icons/arrow_down_icon.svg"
          rightIconSelected="/icons/arrow_up_icon.svg"
          leftIcon="/icons/search_icon.svg"
          leftIconSelected="/icons/search_icon.svg"
          className={{
            menuButton: {
              self: "min-w-[10rem] justify-center gap-1"
            },
          }}
          >
            <StatelessButton id="all" text="All">All</StatelessButton>
            <StatelessButton id="packs" text="Packs">Packs</StatelessButton>
            <StatelessButton id="creatures" text="Creatures">Creatures</StatelessButton>
            <StatelessButton id="chests" text="Chests">Chests</StatelessButton>
            <StatelessButton id="plants" text="Plants">Plants</StatelessButton>
          </DropdownSelection>
          
          <SearchBar
          displayHistorySize={5}
          displayResultsSize={100}
          className={{ self: "xl:w-[25rem] lg:w-[20rem] sm:w-[18rem] w-[13rem]" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default MainNav;