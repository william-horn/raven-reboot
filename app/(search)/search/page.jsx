
import Page from "@/components/Page";
import Content from "@/components/Content";
import Text from "@/components/Typography/Text.jsx";
import Heading from "@/components/Typography/Heading.jsx";
import SearchBarModern from "./SearchBarModern.jsx";

// test imports
import * as ItemsAPI from "../../../models/items/api.js";
import Logo from "@/components/Logo.jsx";

const SearchPage = function({ 


}) {

  return (
    <Page className="">
      <Content span="max" className="h-[100vh] flex relative">

        <Content className="w-[300px] min-w-[15rem] h-screen bg-primary-inset sticky top-0 hidden md:block z-[10]">
          <div className="flex flex-col items-center justify-center pb-9 pt-7">
            <Logo className="opacity-40 grayscale" width={56} height={56}/>
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
          </Content>

          <Content className="px-6">
            <Heading type="h2" textSize="3xl" className="text-left font-extralight">See what's new on the Raven News page</Heading>
          </Content>
        </Content>

      </Content>
    </Page>
  )
};

export default SearchPage;