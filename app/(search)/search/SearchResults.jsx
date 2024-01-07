
"use client"

import Text from "@/components/Typography/Text";
import Content from "@/components/Content";
import SearchResult from "./SearchResult";
import Heading from "@/components/Typography/Heading";
import Loading from "@/components/Loading/Classic";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useStateStore } from "@/hooks/useStateStore";

const SearchPage__SearchResults = function({
  fetchSearchResults
}) {  
  // const searchInput = useStateStore(state => state.searchInput);
  const params = useSearchParams();

  const [lastSearchInput, setLastSearchInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pageNumber = params.get('page');
  const searchInput = params.get('q');

  useEffect(() => {
    if (isLoading) {
      fetchSearchResults({
        query: searchInput,
        
      })
      .then(results => {

      });
    }
  }, [isLoading]);

  if (searchInput === null) {
    return <ResultListPlaceholder/>
  }

  if ((searchInput !== lastSearchInput) && !isLoading) {
    setIsLoading(true);
  }

  if (isLoading) {
    return <Loading message="Loading Search Results..."/>
  }

  return (
    <Content span="sm">
      <SearchResult/>
    </Content>
  );
}

const ResultListPlaceholder = function({}) {
  return (
    <div>
      <Heading>Start searching</Heading>
    </div>
  );
}

export default SearchPage__SearchResults;