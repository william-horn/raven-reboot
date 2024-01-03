
"use client"

import Text from "@/components/Typography/Text";
import Content from "@/components/Content";
import SearchResult from "./SearchResult";

import { useEffect, useState } from "react";

const SearchPage__SearchResults = function({

}) {  


  return (
    <Content span="sm">
      <SearchResult/>
      <SearchResult/>
      <SearchResult/>
      <SearchResult/>
      <SearchResult/>
      <SearchResult/>
      <SearchResult/>
    </Content>
  );
}

export default SearchPage__SearchResults;