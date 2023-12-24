
"use client";

import SearchBar from "@/components/Searchbar";
import Page from "@/components/Page";
import Text from "@/components/Typography/Text";
import Heading from "@/components/Typography/Heading";
import DB_DATA from "../../../db-seed-data.json";
import Icon from "@/components/Graphics/Icon";
import DropdownSelection from "@/components/Buttons/DropdownSelection";
import Link from "next/link";
import { StatelessButton } from "@/components/Buttons/Buttons";

const SearchResultList = function({
  children,
}) {
  return (
    <div className="flex flex-col gap-3 search-result-list">
      {children}
    </div>
  );
}

const SearchResultSection = function({
  children,
  resultData
}) {

  const className = {
    self: "p-3 rounded result-1 bg-button-primary group-hover:bg-button-hover-primary w-full",

    headingSection: {
      self: "flex heading-section",

      heading: { 
        self: "pt-0 text-[#cfd2ff] text-xl group-hover:underline mb-2" 
      },

      headingIcon: {
        self: "ml-2 w-9 h-9",
        image: { self: "invert-0" }
      }
    },

    contentSection: {
      self: "content-section",
      text: {
        self: "text-md"
      }
    }

  }

  return (
    <div className={className.self}>
      <div className={className.headingSection.self}>
        <Heading h3 className={className.headingSection.heading}>
          {resultData.title}
        </Heading>

        <Icon 
        src="/icons/amulet_icon.png"
        className={className.headingSection.headingIcon}/>
      </div>

      <div className={className.contentSection.self}>
        <Text className={className.contentSection.text}>This item is no longer available</Text>
      </div>
    </div>
  );
}

const SearchResult = function({
  children,
  resultData,
}) {
  if (!resultData) {

    resultData = {
      title: "[Content Not Available]",
      desc: "No content available. Try again later."
    }
  }

  const newResultData = {
    section1: {
      title: resultData.title,
      desc: resultData.desc,
      icon: "/icons/amulet_icon.png",
    },

    section2: {
      title: "Stats",
      desc: "Checkout the stats of this item"
    }
  }


  return (
    <div className="flex gap-2 rounded cursor-pointer search-result group">
      {/* <Link href="/about" className="flex gap-2 rounded cursor-pointer search-result group w-fit"> */}
        <SearchResultSection resultData={newResultData.section1}/>
        {/* <SearchResultSection resultData={newResultData.section2}/> */}
     {/* </Link> */}
    </div>
  );
}

const SearchContent = function({
  children,
}) {

  const className = {
    searchDropdown: {
      self: "",

      dropButton: {
        self: "text-lg w-fit min-w-[7rem] px-5"
      },

      menuItems: { 
        self: "text-lg"
      }
    },

    searchBar: {
      self: "p-1 flex-1",
      leftIcon: {
        self: "w-6 h-6"
      },
      searchTextbox: {
        self: "text-lg font-bold"
      },
      historyList: {
        self: " -translate-x-1",
        inner: {
          resultButton: {
            self: "text-lg"
          }
        }
      }
    }
  }


  return (
    <Page.Content max>
      <Page.Content small className="mb-10">
        <div className="flex w-full gap-2">
          <DropdownSelection className={className.searchDropdown}>
            <StatelessButton id="one" text="All">All</StatelessButton>
            <StatelessButton id="two" text="Creatures">Creatures</StatelessButton>
            <StatelessButton id="three" text="Packs">Packs</StatelessButton>
            <StatelessButton id="four" text="Items">Items</StatelessButton>
          </DropdownSelection>
          <SearchBar
          __temp_db={DB_DATA}
          className={className.searchBar}/>
        </div>
      </Page.Content>

      <Page.Content medium>

        <SearchResultList>
          <SearchResult resultData={{ title: "Dragoon's Amulet", desc: "There is currently no data on this item. Please try again later." }}/>
          <SearchResult resultData={{ title: "Mystery Item", desc: "It's a mystery!" }}/>
          <SearchResult/>
        </SearchResultList>

      </Page.Content>
    </Page.Content>
  );
}

export default SearchContent;
