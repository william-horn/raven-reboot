

"use client";

import SearchBar from "@/components/Searchbar";
import SearchBarSleek from "@/tailwind-presets/SearchBar/SearchBarSleek";

import { useEffect, useState, useCallback } from "react";
// Fetch APIs
import * as DropsAPI from "../../models/drops/api";

const SearchPage__SearchBarDataEntry = function({
  
}) {

  const className = {
    self: "bg-primary-inset w-full",
    searchTextbox: {
      self: "py-2"
    },
    historyList: {
      self: "bg-primary-inset",
      inner: {
        resultButton: {
          self: "bg-transparent"
        }
      }
    }
  }

  return (
    <div className={`w-full`}>
      <SearchBar 
      // onSearch={updateSearchResults}
      leftIcon="/icons/search_light_icon.svg"
      placeholder="Enter source of drop (Creature, Pack, etc...)"
      displayHistorySize={0}
      displayResultsSize={20}
      requireAutoSubmit
      clearSearchBarOnFocus
      className={SearchBarSleek}
      fetchResults={DropsAPI.searchBarFetch}
      fetchFrom="production"
      />
    </div>
  );
}

export default SearchPage__SearchBarDataEntry;

