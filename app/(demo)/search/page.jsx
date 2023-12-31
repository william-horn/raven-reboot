
import Page from "@/components/Page";
import Content from "@/components/Content";
import SearchBar from "@/components/Searchbar";
import SearchBarPrimary from "../../../tailwind-presets/SearchBar/SearchBarPrimary.js";
import { getResponsivePadding } from "@/libs/utils/responsiveStyles";

const SearchPage = function({ 


}) {

  return (
    <Page>

      <Content span="max" className="relative h-[200vh]">
        <Content className="xl:w-[20%] lg:w-[25%] md:w-[30%] sm:w-[30%] sm:max-w-[20rem] max-w-[15rem] min-w-[15rem] h-screen bg-primary-inset sticky top-0 z-[100]">

          <div className={`${getResponsivePadding('2xl')}`}>
            <SearchBar 
            className={SearchBarPrimary}
            />
          </div>

        </Content>
      </Content>
      
    </Page>
  )
};

export default SearchPage;