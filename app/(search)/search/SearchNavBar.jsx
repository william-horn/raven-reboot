"use client";

import ButtonGroup from "@/components/Buttons/ButtonGroup";
import { StatelessButton, StatelessLink } from "@/components/Buttons/Buttons";
import Text from "@/components/Typography/Text";
import Content from "@/components/Content";
import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import DropdownSelection from "@/components/Buttons/DropdownSelection";
import { useStateStore } from "@/hooks/useStateStore";


const SearchPage__SearchNavBar = function({

}) {
  const setSearchCategory = useStateStore(state => state.setSearchCategory);
  const setSearchType = useStateStore(state => state.setSearchType);

  const searchCategory = useStateStore(state => state.searchCategory);
  const searchType = useStateStore(state => state.searchType);

  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  // useEffect(() => {
  //   if (params.get('category') === searchCategory) return;

  //   const newParams = new URLSearchParams(params.toString());
  //   newParams.set('category', searchCategory);

  //   router.replace(`${path}?${newParams.toString()}`);
  //   // console.log(path, newParams.toString());
  // }, [searchCategory]);

  useEffect(() => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set('category', searchCategory);
    newParams.set('type', searchType);

    router.replace(`${path}?${newParams.toString()}`);
  }, [searchCategory, searchType]);

  const onSearchCategoryChanged = (data) => {
    setSearchCategory(data.value);
  }

  const onSearchTypeChanged = (data) => {
    setSearchType(data.value);
  }

  const renderSearchTypeDropdown = () => {
    switch (searchCategory) {
      case 'drops':
        return (
          <SearchTypeDropdown
          defaultData={{ id: searchType, value: searchType, text: searchType }}
          options={[
            { id: 'all', value: 'all', text: 'All' },
            { id: 'robes', value: 'robes', text: 'Robes' },
            { id: 'hats', value: 'hats', text: 'Hats' },
            { id: 'boots', value: 'boots', text: 'Boots' },
            { id: 'amulets', value: 'amulets', text: 'Amulets' },
            { id: 'athames', value: 'athames', text: 'Athames' },
            { id: 'decks', value: 'decks', text: 'Decks' },
            { id: 'rings', value: 'rings', text: 'Rings' },
          ]}
          onUpdate={onSearchTypeChanged}
          />
        );

      case 'dropSources':
        return (
          <SearchTypeDropdown
          defaultData={{ id: searchCategory, value: searchCategory, text: searchCategory }}
          options={[
            { id: 'all', value: 'all', text: 'All' },
            { id: 'creatures', value: 'creatures', text: 'Creatures' },
            { id: 'packs', value: 'packs', text: 'Packs' },
            { id: 'chests', value: 'chests', text: 'Chests' },
          ]}
          onUpdate={onSearchTypeChanged}
          />
        );

      default:
        return <></>
    }
  }

  return (
    <Content className="w-fit">

      <Content className="flex flex-wrap">
        <Content className="mr-4 search-bar-nav-section">
          <Text className="mb-3 text-[#454545]">Choose Search Category:</Text>

          <ButtonGroup 
          className={{
            self: "flex-row border-r-[1px] border-r-[#353535] w-fit pr-4",
            buttons: {
              self: "font-bold text-primary bg-transparent hover:bg-transparent hover:underline",
              __groupSelected: {
                // self: "bg-[#502883] hover:bg-[#502f83]"
                // self: "bg-orange-600 hover:bg-orange-600 underline"
                self: "bg-button-primary hover:bg-navbar-button-primary-hover underline"
              }
            }
          }}
          onClick={onSearchCategoryChanged}
          defaultSelect={["all"]}
          selectionLimit={1}
          unselectionLimit={1}
          unselectLastChoice>
            <StatelessButton id="all" value="all" className={{ self: "px-2" }}>All</StatelessButton>
            <StatelessButton id="dropSources" value="dropSources">Drop Sources</StatelessButton>
            <StatelessButton id="items" value="drops">Drops</StatelessButton>
          </ButtonGroup>
        </Content>

        {
          searchCategory !== 'all'
            ? <Content className="mr-4 search-bar-nav-section">
                <Text className="mb-3 text-[#454545]">Category Type:</Text>
                <Content className="flex gap-2 border-r-[1px] border-r-[#353535] pr-4">

                  {/* Conditionally render drop-down for search type */}
                  {renderSearchTypeDropdown()}

                </Content>
              </Content>

            : <></>
        }
        
        <Content className="mr-4 search-bar-nav-section">
          <Text className="mb-3 text-[#454545]">Data Entry:</Text>
          <Content className="flex gap-2">
            <StatelessLink 
            href="/data-entry" 
            leftIcon="/icons/plus_icon.svg"
            // className={{ self: "font-bold bg-green-700 hover:bg-green-800" }}
            // className={{ self: "font-bold bg-white hover:bg-white text-black", leftIcon: { image: { self: "invert-0" }} }}
            // className={{ self: "font-bold bg-transparent text-green-500" }}
            >
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

const SearchTypeDropdown = function({
  options=[],
  onUpdate,
  defaultData={}
}) {

  const renderButton = ({id, value, text}) => {
    return (
      <StatelessButton 
      id={id} value={value} text={text} key={id}
      className={{ self: "bg-transparent hover:bg-transparent hover:underline" }}>
        {text}
      </StatelessButton>
    );
  }

  return (
    <DropdownSelection
    defaultData={defaultData}
    className={{
      self: "min-w-[7rem]",
      dropButton: {
        // self: "bg-orange-600 hover:bg-orange-700 font-bold",
        self: "font-bold",
        __dropdownSelected: {
          // self: "bg-orange-600 hover:bg-orange-700"
        }
      },
      innerList: {
        self: "overflow-y-auto"
      },
      outerList: {
        self: "px-0 max-h-[200px]",
      },
      menuItems: {
        self: "rounded-none",
      }
    }}
    onClick={onUpdate}
    >
      {options.map(v => renderButton(v))}
    </DropdownSelection>
  );
}

export default SearchPage__SearchNavBar;