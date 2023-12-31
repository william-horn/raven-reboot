"use client";

/*
  @author: William J. Horn

  This is a custom search bar component for general use. It has many features, such as:
    - built-in history cache
    - color-coded search results, in order of relevance
    - options to customize display of search results
    - smart built-in data fetching for displaying database search queries

  * No known bugs
  * Early version
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

/*
  React hooks/custom hooks
*/
import { useLocalStorageState } from '@/hooks/useLocalStorageRequest';
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

  historyDomain=Enum.StorageKeys.SearchHistoryDomain.Primary.value,
  cacheDomain=Enum.StorageKeys.SearchCacheDomain.Primary.value,

  cacheLimit=2500,
  historyLimit=100,
  displayHistorySize=3,
  displayResultsSize=10,
  fetchBatchLoad=displayResultsSize,

  // historyResultIcon,
  // searchResultIcon,

  leftIcon="/icons/search_icon.svg",
  rightIcon,
}) => {
  // Get search history getters/setters for local storage
  const [getSearchHistory, updateSearchHistory] = useLocalStorageState(
    Enum.StorageKeys.SearchHistory.value, { [historyDomain]: initialHistory }
  );

  // Create search state for when the search bar is interacted with
  const [searchState, setSearchState] = useState(Enum.SearchState.Idle.value);
  const [searchInput, setSearchInput] = useState("");
  const [lastSearchInput, setLastSearchInput] = useState("");
  const [getSearchCache, setSearchCache] = useLocalStorageState(
    Enum.StorageKeys.SearchCache.value, { [cacheDomain]: initialCache }
  );

  const remainingResults = useRef({ 
    amount: 0,
    exclude: [],
    isLoading: false,
    deadSearchRoot: null,
  });

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

  // Determines if current search input is 'dead' or not (if there are no database matches left)
  const isDeadSearchRoot = (searchInput) => {
    const deadRoot = remainingResults.current.deadSearchRoot;
    return fetchResults ? deadRoot && searchInput.match(deadRoot) : true;
  }

  // Window events for detecting when using is unfocusing the search bar
  // TODO: add support for arrow-key focus on search results
  // todo: centralize this logic in the top level component, and pass a callback to handle this instead of making a new event listener
  //* important: when using more than one search bar, you may get repeating messages in output window. this is okay for now.
  useEffect(() => {
    window.addEventListener('mousedown', onSearchUnfocus);
    window.addEventListener('keyup', moveSearchResultFocus);
    // window.addEventListener('blur', removeSearchResultFocus);
    return () => {
      window.removeEventListener('mousedown', onSearchUnfocus);
      window.removeEventListener('keyup', moveSearchResultFocus);
      // window.removeEventListener('blur', removeSearchResultFocus);
    }
  }, []);

  /*  
    Handle auto-fetching of new search results as the user is typing.

    Possible future updates:
      - only auto-fetch between small time intervals of user typing

      - add memory for "dead roots", to ignore re-fetching when the user 
        starts typing a dead-end query. 
        
          - for example: currently, if the user types in "zoo" with no matching 
            results, it will remember "zoo" as a dead root only until the user
            clears "zoo" from their search bar. Every subsequent search for 
            "zoo" after that will result in another query attempt.
  */
  useEffect(() => {
    // console.log('current cache: ', searchCache);
    const remaining = remainingResults.current;

    if (fetchResults && !remaining.isLoading && remaining.amount > 0 && !isDeadSearchRoot(searchInput)) {
      remainingResults.current.isLoading = true;

      // console.log(`Preparing fetch for [${remaining.amount}] items`);
      // console.log('with exclude: ', remainingResults.current.exclude);
      /*
        * note:
        Alternatively, we can use 'remaining.amount' as the fetchBatchLoad, if we only
        ever want to fetch what is needed. This, however, will result in more fetch calls.

        fetchResults():
          @param: fetchBatchLoad - the limit of documents to fetch
          @param: remaining.exclude - the array of already-cached search results to ignore in the db query
          @param: searchInput - the search query string
      */
      fetchResults(fetchBatchLoad, remaining.exclude, searchInput)
        .then(data => {
          console.log('search fetch: ', new Date());
          remainingResults.current.isLoading = false;
          remainingResults.current.exclude = [];

          /*
            From the returned fetch results, format the data into an array of names
            to be stored in cache and displayed in the search bar.
          */
          const fetchedResults = data.map(d => d.name);
          // console.log('fetched names: ', names, '| remaining after fetch: ', remainingResults.current.amount);

          /*
            If the amount of returned results is less than what we requested, then
            proceeding search queries should be ignored. I'm calling this a 'dead search root',
            or 'dead root'. The dead root will equal the search value from which the results
            stopped flowing in.
          */
          remainingResults.current.amount = Math.max(remaining.amount - fetchedResults.length, 0);
          
          if (remainingResults.current.amount > 0) {
            // console.log('setting dead search root to: ', searchInput);
            remainingResults.current.deadSearchRoot = searchInput;
            // console.log('DEAD ROOT: ', remainingResults.current.deadSearchRoot);
          }

          /*
            When fetch has returned the search results from the database, update the internal
            search cache to prevent re-fetching.
          */
          setSearchCache(prev => {
            let cache = prev[cacheDomain];

            // add the results to the existing cache array
            for (let i = 0; i < fetchedResults.length; i++) {
              cache.push(fetchedResults[i]);
            }

            // obey data cache limit
            if (cache.length > cacheLimit) {
              cache = cache.slice(cache.length - cacheLimit, cache.length);
            }

            return {...prev, [cacheDomain]: cache };
          });
        });
    }
  });


  // When the search bar is focused
  const onSearchFocus = () => {
    setSearchState(Enum.SearchState.Typing.value);
  }

  const removeFromHistory = (resultStr) => {
    updateSearchHistory(prev => {
      let finalResults = prev[historyDomain];
      
      finalResults.splice(
        finalResults.indexOf(resultStr), 
        1
      );

      return {...prev, [historyDomain]: finalResults }
    });
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
      if (finalResults.length > historyLimit) {
        finalResults = finalResults.slice(0, historyLimit);
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

  //* EXPENSIVE function
  const getSearchResults = (searchInput) => {
    // pull from search result arrays
    const historyLogs = (getSearchHistory(historyDomain) || []);

    /*
      * IMPORTANT OPTIMIZATION NOTE:

      It is more expensive to sort the filter results BEFORE slicing the array, since
      the array could be fairly large. 
      
      Optimally, it would be nice to sort everything
      first to present the user with the most relevant results, but if performance becomes
      and issue it's not a big deal for slice() and sort() to switch places.
    */

    // convert search result arrays to arrays of result data
    const historyResults = filterSearchResults(
      historyLogs, 
      searchInput,
      Enum.SearchResultType.History.value
    )
    .sort((a, b) => b.priority - a.priority)
    .slice(0, displayHistorySize);

    const searchCacheResults = filterSearchResults(
      getSearchCache(cacheDomain),
      searchInput,
      Enum.SearchResultType.Database.value
    )
    .sort((a, b) => b.priority - a.priority)
    .slice(0, displayResultsSize);

    // compile all result data arrays down to one, and sort by search match type
    const allResults = [
      ...historyResults,
      ...searchCacheResults
    ]
    // .slice(0, displayResultsSize)
    // .sort((a, b) => b.priority - a.priority);


    /*
      This job is to only worry about updating the search result request size data. All logic
      for handling the fetch and re-render is in the useEffect at the top level of the component.
    */
    const remainingSearchResultRequestSize = Math.max(displayResultsSize - searchCacheResults.length, 0);
    remainingResults.current.amount = remainingSearchResultRequestSize;

    if (searchCacheResults.length > 0) {
      remainingResults.current.exclude = searchCacheResults.map(data => data.source);
    } else {
      remainingResults.current.exclude = [];
    }

    // console.log('Remaining...', remainingSearchResultRequestSize);

    return allResults;
  }

  const onSearchTyping = () => {
    const currentSearchInput = searchFieldRef.current.value;

    if (!isDeadSearchRoot(currentSearchInput)) {
      remainingResults.current.deadSearchRoot = null;
    }

    setLastSearchInput(searchInput);
    setSearchState(Enum.SearchState.Typing.value);
    setSearchInput(currentSearchInput);
    onTyping(currentSearchInput);
  }

  // Render out a single search result
  const renderSearchResult = (resultData) => {
    const key = uuidv4();
    
    return (
      <div key={key} className="flex items-center">

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
              onClick={() => onSearchResultQuery(resultData.source)}
              className={className.historyList.inner.resultButton.iconButton}
              src="/icons/search_icon.svg"
              />
        }

        {/* Render search result button */}
        <StatelessButton 
        key={key}
        onClick={() => onSearchResultQuery(resultData.source)}
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
    if ((searchState !== Enum.SearchState.Idle.value)) {
      const searchResults = getSearchResults(searchState === Enum.SearchState.Focused.value ? '' : searchInput);

      const remainingResultsRequestSize = remainingResults.current.amount;
      const isDeadRoot = isDeadSearchRoot(searchInput);
      
      return (
        <div className={className.historyList.self}>
          <div className="px-3 py-2">
            <div className={className.historyList.inner.self}>
              {/* 
                If the search root is not dead, and we still have a remaining request size,
                then display a loading message until the data comes back, if there is any.
              */}
              {
                ((!isDeadRoot) && (remainingResultsRequestSize > 0))
                ? <div className="flex items-center gap-1">
                    <Text>Loading results...</Text>
                    <Icon src="/icons/loading_icon.svg" className={{ self: 'animate-spin w-4 h-4 min-w-fit min-h-fit' }}/>
                  </div>
                : <></>
              }

              {/* 
                If there are currently any search results, display them
              */}
              { 
                searchResults.length > 0
                  ? searchResults.map(renderSearchResult)
                  : <></>
              }

              {/*  
                If the search root is dead and there are no search results to be displayed,
                then display a 'no-results' message
              */}
              {
                (isDeadRoot && searchResults.length === 0)
                  ? <Text className="mt-2">No matches found for this search</Text>
                  : <></>
              }
            </div>
          </div>
        </div>
      );
    }

    return <></>;
  }

  let className = {
    self: "relative rounded bg-search-bar custom-search-bar",

    searchTextbox: {
      self: "w-full h-full mx-2 text-search-bar-result custom-search-bar-input"
    },

    historyList: {
      self: "absolute w-full rounded-b-md top-full z-[1000] bg-search-bar",
      inner: {
        self: "overflow-y-auto overflow-x-clip max-h-[200px]",
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
    { __selected: searchState !== Enum.SearchState.Idle.value }
  );

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
        className={className.searchTextbox.self}
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