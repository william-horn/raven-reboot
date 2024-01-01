

"use client";

import * as ItemsAPI from "@/models/items/api";
import { useEffect } from "react";
import Heading from "../Typography/Heading";
import Divider from "../Divider";

// Search bar imports
import SearchBarPrimary from "@/tailwind-presets/SearchBar/SearchBarSleek";
import SearchBar from "../Searchbar";
import { getResponsivePadding } from "@/libs/utils/responsiveStyles";

const _DatabaseSearchBar = function({
  
}) {

  return (
    <div className={`${getResponsivePadding('2xl')}`}>
      <SearchBar 
      displayResultsSize={30}
      className={SearchBarPrimary}
      fetchResults={ItemsAPI.searchBarFetch}
      fetchFrom="production"
      />
    </div>
  );
}

export default _DatabaseSearchBar;

