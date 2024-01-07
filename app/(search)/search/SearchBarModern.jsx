"use client";

import SearchBar from "@/components/Searchbar";
import { getResponsivePadding } from "@/libs/utils/responsiveStyles";
import SearchBarModern from "@/tailwind-presets/SearchBar/SearchBarModern";

import { useRouter, useSearchParams, usePathname, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useStateStore } from "@/hooks/useStateStore";
import emptyFunc from "@/libs/utils/defaultFunctions";
// Fetch APIs
// import * as DropsAPI from "../../../models/drops/api";


const SearchPage__SearchBarModern = function({
  fetchResults=emptyFunc
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();

  // decode url param back into '+' char
  const queryParam = searchParams.get('q')?.replace('%2b', '+');

  // update url on search
  const onSearch = searchInput => {
    // remove special whitespace character '+' from the URL, and replace it with the literal character.
    const encodedSearchParam = searchInput.replace('+', '%2b');
    const newParams = new URLSearchParams(searchParams.toString());

    // set the new query parameter
    newParams.set('q', encodedSearchParam);

    router.push(`${path}?${newParams}`)
  }

  return (
    <div className={`w-full`}>
      <SearchBar 
      onSearch={onSearch}
      leftIcon="/icons/search_light_icon.svg"
      placeholder="Begin Your Research..."
      displayHistorySize={3}
      displayResultsSize={20}
      setSearch={queryParam} // decode url param back into '+' char
      className={SearchBarModern}
      fetchResults={fetchResults}
      fetchFrom="production"
      />
    </div>
  );
}

export default SearchPage__SearchBarModern;

