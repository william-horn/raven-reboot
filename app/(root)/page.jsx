

/*
  This is the home page component, meaning it should remain a server-side component. Therefore,
  for button-testing purposes, we must create a client component that handles the interactivity logic
  between the user and the button, and nest the button in said client component.
*/

import Page from "@/components/Page";
// import SearchBar from "@/components/Searchbar";
import SearchContent from "@/app/(root)/SearchContent";
import Heading from "@/components/Typography/Heading";
import Image from "next/image";
import Text from "@/components/Typography/Text";
import DropdownSelection from "@/components/Buttons/DropdownSelection";
import { StatelessButton } from "@/components/Buttons/Buttons";
import ProviderNames from "@/enum/ProviderNames";
import Providers from "@/providers/Providers";
import Creature from "@/models/creatures";
import connectMongoDB from "@/libs/mongodb";

// export const getStaticProps = async () => {
//   const res = await fetch("/api/creatures?limit=-1");
//   const fetched__creatureData = await res.json();

//   return {
//     props: { fetched__creatureData }
//   }
// }

// const fetchData = async (endpoint) => {
//   const res = await fetch(`http://localhost:3000/api/${endpoint}`);
//   const data = await res.json();

//   const results = [];

//   for (let key in data) {
//     const val = data[key];
//     results[key] = val.name;
//   }

//   return results;
// }

const toSearchResultData = (data) => {
  const t = [];

  for (let i = 0; i < data.length; i++) {
    const v = data[i];
    t[i] = v.name;
  }

  return t;
}

const LandingPage = function() {
  // const creatureData = await fetchData("creatures?limit=500");
  // console.log(creatureData);

  const getCreatureData = async () => {
    "use server";
    
    await connectMongoDB();

    const cd = await Creature
      .find()
      .limit()
      .select("name");

    return toSearchResultData(cd);
  }

  // let creatureData = await Creature.find().limit().select("name");
  // creatureData = toSearchResultData(creatureData);
  // let creatureData = ["lol"];
  
  return (
    <Page className="relative pt-20">
      {/* <Image
      fill
      src="/images/dragon-mouth-cave-bg.jpg"
      className="absolute"
      /> */}

      <Page.Content small className="z-[10] relative">
        
        <Heading 
        center 
        className={{
          self: "text-2xl text-heading"
        }}>
          Explore Raven
        </Heading>

        <Text 
        center 
        className={{ self: "mb-5 italic text-muted font-normal" }}>
          Begin searching Raven&apos;s database for statistics on a given item.
        </Text>
      </Page.Content>
      
      <SearchContent getResults={getCreatureData}/>
    </Page>
  )
}

export default LandingPage;
