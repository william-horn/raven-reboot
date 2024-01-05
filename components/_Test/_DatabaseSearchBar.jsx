

"use client";

import * as DropsAPI from "@/models/drops/api";
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
      fetchResults={DropsAPI.searchBarFetch}
      fetchFrom="production"
      />
    </div>
  );
}

export default _DatabaseSearchBar;

