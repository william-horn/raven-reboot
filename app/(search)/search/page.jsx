
import Page from "@/components/Page";
import Content from "@/components/Content";
import Text from "@/components/Typography/Text.jsx";
import Heading from "@/components/Typography/Heading.jsx";
import SearchBarModern from "./SearchBarModern.jsx";
import SearchResults from "./SearchResults.jsx";
import Link from "next/link";
import Logo from "@/components/Logo.jsx";

// API
import * as ItemsAPI from "../../../models/items/api.js";
import ButtonGroup from "@/components/Buttons/ButtonGroup.jsx";
import { StatelessButton } from "@/components/Buttons/Buttons.jsx";

const SearchPage = function({ 


}) {

  return (
    <Page className="">
      <Content span="max" className="h-[100vh] flex relative">

        <Content className="w-[300px] min-w-[15rem] h-screen bg-primary-inset sticky top-0 hidden md:block z-[10]">
          <div className="flex flex-col items-center justify-center pb-9 pt-7">
            <Link href="/"><Logo className="pointer-events-none select-none opacity-40 grayscale" width={56} height={56}/></Link>
          </div>
          <Content>
            <Heading className="font-bold text-inset-secondary" textSize="lg">Search Options</Heading>
          </Content>
        </Content>

        <Content span="max" className="">
          <Content span="max" className="sticky top-0 px-3 py-4 bg-primary shadow-[0_10px_30px_#0c0c0c]"> 
            <Content span="max" className="flex gap-2">
              <SearchBarModern/>
            </Content>
            <Content className="mt-1">

              {/* Source category */}
              <Content className="w-fit">
                <Text className="mb-3 text-[#454545]">Choose category:</Text>
                <ButtonGroup 
                className={{ 
                  self: "flex-row border-r-[1px] border-r-[#353535] w-fit pr-4",
                  buttons: {
                    self: "font-bold text-primary",
                    __groupSelected: {
                      self: "bg-[#502883] hover:bg-[#502f83]"
                    }
                  }
                }}
                defaultSelect={["one"]}
                selectionLimit={1}
                unselectLastChoice>
                  <StatelessButton id="one">Drop Sources</StatelessButton>
                  <StatelessButton id="two">Items</StatelessButton>
                </ButtonGroup>
              </Content>

            </Content>
          </Content>

          <Content className="px-6">
            {/* <Heading type="h2" textSize="3xl" className="text-left font-extralight">See what&apos;s new on the Raven News page</Heading> */}
            <SearchResults/>
          </Content>
        </Content>

      </Content>
    </Page>
  )
};

export default SearchPage;