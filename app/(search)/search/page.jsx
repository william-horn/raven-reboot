
import Page from "@/components/Page";
import Content from "@/components/Content";
import SearchBar from "./SearchBar";
import Text from "@/components/Typography/Text.jsx";
import Heading from "@/components/Typography/Heading.jsx";

// test imports
import * as ItemsAPI from "../../../models/items/api.js";


const SearchPage = function({ 


}) {

  return (
    <Page className="">
      <Content span="max" className="h-[200vh] flex">

        <Content className="xl:w-[20%] lg:w-[25%] md:w-[30%] sm:w-[30%] sm:max-w-[20rem] max-w-[15rem] min-w-[15rem] h-screen bg-primary-inset sticky top-0">
          <SearchBar/>
        </Content>

        <Content span="max">
          <Content className="pt-4 pl-7">
            <Heading type="h2" textSize="3xl" className="font-light text-left text-[#7d7d7d]">Begin Your Research</Heading>
          </Content>
        </Content>

      </Content>
    </Page>
  )
};

export default SearchPage;