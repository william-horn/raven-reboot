
import Page from "@/components/Page";
import Content from "@/components/Content";
import Text from "@/components/Typography/Text.jsx";
import Heading from "@/components/Typography/Heading.jsx";
import SearchBarModern from "./SearchBarModern.jsx";

// test imports
import * as ItemsAPI from "../../../models/items/api.js";


const SearchPage = function({ 


}) {

  return (
    <Page className="">
      <Content span="max" className="h-[200vh] flex relative">

        <Content className="w-[300px] min-w-[15rem] h-screen bg-primary-inset sticky top-0 hidden md:block">
          
        </Content>

        <Content span="max" className="pt-4 pl-3">
          <Content span="max" className="p-0">
            <SearchBarModern/>
          </Content>
        </Content>

      </Content>
    </Page>
  )
};

export default SearchPage;