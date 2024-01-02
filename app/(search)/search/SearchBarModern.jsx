

"use client";

import SearchBar from "@/components/Searchbar";
import { getResponsivePadding } from "@/libs/utils/responsiveStyles";
import SearchBarModern from "@/tailwind-presets/SearchBar/SearchBarModern";

import { useEffect, useState, useCallback } from "react";
// Fetch APIs
import * as ItemsAPI from "../../../models/items/api";

const SearchPage__SearchBarModern = function({
  
}) {

  return (
    <div className={`w-full`}>
      <SearchBar 
      // onSearch={updateSearchResults}
      leftIcon="/icons/search_light_icon.svg"
      placeholder="Begin Your Research..."
      displayHistorySize={3}
      displayResultsSize={20}
      className={SearchBarModern}
      fetchResults={ItemsAPI.searchBarFetch}
      fetchFrom="production"
      />
    </div>
  );
}

export default SearchPage__SearchBarModern;
