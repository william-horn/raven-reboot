"use client";

/*
  @author: William J. Horn

  This is a custom search bar component for general use. It has many features, such as:
    - built-in history cache
    - color-coded search results, in order of relevance
    - options to customize display of search results
    - smart built-in data fetching for displaying database search queries

  * Early version
  * 
  * // todo:
  * 
  * - Fix issue with 'domain' prop, and useLocalStorageState as a whole. 
  *   - make compatible with creating sub-directories
  * 
  * - may need to add conditional logic for 'fetchResults' prop to make sure it exists,
  *   for cases where search bar is not fetching from a database.
  * 
  * - Add new custom enums for storage keys * sub-domains
  * 
*/

/*
  In-house components
*/
import Icon from './Graphics/Icon';
import Text from "./Typography/Text";
import { StatelessButton } from "./Buttons/Buttons";
import { StatefulImageButton, StatelessImageButton } from './Buttons/ImageButtons';

/* 
  In-house utils
*/
import stringIsEmpty from '@/libs/utils/stringIsEmpty';
import removeExtraWhitespace from '@/libs/utils/removeExtraWhitespace';
import { filterSearchResults } from "@/libs/utils/filterSearchResults";
import mergeClass from '@/libs/utils/mergeClass';
import emptyFunc from "@/libs/utils/defaultFunctions";
import sleep from '@/libs/utils/sleep';
import { escapeRegex } from '@/libs/utils/escapeRegex';
/*
  React hooks/custom hooks
*/
import { useLocalStorageRequest, useLocalStorageState } from '@/hooks/useLocalStorageRequest';
import { useState, useRef, useEffect } from 'react';

/*
  Internal libraries
*/
import Enum from '../enum';

/*
  External libraries
*/
import { v4 as uuidv4 } from 'uuid';


/*
  todo: new custom types, organize into enums later
*/
const SearchDomain = {
  Primary: { value: "primary" }
}


