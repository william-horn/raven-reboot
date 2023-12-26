
"use client";

import SearchBar from "@/components/Searchbar";
import Page from "@/components/Page";
import Text from "@/components/Typography/Text";
import Heading from "@/components/Typography/Heading";
// import DB_DATA from "../../../db-seed-data.json";
import Icon from "@/components/Graphics/Icon";
import DropdownSelection from "@/components/Buttons/DropdownSelection";
import Link from "next/link";
import { useState, useEffect } from "react";
import { StatelessButton } from "@/components/Buttons/Buttons";
import { filterSearchResults } from "@/util/filterSearchResults";
import Enum from "@/enum";
import { v4 as uuidv4 } from "uuid";
import creatureData from "../../db/creature-data.json";
import formatCreatureData from "@/util/formatCreatureData";

const className = {
  SearchResultPartition: {
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
  },

  SearchContent: {
    searchDropdown: {
      self: "",

      dropButton: {
        self: "text-lg sm:min-w-[4rem] md:min-w-[6rem] lg:min-w-[8rem] px-5 w-fit"
      },

      menuItems: { 
        self: "text-lg"
      },

      outerList: {
        self: "min-w-fit"
      },
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
}


const SearchResultList = function({
  children,
}) {
  return (
    <div className="flex flex-col gap-3 search-result-list">
      {children}
    </div>
  );
}

const SearchResultPartition = function({
  children,
  resultData
}) {
  const styles = className.SearchResultPartition;

  return (
    <div className={styles.self}>
      <div className={styles.headingSection.self}>
        <Heading h3 className={styles.headingSection.heading}>
          {resultData.title}
        </Heading>

        <Icon 
        src="/icons/amulet_icon.png"
        className={styles.headingSection.headingIcon}/>
      </div>

      <div className={styles.contentSection.self}>
        <Text className={styles.contentSection.text}>This item is no longer available</Text>
      </div>
    </div>
  );
}

const SearchResult = function({
  children,
  resultData,
}) {
  return (
    <div className="flex gap-2 rounded cursor-pointer search-result group">
      <Link href="/about" className="flex gap-2 rounded cursor-pointer search-result group w-fit">
        <SearchResultPartition resultData={newResultData.section1}/>
        {/* <SearchResultSection resultData={newResultData.section2}/> */}
     </Link>
    </div>
  );
}

const SearchContent = function({
  children,
}) {

  const [searchQuery, setSearchQuery] = useState("");
  const styles = className.SearchContent;

  // useEffect(() => {
  //   const formattedData = [];

  //   for (let key in creatureData) {
  //     formattedData.push(formatCreatureData(creatureData[key]));
  //   }

  //   const postData = async () => {
  //     try {
  //       const res = await fetch("/api/creatures", {
  //         method: "POST",
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(formattedData)
  //       }); 

  //       const data = await res.json();

  //       console.log("Post: ", data);

  //     } catch(err) {
  //       console.log(err);
  //     }
  //   }

  //   postData();
  // }, []);

  return (
    <Page.Content max>

      {/* Search config/input section */}
      <Page.Content small className="mb-10">
        <div className="flex flex-row w-full gap-2">

          {/* Select search category */}
          <DropdownSelection 
          defaultData={{ text: "All", value: "all" }}
          className={styles.searchDropdown}>

            <StatelessButton id="all" text="All" value="all">All</StatelessButton>
            <StatelessButton id="creatures" text="Creatures" value="creatures">Creatures</StatelessButton>
            <StatelessButton id="packs" text="Packs" value="packs">Packs</StatelessButton>
            <StatelessButton id="items" text="Items" value="items">Items</StatelessButton>

          </DropdownSelection>

          {/* Main Raven search field */}
          <SearchBar
          onSearch={(result) => setSearchQuery(result)}
          className={styles.searchBar}/>
        </div>
      </Page.Content>


      {/* Search result section */}
      <Page.Content medium>

        <SearchResultList>
          {/* {
            filterSearchResults(DB_DATA, searchResult, Enum.SearchResultType.Database).map(resultData => {
              return <SearchResult key={uuidv4()} resultData={{ title: resultData.source, desc: "No description" }}/>
            }) 
          } */}
        </SearchResultList>

      </Page.Content>
    </Page.Content>
  );
}

export default SearchContent;
