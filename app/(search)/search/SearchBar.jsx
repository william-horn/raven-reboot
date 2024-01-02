

"use client";

import SearchBar from "@/components/Searchbar";
import { getResponsivePadding } from "@/libs/utils/responsiveStyles";
import SearchBarSleek from "@/tailwind-presets/SearchBar/SearchBarSleek";

// Fetch APIs
import * as ItemsAPI from "../../../models/items/api";

const SearchPage__SearchBar = function({
  
}) {
  return (
    <div className={`${getResponsivePadding('2xl')}`}>
      <SearchBar 
      displayHistorySize={3}
      displayResultsSize={20}
      className={SearchBarSleek}
      fetchResults={ItemsAPI.searchBarFetch}
      fetchFrom="production"
      />
    </div>
  );
}

export default SearchPage__SearchBar;

