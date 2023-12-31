
import Page from "@/components/Page";
import Content from "@/components/Content";
import SearchBar from "@/components/Searchbar";
import Text from "@/components/Typography/Text.jsx";
import SearchBarPrimary from "../../../tailwind-presets/SearchBar/SearchBarPrimary.js";
import { getResponsivePadding } from "@/libs/utils/responsiveStyles";

const SearchPage = function({ 


}) {

  return (
    <Page>

      <Content span="max" className="relative">

        <Content className="xl:w-[20%] lg:w-[25%] md:w-[30%] sm:w-[30%] sm:max-w-[20rem] max-w-[15rem] min-w-[15rem] h-screen bg-primary-inset sticky top-0">
          <div className={`${getResponsivePadding('2xl')}`}>
            <SearchBar 
            displayHistorySize={30}
            displayResultsSize={30}
            className={SearchBarPrimary}
            />
          </div>
        </Content>

      </Content>
      
    </Page>
  )
};

export default SearchPage;