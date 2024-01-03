"use client";

import ButtonGroup from "@/components/Buttons/ButtonGroup";
import { StatelessButton, StatelessLink } from "@/components/Buttons/Buttons";
import Text from "@/components/Typography/Text";
import Content from "@/components/Content";
import { useState } from "react";


const SearchPage__SearchNavBar = function({

}) {
  const [category, setCategory] = useState("all");

  return (
    <Content className="w-fit">

      <Content className="flex flex-wrap">
        <Content className="mr-4 search-bar-nav-section">
          <Text className="mb-3 text-[#454545]">Choose Search Category:</Text>

          <ButtonGroup 
          className={{
            self: "flex-row border-r-[1px] border-r-[#353535] w-fit pr-4",
            buttons: {
              self: "font-bold text-primary",
              __groupSelected: {
                // self: "bg-[#502883] hover:bg-[#502f83]"
                self: " bg-zinc-600 hover:bg-zinc-700"
              }
            }
          }}
          defaultSelect={["all"]}
          selectionLimit={1}
          unselectionLimit={1}
          unselectLastChoice>
            <StatelessButton id="all" value="all" className={{ self: "px-2" }}>All</StatelessButton>
            <StatelessButton id="dropSources" value="dropSources">Drop Sources</StatelessButton>
            <StatelessButton id="items" value="items">Items</StatelessButton>
          </ButtonGroup>
        </Content>
        
        <Content className="mr-4 search-bar-nav-section">
          <Text className="mb-3 text-[#454545]">Data Entry:</Text>
          <Content className="flex gap-2">
            <StatelessLink 
            href="/data-entry" 
            leftIcon="/icons/plus_icon.svg"
            className={{ self: "font-bold bg-green-700 hover:bg-green-800" }}>
              Add Entry
            </StatelessLink>
            <StatelessLink 
            href="/" 
            leftIcon="/icons/history_icon.svg"
            className={{ self: "font-bold bg-transparent hover:bg-transparent hover:underline" }}>
              Recent Entries
            </StatelessLink>
            <StatelessLink 
            href="/" 
            leftIcon="/icons/star_fill_icon.svg"
            // bg-zinc-600 hover:bg-zinc-700
            className={{ self: "font-bold bg-transparent hover:bg-transparent hover:underline" }}>
              Favorites
            </StatelessLink>
          </Content>
        </Content>
      </Content>

    </Content>
  );
}

export default SearchPage__SearchNavBar;