/*
* --------------------
* SEARCH BAR COMPONENT
* --------------------
*/
const SearchBar = ({
  className: importedClassName={},
  placeholder="Search...", 

  onSearch=search => console.log('searched for: ', search),
  onTyping=emptyFunc,
  fetchResults,

  initialCache=[],
  initialHistory=[],

  // historyDomain=Enum.StorageKeys.SearchHistoryDomain.Primary.value,
  // cacheDomain=Enum.StorageKeys.SearchCacheDomain.Primary.value,
  domain=SearchDomain.Primary.value,

  cacheLimit=2500,
  historyLimit=100,
  displayHistorySize=3,
  displayResultsSize=10,
  fetchBatchLoad=displayResultsSize,
  fetchFrom,

  clearSearchBarOnFocus=false,

  // historyResultIcon,
  // searchResultIcon,

  leftIcon="/icons/search_icon.svg",
  rightIcon,
}) => {
  // Create search state for when the search bar is interacted with
  const [searchState, setSearchState] = useState(Enum.SearchState.Idle.value);
  const [searchInput, setSearchInput] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  // if deadRoot is empty (''), set it back to null to continue querying every keystroke
  const [deadRoot, setDeadRoot] = useState(null);

  // Get search history getters/setters for local storage
  const [getSearchHistory, updateSearchHistory] = useLocalStorageState(
    "raven:search_history", { [domain]: initialHistory }
  );
  const [getSearchCache, updateSearchCache] = useLocalStorageState(
    "raven:search_cache", { [domain]: initialCache }
  );

  // const isFetchingRef = useRef(false);
  // const searchResults = useRef(null);
  const searchBarRef = useRef(null);
  const searchFieldRef = useRef(null);

  // short-hand globals
  const isNotIdle = searchState !== Enum.SearchState.Idle.value;
  const isIdle = searchState === Enum.SearchState.Idle.value;
  const isListening = searchState === Enum.SearchState.Listening.value;
  const searchInputExists = searchInput !== null;
  const isDeadRoot = Boolean(deadRoot && (searchInput.match("^" + escapeRegex(deadRoot))));

  let noResultsFound;

  let allResults = null;
  let cachedResults = null;
  let historyResults = null;
  let remainingResults = null;
  let foundResults = null;

  //* EXPENSIVE function
  const getSearchResults = (searchInput) => {
    // pull from search result arrays
    const historyLogs = (getSearchHistory(domain) || []);

    /*
      * IMPORTANT OPTIMIZATION NOTE:

      It is more expensive to sort the filter results BEFORE slicing the array, since
      the array could be fairly large. 
      
      Optimally, it would be nice to sort everything
      first to present the user with the most relevant results, but if performance becomes
      and issue it's not a big deal for slice() and sort() to switch places.
    */

    // convert search result arrays to arrays of result data
    const historyResults = filterSearchResults({
      results: historyLogs, 
      query: searchInput,
      type: Enum.SearchResultType.History.value
    })
    .sort((a, b) => b.priority - a.priority)
    .slice(0, displayHistorySize);

    const cachedResults = filterSearchResults({
      results: getSearchCache(domain),
      query: searchInput,
      type: Enum.SearchResultType.Database.value
    })
    .sort((a, b) => b.priority - a.priority)
    .slice(0, displayResultsSize);

    // compile all result data arrays down to one, and sort by search match type
    const allResults = [
      ...historyResults,
      ...cachedResults
    ]
    // .slice(0, displayResultsSize)
    // .sort((a, b) => b.priority - a.priority);

    return {
      allResults,
      cachedResults,
      historyResults
    };
  }

  if (isNotIdle && searchInputExists) {
    const searchResults = getSearchResults(searchInput);

    allResults = searchResults.allResults;
    cachedResults = searchResults.cachedResults;
    historyResults = searchResults.historyResults;
    remainingResults = Math.max(displayResultsSize - cachedResults.length, 0);
    foundResults = cachedResults.map(data => data.source);
    noResultsFound = allResults.length === 0;

    // console.log('2) computed search results');
  }

  if (isIdle && searchFieldRef.current) {
    searchFieldRef.current.blur();
  }

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

  // When search bar is unfocused
  const onSearchUnfocus = (event) => {
    event.stopPropagation();

    if (!searchBarRef.current.contains(event.target)) {
      setSearchState(Enum.SearchState.Idle.value);
      return;
    }
  }

  // Window events for detecting when using is unfocusing the search bar
  // TODO: add support for arrow-key focus on search results
  // todo: centralize this logic in the top level component, and pass a callback to handle this instead of making a new event listener
  //* important: when using more than one search bar, you may get repeating messages in output window. this is okay for now.
  useEffect(() => {
    window.addEventListener('mousedown', onSearchUnfocus);
    // window.addEventListener('keyup', moveSearchResultFocus);
    // window.addEventListener('blur', removeSearchResultFocus);
    return () => {
      window.removeEventListener('mousedown', onSearchUnfocus);
      // window.removeEventListener('keyup', moveSearchResultFocus);
      // window.removeEventListener('blur', removeSearchResultFocus);
    }
  }, []);

  // console.log("current found: ", foundResults, " | for: ", searchInput);

  /*
    Process and handle changes AFTER render
  */
  useEffect(() => {
    // console.log('----------------------------');
    // console.log('isIdle: ', isIdle);
    // console.log('isFetching: ', isFetching);
    // console.log('isDeadRoot: ', isDeadRoot);
    // console.log('remaining results: ', remainingResults);
    // console.log('----------------------------');
    
    if (isIdle || isFetching || isDeadRoot) return;

    // console.log('3) getting result data');

    // if no results remain, then return
    if (remainingResults === 0) return;

    // console.log('4) insufficient results, begining FETCH');

    /*  
      Data-fetching phase
      * case: remaining results is > 0
    */

    setIsFetching(true);

    fetchResults({
      limit: fetchBatchLoad,
      exclude: foundResults,
      query: searchInput,
      db_env: fetchFrom,
    })
      .then(results => {
        const formattedResults = results.map(d => d.name);

        const remainingAfterFetch = remainingResults - formattedResults.length;

        // console.log("got back: ", formattedResults, " | for: ", searchInput);
        // console.log("remaining after: ", remainingAfterFetch);

        if (remainingAfterFetch > 0 && searchInput !== '') {
          // console.log('setting dead root for result data: ', searchInput);
          setDeadRoot(searchInput);
        } else {
          setDeadRoot(null);
        }

        setIsFetching(false);

        updateSearchCache(prev => {
          let cache = prev[domain];

          // add the results to the existing cache array
          for (let i = 0; i < formattedResults.length; i++) {
            cache.push(formattedResults[i]);
          }

          // obey data cache limit
          if (cache.length > cacheLimit) {
            cache = cache.slice(cache.length - cacheLimit, cache.length);
          }

          return {...prev, [domain]: cache };
        });

        // console.log('6) finished FETCH phase, next is re-render from setting isFetching to false');

      });

  }, [searchInput, isFetching]);

  const onSearchFocus = () => {
    setSearchState(Enum.SearchState.Listening.value);

    if (searchInput === null || clearSearchBarOnFocus) {
      setSearchInput('');
    }

    // console.log('1) focused search bar');
  }

  const removeFromHistory = (resultStr) => {
    updateSearchHistory(prev => {
      let finalResults = prev[domain];
      
      finalResults.splice(
        finalResults.indexOf(resultStr), 
        1
      );

      return {...prev, [domain]: finalResults }
    });
  }

  const submitSearch = (searchQuery) => {
    setSearchState(Enum.SearchState.Idle.value);

    const filteredQuery = removeExtraWhitespace(searchQuery);

    // Check for whitespace-exclusive searches
    if (stringIsEmpty(filteredQuery)) {
      return;
    }

    // Update search history
    updateSearchHistory(prev => {
      let finalResults = prev[domain];
      const duplicateIndex = finalResults.indexOf(filteredQuery);

      // Check for duplicate searches. If duplicate is found, just re-order the search results
      if (duplicateIndex > -1) {
        finalResults.splice(duplicateIndex, 1);
        finalResults.unshift(filteredQuery);

      } else {
        finalResults = [filteredQuery, ...finalResults]; 
      }

      // Clip search results to history size limit
      if (finalResults.length > historyLimit) {
        finalResults = finalResults.slice(0, historyLimit);
      }
      
      return {...prev, [domain]: finalResults };
    });
    
    onSearch(filteredQuery);
  }

  // When a search is invoked through the search result drop-down menu
  const autoSubmitSearch = (result) => {
    // searchFieldRef.current.value = result;
    setSearchInput(result);
    submitSearch(result);
  }

  // When a search is submitted in the search bar
  const onEnter = (event) => {
    if (event.key === Enum.Keys.Enter.value) {
      submitSearch(searchInput);
    }
  }

  // const onSearchTyping = () => {
  //   const currentSearchInput = searchFieldRef.current.value;

  //   if (!isDeadSearchRoot(currentSearchInput)) {
  //     remainingResults.current.deadSearchRoot = null;
  //   }

  //   // setLastSearchInput(searchInput);
  //   // setSearchState(Enum.SearchState.Typing.value);
  //   setSearchInput(currentSearchInput);
  //   onTyping(currentSearchInput);
  // }

  // Render out a single search result

  let className = {
    self: "relative rounded bg-search-bar custom-search-bar",

    searchTextbox: {
      self: "w-full h-full mx-2 text-search-bar-result custom-search-bar-input"
    },

    leftIcon: {},
    rightIcon: {},

    historyList: {
      self: "absolute w-full rounded-b-md top-full z-[1000] bg-search-bar",
      inner: {
        self: "overflow-y-auto overflow-x-clip max-h-[200px] pr-2",
        resultButton: {
          self: "w-full text-left justify-start text-search-bar-result bg-search-bar-result font-medium transition-colors duration-200 rounded hover:bg-search-bar-result-hover hover:underline",
          iconButton: {
            self: "bg-search-bar-result-icon h-fit",
            inner: {
              self: "hover:bg-search-bar-result-hover hover:rounded"
            }
          }
        },
        historyResult: {
          self: "italic text-search-history-result opacity-50"
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
    { __selected: isNotIdle }
  );

  const renderSearchResult = (resultData, index) => {
    // todo: replace uuid() with key based on data, as recommended by React
    // const key = uuidv4();
    
    return (
      <div key={index} className="flex items-center">

        {
          // Render interactive result icon for result history
          resultData.type === Enum.SearchResultType.History.value
            ? <StatefulImageButton
              onClick={() => removeFromHistory(resultData.source)}
              className={className.historyList.inner.resultButton.iconButton}
              srcHovered="/icons/trash_icon.svg"
              src="/icons/history_icon.svg"
              />

            // Render stateless icon for other search results
            : <StatelessImageButton
              onClick={() => autoSubmitSearch(resultData.source)}
              className={className.historyList.inner.resultButton.iconButton}
              src="/icons/search_icon.svg"
              />
        }

        {/* Render search result button */}
        <StatelessButton 
        key={index}
        onClick={() => autoSubmitSearch(resultData.source)}
        className={mergeClass(
          className.historyList.inner.resultButton, 
          resultData.type === Enum.SearchResultType.History.value 
            ? className.historyList.inner.historyResult
            : className.historyList.inner.databaseResult
        )}>
          {
            resultData.tags.map(tagData => {
              switch (tagData.type) {
                case Enum.SearchMatchType.FirstMatch:
                  return <span key={tagData.key} className="font-bold text-search-bar-result-match-first">{tagData.source}</span>

                case Enum.SearchMatchType.WordMatch:
                  return <span key={tagData.key} className="font-bold text-search-bar-result-match-word">{tagData.source}</span>

                case Enum.SearchMatchType.AnyMatch:
                  return <span key={tagData.key} className="font-bold text-search-bar-result-match-any">{tagData.source}</span>

                case Enum.SearchMatchType.Normal:
                  return <span key={tagData.key}>{tagData.source}</span>
              }
            })
          }
        </StatelessButton>
      </div>
    );
  };


  // The drop-down search results when the search bar is focused
  const renderSearchResults = () => {
    // State condition for rendering the results
    if (isIdle) {
      return <></>;
    }

    return (
      <>
        {/* 
          If the search root is not dead, and we still have a remaining request size,
          then display a loading message until the data comes back, if there is any.
        */}
        {
          (isFetching)
          ? <div className="flex items-center gap-1 my-2">
              <Text>Loading results...</Text>
              <Icon src="/icons/loading_icon.svg" className={{ self: 'animate-spin w-4 h-4 min-w-fit min-h-fit' }}/>
            </div>
          : <></>
        }

        {/* 
          If there are currently any search results, display them
        */}
        { 
          allResults.length > 0
            ? allResults.map(renderSearchResult)
            : <></>
        }

        {/*  
          If the search root is dead and there are no search results to be displayed,
          then display a 'no-results' message
        */}
        {
          (!isFetching && noResultsFound)
            ? <Text className="mt-2">No matches found for this search</Text>
            : <></>
        }
      </>
    );
  }

  return (
    <div
    ref={searchBarRef}
    className={className.self}>
      
      <div className="flex items-center p-2">
        <Icon src={leftIcon} className={className.leftIcon}/>

        <input 
        ref={searchFieldRef} 
        onKeyUp={onEnter}
        onFocus={onSearchFocus} 
        onChange={() => setSearchInput(searchFieldRef.current.value)}
        className={className.searchTextbox.self}
        type="text" 
        placeholder={placeholder} 
        value={searchInput || ''}
        />

        <Icon src={rightIcon} className={className.rightIcon}/>
      </div>

      {/* Search result list */}
      <div className={className.historyList.self}>
        <div className="px-3 py-2">
          <div className={className.historyList.inner.self}>
            {allResults ? renderSearchResults() : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;