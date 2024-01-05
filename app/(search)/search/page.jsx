
import Page from "@/components/Page";
import Content from "@/components/Content";
import Text from "@/components/Typography/Text.jsx";
import Heading from "@/components/Typography/Heading.jsx";
import SearchBarModern from "./SearchBarModern.jsx";
import SearchResults from "./SearchResults.jsx";
import Link from "next/link";
import Logo from "@/components/Logo.jsx";
import SearchNavBar from "./SearchNavBar.jsx";

// API
import * as DropsAPI from "../../../models/drops/api.js";
import ButtonGroup from "@/components/Buttons/ButtonGroup.jsx";
import { StatelessButton, StatelessLink } from "@/components/Buttons/Buttons.jsx";

const SearchPage = function({ 


}) {

  return (
    <Page className="">
      <Content span="max" className="relative flex">

        <Content className="w-[300px] min-w-[15rem] h-screen bg-primary-inset sticky top-0 hidden md:block z-[10]">
          <div className="flex flex-col items-center justify-center pb-9 pt-7">
            <Link href="/"><Logo className="pointer-events-none select-none opacity-40 grayscale" width={56} height={56}/></Link>
          </div>
          <Content>
            <Heading className="font-bold text-inset-secondary" textSize="lg">Quick Reference</Heading>
            <Content className="flex flex-col items-center justify-center">
              <Text className="font-light text-muted">No activity so far</Text>
            </Content>
          </Content>
        </Content>

        <Content span="max" className="">

          <Content span="max" className="sticky top-0 px-3 py-4 bg-primary shadow-[0_10px_30px_#0c0c0c]"> 
            <Content span="max" className="flex gap-2">
              <SearchBarModern/>
            </Content>

            <Content className="mt-1">
              <SearchNavBar/>
            </Content>
          </Content>

          <Content span="max" className="px-6 pt-4 pb-4">
            <SearchResults/>
            {/* <Content className="sticky flex justify-end bottom-4">
              <StatelessLink 
              href="/data-entry"
              rightIcon="/icons/plus_icon.svg"
              className={{ 
                self: "mb-3 text-xl font-bold p-2 px-4 bg-teal-800 hover:bg-teal-900",
                inner: { self: "mr-1" },
                rightIcon: {
                  self: "w-7 h-7"
                }
              }}>
                Create New Entry
              </StatelessLink>
            </Content> */}
          </Content>
          
        </Content>

      </Content>
    </Page>
  )
};

export default SearchPage;