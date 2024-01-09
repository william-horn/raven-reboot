
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
  const searchParams = useSearchParams();

  const [lastSearchInput, setLastSearchInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pageNumber = searchParams.get('page');
  const searchCategory = searchParams.get('category');
  const searchType = searchParams.get('type');
  const searchInput = searchParams.get('q');

  useEffect(() => {
    if (isLoading) {
      fetchSearchResults({
        query: searchInput,
        category: searchCategory,
        type: searchType,
        page: pageNumber,
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