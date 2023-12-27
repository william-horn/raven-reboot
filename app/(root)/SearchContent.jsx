
"use client";

import SearchBar from "@/components/Searchbar";
import Page from "@/components/Page";
import Text from "@/components/Typography/Text";
import Heading from "@/components/Typography/Heading";
// import DB_DATA from "../../../db-seed-data.json";
import Icon from "@/components/Graphics/Icon";
import DropdownSelection from "@/components/Buttons/DropdownSelection";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { StatelessButton } from "@/components/Buttons/Buttons";
import { filterSearchResults } from "@/util/filterSearchResults";
import Enum from "@/enum";
import { v4 as uuidv4 } from "uuid";
import { parse as htmlToJSON, stringify as jsonToHTML} from "himalaya";
// import creatureData from "../../db/creature-data.json";
// import formatCreatureData from "@/util/formatCreatureData";

const className = {
  SearchResultPartition: {
    self: "p-5 rounded result-1 bg-button-primary group-hover:bg-button-hover-primary w-full",

    headingSection: {
      self: "flex heading-section",

      heading: { 
        self: "pt-0 text-[#cfd2ff] text-xl group-hover:underline mb-2" 
      },

      headingIcon: {
        self: "ml-2 w-7 h-7 min-w-fit min-h-fit",
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
        self: "text-lg sm:min-w-[4rem] md:min-w-[6rem] lg:min-w-[8rem] px-2 w-fit",
        rightIcon: { src: "/icons/arrow_down_icon.svg" },
        __dropdownSelected: {
          rightIcon: { src: "/icons/arrow_up_icon.svg" },
        }
      },

      menuItems: { 
        self: "text-lg"
      },

      outerList: {
        self: "min-w-fit min-h-fit"
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
    <div className="flex flex-col items-center gap-3 search-result-list">
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
          {resultData.name}
        </Heading>

        <Icon 
        src="/icons/enemy_icon.png"
        className={styles.headingSection.headingIcon}/>
      </div>

      <div className={styles.contentSection.self}>
        {/* <Text className={styles.contentSection.text}>{JSON.stringify(resultData.description)}</Text> */}
        <div className="wiz-description-box" dangerouslySetInnerHTML={{ __html: jsonToHTML(resultData.description) }}></div>
      </div>
    </div>
  );
}

const SearchResult = function({
  children,
  resultData,
}) {
  return (
    <div className="flex gap-2 rounded cursor-pointer search-result group w-[60%] xl:w-[70%] lg:w-[70%] md:w-[80%]" tabIndex="-1">
      <Link href="/about" className="flex w-full gap-2 rounded cursor-pointer search-result group">
        <SearchResultPartition resultData={resultData}/>
        {/* <SearchResultSection resultData={newResultData.section2}/> */}
     </Link>
    </div>
  );
}

const SearchContent = function({
  children,
  fromResults=["Empty"],
}) {

  const [searchQuery, setSearchQuery] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchData = useRef(null);
  
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

  const runSearch = (result) => {
    if (loading) {
      console.log("Rejecting search until previous has loaded...");
      return;
    };

    console.log("Preparing search for... ", result);
    
    setSearchQuery(result);
    setLoading(true);
  }

  if (searchQuery && loading) { 
    console.log("Searched: ", searchQuery);

    fetch(`/api/creatures?matchName=${searchQuery}`)
      .then(res => res.json())
      .then(data => {
        console.log("Got: ", data);
        searchData.current = data;
        setLoading(false);
      })
  }

  return (
    <Page.Content max>

      {/* Search config/input section */}
      <Page.Content small className="mb-16">
        <div className="flex flex-row w-full gap-2">

          {/* Select search category */}
          <DropdownSelection 
          defaultData={{ id: "creatures", text: "Creatures", value: "creatures" }}
          className={styles.searchDropdown}>

            {/* <StatelessButton id="all" text="All" value="all">All</StatelessButton> */}
            <StatelessButton id="creatures" text="Creatures" value="creatures">Creatures</StatelessButton>
            <Text className={{ self: "italic font-light text-center mt-2" }}>Other search options not available yet</Text>
            {/* <StatelessButton id="packs" text="Packs" value="packs">Packs</StatelessButton>
            <StatelessButton id="items" text="Items" value="items">Items</StatelessButton> */}

          </DropdownSelection>

          {/* Main Raven search field */}
          <SearchBar
          fromResults={fromResults}
          onSearch={(result) => runSearch(result)}
          className={styles.searchBar}/>
        </div>
      </Page.Content>


      {/* Search result section */}
      <Page.Content medium className="mb-10">

        {
          loading 
            ? <Text 
              className={{ 
                self: "text-2xl text-center animate-pulse rounded w-fit p-4 mx-auto" 
              }}>
                Loading...
              </Text>
            : <></>
        }

        <SearchResultList>
          {/* Display number of search results */}
          {
            searchData.current
              ? <Text 
              className={{ 
                self: "italic mb-4" 
              }}>
                {searchData.current.length} search result{searchData.current.length > 1 ? 's' : ''}.
              </Text>
              : <></>
          }

          {/* Display search results */}
          {
            searchData.current
              ? filterSearchResults(searchData.current, searchQuery, Enum.SearchResultType.Database).slice(0, 10).map(resultData => {
                  return <SearchResult key={uuidv4()} resultData={resultData.data}/>
                })
              : <></>
          }
        </SearchResultList>

      </Page.Content>
    </Page.Content>
  );
}

export default SearchContent;
