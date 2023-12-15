
"use client";

import { twMerge } from "tailwind-merge";
import Icon from './Graphics/Icon';
import stringIsEmpty from '@/util/stringIsEmpty';
import Button from './Buttons/Button';
import removeExtraWhitespace from '@/util/removeExtraWhitespace';
<<<<<<< HEAD
import useLocalStorageRequest from '@/hooks/useLocalStorageRequest';
=======
import { useLocalStorageRequest, useLocalStorageState } from '@/hooks/useLocalStorageRequest';
>>>>>>> 20c3251fd1644a17fc2e585067deac6b449c8c28
import { filterSearchResults } from "@/util/filterSearchResults";
import Enum from '../enum';
import { v4 as uuidv4 } from 'uuid';
import { useState, useRef, useEffect } from 'react';
import mergeClass from '@/util/mergeClass';
import emptyFunc from "@/util/emptyFunc";
import Text from "./Typography/Text";
<<<<<<< HEAD
=======
import ImageButton from './Buttons/ImageButton';
>>>>>>> 20c3251fd1644a17fc2e585067deac6b449c8c28

const SearchBar = ({
  className: importedClassName={},
  placeholder="Search...", 

  onSearch=search => console.log('searched for: ', search),
<<<<<<< HEAD
  onHistoryResultIconClick=emptyFunc,

  historyDomain=Enum.StorageKeys.SearchHistoryDomain.Primary.value,
  historySize=100,
  displayResultsSize=3,
  displayHistorySize=3,
  historyResultIcon,
=======

  historyDomain=Enum.StorageKeys.SearchHistoryDomain.Primary.value,

  historySize=100,
  displayResultsSize=3,
  displayHistorySize=3,

  // historyResultIcon,
  // searchResultIcon,
>>>>>>> 20c3251fd1644a17fc2e585067deac6b449c8c28

  leftIcon="/icons/search_icon.svg",
  rightIcon,
}) => {
  // Get search history getters/setters for local storage
  const [getSearchHistory, updateSearchHistory] = useLocalStorageState(
    Enum.StorageKeys.SearchHistory.value, { [historyDomain]: [] }
  );

  // Create search state for when the search bar is interacted with
  const [searchState, setSearchState] = useState(Enum.SearchState.Idle.value);
  const [searchInput, setSearchInput] = useState("");
  const searchBarRef = useRef(null);
  const searchFieldRef = useRef(null);

  // TODO: add focus mover for search results
  const moveSearchResultFocus = (event) => {
    // if (searchState === Enum.SearchState.Idle.value) return;
    // searchFieldRef.current.blur();
    
    // const key = event.key;
    
    // if (key === "ArrowUp") {
    //   console.log("move up");
    // } else if (key === "ArrowDown") {
    //   console.log("move down");
    // }
  }

  // Force unfocus on search bar
  const unfocusSearch = () => {
    searchFieldRef.current.blur();
    searchFieldRef.current.value = removeExtraWhitespace(searchFieldRef.current.value);

    setSearchState(Enum.SearchState.Idle.value);
  }

  // When search bar is unfocused
  const onSearchUnfocus = (event) => {
    event.stopPropagation();

    if (!searchBarRef.current.contains(event.target)) {
      unfocusSearch();
      return;
    }
  }

  // Window events for detecting when using is unfocusing the search bar
  // TODO: add support for arrow-key focus on search results
  // todo: centralize this logic in the top level component, and pass a callback to handle this instead of making a new event listener
  //* important: when using more than one search bar, you may get repeating messages in output window. this is okay for now.
  useEffect(() => {
    window.addEventListener('mousedown', onSearchUnfocus);
<<<<<<< HEAD
    // window.addEventListener('blur', unfocusSearch);
    return () => {
      window.removeEventListener('mousedown', onSearchUnfocus);
      // window.removeEventListener('blur', unfocusSearch);
=======
    window.addEventListener('keyup', moveSearchResultFocus);
    // window.addEventListener('blur', removeSearchResultFocus);
    return () => {
      window.removeEventListener('mousedown', onSearchUnfocus);
      window.removeEventListener('keyup', moveSearchResultFocus);
      // window.removeEventListener('blur', removeSearchResultFocus);
>>>>>>> 20c3251fd1644a17fc2e585067deac6b449c8c28
    }
  }, []);

  // When the search bar is focused
  const onSearchFocus = () => {
    setSearchState(Enum.SearchState.Focused.value);
  }

  const filterSearch = (searchQuery) => {
    unfocusSearch();

    const filteredQuery = removeExtraWhitespace(searchQuery);

    // Check for whitespace-exclusive searches
    if (stringIsEmpty(filteredQuery)) {
      return;
    }

    // Update search history
    updateSearchHistory(prev => {
      let finalResults = prev[historyDomain] || [];
      const duplicateIndex = finalResults.indexOf(filteredQuery);

      // Check for duplicate searches. If duplicate is found, just re-order the search results
      if (duplicateIndex > -1) {
        finalResults.splice(duplicateIndex, 1);
        finalResults.unshift(filteredQuery);

      } else {
        finalResults = [filteredQuery, ...finalResults]; 
      }

      // Clip search results to history size limit
      if (finalResults.length > historySize) {
        finalResults = finalResults.slice(0, historySize);
      }
      
      return {...prev, [historyDomain]: finalResults };
    });
    
    onSearch(filteredQuery);
  }

  // When a search is invoked through the search result drop-down menu
  const onSearchResultQuery = (result) => {
    searchFieldRef.current.value = result;
    setSearchInput(result);
    filterSearch(result);
  }

  // When a search is submitted in the search bar
  const onEnter = (event) => {
    if (event.key === Enum.Keys.Enter.value) {
      // filterSearch(searchFieldRef.current.value);
      filterSearch(searchInput);
    }
  }

  let className = {
    self: "relative rounded bg-search-bar",

    searchTextbox: {
      self: "w-full h-full mx-2 text-search-bar-result"
    },

    historyList: {
      self: "absolute w-full rounded-b-md top-full z-[1000] bg-search-bar",
      inner: {
        self: "overflow-y-auto overflow-x-clip max-h-[200px]",
        resultButton: {
          //text-search-bar-result bg-search-bar-result hover:bg-search-bar-result-hover
          self: "w-full text-left text-search-bar-result bg-search-bar-result font-medium transition-colors duration-200 rounded hover:bg-search-bar-result-hover hover:underline",
          iconButton: {
            self: "hover:bg-transparent h-fit",
            inner: {
              self: "hover:bg-button-hover-primary hover:rounded"
            }
          }
        },
        historyResult: {
          self: "italic text-search-history-result"
        },
        databaseResult: {},
      }
    },

    __selected: {
      self: "rounded-b-none"
    }
  }

  className = mergeClass(
    className,
    importedClassName,
<<<<<<< HEAD
    { _isSelected: searchState === Enum.SearchState.Focused }
  );

  // Render out a single search result
  const renderSearchResult = (resultData) => (
    <Button 
    key={uuidv4()}
    onClick={() => onSearchResultQuery(resultData.source)}
    className={className.historyList.inner.resultButton}>
      {
        resultData.tags.map(tagData => {
          switch (tagData.type) {
            case Enum.SearchMatchType.FirstMatch:
              return <span key={tagData.key} className="text-[#d58eff]">{tagData.source}</span>

            case Enum.SearchMatchType.WordMatch:
              return <span key={tagData.key} className="text-[#fff7b9]">{tagData.source}</span>

            case Enum.SearchMatchType.AnyMatch:
              return <span key={tagData.key} className="text-[#8effdb]">{tagData.source}</span>

            case Enum.SearchMatchType.Normal:
              return <span key={tagData.key}>{tagData.source}</span>
          }
        })
      }
    </Button>
  );
=======
    { _isSelected: searchState !== Enum.SearchState.Idle.value }
  );

  // Render out a single search result
  const renderSearchResult = (resultData) => {
    const key = uuidv4();
    
    return (
      <div key={key} className="flex items-center">
        {
          resultData.type === Enum.SearchResultType.History.value
            ? <ImageButton
              onClick={() => {
                updateSearchHistory(prev => {
                  let finalResults = prev[historyDomain];
                  
                  finalResults.splice(
                    finalResults.indexOf(resultData.source), 
                    1
                  );
      
                  return {...prev, [historyDomain]: finalResults }
                });
              }}
              className={className.historyList.inner.resultButton.iconButton}
              hoverImage="/icons/trash_icon.svg"
              src="/icons/history_icon.svg"
              />
            : <ImageButton
              onClick={() => onSearchResultQuery(resultData.source)}
              className={className.historyList.inner.resultButton.iconButton}
              src="/icons/search_icon.svg"
              />
        }
        <Button 
        key={key}
        onClick={() => onSearchResultQuery(resultData.source)}
        className={
          mergeClass(
            className.historyList.inner.resultButton, 
            resultData.type === Enum.SearchResultType.History.value 
              ? className.historyList.inner.historyResult
              : className.historyList.inner.databaseResult
          )
        }>
          {
            resultData.tags.map(tagData => {
              switch (tagData.type) {
                case Enum.SearchMatchType.FirstMatch:
                  return <span key={tagData.key} className="text-[#d58eff] font-bold">{tagData.source}</span>

                case Enum.SearchMatchType.WordMatch:
                  return <span key={tagData.key} className="text-[#fff7b9] font-bold">{tagData.source}</span>

                case Enum.SearchMatchType.AnyMatch:
                  return <span key={tagData.key} className="text-[#a7ff73] font-bold">{tagData.source}</span>

                case Enum.SearchMatchType.Normal:
                  return <span key={tagData.key}>{tagData.source}</span>
              }
            })
          }
        </Button>
      </div>
    );
  };

  //* EXPENSIVE function
  const getSearchResults = (searchInput) => {
    // pull from search result arrays
    const historyLogs = (getSearchHistory(historyDomain) || []);
    const otherLogs = [
      "testing",
      "this is some test seed data",
      "where do i find the nearest mall",
      "malistare's boots of wissom",
      "moolinda woo's robe of song",
      "dragonspyre's cap of mourning",
      "stormkeeper's staff",
      "where do i find stats page?",
      "is this a new website",
      "who created this website?",
      "can i hack on this game",
      "where might i find the final boss?",
      "boss fights",
      "pack drops",
      "minion drops",
      "what minions drop aeon gear?"
    ]; 

    // convert search result arrays to arrays of result data
    const historyResults = filterSearchResults(
      historyLogs, 
      searchInput,
      Enum.SearchResultType.History.value
    )
    .slice(0, displayHistorySize)
    .sort((a, b) => b.priority - a.priority);

    const otherResults = filterSearchResults(
      otherLogs,
      searchInput,
      Enum.SearchResultType.Database.value
    ).sort((a, b) => b.priority - a.priority);

    // compile all result data arrays down to one, and sort by search match type
    const allResults = [
      ...historyResults,
      ...otherResults
    ]
    .slice(0, displayResultsSize)
    // .sort((a, b) => b.priority - a.priority);

    return allResults;
  }
>>>>>>> 20c3251fd1644a17fc2e585067deac6b449c8c28

  //* EXPENSIVE function
  const getSearchResults = () => {
    // pull from search result arrays
    const historyLogs = (getSearchHistory(historyDomain) || []);
    // const otherResults = {}; 

    // convert search result arrays to arrays of result data
    const historyResults = filterSearchResults(
      historyLogs, 
      searchInput
    )
    .slice(0, displayHistorySize);

    // compile all result data arrays down to one, and sort by search match type
    const allResults = [
      ...historyResults,
    ]
    .slice(0, displayResultsSize)
    .sort((a, b) => b.priority - a.priority);

    console.log("results: ", allResults);
    return allResults;
  }

  // The drop-down search results when the search bar is focused
  const renderSearchResults = () => {
<<<<<<< HEAD
    if ((searchState === Enum.SearchState.Focused.value || searchState === Enum.SearchState.Typing.value)) {
      const searchResults = getSearchResults();
      
      return (
        <div className={className.historyList.self}>
          <div className={className.historyList.inner.self}>
            { 
              searchResults.length > 0
                ? searchResults.map(renderSearchResult)
                : <Text className={{ self: "italic pt-2 text-xs" }}>No matches found for this search</Text>
            }
=======
    if ((searchState !== Enum.SearchState.Idle.value)) {
      const searchResults = getSearchResults(searchState === Enum.SearchState.Focused.value ? '' : searchInput);
      
      return (
        <div className={className.historyList.self}>
          <div className="px-3 py-2">
            <div className={className.historyList.inner.self}>
              { 
                searchResults.length > 0
                  ? searchResults.map(renderSearchResult)
                  : <Text className={{ self: "italic pt-2 text-xs" }}>No matches found for this search</Text>
              }
            </div>
>>>>>>> 20c3251fd1644a17fc2e585067deac6b449c8c28
          </div>
        </div>
      );
    }

    return <></>;
  }

  const onSearchTyping = () => {
    setSearchState(Enum.SearchState.Typing.value);
    setSearchInput(searchFieldRef.current.value);
  }

  // if (searchState === Enum.SearchState.Focused.value) {
  //   className.self = twMerge(className.self, "rounded-b-none");
  // }

  console.log("Search state: ", searchState);

  return (
    <div
    ref={searchBarRef}
    className={className.self}>
      
      <div className="flex items-center p-2">
        <Icon src={leftIcon}/>

        <input 
        ref={searchFieldRef} 
        onKeyUp={onEnter}
        onFocus={onSearchFocus} 
        onChange={onSearchTyping}
<<<<<<< HEAD
        className="w-full h-full mx-2 text-[#d9d8df]" 
=======
        className={className.searchTextbox.self}
>>>>>>> 20c3251fd1644a17fc2e585067deac6b449c8c28
        type="text" 
        placeholder={placeholder} 
        />

        <Icon src={rightIcon}/>
      </div>

      {renderSearchResults()}
    </div>
  );
};

export default SearchBar;