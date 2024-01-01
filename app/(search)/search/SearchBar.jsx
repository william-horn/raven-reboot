

"use client";

// import * as ItemsAPI from "@/models/items/api";
// import { useEffect } from "react";

// // Search bar imports
// import SearchBarPrimary from "@/tailwind-presets/SearchBar/SearchBarPrimary";
// import SearchBar from "../Searchbar";
// import { getResponsivePadding } from "@/libs/utils/responsiveStyles";
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
      displayResultsSize={30}
      className={SearchBarSleek}
      fetchResults={ItemsAPI.searchBarFetch}
      fetchFrom="production"
      />

      <SearchBar 
      displayResultsSize={30}
      // className={SearchBarSleek}
      fetchResults={ItemsAPI.searchBarFetch}
      fetchFrom="production"
      />
    </div>
  );
}

export default SearchPage__SearchBar;

